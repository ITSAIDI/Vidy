import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

export default function CustomButton({title,handlePress,Styles,isLoading}) {
  return (
    <TouchableOpacity
    className={`bg-secondary-100 rounded-md p-2  ${Styles} ${isLoading ? 'opacity-50' : ''}`}
    onPress={handlePress}
    disabled={isLoading}
    activeOpacity={0.7}
    >
      <Text
      className="text-primary font-pbold text-center"
      >{title}</Text>
    </TouchableOpacity>
  )
}