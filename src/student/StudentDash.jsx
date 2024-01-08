import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useGlobalContext } from "../contexts/AppContext";
import SearchBox from "../components/SearchBox";
import CourseCard from "../components/CourseCard";
import CategoryField from "../components/CategoryField";

const StudentDash = () => {
  const { user, courses, categories, enrollments } = useGlobalContext();
  const [filteredCats, setFilteredCats] = useState([]);
  const [search, setSearch] = useState("");

  const handleFilter = (arr) => {
    return arr.filter((course) => {
      const obj = enrollments?.find(
        (item) =>
          item?.student?._id === user?.user?._id &&
          item?.course?._id === course?._id
      );

      return obj?.course?._id !== course?._id;
    });
  };

  const allCourses = handleFilter(courses);
  var tempCourses = filteredCats?.map((catName) =>
    courses?.filter((item) => item?.category?.name === catName)
  );

  tempCourses = tempCourses?.map((arr) => {
    return handleFilter(arr);
  });

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Typography fontSize={32} fontWeight="bold" mb={3} color="primary">
          Welcome, {user?.user?.name}
        </Typography>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mb={6}
          rowSpacing={3}
        >
          <Grid item md={4} xs={12}>
            <Typography fontSize={25} fontWeight="bold">
              Available Courses
            </Typography>
          </Grid>
          <Grid item md={8} xs={12} textAlign="end">
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <CategoryField
                  cats={categories}
                  setFilteredCats={setFilteredCats}
                />
              </Grid>
              <Grid item md={6} xs={12}>
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
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          {tempCourses.length > 0
            ? tempCourses?.map((arr) =>
                arr
                  ?.filter((i) => i?.name.toLowerCase().includes(search))
                  ?.map((course, ind) => {
                    return (
                      <Grid item md={4} xs={12} key={ind}>
                        <CourseCard item={course} role={user?.user?.role} />
                      </Grid>
                    );
                  })
              )
            : allCourses
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

export default StudentDash;
