import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  const styles = defaultStyles();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText style={styles.message} type="title">Screen Not Found</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go To Home Screen</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const defaultStyles = () => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  message: {
    textAlign: 'center',
  },
});
