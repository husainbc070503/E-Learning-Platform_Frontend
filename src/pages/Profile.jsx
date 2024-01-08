import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../contexts/AppContext";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  profile: "",
  role: "",
};

const Profile = () => {
  const { user, updateUser } = useGlobalContext();
  const [editProfile, setEditProfile] = useState(false);
  const [userDetails, setUserDetails] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleChange = (e) =>
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    const data = await updateUser(userDetails);
    if (data.success) {
      toast.success("Profile Updated", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setEditProfile(false);
      localStorage.removeItem("e-learning-user");
      navigate("../auth");
      setUserDetails(initialState);
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
    setLoading(false);
  };

  useEffect(() => {
    setUserDetails(user?.user);
  }, [editProfile]);

  return (
    <Container maxWidth="lg" className="container">
      <Typography
        color="secondary"
        fontSize={34}
        fontWeight="bold"
        mb={3}
        textAlign="center"
      >
        My Profile
      </Typography>
      <Grid container mt={4} alignItems="center" rowSpacing={3}>
        <Grid item md={6} xs={12}>
          <div className="user-profile">
            <img
              className="w-100 rounded-circle"
              src={user?.user?.profile}
              alt={user?.user?.name}
            />
            {editProfile && (
              <>
                <label htmlFor="edit-profile" className="edit-icon">
                  <EditIcon sx={{ cursor: "pointer" }} />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="profile"
                  id="edit-profile"
                  onChange={(e) => handleUpload(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>
        </Grid>
        <Grid item md={6} xs={12}>
          {[
            {
              title: "Name",
              value: !editProfile ? user?.user?.name : userDetails?.name,
            },
            {
              title: "Email",
              value: !editProfile ? user?.user?.email : userDetails?.email,
            },
            {
              title: "Role",
              value:
                user?.user?.role[0].toUpperCase() +
                user?.user?.role.substring(1),
            },
          ].map((item, ind) => {
            const { title, value } = item;
            return (
              <Grid container spacing={2} mb={4} key={ind} alignItems="center">
                <Grid item md={4}>
                  <Typography fontWeight="bold" fontSize={20}>
                    {title}
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  {(ind == 0 || ind == 1) && editProfile ? (
                    <InputField
                      type="text"
                      others="name"
                      value={value}
                      onChange={handleChange}
                    />
                  ) : (
                    <Typography fontSize={20}>{value}</Typography>
                  )}
                </Grid>
              </Grid>
            );
          })}
          <Button
            color="info"
            variant="contained"
            onClick={() =>
              editProfile ? handleSubmit() : setEditProfile(true)
            }
            disabled={loading}
          >
            {!editProfile ? "Edit Profile" : "Update"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
