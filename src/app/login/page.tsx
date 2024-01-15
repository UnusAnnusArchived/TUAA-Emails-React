import setupIsEnabled from "@/tools/setupIsEnabled";
import { NextPage } from "next";
import { RedirectType, redirect } from "next/navigation";
import Main from "./main";

const Login: NextPage = () => {
  if (setupIsEnabled()) {
    return redirect("/setup", RedirectType.replace);
  }
  return <Main />;
};

export default Login;
