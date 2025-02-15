import React, { useState } from 'react';
import '../styles/OrderModal.css';
import { useUserLogin } from '../../../api/userLogin'
import { useCreatePorject } from '../../../api/createProject'
import { useProviderProfile } from 'src/common/api/providerProfile';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mobileNumber: string, otp: string) => void;
}

interface VerifyOtpType {
  phoneNumber: string
  otp: any
}

export function OrderModal({ isOpen, onClose, onSubmit }: OrderModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState<number>();
  const [showOtp, setShowOtp] = useState(false);
  const { getOtp, verifyOtp } = useUserLogin();
  const { projectCreation } = useCreatePorject()
  const { providerProfile, getProviderProfile, loading } = useProviderProfile()

  const test = {
    proPhoneNumber: 9559303975,
    clientPhoneNumber: 9455920812,
    address: "",
    location: {
      coordinates: [
          77.5945627,
          12.9715987
      ],
      name: "Bangalore, Karnataka, India",
      type: "Point"
  },
    status: "ACTIVE",
    dateTime: "2024-12-16T13:12:09.282Z",
    proName: "Priya Sharma",
    clientName: "peuya",
    discount: 0,
    cost: 0,
    proId: "67588b183c1e3d7db343e854",
    clientId: "6758847c3c1e3d7db343e808",
    serviceId: "67588dac3c1e3d7db343e894",
    typeOfService: "AT_OFFICE",
    addOns: [
      
    ],
    procedure: [
      {
        step: 1,
        name: "Project Creation",
        status: "COMPLETED",
        dateTime: new Date(),
        userType: "USER",
      },
      {
        step: 2,
        name: "Invitation",
        status: "NOT_STARTED",
        dateTime: new Date(),
        userType: "PRO",
      }
    ]
  }


  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!showOtp) {
  //     // TODO: Implement OTP sending logic here
  //     setShowOtp(true);
  //   } else {
  //     onSubmit(phoneNumber, otp);
  //   }
  // };

  const handleClickForOtpGeneration = async(phoneNumber: string) => {
    // await getOtp(phoneNumber)
    await projectCreation(test as any)
  }

  const handleClickForVerify = async({phoneNumber, otp}: VerifyOtpType) => {
    await verifyOtp({
      phoneNumber,
      otp
    })
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="OrderModal">
        <h2>{showOtp ? 'Verify OTP' : 'Enter Mobile Number'}</h2>
        {/* <form onSubmit={handleSubmit}> */}
          {/* {!showOtp ? ( */}
            <div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter 10 digit mobile number"
                pattern="[0-9]{10}"
                required
              />
              <button type="submit" onClick={() => handleClickForOtpGeneration(phoneNumber)}>Send OTP</button>
            </div>
          {/* ) : ( */}
            <div>
              <input type="number" value={otp} onChange={(e: any) => setOtp(e.target.value)} />
              {/* <div className="otp-input">
                {[...Array(4)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otp && otp[index] || ''}
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
              </div> */}
              <button type="submit" onClick={() => handleClickForVerify({phoneNumber, otp})}>Verify</button>
            </div>
          {/* )} */}
        {/* </form> */}
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

