// import bcrypt, { hash } from 'bcrypt';
const bcrypt = require('bcrypt');

export async function hashPassword(plainTextPassword) {
  try {
    const saltRounds = Math.floor(Math.random() * 10) + 1;
    const hash = await bcrypt.hash(plainTextPassword, saltRounds);
    return hash;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function comparePassword(plainTextPassword, hash) {
  try {
    const match = await bcrypt.compare(plainTextPassword, hash);
    return match;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
