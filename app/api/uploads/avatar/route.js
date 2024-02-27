// pages/api/upload.js
import {firebaseConfig} from '../../../firebase_config';
import {NextResponse} from 'next/server';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL, getStorage  } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const suppportedExtensions = ['jpg', 'jpeg', 'png'];

export const POST = async(request)=>{

  if(!request.headers.get("Authorization") || request.headers.get("Authorization") !== "Bearer "+process.env.UPLOAD_SECRET){
    console.log("header: ", request.headers.get("Authorization"))
    return NextResponse.json({message: "Unauthorized token."}, {status: 401});
  }

  let srcUrl = "";

  const app = initializeApp(firebaseConfig);
  const storage = getStorage();

  const data= await request.formData();
  const {file} = Object.fromEntries(data);
  if (!file) {
    return NextResponse.json({message: "No file found."}, {status: 400});
  }
  if (!suppportedExtensions.includes(file.name.split('.').pop().toLowerCase())) {
    return NextResponse.json({
      message: "Unsupported file type.", 
      details: "Only jpg, jpeg and png files are supported for avatar image."}, {status: 400});
  }
  // console.log(file)
  try {
      const filePath = Date.now()+file.name;
      const storageRef = ref(storage,  `avatars/${filePath}`);
      const snapshot = await uploadBytesResumable(storageRef, file);
      console.log('Uploaded a blob or file!');
      const downloadURL = await getDownloadURL(snapshot.ref);
      srcUrl = downloadURL;
      // console.log(`File available at ${downloadURL}`);
  } catch (error) {
  console.error('Error uploading file:', error);
  return NextResponse.json({message: "Failed to upload file.", details: error}, {status: 500});
  }

  return NextResponse.json({message: "File uploaded successfully.", srcUrl}, {status: 200});

}

