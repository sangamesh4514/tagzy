import React, { FormEvent, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Greet from './greet/Greet';

const ToggleModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreet, setShowGreet] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const emailSender = (e: FormEvent) => {
    e.preventDefault();
    const currentForm = formRef.current
    // this prevents sending emails if there is no form.
    // in case currentForm cannot possibly ever be null,
    // you could alert the user or throw an Error, here
    if(currentForm === null) return
    emailjs
      .sendForm(
        'service_5wa3w5j',
        'template_90dytdq',
        currentForm,
        'xZiE81yyC9gBEedO8'
      )
      .then(
        (result) => {
          console.log('=== result', result);
          setIsOpen(false);
          setTimeout(() => {
            setShowGreet(true);
            setTimeout(() => {
              setShowGreet(false);
            }, 5000); // 3 seconds for line animation + 3 seconds for fade out
          }, 500); // Small delay to ensure modal is closed before showing Greet
        },
        (error) => {
          console.log('=== error', error);
        }
      );
  };

  return (
    <div>
      <div>
        <button
          className="flex flex-row text-white bg-gradient-to-r from-cyan-500 to-green-400 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          onClick={toggleOpen}
        >
          NOTIFY ME ABOUT THAT!
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
            className="w-6 h-5 ml-2 font-bold"
          >
            <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
          </svg>
        </button>
      </div>

      {/* NotifyMe Card */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden">
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <div className="flex flex-col justify-start p-4 md:p-5 border-b rounded-t">
                <div className="text-2xl font-semibold text-gray-900 pb-2">
                  Subscribe
                </div>
                <div>
                  To subscribe to this website, please enter your name, email address and your city here. We will send updates.
                </div>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#" ref={formRef} onSubmit={emailSender}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your Email
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="city"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your City
                    </label>
                    <input
                      required
                      type="text"
                      name="city"
                      id="city"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    />
                  </div>
                  <div className="flex flex-row">
                    <button
                      type="button"
                      className="w-full mr-4 text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={toggleOpen}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Greet Card */}
      {showGreet && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <Greet />
        </div>
      )}
    </div>
  );
};

export default ToggleModal;
