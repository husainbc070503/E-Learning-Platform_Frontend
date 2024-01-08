import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import RadioField from "../components/RadioField";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "../components/ForgotPassword";

const initialState = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
  profile: "",
  role: "",
};

const Auth = () => {
  const [openReg, setOpenReg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(initialState);
  const { registerUser, loginUser } = useGlobalContext();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

  const handleUpload = async (file) => {
    setLoading(true);
    if (file === undefined) {
      toast.error(`Please upload profile pic`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      return;
    }

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      toast.error("Only JPEG or PNG images are accepted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }

    try {
      const url = "https://api.cloudinary.com/v1_1/dm7x7knbb/image/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "e_learning_platform");
      data.append("cloud", "dm7x7knbb");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const finalRes = await res.json();
      if (finalRes) {
        toast.success("Profile Picture Uploaded!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setUserDetails({ ...userDetails, profile: finalRes.url });
      } else {
        toast.error("Failed to upload image! Try again later!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      setLoading(false);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setLoading(false);
      return;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (openReg) {
      if (userDetails.password !== userDetails.cpassword) {
        toast.error("Mismatch password and retyped password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
        return;
      }

      const data = await registerUser(userDetails);
      if (data.success) {
        toast.success("Registered 👍", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setOpenReg(!openReg);
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      const data = await loginUser(userDetails);
      if (data.success) {
        toast.success("Login Successful 👍", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        localStorage.setItem("e-learning-user", JSON.stringify(data.user));
        navigate("/");
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }

    setLoading(false);
    setUserDetails(initialState);
  };

  return (
    <Container maxWidth="sm" className="container">
      <Box>
        <Typography
          color="secondary"
          fontSize={34}
          fontWeight="bold"
          mb={3}
          textAlign="center"
        >
          {openReg ? "Register" : "Login"}
        </Typography>
        <Box className={openReg && "reg-form"}>
          {openReg && (
            <InputField
              title="Name"
              type="text"
              others="name"
              value={userDetails.name}
              onChange={handleChange}
              autoFocus={openReg}
            />
          )}

          <InputField
            title="Email"
            type="email"
            others="email"
            value={userDetails.email}
            onChange={handleChange}
          />

          <PasswordField
            title="Password"
            others="password"
            value={userDetails.password}
            onChange={handleChange}
          />

          {openReg && (
            <>
              <PasswordField
                title="Retype Password"
                others="cpassword"
                value={userDetails.cpassword}
                onChange={handleChange}
              />
              <InputField
                accept="image/*"
                title="Profile Picture"
                type="file"
                others="profile"
                onChange={(e) => handleUpload(e.target.files[0])}
              />
            </>
          )}
          <RadioField value={userDetails.role} onChange={handleChange} />
        </Box>
        <Grid
          container
          justifyContent="space-between"
          my={3}
          alignItems="center"
        >
          <Grid item md={6} xs={6}>
            <Button
              color="success"
              variant="contained"
              disabled={loading}
              onClick={handleSubmit}
            >
              {openReg ? "Sign Up" : "Sign In"}
            </Button>
          </Grid>
          <Grid item md={6} xs={6} textAlign="end">
            <Typography
              color="GrayText"
              onClick={() => setOpenReg(!openReg)}
              sx={{ cursor: "pointer" }}
            >
              {openReg ? "Already have an account?" : "Don't have an account?"}
            </Typography>
          </Grid>
          {!openReg && <ForgotPassword />}
        </Grid>
      </Box>
    </Container>
  );
};

export default Auth;
