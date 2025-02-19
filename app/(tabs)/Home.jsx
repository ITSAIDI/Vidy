import { View, Text ,FlatList,RefreshControl,Alert} from 'react-native'
import {useState,useEffect} from 'react'
import { useGlobaContext } from '../../context/GlobalProvider'
import SearchInputField from '../../components/SearchInputField'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { GetVideos,GetLatestVideos } from '../../lib/Appwrite'
import VideoCard from '../../components/VideoCard'

// We remove ScrollView and let FlatList handle the scrolling.
// 2h:52 min
const Home = () => {
  const {User} = useGlobaContext();
  const [refreshing, setRefreshing] = useState(false);
  const [videos, setVideos] = useState([]);
  const [latestVideos, setLatestVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
    
  //console.log("Usersdc",User);
  

  async function getVideos() {
    try {
      setIsLoading(true);
      const videos = await GetVideos();
      //console.log("videos 1",videos[1]);
      setVideos(videos);
    } catch (error) {
      Alert.alert("Error",error.message);
    }
    finally{
      setIsLoading(false);
    }
  }
  async function getLatestVideos() {
    try {
      setIsLoading(true);
      const videos = await GetLatestVideos();
      //console.log("latest videos :",videos.length);
      setLatestVideos(videos);
    } catch (error) {
      Alert.alert("Error",error.message);
    }
    finally{
      setIsLoading(false);
    }
  }

  useEffect(() =>{getVideos();getLatestVideos();},[])
  
  async function handleRefresh() {
   setRefreshing(true);
   // Call your API here --> see if any new videos appeared
   await getVideos();
   setRefreshing(false);
   console.log("Refreshed");
  }


  return (
    <View className="bg-primary h-full w-full">
      <FlatList
      data={videos} // List of Items 
      //data={[]} 
      keyExtractor={(item) => item.$id} // Unique Key for each Item
      renderItem={({item}) => <VideoCard Post = {item} Route = "Home" />} // Renders each Item
      // The Header of the List
      ListHeaderComponent={()=>
       <View className = "space-y-2 ml-3 mt-3">
          {/*Welcome Message */}
            <Text className = "text-white text-lg font-pmedium">
            Welocome to Vidy</Text>
            
            <Text className = "text-white text-3xl font-pbold">{User.username}</Text>
            

          {/* Search Input Field */}
            <SearchInputField
            />

          {/* Latest added videos to Vidy (Horizantal Scroling) */} 
            <View className = "mt-10 ml-3 space-y-2">
            <Trending posts = {latestVideos}/>
            </View>
            
            
       </View>
      }
     
      //Programme what will be rendered if the list is empty
      ListEmptyComponent={()=>
        <View>
          <EmptyState
          title={"No Videos Found"}
          subtitle={"Be the first one to upload a video !"}
          />
        </View>
      }
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />

    </View>
  )
}

export default Home