import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';


export default function Auth_layout() {
  return (
    <SafeAreaView className="h-full">
      <Stack
      >
        <Stack.Screen
          name="SignIn" // The name of the file that will be rendered
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SignUp"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    <StatusBar backgroundColor='#161622' style="light" />
    </SafeAreaView>
  )
}


