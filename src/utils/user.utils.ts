import bcrypt = require("bcrypt");

export async function encryptPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}
