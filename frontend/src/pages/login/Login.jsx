import React from "react";
import { TextField, Button, Typography, Link as MuiLink } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { login } from "../../redux/slices/authSlice";
import { PiChefHatThin } from "react-icons/pi";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
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
        Object.values(errors).forEach((msg) => toast.error(msg));
        return;
      }

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          values
        );
        const { user, token } = res.data;
        if (!token) return toast.error("Token alınmadı");

        localStorage.setItem("token", token);
        dispatch(
          login({
            user: {
              id: user._id || user.id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
            },
            token,
          })
        );
        toast.success("Login successful!");
        navigate(user.isAdmin ? "/admin" : "/app");
      } catch (err) {
        if (err.response?.status === 404) {
          toast.error("Account not found. Redirecting to register...");
          setTimeout(() => navigate("/register"), 2000);
        } else {
          toast.error(err.response?.data?.message || "Login failed");
        }
      }
    },
  });

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { name, email, sub: googleId } = decoded;

      const res = await axios.post("http://localhost:5000/api/auth/google", {
        name,
        email,
        googleId,
      });

      const { user, token } = res.data;
      if (!token) return toast.error("Google token alınmadı");

      localStorage.setItem("token", token);
      dispatch(
        login({
          user: {
            id: user._id || user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          },
          token,
        })
      );
      toast.success("Google ilə daxil oldunuz!");
      navigate(user.isAdmin ? "/admin" : "/app");
    } catch (err) {
      toast.error("Google ilə giriş mümkün olmadı");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="floating-ingredients">
        <img src="/tomato.png" className="ingredient tomato" alt="tomato" />
        <img src="/chili.png" className="ingredient chili" alt="chili" />
        <img src="/leaf.png" className="ingredient leaf" alt="leaf" />
        <img src="/avacado.png" className="ingredient avacado" alt="avacado" />
        <img src="/salt.png" className="ingredient salt" alt="salt" />
        <img src="/cheese.png" className="ingredient cheese" alt="cheese" />
      </div>

      <div className="glass-container">
        <div className="logo-circle">
          <PiChefHatThin color="#FF5722" size={40} />
        </div>

        <Typography variant="h5" className="login-title">
          Welcome to the Kitchen!
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
            autoComplete="new-  email"
            sx={{
              backgroundColor: "white",
              borderRadius: "8px",
              input: { color: "black" },
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
              backgroundColor: "white",
              borderRadius: "8px",
              input: { color: "black" },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            className="login-btn"
          >
            LET’S COOK!
          </Button>
        </form>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Google login xətası")}
          text="continue_with"
        />

        <Typography variant="body2" className="register-text">
          Don’t have an account?{" "}
          <MuiLink component={Link} to="/register">
            Register here
          </MuiLink>
        </Typography>
      </div>
    </div>
  );
};

export default Login;
