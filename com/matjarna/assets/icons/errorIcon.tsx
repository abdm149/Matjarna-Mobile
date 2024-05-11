import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ErrorIcon = () => {
  return (
    <Svg width="48" height="48" viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 9L15 15M15 9L9 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        stroke="#848484"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ErrorIcon;
