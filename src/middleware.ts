import { NextRequest, NextResponse } from "next/server";

const unAuthedFileTypes = [".js", ".css", ".woff2"];
const unAuthedPaths = ["/login", "/logout", "/setup", "/email/*", "/api/*"];

export const middleware = (req: NextRequest) => {
  //Authentication
  let isAllowed = false;

  for (let i = 0; i < unAuthedFileTypes.length; i++) {
    if (new URL(req.url).pathname.endsWith(unAuthedFileTypes[i])) {
      isAllowed = true;
      break;
    }
  }

  if (!isAllowed) {
    for (let i = 0; i < unAuthedPaths.length; i++) {
      if (unAuthedPaths[i].endsWith("*")) {
        if (new URL(req.url).pathname.startsWith(unAuthedPaths[i].replace("*", ""))) {
          isAllowed = true;
          break;
        }
      } else if (new URL(req.url).pathname === unAuthedPaths[i]) {
        isAllowed = true;
        break;
      }
    }
  }

  if (isAllowed) {
    return NextResponse.next();
  }
  if (req.cookies.get("auth")?.value) {
    return NextResponse.next({ headers: { "Auth-Check": "true" } });
  }

  return NextResponse.redirect(new URL("/login", req.url));
};
