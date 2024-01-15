"use client";

import { Alert, Button, Link, Snackbar, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import submitLoginForm from "./submitLoginForm";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

const Main: React.FC = () => {
  const [password, setPassword] = useState("");
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const router = useRouter();

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async () => {
    const result = await submitLoginForm(password);

    if (result === false) {
      setErrorSnackbarOpen(true);
    } else {
      router.replace("/");
      setCookie("auth", result, { maxAge: 2.628e6, path: "/" });
    }
  };

  return (
    <>
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <Typography variant="h6" component="p">
          This is an internal TUAA page
        </Typography>
        <Typography>
          If you're receiving an email with this link, an error has occurred. Please{" "}
          <Link href="mailto:contact@unusann.us">contact us</Link>.
        </Typography>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField variant="filled" type="password" value={password} label="Password" onChange={handlePasswordChange} />
        <div style={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
        </div>
      </div>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={() => {
          setErrorSnackbarOpen(false);
        }}
      >
        <Alert severity="error">An error occurred while logging in.</Alert>
      </Snackbar>
    </>
  );
};

export default Main;
