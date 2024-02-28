"use client";
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';
import audioClip from "./noti.mp3";
import useSound from 'use-sound';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  const [play, { stop }] = useSound(audioClip);
  const [pastMessages, setPastMessages] = useState([]);
  const {username, recipient} = useParams();
  const auth =  {
    token: "f54ff29956e8cec23d27ee71d4c8a749:967952a8aefa46a93d65",
    sessionId: "faeeawf",
    username,
    connectTo: recipient
  }
  const socket = io('http://192.168.11.199:5000',{
    auth,
});

    const handleNewMessage = (data) => {
      setPastMessages(prevMsgs=>[...prevMsgs, data])

      };

    
    useEffect(() => {

      socket.emit("requestPastMsgs");
      socket.on("fetchPastMsgs", (data)=>{
      setPastMessages(data);
      });
      // Clean up the effect
      return(() => {socket.off("fetchPastMsgs")});
    }, []);

    useEffect(() => {
      socket.on(`dmResponse-${username}`, data => {
        play();
        console.log("Msg Received: ")
        setPastMessages(prevMsgs=>[...prevMsgs, data]);
      });
      return(() => {socket.off(`dmResponse-${username}`)});
    }, [pastMessages]);

    // console.log(JSON.stringify(pastMessages))

    function sendEvent(formData) {
      console.log('sending message')
      console.log(formData)
      const {message, attachment} = Object.fromEntries(formData);
      console.log("message: ", message)
      console.log("Attachment: ",attachment)
      if(message !== "" || (attachment && attachment?.name !== "")){
        console.log("Attachment: ",attachment)
        socket.emit(`privateMsg`, recipient, message, {filename: attachment.name, type: attachment.type, size: attachment.size, file: attachment});
        handleNewMessage({sender: username,recipient, message, emittedDate: new Date().toISOString(), attachment})
      }
      else{
        alert("Type Or Attatch Smth");
      }
        // console.log(pastMessages)
    }

    return (
    <div className='text-center py-10 flex flex-col justify-center px-40'>
      <div className='m-10 bg-red-400 text-white rounded-lg max-h-[500px] p-10 overflow-auto hide-scrollbar'>
        { pastMessages.map((msg, index) => {
          console.log("Attatchment: ",msg.attatchment)
          return (
            <div key={index}>
            {msg.message!== "" && msg.sender===username && <p key={index} className='flex flex-end bg-blue-200 rounded-lg p-3 mb-2 text-end '>
              {msg.emittedDate}: {msg.message}
              {msg.attatchment && <Link href={msg.attatchment}><Image className='p-10 rounded-2xl' src={msg.attatchment} alt='an Image' height={300} width={300}/></Link>}
            </p> }
            {msg.message!== "" && msg.sender===recipient && <p key={index} className='flex flex-start text-start bg-amber-200 rounded-lg p-3 mb-2'>
              {msg.emittedDate}: {msg.message}
              {msg.attatchment && <Link href={msg.attatchment}><Image className='p-10 rounded-2xl' src={msg.attatchment} alt='an Image' height={300} width={300}/></Link>}
            </p>}
            
            </div>
            )
        })} 
      </div>
       <form action={sendEvent}>
         <input type="text" name="message" placeholder='Type some text' className='border-black bg-white-100 hover:bg-white-700 text-black py-2 px-4 rounded mr-3'/>
         <input type="file" name="attachment" className='border-black bg-white-100 hover:bg-white-700 text-black py-2 px-4 rounded mr-3'/>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type='submit'>Send</button>
       </form>
    </div>
  )
}

export default Page;
