

// async function fun(){
//     try {
//           const response = await fetch(`${host}/api/login`, {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//           "Authorization": "Bearer admintoken7841012310",},
//     body: JSON.stringify({userCred: "admin00", password: "11111111"})

//   }
//   ); 
//     const data = await response.json()
//     console.log(data)
//     } catch (error) {
//         console.log(error)
//     }
// }
// fun();
const  host = "https://help-desk-api-drab.vercel.app"
const localhost = "http://localhost:3000"
async function fun1(){
    try {
          const response = await fetch(`${host}/api/users`, {
    method: "GET",
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer admintoken7841012310",},

  }
  
  ); 
  if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
    const data = await response.json()
    console.log(data)
    } catch (error) {
        console.log(error)
    }
}
fun1();