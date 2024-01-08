import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { green, orange } from "@mui/material/colors";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { AppContext } from "./contexts/AppContext";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import AddCourse from "./instructor/AddCourse";
import EditCourse from "./instructor/EditCourse";
import Categories from "./instructor/Categories";
import Course from "./instructor/Course";
import CourseDetails from "./student/CourseDetails";
import EnrolledCourses from "./student/EnrolledCourses";
import StartLearning from "./student/StartLearning";

function App() {
  const theme = createTheme({
    palette: {
      primary: green,
      secondary: orange,
    },

    typography: {
      fontFamily: "Poltawski Nowy",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppContext>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addCourse" element={<AddCourse />} />
            <Route path="/editCourse/:id" element={<EditCourse />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/course/:id" element={<Course />} />
            <Route path="/courseDetails/:id" element={<CourseDetails />} />
            <Route path="/enrolledCourses" element={<EnrolledCourses />} />
            <Route path="/startLearning/:id" element={<StartLearning />} />
          </Routes>
        </AppContext>
      </BrowserRouter>
      <ToastContainer transition={Zoom} />
    </ThemeProvider>
  );
}

export default App;
