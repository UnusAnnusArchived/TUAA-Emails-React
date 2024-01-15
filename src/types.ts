import { NextRequest, NextResponse } from "next/server";
import { PlainTextExport } from "../templates/_template";

export type Layout<P = undefined> = (props: {
  children: React.ReactNode;
  params: P;
}) => JSX.Element | Promise<JSX.Element>;

export type Handler<P extends string | undefined = undefined> = (
  req: NextRequest,
  segments: { params: P extends string ? { [key in P]: string } : {} }
) => NextResponse | Promise<NextResponse>;

export type TokensFile = TokenItem[];

export interface TokenItem {
  token: string;
  expiration: number;
}

export interface TemplateModule {
  default: React.FC<any>;
  subject: PlainTextExport<any>;
  preview: PlainTextExport<any>;
}
