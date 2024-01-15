import { Handler } from "@/types";
import { NextResponse } from "next/server";
import fs from "fs/promises";

export const GET: Handler<"slug"> = async (req, { params }) => {
  try {
    const file = await fs.readFile(`sent_emails/${params.slug}.html`, "utf-8");
    return new NextResponse(file, { headers: { "content-type": "text/html" } });
  } catch (err: any) {
    if (err.errno === -2) {
      return new NextResponse("Email not found; this shouldn't happen! Please contact us at contact@unusann.us.", {
        status: 404,
      });
    } else {
      return new NextResponse(err.code ?? "", { status: 500 });
    }
  }
};
