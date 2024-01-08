import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../contexts/AppContext";

const AdminDash = () => {
  const { courses, lessons, enrollments, users } = useGlobalContext();
  const condition = (color) =>
    color === "danger" || color === "success" || color === "secondary";
  const data = [
    {
      title: "Instructors",
      length: users?.filter((user) => user.role === "instructor").length,
      icon: <i className="fa-solid fa-chalkboard-user"></i>,
      color: "success",
    },
    {
      title: "Students",
      length: users?.filter((user) => user.role === "student").length,
      icon: <i className="fa-solid fa-graduation-cap"></i>,
      color: "info",
    },
    {
      title: "Courses",
      length: courses?.length,
      icon: <i class="fa-solid fa-paperclip"></i>,
      color: "warning",
    },
    {
      title: "Lessons",
      length: lessons?.length,
      icon: <i className="fa-solid fa-book"></i>,
      color: "secondary",
    },
    {
      title: "Enrollments",
      length: enrollments?.length,
      icon: <i class="fa-solid fa-check"></i>,
      color: "danger",
    },
  ];

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Typography fontSize={34} fontWeight="bold" color="primary">
          Dashboard
        </Typography>
        <Grid container rowGap={6} columnSpacing={4} my={3}>
          {data.map((item) => {
            const { title, length, icon, color } = item;
            return (
              <Grid key={title} item md={6} xs={12}>
                <div
                  className={`dash-card shadow shadow-lg bg-${color} rounded-2 px-4 py-3 position-relative`}
                >
                  <div className="inner">
                    <Typography
                      fontSize={40}
                      fontWeight="bold"
                      mb={1}
                      className={condition(color) && "text-white"}
                    >
                      {length}
                    </Typography>
                    <Typography
                      fontSize={20}
                      className={condition(color) && "text-white"}
                    >
                      {title}
                    </Typography>
                  </div>
                  <div
                    className={`
                      ${condition(color) && "text-white"}
                      position-absolute top-50 end-0 translate-middle fs-1`}
                  >
                    {icon}
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDash;
