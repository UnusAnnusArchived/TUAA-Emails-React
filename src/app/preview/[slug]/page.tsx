import { Send } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { NextPage } from "next";
import SendMail from "./send-mail";

interface IProps {
  params: IParams;
}

interface IParams {
  slug: string;
}

// @ts-ignore
const Preview: NextPage<IProps> = async ({ params: { slug } }) => {
  try {
    const _ = (await import(`../../../../templates/${slug}`)).default;

    return (
      <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
        <SendMail template={slug} />
        <iframe style={{ width: "100%", flexGrow: 1, border: "1px solid #121212" }} src={`/preview/${slug}/html`} />
      </div>
    );
  } catch {
    return (
      <Typography variant="h3" component="p" sx={{ color: "#000000" }}>
        Template does not exist!
      </Typography>
    );
  }
};

export default Preview;
