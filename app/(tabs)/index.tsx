import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  Text,
  View
} from 'react-native';

import { EyeIcon } from '@/components/EyeIcon';

import PresenceMessage from '../components';
import { styles } from '../styles';

type RootStackParamList = {
  home: undefined;
};

export default function LandingPage() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [ctaMessageInd, setCtaMessageInd] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  
  const hintTextOpacity = useRef(new Animated.Value(1)).current;
  const [hintText, setHintText] = useState('Loading.');

  // useEffect(() => {
  //   if (canProceed) return;

  //   const fadeHintTextOut = (onComplete: () => void) => {
  //     Animated.timing(hintTextOpacity, {
  //       toValue: 0,
  //       duration: 600,
  //       useNativeDriver: true,
  //     }).start(() => onComplete());
  //   };

  //   const fadeHintTextIn = (onComplete: () => void) => {
  //     Animated.timing(hintTextOpacity, {
  //       toValue: 1,
  //       duration: 600,
  //       useNativeDriver: true,
  //     }).start(() => onComplete());
  //   };

    // fadeTextIn();

    // const interval = setInterval(() => {
    //   fadeTextOut(() => {
    //     const next = (ctaMessageInd + 1) % ctaMessages.length;
    //     setCtaMessageInd(next);
    //     fadeTextIn();

    //     if (next === 2) {
    //       fadeHintTextOut(() => {
    //         setHintText('Tap To Continue');
    //         fadeHintTextIn(() => {
    //           setCanProceed(true);
    //         });
    //       });
    //     }
    //   });
    // }, 2000);

    //  const loadingInterval = setInterval(() => {
    //   if (canProceed) return;

    //   setHintText(prev => {
    //     if (prev === 'Tap To Continue') return prev;
        
    //     const dots = '.'.repeat((prev.match(/\./g) || []).length % 3 + 1);
    //     return 'Loading' + dots;
    //   });
    // }, 800);

    // return () => { 
      // clearInterval(interval);
  //     clearInterval(loadingInterval);
  //   };
  // }, [ctaMessageInd, textOpacity, hintTextOpacity, canProceed, setCanProceed]);

  const handleTap = () => {
    if (canProceed) {
      navigation.navigate('home');
    }
  };

  return (
    <Pressable onPress={handleTap} style={styles.container} disabled={!canProceed}>
      {/* <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
        {ctaMessages[ctaMessageInd]}
      </Animated.Text> */}
      <PresenceMessage />
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