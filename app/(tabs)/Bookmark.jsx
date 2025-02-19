import { View, Text ,FlatList,RefreshControl,Alert} from 'react-native'
import {useState,useEffect} from 'react'
import { useGlobaContext } from '../../context/GlobalProvider'
import { getLikedVideos } from '../../lib/Appwrite'
import VideoCard from '../../components/VideoCard'
import EmptyState from '../../components/EmptyState'

// We remove ScrollView and let FlatList handle the scrolling.
// 2h:52 min
const Bookmark = () => {
  const {User} = useGlobaContext();
  const [refreshing, setRefreshing] = useState(false);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
    
  async function fetchLikedVideos()
  {
  
    setIsLoading(true);
    const result = await getLikedVideos(User.$id);
    setVideos(result);
    setIsLoading(false);

  }
  async function handleRefresh() {
    setRefreshing(true);
    // Call your API here --> see if any new videos appeared
    await fetchLikedVideos();
    setRefreshing(false);
    console.log("Refreshed in Bookmark");
   }

   useEffect(()=>{fetchLikedVideos();},[])


  return (
    <View className="bg-primary h-full w-full">
      <FlatList
      data={videos} // List of Items 
      //data={[]} 
      keyExtractor={(item) => item.$id} // Unique Key for each Item
      renderItem={({item}) => <VideoCard Post = {item} />} // Renders each Item
      // The Header of the List
      ListHeaderComponent={()=>
       <View className = "space-y-2 ml-3 mt-3">
          {/*Welcome Message */}
            <Text className = "text-white text-lg font-pmedium">
            Saved Videos</Text>
       </View>
      }
     
      //Programme what will be rendered if the list is empty
      ListEmptyComponent={()=>
        <View>
          <EmptyState
          title={"No Videos Found"}
          subtitle={"Go to home and save some videos !"}
          />
        </View>
      }
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      />

    </View>
  )
}

export default Bookmark