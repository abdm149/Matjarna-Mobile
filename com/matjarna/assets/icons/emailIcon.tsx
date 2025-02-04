import React from 'react';
import Svg, {Path} from 'react-native-svg';

const EmailIcon = () => {
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Path
        d="M3.33329 3.33331H16.6666C17.5833 3.33331 18.3333 4.08331 18.3333 4.99998V15C18.3333 15.9166 17.5833 16.6666 16.6666 16.6666H3.33329C2.41663 16.6666 1.66663 15.9166 1.66663 15V4.99998C1.66663 4.08331 2.41663 3.33331 3.33329 3.33331Z"
        stroke="#BABABA"
        strokeWidth="1.56522"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.3333 5L9.99996 10.8333L1.66663 5"
        stroke="#BABABA"
        strokeWidth="1.56522"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default EmailIcon;
