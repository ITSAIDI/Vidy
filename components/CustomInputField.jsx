import { View, TextInput,TouchableOpacity,Image } from 'react-native'
import {useState} from 'react'
import icons from '../app/icons'


export default function CustomInputField({placeholderText,isPassword,Value,SetValue}) {
    function handleChange(text)
    {
        SetValue(text)
    }
    const [showPassword,setShowPassword] = useState(isPassword)
  return (
    <View>
      <TextInput
      value= {Value}
      className="rounded-xl border-2 border-secondary-100 p-3 mt-3 min-w-[300px] h-12 text-white font-psemibold  focus:border-ternary bg-black-100"
      placeholder= {placeholderText}
      placeholderTextColor="#727273"
      secureTextEntry = {showPassword} // Makes the text hidden as dots
      onChangeText={handleChange}
      >
      </TextInput>
      {
        isPassword &&
            <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-6"
            >
                <Image
                source = {showPassword ? icons.eyeHide : icons.eye}
                resizeMode = 'contain'
                 className = "w-6 h-6"
                />
        </TouchableOpacity>
      }
      
    
      
    </View>
  )
}