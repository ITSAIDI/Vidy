import { View, Text, ScrollView,Image,Alert } from 'react-native'
import {useState } from 'react'
import Images from '../images'
import CustomInputField from '../../components/CustomInputField'
import CustomButton from '../../components/CustomButton'
import {Link,router} from 'expo-router'
import { LogIn,GetCurrentUser } from '../../lib/Appwrite'
import { useGlobaContext } from '../../context/GlobalProvider'


export default function SignIn() {

  const {setUser,setIsLoggedIn} = useGlobaContext();
  const [Email,setEmail] = useState("")
  const [Password,setPassword] = useState("")
  
  async function handleSignIn() {
    if (Email && Password)
    {
      try {
        await LogIn(Email,Password);
        
        // Set the User to the Global Context
        const currentUser = await GetCurrentUser();
        setUser(currentUser);
        setIsLoggedIn(true);

        router.replace("/Home");
        console.log("SignIn Success");
      } catch (error) {
        Alert.alert("Error",error.message); 
      }
    }
    else
   {
    Alert.alert("Error","Please fill all the fields");
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
        >Log In to Vidy</Text>

        <View className = "flex mt-5">
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
        title = {"Sign In"}
        isLoading={false}
        Styles={"m-3 w-[200px]"}
        handlePress={handleSignIn}
        >
        </CustomButton>
        <Text className="text-gray-100 mt-5 text-sm font-pregular">
          Don't have an account ?
          <Link href = "/SignUp" className='text-secondary font-psemibold text-[16px]'> Sign Up</Link>
        </Text>
       

      </View>
      
    </ScrollView>
  )
}