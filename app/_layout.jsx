import {Stack, SplashScreen} from 'expo-router'
import {useFonts} from 'expo-font';
import { useEffect } from 'react';
import { GlobalProvider } from '../context/GlobalProvider';
import { StatusBar } from 'expo-status-bar';


SplashScreen.preventAutoHideAsync(); // prevents the splash screen from hiding automatically before the fonts are loaded.

export default function App_layout()
{
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });
  
  useEffect(
  ()=> {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync(); // hides the splash screen after the fonts are loaded.
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null; // Shows a Blank screen if the fonts are not loaded.
// We Wrap all the scrrens within the GlobalProvider, so all of them have access to the values of the GlobalContext.

  return (
      <GlobalProvider>
        <Stack>
          <Stack.Screen 
          name="index" // The name of the file to be rendered.
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: false, // This important for iOS phones for Android it is not needed.
            }}
            />
            <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
            />
            <Stack.Screen
            name="search/[query]"
            options={{
              headerShown: false,
            }}
            />
        
        </Stack>
        <StatusBar backgroundColor='#161622' style="light" />
      </GlobalProvider>
  );
}

