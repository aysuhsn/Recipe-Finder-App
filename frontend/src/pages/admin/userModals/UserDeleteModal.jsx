import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const UserDeleteModal = ({ open, onClose, onDelete, user }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>İstifadəçini Sil</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {user?.name} adlı istifadəçini silmək istədiyinizə əminsiniz?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>İmtina</Button>
        <Button onClick={() => onDelete(user)} color="error" variant="contained">
          Sil
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDeleteModal;
