import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const EyeIcon = (props: { width?: number; height?: number }) => (
  <Svg width={props.width || 64} height={props.height || 64} viewBox="0 0 64 64" fill="none">
    <Path
      d="M32 14C17 14 5.5 32 5.5 32C5.5 32 17 50 32 50C47 50 58.5 32 58.5 32C58.5 32 47 14 32 14Z" stroke="#EEE8D5" strokeWidth="3"
    />
    <Circle cx="32" cy="32" r="8" fill="#EEE8D5" />
  </Svg>
);

type RootStackParamList = {
  home: undefined;
};

const messages = ["You're Early.", "You're Late.", "You're Here."];

export default function LandingPage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [index, setIndex] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const textOpacity = useRef(new Animated.Value(0)).current;
  const hintTextOpacity = useRef(new Animated.Value(1)).current;
  const [hintText, setHintText] = useState('Loading...');

  useEffect(() => {
    if (canProceed) return;

    const fadeTextOut = (onComplete: () => void) => {
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => onComplete());
    };

    const fadeTextIn = () => {
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    };

    const fadeHintTextOut = (onComplete: () => void) => {
      Animated.timing(hintTextOpacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => onComplete());
    };

    const fadeHintTextIn = (onComplete: () => void) => {
      Animated.timing(hintTextOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start(() => onComplete());
    };

    fadeTextIn();

    const interval = setInterval(() => {
      fadeTextOut(() => {
        const next = (index + 1) % messages.length;
        setIndex(next);
        fadeTextIn();

        if (next === 2) {
          fadeHintTextOut(() => {
            setHintText('Tap To Continue');
            fadeHintTextIn(() => {
              setCanProceed(true);
            });
          });
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [index, textOpacity, hintTextOpacity, canProceed, setCanProceed]);

  const handleTap = () => {
    if (canProceed) {
      navigation.navigate('home');
    }
  };

  return (
    <Pressable onPress={handleTap} style={styles.container} disabled={!canProceed}>
      <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
        {messages[index]}
      </Animated.Text>
      <View style={styles.eyeContainer}>
        <EyeIcon width={64} height={64} />
        <Text style={styles.tagline}>IT’S YOU</Text>
        <Animated.Text style={[styles.hint, { opacity: hintTextOpacity }]}>
          {hintText}
        </Animated.Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#EEE8D5',
    fontSize: 28,
    fontFamily: 'Georgia',
    marginBottom: 40,
  },
  eyeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  tagline: {
    color: '#EEE8D5',
    fontSize: 16,
    marginTop: 8,
    letterSpacing: 1.2,
  },
  hint: {
    color: '#888',
    fontSize: 14,
    marginTop: 40,
    height: 20,
  },
});
