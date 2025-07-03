import React from "react";
import { Typography, TextField, Button, Link as MuiLink } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { PiChefHatThin } from "react-icons/pi";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Must contain an uppercase letter")
        .matches(/[a-z]/, "Must contain a lowercase letter")
        .matches(/\d/, "Must contain a number")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const errors = await formik.validateForm();
      if (Object.keys(errors).length > 0) {
        Object.entries(errors).forEach(([_, msg]) => toast.error(msg));
        return;
      }

      try {
        await axios.post("http://localhost:5000/api/auth/register", {
          name: values.username,
          email: values.email,
          password: values.password,
        });
        toast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        toast.error(err.response?.data?.message || "Registration failed");
      }
    },
  });

  return (
    <div className="register-wrapper">
      {/* Floating ingredients */}
      <div className="floating-ingredients">
        <img src="/tomato.png" alt="tomato" />
        <img src="/chili.png" alt="chili" />
        <img src="/leaf.png" alt="leaf" />
        <img src="/avacado.png" alt="avacado" />
        <img src="/salt.png" alt="salt" />
        <img src="/cheese.png" alt="cheese" />
      </div>

      {/* Glassy neon container */}
      <div className="register-glass-container">
        <div className="logo-circle neon-glow">
          <PiChefHatThin color="#00ffff" size={32} />
        </div>

        <Typography variant="h5" align="center" className="register-title">
          Join the Cooking Club!
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            margin="normal"
            autoComplete="new-username"
            sx={{
              backgroundColor: "transparent",
              border: "1px solid #00ffff",
              borderRadius: "8px",
              input: { color: "#fff" },
              label: { color: "#00ffff" },
            }}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
            autoComplete="new-email"
            sx={{
              backgroundColor: "transparent",
              border: "1px solid #00ffff",
              borderRadius: "8px",
              input: { color: "#fff" },
              label: { color: "#00ffff" },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
            autoComplete="new-password"
            sx={{
              backgroundColor: "transparent",
              border: "1px solid #00ffff",
              borderRadius: "8px",
              input: { color: "#fff" },
              label: { color: "#00ffff" },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            className="register-btn"
          >
            REGISTER
          </Button>
        </form>

        <Typography variant="body2" align="center" className="login-link">
          Already have an account?{" "}
          <MuiLink component={Link} to="/login">
            Login here
          </MuiLink>
        </Typography>
      </div>
    </div>
  );
};

export default Register;
