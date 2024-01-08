import { Box, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../contexts/AppContext";
import CommentsTable from "../components/CommentsTable";
import PostComment from "../components/PostComment";

const Comments = ({ lessonId }) => {
  const { comments } = useGlobalContext();
  const lessonComments = comments.filter(
    (item) => item?.lesson?._id === lessonId
  );

  return (
    <Box>
      <Typography fontSize={28} fontWeight="bold" color="primary" my={3}>
        Comments
      </Typography>
      {lessonComments?.length > 0 ? (
        <CommentsTable comments={lessonComments} />
      ) : (
        <Typography fontSize={22} fontWeight="bold">
          No comments🙁. Be the first to post😀
        </Typography>
      )}
      <PostComment lessonId={lessonId} />
    </Box>
  );
};

export default Comments;
