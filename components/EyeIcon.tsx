import Svg, { Circle, Path } from 'react-native-svg';

interface EyeIconProps {
  width?: number;
  height?: number;
};

export const EyeIcon = (
  props: EyeIconProps
) => (
  <Svg
    width={props.width || 64}
    height={props.height || 64}
    viewBox="0 0 64 64"
    fill="none"
  >
    <Path
      d="M32 14C17 14 5.5 32 5.5 32C5.5
      32 17 50 32 50C47 50 58.5 32 58.5
      32C58.5 32 47 14 32 14Z"
      stroke="#EEE8D5"
      strokeWidth="3"
    />
    <Circle
      cx="32"
      cy="32"
      r="8"
      fill="#EEE8D5"
    />
  </Svg>
);
