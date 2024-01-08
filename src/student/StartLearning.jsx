import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/AppContext";
import LessonAccordion from "../components/LessonAccordion";
import Comments from "./Comments";

const StartLearning = () => {
  const { id } = useParams();
  const { lessons, giveRating } = useGlobalContext();
  const filteredLessons = lessons?.filter((item) => item?.course?._id === id);

  const [lesson, setLesson] = useState();
  const [completedLessons, setCompletedLessons] = useState(() => {
    const arr = localStorage.getItem("completedLessons");
    if (arr) return JSON.parse(arr).completedLessons;
    return [];
  });

  const [openRating, setOpenRating] = useState(false);
  const [value, setValue] = useState(0);

  const filteredCompletedLessons = completedLessons?.filter(
    (item) => item?.course?._id === id
  );

  useEffect(() => {
    localStorage.setItem(
      "completedLessons",
      JSON.stringify({ completedLessons })
    );
  }, [completedLessons]);

  return (
    filteredLessons.length > 0 && (
      <Container maxWidth="xl" className="container">
        <Box>
          <Grid container columnSpacing={2} rowSpacing={4}>
            <Grid item md={4} xs={12}>
              <Typography
                fontSize={34}
                fontWeight="bold"
                mb={2}
                color="secondary"
              >
                Lessons List
              </Typography>
              <LessonAccordion
                courseLessons={filteredLessons}
                setLesson={setLesson}
                completedLessons={completedLessons}
                fromStartLearning={true}
              />
              {filteredCompletedLessons?.length === filteredLessons?.length &&
                (!openRating ? (
                  <Button
                    color="warning"
                    variant="contained"
                    className="mx-3 mt-5"
                    onClick={() => setOpenRating(true)}
                  >
                    Give Rating
                  </Button>
                ) : (
                  <Grid container spacing={2} mt={3}>
                    <Grid item md={4}>
                      <Rating
                        precision={0.5}
                        name="rating"
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                      />
                    </Grid>
                    <Grid item md={8}>
                      <Button
                        color="success"
                        variant="contained"
                        onClick={() => {
                          giveRating(value, id);
                          setOpenRating(false);
                        }}
                      >
                        Rate
                      </Button>
                      <Button
                        color="error"
                        variant="contained"
                        className="mx-3"
                        onClick={() => setOpenRating(false)}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                ))}
            </Grid>
            <Grid item md={8} xs={12}>
              {lesson && Object.keys(lesson).length > 0 ? (
                <>
                  <Card>
                    <CardMedia
                      component="video"
                      sx={{ height: "100%" }}
                      image={lesson?.content}
                      title={lesson?.name}
                      controls
                    />
                  </Card>
                  <Comments lessonId={lesson?._id} />
                  <Button
                    color="success"
                    variant="contained"
                    className="mt-4"
                    onClick={() => {
                      setCompletedLessons([...completedLessons, lesson]);
                      setLesson({});
                    }}
                  >
                    Mark as Completed
                  </Button>
                </>
              ) : (
                <Typography fontSize={28} textAlign="center" fontWeight="bold">
                  Please select lesson to start learning.
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    )
  );
};

export default StartLearning;
