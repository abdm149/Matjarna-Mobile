import React from 'react';
import Svg, {Path} from 'react-native-svg';

const SideMenuIcon = () => {
  return (
    <Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
      <Path
        d="M2.5 10.5H17.5"
        stroke="black"
        strokeWidth="1.4375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.5 5.5H13.3333"
        stroke="black"
        strokeWidth="1.4375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.5 15.5H10"
        stroke="black"
        strokeWidth="1.4375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default SideMenuIcon;
