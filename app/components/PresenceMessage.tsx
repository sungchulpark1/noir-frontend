import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

import { ThemedView } from '@/components/ThemedView';

import { FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { defaultStyles } from '../styles';

const messages = [
  "You're Early.",
  "You're Late.",
  "You're Here.",
  "You Made It.",
  "Welcome Home.",
];

const AnimatedFontAwesome5 = Animated.createAnimatedComponent(FontAwesome5);

export default function PresenceMessage() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const affSeqOpacity = useRef(new Animated.Value(0)).current;

  const houseIconOpacity = useRef(new Animated.Value(0)).current;

  const [sequenceIdx, setSequenceIdx] = useState(0);

  const [affSeqComplete, setAffSeqComplete] = useState(false);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    let isMounted = true;

    const animateOpacity = (
      opacity: Animated.Value,
      toValue: number,
      duration = 800,
    ) =>
      new Promise<void>((resolve) => {
        Animated.timing(opacity, {
          toValue,
          duration,
          useNativeDriver: true,
        }).start(() => resolve());
      });

    const showNextMessage = async () => {
      await animateOpacity(affSeqOpacity, 1);

      if (sequenceIdx === messages.length - 1) {
        setAffSeqComplete(true);
        await showHouseIcon();
        return;
      }

      await animateOpacity(affSeqOpacity, 0);

      if (isMounted) {
        setSequenceIdx((prev) => (prev + 1) % messages.length);
      }
    };

    const showHouseIcon = async () => {
      await animateOpacity(houseIconOpacity, 0.5);
    };

    showNextMessage();

    // Load fonts asynchronously

    async function loadResources() {
      try {
        await Font.loadAsync(FontAwesome5.font);
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
      }
    }

    loadResources();

    // Cleanup function to prevent memory leaks

    return () => {
      isMounted = false;
    };
  }, [sequenceIdx, affSeqOpacity, houseIconOpacity]);

  if (!fontsLoaded) {
    return null;
  }

  const styles = defaultStyles();

  return (
    <ThemedView style={styles.container} onLayout={onLayoutRootView}>
      <Animated.Text
        style={[styles.text, { opacity: affSeqOpacity }]}
      >
        {messages[sequenceIdx]}
      </Animated.Text>
      <AnimatedFontAwesome5
        style={{ opacity: houseIconOpacity }}
        name="house-user"
        size={48}
        color="white"
      />
    </ThemedView>
  );
}
