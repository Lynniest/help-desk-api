const p = require("@prisma/client");
const { PrismaClient } = p;

const prisma = new PrismaClient();
const getPastMsgs = async (socket) => {
    // const username = "lynniest"
    const username = socket.handshake.auth.username;
    const otherUser = socket.handshake.auth.connectTo;
    try {
const data = await prisma.message.findMany({
  where: {
    OR: [
      {
        AND: [
          {
            sender: {
              username: username,
            },
          },
          {
            recipient: {
              username: otherUser,
            },
          },
        ],
      },
      {
        AND: [
          {
            sender: {
              username: otherUser,
            },
          },
          {
            recipient: {
              username: username,
            },
          },
        ],
      },
    ],
  },
  include: {
    recipient: true,
    sender: true,
  },
});
            // console.log(data)
        return data.map((msg) => {
            const recipient = msg.recipient.username;
            const sender = msg.sender.username;
            return (
                {
                    message: msg.message,
                    emittedDate: msg.emittedDate,
                    sender: sender,
                    recipient: recipient,
                    attatchment: msg.attatchment,
                }
            )
        })
    } catch (error) {
        console.log(error);
    }
    
};

const filterIncomingMsgs = async(socket, searchTerm) =>{
    const username = socket.handshake.auth.username;
    const otherUser = socket.handshake.auth.connectTo;
    try {
      const data = await prisma.message.findMany({
        where: {
          OR: [
            {
              AND: [
                {
                  sender: {
                    username: username,
                  },
                },
                {
                  recipient: {
                    username: otherUser,
                  },
                },
              ],
            },
            {
              AND: [
                {
                  sender: {
                    username: otherUser,
                  },
                },
                {
                  recipient: {
                    username: username,
                  },
                },
              ],
            },
          ],
        },
        include: {
          recipient: true,
          sender: true,
        },
      });
      return data.map((msg) => {
          const recipient = msg.recipient.username;
          const sender = msg.sender.username;
          return (
              {
                  message: msg.message,
                  emittedDate: msg.emittedDate,
                  sender: sender,
                  recipient: recipient,
                  attatchment: msg.attatchment,
              }
          )
       })
    } catch (error) {
      console.log(error)
    }
};

const getAllIncomingMsgs = async (socket) => {
    // const username = "lynniest"
    const username = socket.handshake.auth.username;
    try {
const data = await prisma.message.findMany({
    where: {
        recipient: {
            username: username,
        },
    },
  include: {
    recipient: true,
    sender: true,
  },
});

        return data.map((msg) => {
            const recipient = msg.recipient.username;
            const sender = msg.sender.username;
            return (
                {
                    message: msg.message,
                    emittedDate: msg.emittedDate,
                    sender: sender,
                    recipient: recipient,
                }
            )
        })
    } catch (error) {
        console.log(error);
    }
    
};


const createNewMsg = async (data) => {
    try {
        const newMsg = await prisma.message.create({
            data: {
                sender: {
                    connect: {
                        username: data.sender,
                    },
                },
                recipient: {
                    connect: {
                        username: data.recipient,
                    },
                },
                message: data.message,
                emittedDate: data.emittedTime,
                attatchment: data.attatchment,
            },
        });
        console.log("New Msg"+ newMsg)
    } catch (error) {
        console.log(error)
    }
}
module.exports = {createNewMsg, getPastMsgs, getAllIncomingMsgs, filterIncomingMsgs};

// async function fetchData() {
//   const h = await getPastMsgs("fefef");
//   console.log(JSON.stringify(h));
// }

// fetchData();