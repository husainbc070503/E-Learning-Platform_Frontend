import React, { useState } from "react";
import { useGlobalContext } from "../contexts/AppContext";
import { Box, Container, Grid, Typography } from "@mui/material";
import SearchBox from "../components/SearchBox";
import CourseCard from "../components/CourseCard";

const InstructDash = () => {
  const [search, setSearch] = useState("");
  const { user, courses } = useGlobalContext();
  const myCourses = courses?.filter(
    (item) => item?.instructor?._id === user?.user?._id
  );

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Typography fontSize={30} fontWeight="bold" mb={3} color="primary">
          Welcome, {user?.user?.name}
        </Typography>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mb={6}
          rowSpacing={3}
        >
          <Grid item md={6} xs={12}>
            <Typography fontSize={30} fontWeight="bold">
              Courses
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} textAlign="end">
            <SearchBox
              title="Course"
              search={search}
              handleChange={(e) => {
                let value = e.target.value;
                value = value.toLowerCase();
                setSearch(value);
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          {myCourses
            ?.filter((i) => i?.name.toLowerCase().includes(search))
            ?.map((item, ind) => (
              <Grid item md={4} xs={12} key={ind}>
                <CourseCard item={item} role={user?.user?.role} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default InstructDash;
