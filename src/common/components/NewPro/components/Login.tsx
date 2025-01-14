import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "src/magicUi/ui/dialog";
import { Input } from "src/magicUi/ui/input";
import { Button } from "src/magicUi/ui/button";
import { useUserLogin } from "src/common/api/userLogin";
import { Page } from "../types/types";
import "../styles/login.css";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  setActivePage?: (page: Page) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ isOpen, onClose, setActivePage }) => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [otp, setOTP] = useState<string[]>(["", "", "", ""]);

  const { getOtp, verifyOtp, loginInfo, loading, error } = useUserLogin();

  useEffect(() => {
    if(loginInfo && setActivePage) {
      setActivePage('checkout')
      onClose()
    }
  }, [loginInfo, setActivePage, onClose])

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mobileNumber.length !== 10) {
      window.alert("Enter a valid 10-digit number");
      return;
    }

    await getOtp(mobileNumber);
    setShowOTP(true);
  };

  const handleOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      window.alert("Enter a valid 4-digit OTP");
      return;
    }

    await verifyOtp({ phoneNumber: mobileNumber, otp: otpValue });

    if (loginInfo) {
      setActivePage && setActivePage("checkout");
      onClose(); // Close the dialog upon successful login
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

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector<HTMLInputElement>(
        `input[name='otp-${index - 1}']`
      );
      prevInput?.focus();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            <div>
              <img className="logo mx-auto mb-2" src="/logo.png" alt="logo" />
            </div>
            <div className="ml-2 text-center">Login</div>
          </DialogTitle>
          <DialogDescription className="mx-auto">Enter your mobile number to continue</DialogDescription>
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
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) setMobileNumber(value);
                }}
                placeholder="Enter mobile number"
                maxLength={10}
                disabled={showOTP || loading}
                required
              />
            </div>

            {/* OTP Section */}
            {showOTP && (
              <div className="otp-section">
                <p className="text-center">Enter OTP sent to +91 {mobileNumber}</p>
                <div className="otp-input-group">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      name={`otp-${index}`}
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      maxLength={1}
                      className="otp-input"
                      autoComplete="off"
                    />
                  ))}
                </div>
                <div className="text-center">
                  <span>
                    Not Received OTP?
                  </span>
                  <button
                    type="button"
                    className="resend-button text-colorA ml-2"
                    onClick={() => getOtp(mobileNumber)}
                    disabled={loading}
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
              disabled={loading}
            >
              {loading ? "Please wait..." : showOTP ? "Verify OTP" : "Send OTP"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
