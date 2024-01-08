import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputField from "../components/InputField";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/AppContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 10,
  borderRadius: 2,
  p: 4,
  maxWidth: "95%",
};

const initialState = {
  title: "",
  description: "",
  content: "",
};

const AddLesson = ({ courseId }) => {
  const [open, setOpen] = React.useState(false);
  const [lessonDetails, setLessonDetails] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);
  const { addLesson } = useGlobalContext();

  const handleChange = (e) =>
    setLessonDetails({ ...lessonDetails, [e.target.name]: e.target.value });

  const handleUpload = async (file) => {
    setLoading(true);
    if (file === undefined) {
      toast.error(`Please upload video`, {
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

    if (file.type !== "video/mp4") {
      toast.error("Only MP4 videos are accepted", {
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
      const url = "https://api.cloudinary.com/v1_1/dm7x7knbb/video/upload";
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
        toast.success("Video Uploaded!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        setLessonDetails({ ...lessonDetails, content: finalRes.url });
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

  return (
    <div>
      <Button onClick={() => setOpen(true)} color="warning" variant="contained">
        Add Lesson
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={32} fontWeight="bold" mb={3}>
            Add Lesson Content
          </Typography>
          <InputField
            title="Title"
            type="text"
            others="title"
            value={lessonDetails.title}
            onChange={handleChange}
            autoFocus={true}
          />
          <InputField
            title="Description"
            type="text"
            others="description"
            value={lessonDetails.description}
            onChange={handleChange}
            multiline={true}
            rows={4}
          />
          <InputField
            title="Video"
            type="file"
            others="content"
            onChange={(e) => handleUpload(e.target.files[0])}
          />
          <Button
            color="success"
            variant="contained"
            disabled={loading}
            onClick={() => addLesson(lessonDetails, courseId, setOpen, setLessonDetails, initialState)}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddLesson;
