import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import NoImage from "../assets/no-image.jpeg";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { useGlobalContext } from "../contexts/AppContext";
import { useParams } from "react-router-dom";

const EditCourse = () => {
  const { id } = useParams();
  const { editCourse, courses } = useGlobalContext();
  const [courseDetails, setCourseDetails] = useState({});
  const [loading, setLoading] = useState();

  const handleChange = (e) =>
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });

  const handleUpload = async (file) => {
    setLoading(true);

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
        toast.success("Image Updated!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setCourseDetails({ ...courseDetails, image: finalRes.url });
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

  useEffect(() => {
    setCourseDetails(courses?.filter((item) => item?._id === id)[0]);
  }, [id]);

  return (
    <Container maxWidth="md" className="container">
      <Box>
        <Typography
          fontWeight="bold"
          color="primary"
          fontSize={36}
          textAlign="center"
          mb={3}
        >
          Edit Course
        </Typography>
        <Box>
          <div className="add-course-image">
            <img
              src={courseDetails?.image ? courseDetails?.image : NoImage}
              alt="image"
            />
            <label htmlFor="course-image">
              <AddIcon />
            </label>
            <input
              type="file"
              name="image"
              id="course-image"
              style={{ display: "none" }}
              onChange={(e) => handleUpload(e.target.files[0])}
            />
          </div>
          <InputField
            type="text"
            title="Title"
            others="name"
            value={courseDetails?.name}
            onChange={handleChange}
          />
          <InputField
            type="text"
            title="Description"
            others="description"
            value={courseDetails?.description}
            onChange={handleChange}
            multiline={true}
            rows={5}
          />
          <SelectField
            value={courseDetails?.category}
            onChange={handleChange}
          />
          <Button
            type="button"
            color="success"
            variant="contained"
            disabled={loading}
            className="d-block mx-auto mt-5"
            onClick={() => editCourse(courseDetails, id)}
          >
            Edit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EditCourse;
