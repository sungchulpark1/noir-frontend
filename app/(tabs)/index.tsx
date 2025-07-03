import {
  Pressable
} from 'react-native';


import PresenceMessage from '../components';
import { styles } from '../styles';

// type RootStackParamList = {
//   home: undefined;
// };

export default function LandingPage() {
  // const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const canProceed = false;

  const handleTap = () => {
    // if (canProceed) {
    //   navigation.navigate('home');
    // }
  };

  return (
    <Pressable onPress={handleTap} style={styles.container} disabled={!canProceed}>
      {/* <Animated.Text style={[styles.text, { opacity: textOpacity }]}>
        {ctaMessages[ctaMessageInd]}
      </Animated.Text> */}
      <PresenceMessage />
      {/* <View style={styles.eyeContainer}>
        <EyeIcon width={64} height={64} />
        <Text style={styles.tagline}>IT’S YOU</Text>
        <Animated.Text style={[styles.hint, { opacity: hintTextOpacity }]}>
          {hintText}
        </Animated.Text>
      </View> */}
    </Pressable>
  );
}