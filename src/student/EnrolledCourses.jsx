import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../contexts/AppContext";
import CourseCard from "../components/CourseCard";

const EnrolledCourses = () => {
  const { user, enrollments } = useGlobalContext();
  const myEnrollments = enrollments?.filter(
    (item) => item?.student?._id === user?.user?._id
  );

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Typography fontSize={32} fontWeight="bold" mb={3} color="primary">
          Enrolled Courses
        </Typography>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mt={6}
          spacing={2}
        >
          {myEnrollments?.length > 0 ? (
            myEnrollments?.map((item) => {
              const { student, course, _id } = item;
              return (
                <Grid item md={4} xs={12} key={_id}>
                  <CourseCard
                    item={course}
                    role={student?.role}
                    enrolled={true}
                  />
                </Grid>
              );
            })
          ) : (
            <Typography fontSize={26} mx={2} fontWeight="bold">
              Not enrolled in any of the courses
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default EnrolledCourses;
