import { View, Text, ScrollView,Image,Alert } from 'react-native'
import {useState } from 'react'
import Images from '../images'
import CustomInputField from '../../components/CustomInputField'
import CustomButton from '../../components/CustomButton'
import {Link,router} from 'expo-router'
import { CreateUser } from '../../lib/Appwrite'


export default function SignUp() {


  const [Username,setUsername] = useState("");
  const [Email,setEmail] = useState("");
  const [Password,setPassword] = useState("");
  
  async function handeSignUp() {
    if (Username && Email && Password) 
    {
      try { 

      await CreateUser(Username,Email,Password);
      router.replace("/SignIn");

      console.log("SignUp Success");
      } 
      catch (error) {
        Alert.alert("Error",error.message);
        
      }

    }
    else 
    {
      Alert.alert("Error","Please fill all the fields");
      //console.log(Theuser);
    }
  }

  return (
    <ScrollView className="bg-primary h-full w-full">
      <View className="items-center mt-10">
        <Image
        source={Images.logo}
        resizeMode='contain'
        className = "w-32 h-32"
        />
        <Text
        className = "text-white text-2xl font-pbold m-0"
        >Sign Up In to Vidy</Text>

        <View className = "flex mt-5">
            <CustomInputField
              Value = {Username}
              placeholderText={"Username"}
              isPassword = {false}
              SetValue={setUsername}
            />
              <CustomInputField
              Value = {Email}
              placeholderText={"Email"}
              isPassword = {false}
              SetValue={setEmail}
            />

            <CustomInputField
              Value={Password}
              placeholderText={"Password"}
              isPassword = {true}
              SetValue={setPassword}
            />
        </View>
        <CustomButton
        title = {"Sign Up"}
        isLoading={false}
        Styles={"m-3 w-[200px]"}
        handlePress={handeSignUp}
        >
        </CustomButton>
        <Text className="text-gray-100 mt-5 text-sm font-pregular">
          Have already an account ?
          <Link href = "/SignIn" className='text-secondary font-psemibold text-[16px]'> Sign In</Link>
        </Text>
       
      </View>
      
    </ScrollView>
  )
}