import { NextRequest } from "next/server";
import { getTokens } from "@/tools/tokens";

const checkAuth = async (req: NextRequest) => {
  try {
    const tokens = await getTokens();

    const token = req.cookies.get("auth");
    let index = -1;
    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].token === token?.value) {
        index = i;
        break;
      }
    }

    return index !== -1;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export default checkAuth;
