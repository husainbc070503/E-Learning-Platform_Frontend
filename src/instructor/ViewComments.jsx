import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CommentsTable from "../components/CommentsTable";
import CommentIcon from "@mui/icons-material/Comment";
import { Tooltip } from "@mui/material";
import { useGlobalContext } from "../contexts/AppContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 850,
  bgcolor: "background.paper",
  boxShadow: 10,
  borderRadius: 2,
  p: 4,
  maxWidth: "95%",
};

const ViewComments = ({ lessonId }) => {
  const [open, setOpen] = React.useState(false);
  const { comments } = useGlobalContext();
  const lessonComments = comments.filter(
    (item) => item?.lesson?._id === lessonId
  );

  return (
    <div>
      <Tooltip title="View Comments">
        <CommentIcon
          className="icon fs-5"
          onClick={() => setOpen(true)}
          color="warning"
        />
      </Tooltip>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography fontWeight="bold" fontSize={26} mb={3}>
            Comments
          </Typography>
          {lessonComments?.length > 0 ? (
            <CommentsTable comments={lessonComments} />
          ) : (
            <Typography fontSize={20} fontWeight="bold">
              No Comments
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ViewComments;
