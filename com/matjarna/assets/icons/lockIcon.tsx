import React from 'react';
import Svg, {Path} from 'react-native-svg';

const LockIcon = () => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M15.8333 9.16666H4.16667C3.24619 9.16666 2.5 9.91285 2.5 10.8333V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V10.8333C17.5 9.91285 16.7538 9.16666 15.8333 9.16666Z"
        stroke="#BABABA"
        strokeWidth="1.56522"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.83337 9.16666V5.83332C5.83337 4.72825 6.27236 3.66845 7.05376 2.88704C7.83516 2.10564 8.89497 1.66666 10 1.66666C11.1051 1.66666 12.1649 2.10564 12.9463 2.88704C13.7277 3.66845 14.1667 4.72825 14.1667 5.83332V9.16666"
        stroke="#BABABA"
        strokeWidth="1.56522"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default LockIcon;
