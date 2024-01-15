"use server";

import fs from "fs/promises";
import { randomBytes, scrypt as scryptCallback } from "crypto";
import { promisify } from "util";

const scrypt = promisify(scryptCallback);

const submitLoginForm = async (password: string) => {
  try {
    const salt = randomBytes(16).toString("hex");
    const buf = (await scrypt(password, salt, 64)) as Buffer;
    await fs.writeFile("password-hash.txt", `${buf.toString("hex")}.${salt}`);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default submitLoginForm;
