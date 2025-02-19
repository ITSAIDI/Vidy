import { View, Text,ScrollView,TouchableOpacity,Image, Alert } from 'react-native'
import {useState} from 'react'
import CustomInputField from '../../components/CustomInputField';
import CustomButton from '../../components/CustomButton';
import { Video,ResizeMode } from 'expo-av';
import icons from '../icons';
import * as DocumentPicker from 'expo-document-picker';
import {router} from 'expo-router';
import { createVideo } from '../../lib/Appwrite'
import { useGlobaContext } from '../../context/GlobalProvider'


export default function Create() {
 
  const {User} = useGlobaContext();
  const [uploading,setUploading] = useState(false);
  const [form,setForm] = useState({
    title:'',
    thumbnail:null,
    video:null,
    prompt:'',
  });

 async function openPicker(selectedType)
 {
  const result = await DocumentPicker.getDocumentAsync(
    {
      type : selectedType === 'image' ? ['image/png','image/jpg','image/jpeg'] : ['video/mp4','video/gif'],
    }
  )
  if(!result.canceled)
  {
    if(selectedType === 'image')
    {
     setForm({...form,thumbnail:result.assets[0]});
    }
    else
    {
      setForm({...form,video:result.assets[0]});
    }
  }
  else
  {
   selectedType === 'image'? Alert.alert("Warning","Please Upload a Thumbnail"): Alert.alert("Warning","Please Upload a Video");
  }
 }

  async function handleSubmit()
  {
    //console.log("form",JSON.stringify(form,null,2));
    if(form.title && form.thumbnail && form.video && form.prompt)
    {
      setUploading(true);
      try {
        
        const result = await createVideo({userId : User.$id,...form});
        Alert.alert("Success","Video Uploaded Successfully");
        router.replace('/Home');
      } 
      catch (error) {
        Alert.alert("Error",error.message);
      }
      finally
      {
        setForm({
          title:'',
          thumbnail:null,
          video:null,
          prompt:'',

        })
        setUploading(false);

      }
      
    }
    else
    {
      Alert.alert("Error","Please fill all the fields");
    }
  }
  //console.log("form",form);
  return (
    <View className = "bg-primary h-full w-full">
      <ScrollView className = "p-4">
        <Text className = "text-white text-xl font-psemibold">Add a Video to Vidy</Text>

        {/* Title */}
        <Text className = "text-sm text-gray-100 font-pmedium mt-3">Title of the video</Text>
        <CustomInputField 
         placeholderText={"choose a fancy and attracted title !"}
         Value={form.title}
         SetValue={(text) => setForm({...form,title:text})}
        />
        {/* Video */}
        <View>
          <Text className = "text-sm text-gray-100 font-pmedium mt-3 mb-3">Upload a Video</Text>
          <TouchableOpacity
          onPress={()=>openPicker("video")}
          >
            {
              form.video ?
              (<Video 
                source = {{uri : form.video.uri}}
                className = "w-full h-64 rounded-xl"   
                resizeMode={ResizeMode.CONTAIN}
                
              />)
              :
              (
              <View className = "w-full h-40 bg-black-100 rounded-xl justify-center items-center mt-3">
                 <View className = "w-14 h-14 border-[1px] border-dashed border-secondary-100 items-center justify-center">
                  <Image 
                  source = {icons.upload}
                  className = "w-9 h-9"
                  resizeMode='contain'
                  />
                 </View>
              </View>
              )
            }
          </TouchableOpacity>
        </View>

        {/* Thumbnail */}
        <View className = "mt-3">
           <Text className = "text-sm text-gray-100 font-pmedium mb-3">Upload a thumbnail</Text>
           <TouchableOpacity
            onPress={()=>openPicker("image")}
            >
            {
              form.thumbnail ?
              (<Image 
              source = {{uri : form.thumbnail.uri}}
              className = "w-full h-64 rounded-xl"
              resizeMode='contain'
                
              />)
              :
              (
                 <View className = "w-full h-16 bg-black-100 border-[1px] border-dashed border-secondary-100 items-center justify-center mt-3 p-5">
                  <Image 
                  source = {icons.upload}
                  className = "w-9 h-9"
                  resizeMode='contain'
                  />
                  <Text className = "text-gray-400 font-pregular text-[12px]">Choose a file</Text>
                 </View>

              )
            }
          </TouchableOpacity>
        </View>

        {/* Prompt */}
        <Text className = "text-sm text-gray-100 font-pmedium mt-3">Prompt </Text>
        <CustomInputField 
        
         placeholderText={"AI prompt used to generate the video"}
         Value={form.prompt}
         SetValue={(text) => setForm({...form,prompt:text})}
        />

        {/* Submit */}
        <View className = "items-center mt-3 mb-12">
            <CustomButton
            title={"Submit & Publish"}
            handlePress={handleSubmit}
            Styles={"w-[200px]"}
            isLoading={uploading}
            />
        </View>

      </ScrollView>
     
    </View>
  )
}