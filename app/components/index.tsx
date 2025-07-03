import {
  Animated,
} from 'react-native';

import { useEffect, useRef, useState } from 'react';

import { styles } from '../styles';

const messages = [
  "You're Early.",
  "You're Late.",
  "You're Here."
];

export default function PresenceMessage() {
  const opacity = useRef(new Animated.Value(0)).current;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const animateOpacity = (
      opacityTarget: number,
      animationDuration: number = 750
    ) => {
      return new Promise<void>((resolve) => {
        Animated.timing(opacity, {
          toValue: opacityTarget,
          duration: animationDuration,
          useNativeDriver: true,
        }).start(() => resolve());
      });
    };

    const runAnimation = async () => {
      await animateOpacity(1);

      if (idx === messages.length - 1) {
        return;
      }

      await animateOpacity(0);
      setIdx((prevIdx) => (prevIdx + 1) % messages.length);
    };

    runAnimation();
  }, [idx, opacity]);

  return (
    <Animated.Text style={[styles.text, { opacity }]}>
      {messages[idx]}
    </Animated.Text>
  )
}
