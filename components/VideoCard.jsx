import { View, Text,Image,TouchableOpacity } from 'react-native'
import { useState,useEffect } from 'react'
import icons from '../app/icons'
import { ResizeMode, Video } from "expo-av";
import { SaveLike,RemoveLike,isLiked } from '../lib/Appwrite';
import { useGlobaContext } from '../context/GlobalProvider';

export default function VideoCard({Post,Route}) {
    const [IsPlaying, setIsPlaying] = useState(false);
    const [Liked,setLiked] = useState(false);
    const {User} = useGlobaContext();


  useEffect(()=>{

    async function fetchLikedStatus()
    {
      const result = await isLiked(Post.$id,User.$id);
      setLiked(result);
    }
   
    fetchLikedStatus();

  },[])

  async function handlePress()
  {
     //console.log("Post Saved");
     //console.log("Post",Post);
     setLiked(!Liked);
     if(!Liked)
     {
      await SaveLike(Post.$id,User.$id);
      console.log("Liked");
     }
     else{
      // Remove the Like
      await RemoveLike(Post.$id,User.$id);
      console.log("Unliked");
     }
  }

  

  return (
    <View className= "flex flex-col space-y-2 mt-5 ml-5 mr-5">
        <View className = "flex flex-row items-center">
          {
            (Route === 'Home') &&
          
          <TouchableOpacity 
              onPress={handlePress}
              className = "h-8 w-8"
              >
                {
                  Liked ? 
                (
                  <Image 
                  source = {icons.bookmark_golden}
                  className = "w-7 h-7"
                  resizeMode='contain'
                  />
                )
                :
                ( 
                  <Image 
                  source = {icons.bookmark}
                  className = "w-5 h-5"
                  resizeMode='contain'
                  />
                )
                }
                
          </TouchableOpacity>
          }
            <Image 
            source = {{uri : Post.user.avatar}} 
            className = "w-10 h-10 rounded-md"/>
            <View className = "flex flex-col">    
                <Text className = "text-white font-pmedium text-[15px] ml-2 mr-2" numberOfLines={1}>{Post.title}</Text>
                <Text className = "text-white font-pregular text-[12px] ml-2 " numberOfLines={1}>{Post.user.username}</Text>
            </View>
           
        </View> 
        
        {
            IsPlaying ? (
              <Video
                source={{ uri: Post.video }}
                className="w-[320px] h-[170px] mt-3"
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={(status) => {
                  if (status.didJustFinish) {
                    setIsPlaying(false);
                  }
                }}
              />
            )
            :
            (
                <TouchableOpacity 
                activeOpacity={0.7}
                onPress={() => setIsPlaying(true)}
                className= "border-2 border-black-100 rounded-md overflow-hidden items-center justify-center">
                <Image 
                    source={{uri:Post.thumbnail}}
                    className="w-[320px] h-[170px]"
                    resizeMode='cover'
                    />
                <Image 
                    source={icons.play}
                    className="w-10 h-10 absolute"
                    resizeMode='contain'
                    />
                
                </TouchableOpacity>

            )
        }
     
    </View>
  )
}