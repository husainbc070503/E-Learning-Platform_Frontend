import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../contexts/AppContext";
import LessonCard from "../components/LessonCard";

const Lessons = ({ courseId }) => {
  const { lessons } = useGlobalContext();
  const courseLessons = lessons?.filter(
    (item) => item?.course?._id === courseId
  );

  return (
    <Container maxWidth="lg">
      <Box>
        {courseLessons?.length > 0 ? (
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            columnSpacing={3}
            rowSpacing={4}
          >
            {courseLessons?.map((item, ind) => {
              return (
                <Grid key={ind} item md={4}>
                  <LessonCard item={item} />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography fontSize={22} fontWeight="bold" m={2}>
            No Lessons, please add
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Lessons;
