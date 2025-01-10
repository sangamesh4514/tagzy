import React from 'react';

const VerifiedMark: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 191.667 191.667"
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="green"
      d="M95.833 0C42.991 0 0 42.99 0 95.833s42.991 95.834 95.833 95.834 95.833-42.991 95.833-95.834S148.676 0 95.833 0m55.029 79.646-60.207 60.207a13.46 13.46 0 0 1-9.583 3.969c-3.62 0-7.023-1.409-9.583-3.969l-30.685-30.685a13.46 13.46 0 0 1-3.97-9.583c0-3.621 1.41-7.024 3.97-9.584a13.46 13.46 0 0 1 9.583-3.97c3.62 0 7.024 1.41 9.583 3.971l21.101 21.1 50.623-50.623a13.46 13.46 0 0 1 9.583-3.969c3.62 0 7.023 1.409 9.583 3.969 5.286 5.286 5.286 13.883.002 19.167"
    />
  </svg>
);

export default VerifiedMark;
