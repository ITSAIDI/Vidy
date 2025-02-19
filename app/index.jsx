import {Text,ScrollView,View,Image} from 'react-native'
import React from 'react'
import {router,Redirect} from 'expo-router'
import Images from './images'
import CustomButton from '../components/CustomButton'
import { useGlobaContext } from '../context/GlobalProvider'

export default function RoutLayout() {
  const {isLoggedIn,isLoading} = useGlobaContext();

  if (isLoggedIn) return <Redirect  href = "/Home" />;

  return (
    <View className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}> 
        <View className="flex flex-col items-center h-full">
          <Image 
          className = "w-28 h-28 mt-10"
          source = {Images.logo} 
          resizeMode='contain' />

          <Image 
          className = "w-[380px] h-[300px]"
          source={Images.cards} 
          resizeMode='contain' />
          <Text className="text-white text-center text-2xl m-2 font-pregular">
            The Discover the AI artistics with
            <Text className="text-secondary-100 font-pbold"> Vidy</Text>
          </Text>
          <Image
          source={Images.path}
          className="w-[136px] h-[15px] absolute bottom-[240px] right-20"
          resizeMode='contain'
          >
          </Image>

          <CustomButton
          title={"Continue with email"}
          handlePress={() => router.push('/SignIn')}
          Styles={"m-3 w-[60%]"}
          isLoading={false}
          >
          
          </CustomButton>
   
        </View>
      </ScrollView>
    </View>
  )
}

