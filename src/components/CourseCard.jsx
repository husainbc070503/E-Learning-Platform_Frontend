import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Chip, Grid, Rating, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useGlobalContext } from "../contexts/AppContext";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const CourseCard = ({ item, role, enrolled }) => {
  const { deleteCourse, lessons } = useGlobalContext();
  const { name, description, category, image, rating, _id } = item;
  const [completedLessons, setCompletedLessons] = React.useState([]);
  const [isCompletedCourse, setIsCompletedCourse] = React.useState(false);

  const filteredLessons = lessons?.filter((item) => item?.course?._id === _id);
  const filteredCompletedLessons = completedLessons?.filter(
    (item) => item?.course?._id === _id
  );
  const notFilteredCompletedLessons = completedLessons?.filter(
    (item) => item?.course?._id !== _id
  );

  const handleClick = () => {
    localStorage.removeItem("completedLessons");
    localStorage.setItem(
      "completedLessons",
      JSON.stringify({ completedLessons: notFilteredCompletedLessons })
    );
    setIsCompletedCourse(false);
  };

  React.useEffect(() => {
    const arr = localStorage.getItem("completedLessons");
    if (arr) setCompletedLessons(JSON.parse(arr).completedLessons);
    else setCompletedLessons([]);

    if (
      filteredCompletedLessons?.length === filteredLessons?.length &&
      filteredCompletedLessons?.length > 0
    )
      setIsCompletedCourse(true);
  }, [filteredLessons?.length, filteredCompletedLessons?.length]);

  return (
    <Card>
      <CardMedia sx={{ height: 200 }} image={image} title="green iguana" />
      <CardContent>
        <Typography gutterBottom fontSize={24} fontWeight="bold" mb={2}>
          {name}
        </Typography>
        <Typography
          color="GrayText"
          mb={enrolled ? 0 : 2}
          textAlign={enrolled && "justify"}
        >
          {enrolled ? description : description.substring(0, 50) + "..."}
        </Typography>
        {!enrolled ? (
          <Grid container justifyContent="space-between">
            <Grid item md={6}>
              <Tooltip title={category?.name} placement="bottom-end">
                <Chip
                  label={category?.name}
                  variant="outlined"
                  color="secondary"
                />
              </Tooltip>
            </Grid>
            <Grid item md={6} textAlign="end">
              <Rating
                name="read-only"
                value={rating}
                precision={0.5}
                readOnly
              />
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </CardContent>
      <CardActions>
        {role === "instructor" && (
          <>
            <Link to={`editCourse/${_id}`}>
              <EditIcon className="text-success mx-2 fs-5 icon" />
            </Link>
            <DeleteIcon
              className="text-danger fs-5 icon"
              onClick={() => deleteCourse(_id)}
            />
            <Link to={`course/${_id}`} className="text-warning link">
              <VisibilityIcon />
            </Link>
          </>
        )}
        {role === "student" && (
          <Link
            className="mt-2 mx-2 w-100"
            to={
              !enrolled ? `../courseDetails/${_id}` : `../startLearning/${_id}`
            }
            style={{
              cursor: enrolled && isCompletedCourse ? "not-allowed" : "",
            }}
          >
            <Grid container spacing={2}>
              <Grid item md={!enrolled ? 6 : 8} xs={10}>
                <Button
                  variant="contained"
                  color={enrolled ? "warning" : "info"}
                  disabled={enrolled && isCompletedCourse}
                  className="w-100"
                >
                  {!enrolled
                    ? "Enroll Now"
                    : filteredCompletedLessons.length === 0
                    ? "Start Learning"
                    : "Resume Learning"}
                </Button>
              </Grid>
              <Grid item md={4} xs={2}>
                {enrolled && isCompletedCourse && (
                  <Button
                    color="info"
                    variant="contained"
                    onClick={handleClick}
                    className="w-100"
                  >
                    <Tooltip title="Restart Learning">
                      <RestartAltIcon />
                    </Tooltip>
                  </Button>
                )}
              </Grid>
            </Grid>
          </Link>
        )}
      </CardActions>
    </Card>
  );
};

export default CourseCard;
