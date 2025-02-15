import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  MouseEvent,
  FormEvent,
  KeyboardEvent,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "src/magicUi/ui/dialog";
import { Input } from "src/magicUi/ui/input";
import { Button } from "src/magicUi/ui/button";
import { useUserLogin } from "src/common/api/userLogin";
import "../styles/login.css";
import { useAppSelector } from "src/common/hooks/hook";
import { RefreshCw } from "lucide-react";
import { transformOrderPlacePayload } from "./orderPlace/utlis";
import { useCreatePorject } from "src/common/api/createProject";
import Loader from "../../Loader";
import { CartItem, ILocation, IUserProfile } from "src/common/types";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose }) => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [otp, setOTP] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(4);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const countDownRef = useRef<NodeJS.Timeout | null>(null);
  const autoConfirmRef = useRef<NodeJS.Timeout | null>(null);
  const dialogOpenRef = useRef<NodeJS.Timeout | null>(null)

  const providerNumber = useAppSelector(
    (state) => state.providerNumber.mobileNumber
  );
  const { getOtp, verifyOtp, loginInfo, loadingLogin, error, setError } =
    useUserLogin();
  const { projectCreation, loading } = useCreatePorject();

  useEffect(() => {
    //get session data
    const currentCartSessionData: CartItem | null = sessionStorage.getItem("cartInfo")
      ? JSON.parse(sessionStorage.getItem("cartInfo") as string)
    : null;
    const currentUserSessionData: IUserProfile | null = sessionStorage.getItem(
      "userInfo"
    )
      ? JSON.parse(sessionStorage.getItem("userInfo") as string)
      : null;
    
    const currentuserLocationSessionData: ILocation | null = sessionStorage.getItem(
      "userLocationInfo"
    )
      ? JSON.parse(sessionStorage.getItem("userLocationInfo") as string)
    : null;

    console.log('===currentuserLocationSessionData in from Login', currentuserLocationSessionData);

    if (currentUserSessionData && currentCartSessionData && currentuserLocationSessionData) {
      try {
        const orderPlacePayload = transformOrderPlacePayload(
          currentCartSessionData,
          currentUserSessionData,
          currentuserLocationSessionData
        );

        // Reset timer
        setTimer(4);

        // Start countdown
        countDownRef.current = setInterval(() => {
          setTimer((s) => (s > 0 ? s - 1 : 0));
        }, 1000);

        // Auto confirm booking after 3 seconds
        autoConfirmRef.current = setTimeout(async () => {
          await projectCreation(orderPlacePayload);
        }, 4000);
        
        // Thank-you dialog open after 3.5 seconds
        dialogOpenRef.current = setTimeout(() => {
          setShowDialog(true);
        }, 4500);

        // Cleanup function to prevent memory leaks
        return () => {
          clearInterval(countDownRef.current!);
          clearTimeout(autoConfirmRef.current!);
          clearTimeout(dialogOpenRef.current!);
        };
      } catch (error) {
        console.error("Error parsing session user info:", error);
      }
    }

    if (error) {
      setMobileNumber("");
      setShowOTP(false);
      setOTP(["", "", "", ""]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginInfo, error, setError, ]);


  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) {
      window.alert("Enter a valid 10-digit number");
      return;
    }

    if (providerNumber === mobileNumber) {
      setMobileNumber("");
      window.alert(`You can't book your own services.`);
      return;
    }
    await getOtp(mobileNumber);
    setShowOTP(true);
  };

  const handleOTPVerify = async (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      window.alert("Enter a valid 4-digit OTP");
      return;
    }

    try {
      await verifyOtp({ phoneNumber: mobileNumber, otp: otpValue });
    } catch (err) {
      console.log("===verify otp error", err);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Auto-focus next input
    if (value !== "" && index < 3) {
      const nextInput = document.querySelector<HTMLInputElement>(
        `input[name='otp-${index + 1}']`
      );
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key
    }

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector<HTMLInputElement>(
        `input[name='otp-${index - 1}']`
      );
      prevInput?.focus();
    }
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMobileNumber("");
    setShowOTP(false);
    setOTP(["", "", "", ""]);
    setError(null);
  };

  // mobileNumber input chage handler
  const mobileInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) setMobileNumber(value);
  };

  // Cancel Order Function - Stops the auto-confirm process
  const cancelOrderHandler = () => {
    console.log("===Order cancelled by user.");
    if (countDownRef.current) clearInterval(countDownRef.current);
    if (autoConfirmRef.current) clearTimeout(autoConfirmRef.current);
    onClose();
  };

  const projectPlaceHandler = () => {
    onClose();
    sessionStorage.removeItem('cartInfo');
    sessionStorage.removeItem('userLocationInfo');
    window.location.reload()
  };

  // thankyou dailog
  if (!loading && showDialog) {
    return (
      <Dialog open={isOpen} onOpenChange={projectPlaceHandler}>
        <DialogContent className="h-fit bg-white">
          <DialogHeader>
            <DialogDescription className="text-center font-bold text-md sm:text-lg mt-2.5">
              Thankyou, your order has been placed.
            </DialogDescription>
            <DialogDescription className="text-center font-semibold sm:font-normal text-md sm:text-lg">
              For tracking your order, Please download the App.
            </DialogDescription>
            <DialogDescription>
              <div className="flex flex-row justify-around items-center space-y-3 mt-4">
                <div>
                  <a
                    href="https://apps.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/assets/appstore.jpeg"
                      alt="Download on the App Store"
                      className="h-10"
                      width="140px"
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.tagzy.hire_pro"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/assets/playStore.jpeg"
                      alt="Get it on Google Play"
                      className="h-10 mb-2.5"
                      width="140px"
                    />
                  </a>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => {
        onClose();
        setError(null)
      }}>
        {loginInfo === null ? (
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>
                <div>
                  <img
                    className="logo mx-auto mb-2"
                    src="/logo.png"
                    alt="logo"
                  />
                </div>
                <div className="ml-2 text-center">Login</div>
              </DialogTitle>
              <DialogDescription className="mx-auto">
                Enter your mobile number to continue
              </DialogDescription>
            </DialogHeader>

            <div>
              {error && <p className="error-message">{error}</p>}
              <form onSubmit={showOTP ? handleOTPVerify : handleMobileSubmit}>
                {/* Mobile Number Input */}
                <div className="mobile-input-group">
                  <div className="country-code">
                    <span className="flag">🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <Input
                    type="tel"
                    value={mobileNumber}
                    onChange={mobileInputChangeHandler}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Prevent default form submission
                        handleMobileSubmit(
                          e as unknown as FormEvent<HTMLFormElement>
                        ); // Explicit cast
                      }
                    }}
                    placeholder="Enter mobile number"
                    maxLength={10}
                    disabled={showOTP || loadingLogin}
                    required
                  />
                  <button
                    style={{ display: `${showOTP ? "" : "none"}` }}
                    disabled={loadingLogin}
                    onClick={handleReset}
                  >
                    <RefreshCw color="#096c6c" />
                  </button>
                </div>

                {/* OTP Section */}
                {showOTP && (
                  <div className="otp-section">
                    <p className="text-center">
                      Enter OTP sent to +91 {mobileNumber}
                    </p>
                    <div className="otp-input-group">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="number"
                          inputMode="numeric"
                          name={`otp-${index}`}
                          value={digit}
                          onChange={(e) =>
                            handleOTPChange(index, e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault(); // Prevent default form submission
                              handleOTPVerify(e); // Call OTP verification
                              handleKeyDown(index, e);
                            }
                          }}
                          maxLength={1}
                          className="otp-input"
                          autoComplete="off"
                        />
                      ))}
                    </div>
                    <div className="text-center">
                      <span>Not Received OTP?</span>
                      <button
                        type="button"
                        className="resend-button text-colorA ml-2"
                        onClick={() => getOtp(mobileNumber)}
                        disabled={loadingLogin}
                      >
                        Resend OTP
                      </button>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="submit-button bg-colorA hover:bg-colorB"
                  disabled={loadingLogin}
                >
                  {loadingLogin
                    ? "Please wait..."
                    : showOTP
                    ? "Verify OTP"
                    : "Send OTP"}
                </Button>
              </form>
            </div>
          </DialogContent>
        ) : loading ? (
              //loader
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>
                    <div>
                      <img
                        className="logo mx-auto mb-2"
                        src="/logo.png"
                        alt="logo"
                      />
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <Loader isLoading={loading} />
              </DialogContent>
            ) : (
              //cancel order dialog
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>
                    <div>
                      <img
                        className="logo mx-auto mb-2"
                        src="/logo.png"
                        alt="logo"
                      />
                    </div>
                  </DialogTitle>
                </DialogHeader>
                <div className="order-dialog">
                  <div className="order-dialog-text">
                    Your service will booked in{" "}
                    <span className="text-red-700">{timer}</span> seconds.
                  </div>
                  <div>
                    <Button
                      className="order-dialog-btn"
                      onClick={cancelOrderHandler}
                      variant={"outline"}
                    >
                      Cancel Order
                    </Button>
                  </div>
                </div>
              </DialogContent>
            )
          }
      </Dialog>
    </>
  );
};

export default LoginDialog;
