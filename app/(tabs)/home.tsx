import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

const EyeIcon = ({ width = 64, height = 64 }) => (
  <Svg width={width} height={height} viewBox="0 0 64 64" fill="none">
    <Path
      d="M32 14C17 14 5.5 32 5.5 32C5.5 32 17 50 32 50C47 50 58.5 32 58.5 32C58.5 32 47 14 32 14Z"
      stroke="#EEE8D5"
      strokeWidth="3"
    />
    <Circle cx="32" cy="32" r="8" fill="#EEE8D5" />
  </Svg>
);

type RootStackParamList = {
  explore: undefined;
};

const messages = ["You're early.", "You're late.", "You're here."];

export default function HomePage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [index, setIndex] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (canProceed) return;

    const fadeIn = () =>
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();

    const fadeOut = (onComplete: () => void) =>
      Animated.timing(opacity, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(onComplete);

    fadeIn();

    const interval = setInterval(() => {
      fadeOut(() => {
        const next = (index + 1) % messages.length;
        setIndex(next);
        fadeIn();

        if (next === 2) setCanProceed(true);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [index, opacity, canProceed]);

  const handleTap = () => {
    if (canProceed) {
      navigation.navigate('explore');
    }
  };

  return (
    <Pressable onPress={handleTap} style={styles.container}>
      <Text style={styles.meta}>Rank: F-Rank   |   Streak: Guest #452</Text>

      <Animated.Text style={[styles.title, { opacity }]}>
        {messages[index]}
      </Animated.Text>

      <View style={styles.section}>
        <Text style={styles.heading}>Quote of the Day</Text>
        <Text style={styles.quote}>“You only find what you&apos;re willing to lose.”</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Today’s Bounty</Text>
        <Text style={styles.bounty}>☐ Leave a note for a stranger</Text>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Mark as Complete</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Leave an Echo</Text>
        <TextInput
          style={styles.input}
          placeholder="Something you want to say..."
          placeholderTextColor="#666"
          multiline
        />
      </View>

      <View style={styles.eyeContainer}>
        <EyeIcon />
        <Text style={styles.tagline}>IT’S YOU</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 24,
    justifyContent: 'flex-start',
  },
  meta: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: '#EEE8D5',
    fontFamily: 'Georgia',
    textAlign: 'center',
    marginBottom: 40,
  },
  heading: {
    color: '#EEE8D5',
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Georgia',
  },
  quote: {
    color: '#ccc',
    fontSize: 18,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 32,
  },
  bounty: {
    color: '#bbb',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#EEE8D5',
    fontWeight: '600',
  },
  input: {
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    color: '#EEE8D5',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  eyeContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  tagline: {
    fontSize: 16,
    color: '#EEE8D5',
    marginTop: 8,
    letterSpacing: 1.5,
  },
});
