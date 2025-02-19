import { View, Text,Image } from 'react-native'
import React from 'react'
import images from "../app/images"
import CustomButton from './CustomButton'
import {router} from 'expo-router'


export default function EmptyState({title,subtitle}) {
  return (
    <View className = "items-center">
      <Image
      className = "w-[270px] h-[215px]"
      resizeMethod='contain'
      source = {images.empty}
      ></Image>
      <Text className = "text-white text-lg font-pbold mt-2">{title}</Text>
      <Text className = "text-white text-sm font-pregular">{subtitle}</Text>
      <CustomButton
      title = "Create a video"
      Styles={"w-[300px] mt-5"}
      handlePress={() => {router.push("/Create")}}
      />
    </View>
  )
}