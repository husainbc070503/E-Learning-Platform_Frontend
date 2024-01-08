import {
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../contexts/AppContext";
import AddLesson from "./AddLesson";
import Lessons from "./Lessons";

const Course = () => {
  const { id } = useParams();
  const { courses, enrollments } = useGlobalContext();
  const [course, setCourse] = useState({});

  const courseEnrollments = enrollments?.filter(
    (item) => item?.course?._id === id
  );

  useEffect(() => {
    setCourse(courses?.filter((item) => item?._id === id)[0]);
  });

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
            <Typography textAlign="justify" mb={3}>
              {course?.description}
            </Typography>
            <Chip
              label={course?.category?.name}
              variant="outlined"
              color="secondary"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <img src={course?.image} alt="image" className="rounded-3" />
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          my={4}
          px={4}
        >
          <Grid item md={6}>
            <Typography fontSize={34} fontWeight="bold" color="primary">
              Lessons
            </Typography>
          </Grid>
          <Grid item md={6} textAlign="end">
            <AddLesson courseId={id} />
          </Grid>
        </Grid>
        <Lessons courseId={id} />

        <Typography
          fontSize={34}
          fontWeight="bold"
          color="secondary"
          mt={8}
          mb={4}
          px={4}
        >
          Enrollments
        </Typography>

        {courseEnrollments?.length > 0 ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {["Sr. No.", "Profile", "Name"].map((item, ind) => (
                    <TableCell align={ind === 2 ? "left" : "center"} key={ind}>
                      <Typography fontSize={22} fontWeight="bold">
                        {item}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {courseEnrollments?.map((item, ind) => {
                  return (
                    <TableRow key={ind}>
                      <TableCell align="center">
                        <Typography fontSize={18}>{ind + 1}.</Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography fontSize={18}>
                          <Avatar
                            src={item?.student?.profile}
                            alt="profile-pic"
                            className="d-block mx-auto"
                          />
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontSize={18}>
                          {item?.student?.name}.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography fontSize={22} fontWeight="bold" my={2} px={4}>
            No Enrollments
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Course;
