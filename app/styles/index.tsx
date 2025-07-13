import {
  StyleSheet,
} from 'react-native';

export const defaultStyles = () => StyleSheet.create({
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
    backgroundColor: '#000',
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

export default defaultStyles;
