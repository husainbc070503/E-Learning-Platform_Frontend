import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import React from "react";
import HomeImg1 from "../assets/home-img-1.png";
import HomeImg2 from "../assets/home-img-2.png";
import { useGlobalContext } from "../contexts/AppContext";
import AdminDash from "../admin/AdminDash";
import InstructDash from "../instructor/InstructDash";
import StudentDash from "../student/StudentDash";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <Container className="container">
      <Box>
        {!user?.user ? (
          <Grid container columnSpacing={2}>
            <Grid item md={6}>
              <Typography
                fontSize={45}
                fontWeight="bold"
                mb={2}
                className="Typography heading"
              >
                E-Learning Platform
              </Typography>
              {[
                "Welcome to the future of education with e-learning platforms, where knowledge meets innovation. These dynamic online spaces transcend geographical boundaries, offering learners unparalleled accessibility and flexibility. As a transformative force, e-learning caters to diverse learning styles, fostering personalized educational journeys. Embracing cutting-edge technologies, these platforms empower users with interactive content, fostering engagement and deepening understanding. From the comfort of your own space, embark on a seamless learning experience that not only saves time but also cultivates a global community of learners, breaking down barriers and democratizing education for all.",
                "In the ever-evolving landscape of education, e-learning platforms serve as catalysts for continuous growth and skill development. Harnessing the power of digital resources, these platforms facilitate self-paced learning, enabling individuals to acquire knowledge at their own convenience.",
              ].map((item) => {
                return (
                  <Typography
                    fontSize={16}
                    color="GrayText"
                    textAlign="justify"
                    mb={2}
                    key={item}
                  >
                    {item}
                  </Typography>
                );
              })}
              <Link href="https://en.wikiversity.org/wiki/E-Learning" mr={2}>
                <Button
                  color="primary"
                  variant="contained"
                  className="text-light mt-3"
                >
                  Learn More
                </Button>
              </Link>
              <Button
                color="secondary"
                variant="contained"
                className="text-light mt-3"
                onClick={() => navigate("../auth")}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item md={6} className="Grid home">
              <img src={HomeImg1} alt="img1" className="home-img" />
              <img src={HomeImg2} alt="img1" className="home-img" />
            </Grid>
          </Grid>
        ) : user?.user?.role === "admin" ? (
          <AdminDash />
        ) : user?.user?.role === "instructor" ? (
          <InstructDash />
        ) : (
          <StudentDash />
        )}
      </Box>
    </Container>
  );
};

export default Home;
