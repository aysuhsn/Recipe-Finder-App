import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChatBox from "./ChatBox";

const ChatModal = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: (theme) => ({
          borderRadius: "20px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 0.5)"
              : "rgba(255, 255, 255, 0.5)",
          color: theme.palette.mode === "dark" ? "#eee" : "#111",
          border: `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)"
          }`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }),
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "1.25rem",
          color: "inherit",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        🧠 Chatbot
        <IconButton onClick={handleClose}>
          <CloseIcon sx={{ color: "inherit" }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ padding: "1rem" }}>
        <ChatBox />
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
