import React, { useState } from 'react';
import '../styles/OrderModal.css';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mobileNumber: string, otp: string) => void;
}

export function OrderModal({ isOpen, onClose, onSubmit }: OrderModalProps) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOtp) {
      // TODO: Implement OTP sending logic here
      setShowOtp(true);
    } else {
      onSubmit(mobileNumber, otp);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="OrderModal">
        <h2>{showOtp ? 'Verify OTP' : 'Enter Mobile Number'}</h2>
        <form onSubmit={handleSubmit}>
          {!showOtp ? (
            <div>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter 10 digit mobile number"
                pattern="[0-9]{10}"
                required
              />
              <button type="submit">Send OTP</button>
            </div>
          ) : (
            <div>
              <div className="otp-input">
                {[...Array(4)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otp[index] || ''}
                    onChange={(e) => {
                      const newOtp = otp.split('');
                      newOtp[index] = e.target.value;
                      setOtp(newOtp.join(''));
                      if (e.target.value && e.target.nextSibling) {
                        (e.target.nextSibling as HTMLInputElement).focus();
                      }
                    }}
                    required
                  />
                ))}
              </div>
              <button type="submit">Verify</button>
            </div>
          )}
        </form>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

