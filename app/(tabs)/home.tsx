import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View
} from 'react-native';

// const EyeIcon = ({ width = 64, height = 64 }) => (
//   <Svg width={width} height={height} viewBox="0 0 64 64" fill="none">
//     <Path
//       d="M32 14C17 14 5.5 32 5.5 32C5.5 32 17 50 32 50C47 50 58.5 32 58.5 32C58.5 32 47 14 32 14Z"
//       stroke="#EEE8D5"
//       strokeWidth="3"
//     />
//     <Circle cx="32" cy="32" r="8" fill="#EEE8D5" />
//   </Svg>
// );

// const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function HomePage() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [quote, setQuote] = useState('Loading...');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('http://localhost:3000/quotes');
        const data = await response.json();
        setQuote(`"${data.content}"`);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []);

  // const parallaxTranslate = scrollY.interpolate({
  //   inputRange: [0, 200],
  //   outputRange: [0, -60],
  //   extrapolate: 'clamp',
  // });

  // const parallaxOpacity = scrollY.interpolate({
  //   inputRange: [0, 120],
  //   outputRange: [1, 0.3],
  //   extrapolate: 'clamp',
  // });

  return (
    <View style={styles.container}>
      {/* <Animated.View
        style={[
          styles.parallaxHeader,
          {
            transform: [{ translateY: parallaxTranslate }],
            opacity: parallaxOpacity,
          },
        ]}
      >
        <Text style={styles.meta}>
          Rank: F-Rank   |   Identity: Guest #452
        </Text>
      </Animated.View> */}
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 0 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <View style={styles.section}>
          <Text style={styles.heading}>Quote of the Day</Text>
          <Text style={styles.quote}>{quote}</Text>
        </View>

        {/* <View style={styles.section}>
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
        </View> */}

        {/* <View style={styles.eyeContainer}>
          <EyeIcon />
          <Text style={styles.tagline}>IT’S YOU</Text>
        </View> */}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 24,
  },
  parallaxHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
    paddingTop: 24,
    paddingBottom: 12,
  },
  meta: {
    color: '#aaa',
    fontSize: 14,
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
