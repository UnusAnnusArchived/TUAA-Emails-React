"use client";

import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { ChangeEventHandler, useMemo, useState } from "react";
import submitSetupForm from "./submitSetupForm";
import { useRouter } from "next/navigation";

const Main: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(true);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const router = useRouter();

  useMemo(() => {
    if (password === "" && confirmPassword === "") {
      setFormIsValid(false);
      setConfirmPasswordIsValid(true);
    } else {
      if (password === confirmPassword) {
        setConfirmPasswordIsValid(true);
        setFormIsValid(true);
      } else {
        setConfirmPasswordIsValid(false);
        setFormIsValid(false);
      }
    }
  }, [password, confirmPassword]);

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setPassword(evt.target.value);
  };

  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setConfirmPassword(evt.target.value);
  };

  const handleSubmit = async () => {
    const result = await submitSetupForm(password);

    if (result) {
      router.replace("/");
    } else {
      setErrorSnackbarOpen(true);
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField variant="filled" type="password" value={password} label="Password" onChange={handlePasswordChange} />
        <TextField
          error={!confirmPasswordIsValid}
          variant="filled"
          type="password"
          value={confirmPassword}
          label="Confirm Password"
          onChange={handleConfirmPasswordChange}
          helperText={confirmPasswordIsValid ? "" : "Passwords must match!"}
        />
        <div style={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}>
          <Button disabled={!formIsValid} variant="contained" onClick={handleSubmit}>
            Submit
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
        <Alert severity="error">An error occurred while submitting form.</Alert>
      </Snackbar>
    </>
  );
};

export default Main;
