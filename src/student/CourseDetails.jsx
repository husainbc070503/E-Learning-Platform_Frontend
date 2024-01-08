import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useGlobalContext } from "../contexts/AppContext";
import LessonAccordion from "../components/LessonAccordion";

const CourseDetails = () => {
  const { id } = useParams();
  const { courses, lessons, enrollStudent } = useGlobalContext();
  const [course, setCourse] = useState({});
  const courseLessons = lessons?.filter((item) => item?.course?._id === id);

  useEffect(() => {
    setCourse(courses?.filter((item) => item?._id === id)[0]);
  }, [id]);

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
          className="Grid course"
        >
          <Grid item md={6} xs={12}>
            <Typography fontSize={36} fontWeight="bold" mb={2}>
              {course?.name}
            </Typography>
            <Typography textAlign="justify" mb={2}>
              {course?.description}
            </Typography>
            <Typography
              textAlign="justify"
              mb={3}
              fontSize={26}
              fontWeight="bold"
              color="primary"
            >
              By, {course?.instructor?.name}
            </Typography>
            <Chip
              label={course?.category?.name}
              variant="outlined"
              color="secondary"
            />
            <Button
              color="success"
              variant="contained"
              className="d-block mt-4"
              onClick={() => enrollStudent(id)}
            >
              Enroll for Free
            </Button>
          </Grid>
          <Grid item md={6} xs={12}>
            <img src={course?.image} alt="image" className="rounded-3" />
          </Grid>
        </Grid>
        <Typography
          fontSize={36}
          mt={8}
          mb={2}
          fontWeight="bold"
          textAlign="center"
          color="secondary"
        >
          Lessons
        </Typography>
        <LessonAccordion width={true} courseLessons={courseLessons} />
      </Box>
    </Container>
  );
};

export default CourseDetails;
