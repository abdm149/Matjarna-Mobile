import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ChevronLeftIcon = () => {
  return (
    <Svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      >
      <Path
        d="M15.5 18.5L9.5 12.5L15.5 6.5"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ChevronLeftIcon;