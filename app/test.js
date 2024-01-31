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
 
const fun = async() =>{
      try {
    const users = await prisma.user.findMany({
      where: {
        emailVerified: false,
      },
    });
    // console.log(users)
  if(users) { 
    await Promise.all(users.map(async (user) => {
        const created_date =new Date( user.createdDate);
        console.log(created_date)
        const today = new Date();
        console.log(today)
        const diffTime = Math.abs(today - created_date);
        const diffDays = diffTime / (1000 * 60 * 60 * 24)
        console.log(diffDays)
    }));
    
}
//   return NextResponse.json({ message: "Schedule Updated Successfully." }, {status: 200});
    
  } catch (error) {
    // return NextResponse.json({ message: "Failed to schedule tokens.", details: error}, {status: 400});
  }
}

fun();