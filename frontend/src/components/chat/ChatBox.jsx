import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import axios from "axios";
import "./ChatBox.css";
import { useLanguage } from "../../context/LanguageContext";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;

    const ingredients = trimmed.split(",").map((i) => i.trim());

    setMessages((prev) => [
      ...prev,
      { type: "user", text: `🧑 ${t("you")}: ${trimmed}` },
    ]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/api/ai-recipe/chat", {
        ingredients,
      });

      const { title, image, instructions, usedIngredients, missedIngredients } =
        res.data.response;

      const instructionText =
        Array.isArray(instructions) && instructions.length > 0
          ? instructions.join("\n")
          : instructions;

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: `👩‍🍳 ${t("recipe")}: ${title}`,
          image,
          used: usedIngredients,
          missed: missedIngredients,
          instructions: instructionText,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "🤖 Uyğun resept tapılmadı!" },
      ]);
    }
  };

  return (
    <Box className="chatbox-wrapper">
      <Typography className="chatbox-title">{t("aiChatTitle")}</Typography>

      <Box className="chat-messages">
        {messages.map((msg, index) => (
          <Box key={index} className={`message ${msg.type}`}>
            <Typography>{msg.text}</Typography>

            {msg.image && (
              <img src={msg.image} alt="recipe" className="chat-img" />
            )}

            {msg.instructions && (
              <>
                <Divider sx={{ my: 1 }} />
                <Typography variant="subtitle2">{t("preparation")}</Typography>
                <Typography className="instructions">
                  {msg.instructions}
                </Typography>
              </>
            )}

            {msg.used && (
              <Box className="chip-group">
                <Typography variant="subtitle2">✅ {t("used")}</Typography>
                {msg.used.map((u, i) => (
                  <Chip key={i} label={u} size="small" />
                ))}
              </Box>
            )}

            {msg.missed && (
              <Box className="chip-group">
                <Typography variant="subtitle2">❌ {t("missed")}</Typography>
                {msg.missed.map((m, i) => (
                  <Chip key={i} label={m} size="small" color="warning" />
                ))}
              </Box>
            )}
          </Box>
        ))}
        <div ref={chatEndRef} />
      </Box>

      <Box className="chatbox-input">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="For example: egg, flour, milk"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          sx={{
            input: {
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#111",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.8)",
              borderRadius: "8px",
            },
          }}
        />

        <Button
          onClick={handleSend}
          variant="contained"
          className="chatbox-send-btn"
        >
          {t("send")}
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
