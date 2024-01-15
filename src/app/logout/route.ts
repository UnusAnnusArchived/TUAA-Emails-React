import { removeToken } from "@/tools/tokens";
import { Handler } from "@/types";
import { NextResponse } from "next/server";

export const GET: Handler = async (req) => {
  try {
    const cookie = req.cookies.get("auth")?.value;

    await removeToken(cookie ?? "");
  } catch {}

  const res = NextResponse.redirect(new URL("/login", req.url));
  res.cookies.delete("auth");

  return res;
};
