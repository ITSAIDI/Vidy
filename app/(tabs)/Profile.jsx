import {Text, View,Image,FlatList,TouchableOpacity } from 'react-native'
import {useState,useEffect} from 'react'
import {getVideosUser,SignOut } from '../../lib/Appwrite'
import EmptyState from '../../components/EmptyState';
import VideoCard from '../../components/VideoCard';
import icons from '../icons';
import { useGlobaContext } from '../../context/GlobalProvider'
import { router } from 'expo-router';

export default function profile() {
  const {User,setUser,setIsLoggedIn} = useGlobaContext();
  const [videos, setVideos] = useState([]);
  const [NumberOfPosts, setNumberOfPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  async function fetchVideosUser() {
      try {
        setIsLoading(true);
        const results = await getVideosUser(User.$id);

        //console.log("videos of user : ",JSON.stringify(results, null, 2));
        //console.log("user : ",JSON.stringify(User,null,2));
        //console.log("Number of Viseos : ",videos.length);


        setVideos(results);
        setNumberOfPosts(results.length);

      } catch (error) {
        Alert.alert("Error",error.message);
      }
      finally{
        setIsLoading(false);
      }
    }

   async function handleLogout() {
      await SignOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace('/SignIn');
      console.log("logout");
    }
     
 useEffect(() =>{fetchVideosUser();},[User]);

 
  return (
     <View className="bg-primary h-full w-full">
        
        <FlatList
          data={videos} 
          keyExtractor={(item) => item.$id} 
          renderItem={({item}) => <VideoCard Post = {item} />} 
          // The Header of the List
          ListHeaderComponent={()=>
            <View>
               
               <View className="flex flex-col mb-5 items-center">
                    <Image 
                      source={{uri:User.avatar}}
                      className="w-14 h-14 rounded-md mt-4"
                      resizeMode='contain'
                      />
                      <Text className="text-white text-xl font-pbold mt-2">{User.username}</Text>
              
                      <View className="flex flex-row space-x-10 mt-4">
                          <View className = "flex flex-col items-center">
                          <Text className="text-white text-lg font-pbold">{NumberOfPosts}</Text>
                          <Text className="text-white text-lg font-pregular">Postes</Text>
                        </View>
              
                        <View className = "flex flex-col items-center">
                          <Text className="text-white text-lg font-pbold">1.2k</Text>
                          <Text className="text-white text-lg font-pregular">Views</Text>
                        </View>
                      </View>
              </View> 
             
              <TouchableOpacity
              className= "absolute right-2 top-2"
              onPress={handleLogout}
              >
                  <Image 
                  source={icons.logout}
                  className="w-8 h-8"
                  resizeMode='contain'
                  />
                </TouchableOpacity>  
          </View>

          }
          //Programme what will be rendered if the list is empty
          ListEmptyComponent={()=>
            <View>
              <EmptyState
              title={"No Videos Found"}
              subtitle={"Upload a video !"}
              />
            </View>
          }
      />

        
    </View>
  )
}
