import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Montserrat_300Light': require('@expo-google-fonts/montserrat').Montserrat_300Light,
    'Montserrat_400Regular': require('@expo-google-fonts/montserrat').Montserrat_400Regular,
    'Montserrat_500Medium': require('@expo-google-fonts/montserrat').Montserrat_500Medium,
    'Montserrat_600SemiBold': require('@expo-google-fonts/montserrat').Montserrat_600SemiBold,
    'Montserrat_700Bold': require('@expo-google-fonts/montserrat').Montserrat_700Bold,
    'Montserrat_900Black': require('@expo-google-fonts/montserrat').Montserrat_900Black,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View className="flex-1 bg-kambista-navy items-center justify-center">
      <Text className="text-kambista-mint text-xl font-medium" style={{ fontFamily: 'Montserrat_500Medium' }}>
        Pruebaa
      </Text>
    </View>
  );
}