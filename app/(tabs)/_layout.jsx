import { View, Text,Image } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import icons from '../icons.jsx'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';


export default function tabs_layout ()
{
  return (
    <SafeAreaView className = "h-full flex flex-row">
      <Tabs
       screenOptions={{
        tabBarShowLabel: true, // Hides tab labels
        tabBarLabelStyle: 
        {
          fontSize: 10, // Sets the font size of the tab labels
          fontFamily: "Poppins-SemiBold", // Sets the font family of the tab labels
          marginTop: 3, // Sets the margin top of the tab labels
        },
        tabBarActiveTintColor: "#FF9C01", // Sets the active tab color
        tabBarInactiveTintColor: "#CDCDE0", // Sets the inactive tab color
        tabBarStyle: {
          backgroundColor: "#161622", // Sets the background color of the tab bar
          elevation: 0, // Removes shadow on Android
          borderTopWidth: 0, // Removes top border
          height: 60, // Sets the height of the tab bar
        },
      }}
      >
        <Tabs.Screen   
        name="Home" // It's the name of the file to be rendered.
        options={
          {
            
            headerShown: false, // Hides the header.
            tabBarIcon: ({color}) => (
              <Image
              source = {icons.home}
              resizeMode = "contain" // Ensures the entire image is visible within the container.
              tintColor = {color}
              className = "w-6 h-6"
              />
            )
            
          }
        }
        />
      <Tabs.Screen   
        name="Create" // The name of the file to be rendered.
        options={
          {
            
            headerShown: false, // Hides the header.
            tabBarIcon: ({color}) => (
              <Image
              source = {icons.plus}
              resizeMode = "contain" // Ensures the entire image is visible within the container.
              tintColor = {color}
              className = "w-6 h-6"
              />

            )
            
          }
        }
        />    
        <Tabs.Screen   
        name="Bookmark" 
        options={
          {
            
            headerShown: false, // Hides the header.
            tabBarIcon: ({color}) => (
              <Image
              source = {icons.bookmark}
              resizeMode = "contain" // Ensures the entire image is visible within the container.
              tintColor = {color}
              className = "w-6 h-6"
              />

            )
            
          }
        }
        />
      
      <Tabs.Screen   
        name="Profile"
        options={
          {
            
            headerShown: false, // Hides the header.
            tabBarIcon: ({color}) => (
              <Image
              source = {icons.profile}
              resizeMode = "contain" // Ensures the entire image is visible within the container.
              tintColor = {color}
              className = "w-6 h-6"
              />

            )
            
          }
        }
        />
      
      </Tabs>
    <StatusBar backgroundColor='#000' style="" />
    </SafeAreaView>
  )
}


