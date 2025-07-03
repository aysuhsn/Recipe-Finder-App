import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { useLanguage } from "../../../context/LanguageContext"; // ✅

const mockPending = [
  { id: 1, title: "Əriştəli şorba" },
  { id: 2, title: "Qatıq soup" },
];

const Pending = () => {
  const { t } = useLanguage(); // ✅

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        {t("pendingRecipes")}
      </Typography>

      <List>
        {mockPending.map((item) => (
          <ListItem
            key={item.id}
            secondaryAction={
              <>
                <IconButton edge="end" color="success">
                  <CheckCircle />
                </IconButton>
                <IconButton edge="end" color="error">
                  <Cancel />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Pending;
