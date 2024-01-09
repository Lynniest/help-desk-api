"use server"

import axios from 'axios';

export const addNewUser = async (formData) => {
    try {
        const {firstName, lastName, username, email, password, phoneNo, userType} = Object.fromEntries(formData.entries());
        const newUser = await axios.post(`${process.env.HOST_URL}/api/users`, {firstName, lastName, username, email, password, phoneNo, userType});
    } catch (error) {
        // console.log(error)
        throw new Error(error);
    }
}