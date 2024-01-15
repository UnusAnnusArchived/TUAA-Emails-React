import { Handler, TemplateModule } from "@/types";
import { render } from "@react-email/render";
import { NextResponse } from "next/server";

export const GET: Handler<"slug"> = async (req, { params: { slug } }) => {
  try {
    const Template = ((await import(`../../../../../templates/${slug}`)) as TemplateModule).default;

    const html = render(<Template />);

    return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
  } catch (err) {
    return new NextResponse("Template does not exist!", { status: 404 });
  }
};
