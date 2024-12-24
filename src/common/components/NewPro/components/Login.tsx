import React, { useState } from "react";
import "./login.css";
import { useUserLogin } from "src/common/api/userLogin";
import { Input } from "src/magicUi/ui/input";
import { Button } from "src/magicUi/ui/button";
import { ArrowLeft } from "lucide-react";
import { Page } from "../types/types";

interface LoginProps {
  setActivePage?: (page: Page) => void;
}

export default function LoginPage({ setActivePage }: LoginProps) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState(["", "", "", ""]);

  const { getOtp, verifyOtp, loginInfo, loading, error } = useUserLogin();

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mobileNumber.length !== 10) {
      window.alert("Enter valid 10-digit number");
      return;
    }

    await getOtp(mobileNumber);
    setShowOTP(true);
  };

  const handleOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      window.alert("Enter valid 4-digit OTP");
      return;
    }

    await verifyOtp({ phoneNumber: mobileNumber, otp: otpValue });
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Auto focus next input
    if (value !== "" && index < 3) {
      const nextInput = document.querySelector<HTMLInputElement>(
        `input[name='otp-${index + 1}']`
      );
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace if current input is empty
      const prevInput = document.querySelector<HTMLInputElement>(
        `input[name='otp-${index - 1}']`
      );
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  return (
    <>
      <div className="login-container" style={{ position: "relative" }}>
        {/* <button
          className="back-button"
          style={{ position: "absolute", top: "0", left: "0" }}
          onClick={() => setActivePage && setActivePage("basket")}
        >
          <ArrowLeft className="w-6 h-6" />
          Back to Cart
        </button> */}
        <div className="login-card">
          <div className="login-card-logo">
            <img className="logo" src="/logo.png" alt="logo" />
          </div>
          <h1>Login</h1>
          <p className="subtitle">Enter your mobile number to continue</p>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={showOTP ? handleOTPVerify : handleMobileSubmit}>
            <div className="mobile-input-group">
              <div className="country-code">
                {/* <img
                src="/placeholder.svg?text=IN"
                alt="🇮🇳"
                className="flag"
              /> */}
                <span style={{ fontSize: "24px" }}>🇮🇳</span>
                <span>+91</span>
              </div>
              <Input
                type="tel"
                value={mobileNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) {
                    setMobileNumber(value);
                  }
                }}
                placeholder="Enter mobile number"
                maxLength={10}
                disabled={showOTP || loading}
                required
                style={{ height: "100%", fontSize: "16px" }}
              />
            </div>

            {showOTP && (
              <div className="otp-section">
                <p>Enter OTP sent to +91 {mobileNumber}</p>
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
                <button
                  type="button"
                  className="resend-button"
                  onClick={() => getOtp(mobileNumber)}
                  disabled={loading}
                >
                  Resend OTP
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="submit-button hover:bg-gray-800"
              disabled={loading}
            >
              {loading ? "Please wait..." : showOTP ? "Verify OTP" : "Login"}
            </Button>
          </form>

          {loginInfo && (
            <>
            {setActivePage && setActivePage("checkout")}
            </>
          )}
        </div>
      </div>
    </>
  );
}
