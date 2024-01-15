import { TokenItem, TokensFile } from "@/types";
import fs from "fs/promises";
import { existsSync } from "fs";

let tokens: TokensFile = [];

export default tokens;

const writeTokens = async () => {
  await fs.writeFile("tokens.json", JSON.stringify(tokens));
};

const readTokens = async () => {
  tokens = JSON.parse(await fs.readFile("tokens.json", "utf-8"));
};

export const getTokens = async () => {
  await readTokens();
  return tokens;
};

export const addToken = async (token: string, expiration: number) => {
  tokens.push({ token, expiration });
  await writeTokens();
};

export const removeToken = async (token: string | number) => {
  let index: number;

  const tokens = await getTokens();

  if (typeof token === "string") {
    index = tokens.findIndex((value) => {
      return value.token === token;
    });
  } else if (typeof token === "number") {
    index = token;
  } else {
    throw new Error("Please provide a token or an index");
  }

  if (index === -1) {
    throw new Error("Token not found!");
  }

  await writeTokens();
};

export const editToken = async (token: string | number, value: Partial<TokenItem>) => {
  let index: number;

  if (typeof token === "string") {
    index = tokens.findIndex((value) => value.token === token);
  } else if (typeof token === "number") {
    index = token;
  } else {
    throw new Error("Please provide a token or an index");
  }

  if (index === -1) {
    throw new Error("Token not found!");
  }

  tokens[index] = {
    ...tokens[index],
    ...value,
  };

  await writeTokens();
};

export const checkTokens = async () => {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (Date.now() >= token.expiration) {
      await removeToken(i);
    }
  }
};

export const loadTokens = async () => {
  if (existsSync("tokens.json")) {
    await readTokens();
    await checkTokens();
  } else {
    tokens = [];
    await writeTokens();
  }
};

loadTokens();

setInterval(() => {
  loadTokens();
}, 8.64e7);
