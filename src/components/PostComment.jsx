import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputField from "./InputField";
import { useGlobalContext } from "../contexts/AppContext";
import AddCommentIcon from "@mui/icons-material/AddComment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 10,
  borderRadius: 2,
  p: 4,
  maxWidth: "95%",
};

const PostComment = ({ lessonId }) => {
  const [open, setOpen] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const handleChange = (e) => setComment(e.target.value);
  const { postComment } = useGlobalContext();

  return (
    <div className="mt-5">
      <Button onClick={() => setOpen(true)} color="warning" variant="contained">
        <AddCommentIcon className="fs-5 me-2" /> Post Yours
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontSize={32} fontWeight="bold" mb={3}>
            Comment
          </Typography>
          <InputField
            type="text"
            others="comment"
            value={comment}
            onChange={handleChange}
            autoFocus={true}
            multiline={true}
            rows={6}
          />
          <Button
            color="success"
            variant="contained"
            onClick={() => postComment(comment, lessonId, setOpen, setComment)}
          >
            POST
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default PostComment;
