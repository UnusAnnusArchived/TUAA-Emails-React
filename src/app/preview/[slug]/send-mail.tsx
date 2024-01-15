"use client";

import { Send } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import { ChangeEventHandler, useState } from "react";

interface IProps {
  template: string;
}

const SendMail: React.FC<IProps> = ({ template }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [email, setEmail] = useState("");
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setSending(false);
    setDialogOpen(false);
    setEmail("");
  };

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSend = async () => {
    setSending(true);
    const res = await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        to: email,
        template: template,
        templateParams: {},
      }),
    });

    if (res.status === 200) {
      setSuccessSnackbarOpen(true);
      setDialogOpen(false);
    } else {
      setErrorSnackbarOpen(true);
      console.error(await res.json());
    }

    setSending(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenDialog} sx={{ alignSelf: "flex-end" }}>
        <Send />
      </IconButton>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Send Example Email</DialogTitle>
        <DialogContent>
          <TextField
            type="email"
            label="Email"
            disabled={sending}
            value={email}
            onChange={handleEmailChange}
            sx={{ marginTop: "0.5rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
          <Button
            variant="contained"
            disabled={sending}
            onClick={handleSend}
            endIcon={sending ? <CircularProgress size={24.5} /> : <Send />}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={5000}
        onClose={() => {
          setErrorSnackbarOpen(false);
        }}
      >
        <Alert severity="error">An error occurred while sending a test email.</Alert>
      </Snackbar>
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={5000}
        onClose={() => {
          setSuccessSnackbarOpen(false);
        }}
      >
        <Alert severity="success">Successfully sent test email.</Alert>
      </Snackbar>
    </>
  );
};

export default SendMail;
