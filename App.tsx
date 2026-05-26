import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppStateProvider, useAppState } from './src/context/AppStateContext';
import { ExchangeProvider } from './src/context/ExchangeContext';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ProfileOnboardingScreen from './src/screens/ProfileOnboardingScreen';
import ProfileCreatedScreen from './src/screens/ProfileCreatedScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import OperationFlowScreen from './src/screens/OperationFlowScreen';
import ReceiptSentScreen from './src/screens/ReceiptSentScreen';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { route } = useAppState();

  switch (route) {
    case 'login':
      return <LoginScreen />
    case 'onboarding':
      return <ProfileOnboardingScreen />
    case 'profileCreated':
      return <ProfileCreatedScreen />
    case 'dashboard':
      return <DashboardScreen />
    case 'operationFlow':
      return <OperationFlowScreen />
    case 'receiptSent':
      return <ReceiptSentScreen />
    default:
      return <WelcomeScreen />
  }
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_300Light: require('@expo-google-fonts/montserrat').Montserrat_300Light,
    Montserrat_400Regular: require('@expo-google-fonts/montserrat').Montserrat_400Regular,
    Montserrat_500Medium: require('@expo-google-fonts/montserrat').Montserrat_500Medium,
    Montserrat_600SemiBold: require('@expo-google-fonts/montserrat').Montserrat_600SemiBold,
    Montserrat_700Bold: require('@expo-google-fonts/montserrat').Montserrat_700Bold,
    Montserrat_900Black: require('@expo-google-fonts/montserrat').Montserrat_900Black,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <AppStateProvider>
      <ExchangeProvider>
        <SafeAreaProvider>
          <SafeAreaView className="flex-1 bg-kambista-appBg">
            <StatusBar style="dark" />
            <AppContent />
          </SafeAreaView>
        </SafeAreaProvider>
      </ExchangeProvider>
    </AppStateProvider>
  );
}