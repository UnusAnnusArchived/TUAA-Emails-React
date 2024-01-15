import { Handler } from "@/types";
import { z } from "zod";
import fs from "fs";
import { NextResponse } from "next/server";
import checkAuth from "../_check-auth";
import nodemailer from "@/nodemailer";

const templates = fs
  .readdirSync("templates")
  .filter((value) => value.endsWith(".tsx") && !value.startsWith("_"))
  .map((value) => value.replace(".tsx", ""));

const Body = z.object({
  to: z.string().email(),
  template: z.union(templates.map((value) => z.literal(value)) as any),
  templateParams: z.record(z.any()).optional(),
});

export const POST: Handler = async (req) => {
  const authIsValid = await checkAuth(req);

  if (!authIsValid) return NextResponse.json({ error: "Not authorized" }, { status: 401 });

  try {
    const value = await Body.safeParseAsync(await req.json());

    if (value.success) {
      const body = value.data;

      try {
        const res = await nodemailer.sendMail(
          {
            to: body.to,
          },
          body.template,
          body.templateParams
        );

        return new NextResponse(res.response, { status: 200 });
      } catch (err: any) {
        return NextResponse.json({ error: err.toString() }, { status: 500 });
      }
    } else {
      return NextResponse.json(value.error, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: "Error parsing body." }, { status: 400 });
  }
};
