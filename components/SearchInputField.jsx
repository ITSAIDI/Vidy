import { View, TextInput,TouchableOpacity,Image,Alert } from 'react-native'
import {useState} from 'react'
import icons from '../app/icons'
import { usePathname,router } from 'expo-router'


export default function SearchInputField({initialQuery}) {

    const currentRoute = usePathname(); // RN hook that returns the current route. "/home", "/search/query"...
    const [query, setQuery] = useState(initialQuery);
    //console.log("currentRoute",currentRoute);
    
    function handlePress(){
      if(!query){
        Alert.alert("Error","Please enter a query to search");
      }
      else {
        if (currentRoute.startsWith("/search")){
          router.setParams({query}); // The User already in the search page, so we update the query.
        }
        else{
          router.push(`/search/${query}`); // The User is not in the search page, so he is  redirected to the search.
        }

      }
    }
  return (
    <View className = "flex flex-row items-center p-2 justify-center">
      <TextInput
      value= {query}
      className="text-white font-psemibold rounded-xl border-2 border-black-200 h-14  focus:border-secondary-200 bg-black-100 w-full px-3"
      placeholder= {"Search for a video"}
      placeholderTextColor = "#fff"
    
      onChangeText={(text) => setQuery(text)}
      >
      </TextInput>

      <TouchableOpacity 
      className="absolute right-3 h-10 w-12 items-center justify-center rounded-xl"
      onPress={handlePress}
      >
      <Image
      source = {icons.search}
      resizeMode = 'contain'
      className = "w-6 h-6"
      />
      </TouchableOpacity>

    
    </View>
  )
}