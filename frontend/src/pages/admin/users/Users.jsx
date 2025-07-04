import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  useTheme,
  Grid,
  useMediaQuery,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import axios from "axios";
import { toast } from "react-toastify";
import UserFormModal from "../userModals/UserFormModal";
import { useLanguage } from "../../../context/LanguageContext";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useLanguage();

  const handleOpenDialog = (id) => {
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedUserId(null);
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/admin/users/${selectedUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(t("userDeleted"));
      fetchUsers();
    } catch (err) {
      toast.error(t("userDeleteFailed"));
    } finally {
      handleCloseDialog();
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/users");
      setUsers(res.data);
    } catch (err) {
      toast.error(t("userFetchFailed"));
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/users/${selectedUser._id}`,
        updatedData
      );
      toast.success(t("userUpdated"));
      fetchUsers();
    } catch (error) {
      toast.error(t("userUpdateFailed"));
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          color={theme.palette.mode === "dark" ? "#bbdefb" : "#0d47a1"}
        >
          {t("users")}
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          {users.map((user, index) => (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#1e1e2f" : "#ffffff",
                  border: "1px solid",
                  borderColor:
                    theme.palette.mode === "dark" ? "#3f3f5f" : "#c5cae9",
                  width: isMobile ? "100%" : "auto",
                  maxWidth: 360,
                  margin: "0 auto",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 0 15px rgba(103, 58, 183, 0.4)"
                      : "0 0 10px rgba(103, 58, 183, 0.2)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 0 25px rgba(103, 58, 183, 0.6)"
                        : "0 0 20px rgba(103, 58, 183, 0.3)",
                    transform: "translateY(-3px)",
                  },
                }}
              >
                <Typography fontWeight="bold" variant="h6" gutterBottom>
                  {index + 1}. {user.name}
                </Typography>

                <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                  <EmailOutlinedIcon fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1} mt={1} mb={2}>
                  <PersonOutlineIcon fontSize="small" />
                  <Chip
                    label={user.isAdmin ? t("admin") : t("user")}
                    size="small"
                    sx={{
                      backgroundColor: user.isAdmin ? "#1565c0" : "#9e9e9e",
                      color: "#fff",
                      fontWeight: "bold",
                      borderRadius: "6px",
                    }}
                  />
                </Box>

                <Box display="flex" justifyContent="flex-end" gap={1}>
                  <Tooltip title={t("edit")}>
                    ...
                    <IconButton
                      onClick={() => {
                        setSelectedUser({
                          ...user,
                          isActive: user.status?.toLowerCase() === "aktiv",
                        });
                        setEditOpen(true);
                      }}
                      sx={{
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#2c2c2c" : "#f0f0f0",
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "#383838"
                              : "#e0e0e0",
                        },
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" color="primary" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title={t("delete")}>
                    <IconButton
                      onClick={() => handleOpenDialog(user._id)}
                      sx={{
                        backgroundColor:
                          theme.palette.mode === "dark" ? "#2c2c2c" : "#f0f0f0",
                        "&:hover": {
                          backgroundColor:
                            theme.palette.mode === "dark"
                              ? "#383838"
                              : "#e0e0e0",
                        },
                      }}
                    >
                      <DeleteOutlineIcon fontSize="small" color="error" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <UserFormModal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedUser(null);
        }}
        initialData={selectedUser}
        onSubmit={handleUpdate}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{t("confirmDeleteTitle")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("confirmDeleteText")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>{t("cancel")}</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            {t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Users;
