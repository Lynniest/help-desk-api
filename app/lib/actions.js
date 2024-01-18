"use server"

export const addNewUser = async (formData) => {
    try {
        const {firstName, lastName, username, email, password, phoneNo, userType} = Object.fromEntries(formData.entries());
        // const newUser = await axios.post(`${process.env.HOST_URL}/api/users`, {firstName, lastName, username, email, password, phoneNo, userType});
        const response = await fetch(`${process.env.HOST_URL}/api/departments`);
        // console.log(await response.json())
    } catch (error) {
        // console.log(error)
        throw new Error(error);
    }
}