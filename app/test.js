const url = 'https://help-desk-api-drab.vercel.app/api/users';
const headers = {
    'Authorization': 'Bearer 15e6412e5533f0718fd8',
    // 'Accept': 'application/vnd.github.v3+json'
};

fetch(url, {
    method: 'GET',
    headers: headers
})
    .then(response => response.json())
    .then(data => {
        // Process the response data here
        console.log(data);
    })
    .catch(error => {
        // Handle any errors here
        console.error(error);
    });


export async function scheduleTokenUpdates(userId) {
    await updateUserToken(userId);
    cron.schedule('0 0 * * *', async () => {
  try {
    await updateUserToken(userId);
  } catch (err) {
    console.error('Error updating user token:', err);
  }
});
//   cron.schedule('* * * * *', () => {
//     updateUserToken(userId);
//   });
  console.log('Token update scheduled');
}