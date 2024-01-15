import { Body, Container, Head, Heading, Hr, Html, Link, Preview, Text } from "@react-email/components";
import { CSSProperties } from "react";

export type PlainTextExport<T = {}> = (params: T) => string;

interface IProps {
  subject: string;
  preview?: string;
  optout?: string | JSX.Element;
  previewLink?: string;
}

const Template: React.FC<React.PropsWithChildren<IProps>> = ({ children, subject, preview, optout, previewLink }) => {
  return (
    <Html>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
        <style>
          {
            ".link:hover { text-decoration: underline!important; text-decoration-color: inherit!important } .btn:hover { text-decoration: none!important; background-color: rgb(178, 178, 178)!important; box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px!important; }"
          }
        </style>
      </Head>
      {preview && <Preview>{preview}</Preview>}
      <Body style={{ backgroundColor: "#121212" }}>
        {previewLink && <Link href={previewLink}>View this email in your browser</Link>}
        <Container
          style={{
            margin: "0 auto",
          }}
        >
          <div
            style={{
              backgroundColor: "#272727",
              borderRadius: "4px",
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
              padding: "0.05rem 1rem",
              margin: "0 auto",
            }}
          >
            <Link href="https://unusann.us" style={styles.linkNoUnderline} className="link">
              <Heading style={{ ...styles.text, ...styles.h1, textAlign: "center" }}>The Unus Annus Archive</Heading>
            </Link>
          </div>
          <Heading style={{ ...styles.text, ...styles.h2, textAlign: "center" }}>{subject}</Heading>
          <Hr style={styles.hr} />
          {children}
          {optout && (
            <>
              <Hr style={styles.hr} />
              <div
                style={{
                  backgroundColor: "#272727",
                  borderRadius: "4px",
                  boxShadow:
                    "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
                  padding: "0.05rem 1rem",
                  margin: "0 auto",
                }}
              >
                <Text style={{ ...styles.text, ...styles.text2 }}>{optout}</Text>
              </div>
            </>
          )}
        </Container>
      </Body>
    </Html>
  );
};

type IStyles = {
  [key in "text" | "text2" | "h1" | "h2" | "link" | "linkNoUnderline" | "hr" | "button"]: CSSProperties;
};

export const styles: IStyles = {
  text: {
    color: "#ffffff",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: 1.5,
    letterSpacing: "0.00938em",
  },
  text2: {
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: 1.43,
    letterSpacing: "0.01071em",
  },
  h1: {
    fontWeight: 500,
    fontSize: "1.25rem",
    lineHeight: 1.6,
    letterSpacing: "0.0075em",
  },
  h2: {
    fontWeight: 400,
    fontSize: "1.5rem",
    lineHeight: 1.334,
    letterSpacing: "0em",
  },
  link: {
    margin: 0,
    color: "#ffffff",
    WebkitTextDecorationColor: "underline",
    textDecoration: "underline",
    textDecorationColor: "rgba(255, 255, 255, 0.4)",
  },
  linkNoUnderline: {
    margin: 0,
    color: "#ffffff",
  },
  hr: {
    borderTop: "none",
    margin: "1rem 0",
    borderWidth: "0px 0px thin",
    borderStyle: "solid",
    borderColor: "#4D4D4D",
  },
  button: {
    display: "inline-flex",
    WebkitBoxAlign: "center",
    alignItems: "center",
    WebkitBoxPack: "center",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
    WebkitTapHighlightColor: "transparent",
    outline: "0px",
    border: "0px",
    margin: "0px",
    cursor: "pointer",
    userSelect: "none",
    verticalAlign: "middle",
    appearance: "none",
    textDecoration: "none",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 500,
    fontSize: "0.875rem",
    lineHeight: 1.75,
    letterSpacing: "0.02857em",
    textTransform: "uppercase",
    color: "rgba(0, 0, 0, 0.87)",
    minWidth: "64px",
    padding: "6px 16px",
    borderRadius: "4px",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
  },
};

export default Template;
