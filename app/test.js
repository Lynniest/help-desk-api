const { PrismaClient } = require("@prisma/client");

let prisma;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

// let sessionData = {};
// const username="lynniest"
// let sentMsgs = [];
// let receivedMsgs = [];
 
// const fun = async() =>{
//       try {
//     const data = await prisma.message.findMany({
//       where: {
//         sender: {
//           username: "lynniest",
//         },
        
//       },
//       include: {
//           receiver: true,
//           sender: true,
//       }
//     });
//     // console.log(data)
//           data.forEach((msg) => {
//             if (!sessionData[username]) {
//                   sessionData[username] = {};
//                 }
//             if (msg.sender.username === username){
//                 sentMsgs.push({
//                     receiver: msg.receiver.username,
//                     message: msg.message,
//                     emittedDate: msg.emittedDate,
//                     status: msg.status,
//                 });
//                 sessionData[username].sentMsgs = sentMsgs;
//                 // console.log(sessionData[username])
//             } else {
//                 receivedMsgs.push({
//                     sender: msg.sender.username,
//                     message: msg.message,
//                     emittedDate: msg.emittedDate,
//                     status: msg.status,
//                 });
//                 sessionData[username].receivedMsgs = receivedMsgs;
//             }
//         });

//     console.log(JSON.stringify(sessionData));
    
// //   return NextResponse.json({ message: "Schedule Updated Successfully." }, {status: 200});
    
//   } catch (error) {
//     console.log(error);
//   }
// }


// fun();

const fetch = async(socket) => {

    let sessionData = {};
    let sentMsgs = [];
  let receivedMsgs = [];
  
    const username = "lynniest"
    let data = [];
    // const username = socket.handshake.auth.username;
    try {
        data = await prisma.message.findMany(
            {
                where: {
                    sender: {
                    username: username,
                    },
                },
                include: {
                    recipient: true,
                    sender: true,
                }
            });
    } catch (error) {
        console.log(error);
    }
    
    if (data.length>0){
          await data.forEach((msg) => {
            if (!sessionData[username]) {
                  sessionData[username] = {};
                }
            if (msg.sender.username === username){
                sentMsgs.push({
                    recipient: msg.recipient.username,
                    message: msg.message,
                    emittedDate: msg.emittedDate,
                    status: msg.status,
                });
                sessionData[username].sentMsgs = sentMsgs;
                // console.log(sessionData[username])
            } else {
                receivedMsgs.push({
                    sender: msg.sender.username,
                    message: msg.message,
                    emittedDate: msg.emittedDate,
                    status: msg.status,
                });
                sessionData[username].receivedMsgs = receivedMsgs;
            }
        });
        // console.log(JSON.stringify(sessionData));
        return sessionData;
    }
    else {
        return null;
    }
};

async function fetchData() {
  const h = await fetch();
  console.log(JSON.stringify(h));
}

fetchData();