import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputField from "../components/InputField";
import EditIcon from "@mui/icons-material/Edit";
import { useGlobalContext } from "../contexts/AppContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  boxShadow: 10,
  borderRadius: 2,
  p: 4,
  maxWidth: "95%",
};

const EditLesson = ({ lessonId }) => {
  const [open, setOpen] = React.useState(false);
  const [lessonDetails, setLessonDetails] = React.useState({});
  const { lessons, editLesson } = useGlobalContext();

  const handleChange = (e) =>
    setLessonDetails({ ...lessonDetails, [e.target.name]: e.target.value });

  React.useEffect(() => {
    setLessonDetails(lessons?.filter((item) => item?._id === lessonId)[0]);
  }, [lessonId]);

  return (
    <div>
      <EditIcon className="icon text-warning fs-5" onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={32} fontWeight="bold" mb={3}>
            Edit Lesson Content
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
          <Button
            color="success"
            variant="contained"
            onClick={() => editLesson(lessonDetails, lessonId, setOpen)}
          >
            Edit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EditLesson;
