import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { Box, Typography } from "@mui/material";

const LessonAccordion = ({
  courseLessons,
  width,
  setLesson,
  completedLessons,
  fromStartLearning,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel, lesson) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    fromStartLearning && setLesson(lesson);
  };

  return (
    <Box className={width && "Box lessons-accordion"}>
      {courseLessons?.length > 0 ? (
        courseLessons?.map((item) => {
          const { title, description, _id } = item;
          return (
            <Accordion
              expanded={expanded === `panel${_id}`}
              onChange={handleChange(`panel${_id}`, item)}
              sx={{ width: "100%" }}
              disabled={completedLessons?.find((cc) => cc?._id === _id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${_id}bh-content`}
                id={`panel${_id}bh-header`}
              >
                <Typography fontWeight="bold" fontSize={20}>
                  {title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{description}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <Typography textAlign="center" my={2} fontSize={22} fontWeight="bold">
          No lessons, instructor will upload lessons soon!!
        </Typography>
      )}
    </Box>
  );
};

export default LessonAccordion;
