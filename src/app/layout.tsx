import { Layout } from "@/types";
import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry";
import AppBar from "@/components/AppBar";
import { Typography } from "@mui/material";
import AppBarMargin from "@/components/AppBar/margin";
import RecoilRoot from "@/components/RecoilRoot";
import GeistProvider from "@/components/GeistProvider";
import ScrollHelper from "@/components/ScrollHelper";
import { headers as useHeaders, cookies as useCookies } from "next/headers";
import fs from "fs";
import { editToken, getTokens } from "@/tools/tokens";
import { RedirectType, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "TUAA Emails",
};

const Layout: Layout = async ({ children }) => {
  const headers = useHeaders();
  const cookies = useCookies();
  const needsAuthCheck = headers.get("Auth-Check") === "true";

  if (needsAuthCheck) {
    try {
      const tokens = await getTokens();

      const token = cookies.get("auth");
      let index = -1;
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].token === token?.value) {
          index = i;
          break;
        }
      }

      if (index === -1) {
        return redirect("/logout", RedirectType.replace);
      }

      await editToken(index, { expiration: Date.now() + 2.628e9 });
    } catch {
      return <p>Error checking authentication.</p>;
    }
  }

  return (
    <html lang="en">
      <body style={{ overflow: "hidden" }}>
        <GeistProvider>
          <RecoilRoot>
            <ThemeRegistry>
              <div id="root">
                <ScrollHelper>
                  <AppBar />
                  <AppBarMargin />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      margin: "32px 16px 32px 16px",
                      maxWidth: "1000px",
                      width: "100%",
                    }}
                  >
                    <noscript>
                      <Typography sx={{ textAlign: "center" }} variant="h3" component="h2">
                        Please enable JavaScript!
                      </Typography>
                    </noscript>
                    {children}
                  </div>
                </ScrollHelper>
              </div>
            </ThemeRegistry>
          </RecoilRoot>
        </GeistProvider>
      </body>
    </html>
  );
};

export default Layout;
