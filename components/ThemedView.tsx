import { View, ViewProps, ViewStyle } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = {
  lightColor?: string;
  darkColor?: string;
  style?: ViewStyle | ViewStyle[];
} & ViewProps;

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  console.log('backgroundColor:', backgroundColor); // should be a string
console.log('typeof backgroundColor:', typeof backgroundColor);
console.log('style:', style);


  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
