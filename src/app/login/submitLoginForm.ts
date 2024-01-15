"use server";

import fs from "fs/promises";
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { promisify } from "util";
import moment from "moment";
import { addToken } from "@/tools/tokens";

const scrypt = promisify(scryptCallback);

const submitLoginForm = async (suppliedPassword: string) => {
  const [storedHash, storedSalt] = (await fs.readFile("password-hash.txt", "utf-8")).split(".");
  const storedHashBuf = Buffer.from(storedHash, "hex");
  const suppliedBuf = (await scrypt(suppliedPassword, storedSalt, 64)) as Buffer;

  const isEqual = timingSafeEqual(storedHashBuf, suppliedBuf);

  if (isEqual) {
    const token = randomBytes(8).toString("hex");
    const expiration = Date.now() + 2.628e9;

    await addToken(token, expiration);

    return token;
  }

  return false;
};

export default submitLoginForm;
