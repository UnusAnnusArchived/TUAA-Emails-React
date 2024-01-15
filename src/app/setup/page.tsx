import { NextPage } from "next";
import setupIsEnabled from "../../tools/setupIsEnabled";
import { notFound } from "next/navigation";
import Main from "./main";

const Setup: NextPage = () => {
  if (setupIsEnabled()) {
    return <Main />;
  }
  return notFound();
};

export default Setup;
