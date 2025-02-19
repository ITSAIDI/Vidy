import { Account,Client,ID,Avatars,Databases,Query,Storage } from 'react-native-appwrite';

export const appwriteConfig ={
    endpoint: "https://cloud.appwrite.io/v1",
    platform : "com.namo.aora",
    projectId : "67a5326b00070ecbf827",
    databaseId :"67a53ad7000d124a4d30",
    usersCollectionId : "67a53b98001d45938c11",
    videosCollectionId : "67a53bd300095afb8618",
    bucketId : "67a542460025a7440f03",
}


// Init your React Native SDK (The Client is our App)
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export async function  CreateUser(username_,email_,password_)
{
   try {
    // Authenticate of the new user
    const newAccount = await account.create(ID.unique(),email_,password_,username_);
    if(!newAccount) throw Error;
    const avatarURL =  avatars.getInitials(username_);

    // Add the New User the Database
    const NewUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        ID.unique(),
        {
            username:username_,
            email:email_,
            accountId : newAccount.$id, // $id is just a convention used by Appwrite to denote an object's unique identifier.
            avatar : avatarURL,

        }
    );
    return NewUser;
   } 
   catch (error) {
    console.log(error);
    throw new Error(error);
   }
}

export async function LogIn(email,password)
{
    try {
        // Create a New Session for the User
        const NewSession = account.createEmailPasswordSession(email,password);
        if(!NewSession) throw Error;
        return NewSession;
        
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function GetCurrentUser()
{
try {
    
    // Get the User Account
    const CurrentAccount = await account.get(); // Get the current logged in user account
    if(!CurrentAccount) throw new Error("No Account Found");
    //console.log(CurrentAccount);
    // Get the User Informations from the Database
    const results = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
       [Query.equal('accountId',CurrentAccount.$id)]
    )

    if (results.total === 0) throw new Error("No User Found");
    const CurrentUser = results.documents[0];
    //console.log("length",CurrentUser);
    return CurrentUser;
    
} catch (error) {
    console.log(error.message);
    return null;
}
}

export async function GetVideos()
{
    try {
        const videos = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.orderDesc('$createdAt')]
        )
    
        if (videos.total === 0) throw new Error("No Videos Found");
        //console.log("videos found",videos);
        return videos.documents;
    } catch (error) {
        console.log(error.message);
        
    }

}

export async function GetLatestVideos()
{
    try {
        const videos = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.orderDesc('$createdAt'),Query.limit(3)]
        )
    
        if (videos.total === 0) throw new Error("No Videos Found");
        //console.log("videos found",videos);
        return videos.documents;
    } catch (error) {
        console.log(error.message);
        
    }

}

export async function searchVideos(query)
{
    try {
        const videos = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.search('title',query)]
        )
        
        return videos.documents
    } catch (error) {
        console.log(error.message);
    }
}

export async function getVideosUser(userId)
{
    try {
        const videos = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.equal('user',userId),Query.orderDesc('$createdAt')]
        )

        if (videos.total === 0) throw new Error("No Videos Found");
        //console.log("videos found",videos);
        return videos.documents;
        
    } catch (error) {
        console.log(error.message);
    }
   
}

export async function SignOut()
{
    try {
        const session = await account.deleteSession('current');
        if(!session) throw Error;
        return session;
        
    } catch (error) {
        
        console.log(error.message);
    }
}


export async function uploadFile(file,type) // Push to appwrite Storage
{
    if(file)
    {
        const {mimeType,...rest} = file;
        const asset = {type:mimeType,...rest};
        try {
            const uploadedFile = await storage.createFile(appwriteConfig.bucketId,ID.unique(),asset);
            let fileUrl;
            if (type === 'video')
            {
                fileUrl = storage.getFileView(appwriteConfig.bucketId,uploadedFile.$id);
            }
            else if (type === 'image')
            {
                fileUrl = storage.getFilePreview(appwriteConfig.bucketId,uploadedFile.$id,
                    2000, // Resize width to 2000px
                    2000, // Resize height to 2000px
                    'top', //Crops the image from the top to center.
                    100    // full Image quality in percents.
                );
            }
            else 
            {
                throw new Error("Invalid File Type");
            }
            if (!fileUrl) throw new Error("No File Url Found");

            return fileUrl;
            
        } catch (error) {
            throw new Error(error.message);
        }
    }
    return null;
}

export async function createVideo(form)
{
    try {
        const [thumbnailUrl,videoUrl] = await Promise.all([
            uploadFile(form.thumbnail,'image'),
            uploadFile(form.video,'video'),
        ]);

        const newVideo = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            ID.unique(),
            {
                title:form.title,
                thumbnail:thumbnailUrl,
                video:videoUrl,
                prompt:form.prompt,
                user:form.userId
            }
        )
        return newVideo;
        
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function SaveLike(videoId,userId)
{
    try {
        // get the video data 
        const video = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            videoId
        )
        
        const updatedLikes = [...video.Likes, userId];

        const result1 = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            videoId,
            {
                Likes :updatedLikes
            }
        )

        const Userdata = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            userId
        )
        
        const LikedVides = [...Userdata.LikedVideos,videoId];

        const result2 = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            userId,
            {
                LikedVideos :LikedVides
            }
        )
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function RemoveLike(videoId,userId)
{
    try {
        // get the video data 
        const video = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            videoId
        )
        
        const updatedLikes = [...video.Likes.filter(id => id !== userId)];

        const result = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            videoId,
            {
                Likes :updatedLikes
            }
        )

        // get the user data 
        const Userdata = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            userId
        )

        const LikedVides = Userdata.LikedVideos.filter(id => id !== videoId);

        const result2 = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            userId,
            {
                LikedVideos :LikedVides
            }
        )
        
    } catch (error) {
        throw new Error(error.message);
    }
}
export async function isLiked(videoId,userId)
{
    try {
        // get the video data 
        const video = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            videoId
        )
        
        const liked = video.Likes.includes(userId);
        //console.log("liked appwrite",liked);
        return liked;
        
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getLikedVideos(userId)
{
    try {
        // get the user data 
        const Userdata = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            userId
        )
        
        const likedVideos = Userdata.LikedVideos; // The video Ids
        //console.log("liked appwrite",liked);
        try {
            const videos = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.videosCollectionId,
                [Query.equal("$id", likedVideos),Query.orderDesc('$createdAt')]
            )
        
            if (videos.total === 0) throw new Error("No Videos Found");
            //console.log("videos found",videos);
            return videos.documents;
        } catch (error) {
            console.log(error.message);
            
        }
    
        
    } catch (error) {
        throw new Error(error.message);
    }
}