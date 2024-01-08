import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from "../contexts/AppContext";
import EditLesson from "../instructor/EditLesson";
import ViewComments from "../instructor/ViewComments";

const LessonCard = ({ item }) => {
  const { title, description, content, _id } = item;
  const { deleteLesson } = useGlobalContext();

  return (
    <Card>
      <CardMedia
        component="video"
        alt="video"
        controls
        height="200"
        image={content}
      />
      <CardContent>
        <Typography gutterBottom fontSize={24} fontWeight="bold" mb={2}>
          {title}
        </Typography>
        <Typography color="GrayText" textAlign="justify">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <EditLesson lessonId={_id} />
        <DeleteIcon
          className="icon mx-2 fs-5"
          color="error"
          onClick={() => deleteLesson(_id)}
        />
        <ViewComments lessonId={_id} />
      </CardActions>
    </Card>
  );
};

export default LessonCard;
