import { View, Text ,FlatList,Alert,SafeAreaView} from 'react-native'
import {useState,useEffect} from 'react'
import { useLocalSearchParams } from 'expo-router';
import { searchVideos } from '../../lib/Appwrite';

// Components
import SearchInputField from '../../components/SearchInputField'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'


export default function query() {
  const { query } = useLocalSearchParams();
  const [videos, setVideos] = useState([]);

  
  async function getVideosQuery() {
      try {
        const videos = await searchVideos(query);
        //console.log("videos search",videos);
        setVideos(videos);
      } catch (error) {
        Alert.alert("Error",error.message);
      }
  
    }

    useEffect(() => {getVideosQuery()},[query]);

  return (
    <SafeAreaView className="bg-primary h-full w-full"

    >
        <FlatList
        data={videos} // List of Items 
        //data={[]} 
        keyExtractor={(item) => item.$id} // Unique Key for each Item
        renderItem={({item}) => <VideoCard Post = {item} />} // Renders each Item
        // The Header of the List
        ListHeaderComponent={()=>
        <View className = "space-y-2 ml-3 mt-10">
            {/*Welcome Message */}
              <Text className = "text-white text-lg font-pmedium">Search results</Text>
              <Text className = "text-white text-3xl font-pbold">{query}</Text>

            {/* Search Input Field */}
              <SearchInputField
              initialQuery = {query}
              />

        </View>
        }
      
        //Programme what will be rendered if the list is empty
        ListEmptyComponent={()=>
          <View>
            <EmptyState
            title={"No Videos Found"}
            subtitle={"try another search above !"}
            />
          </View>
        }
        />

    </SafeAreaView>
  )
}