import {
  Avatar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useGlobalContext } from "../contexts/AppContext";
import DeleteIcon from "@mui/icons-material/Delete";

const CommentsTable = ({ comments }) => {
  const { deleteComment, user } = useGlobalContext();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {[
              "User",
              "Comment",
              user?.user?.role === "student" && "Action",
            ].map((item, ind) => (
              <TableCell key={ind}>
                <Typography fontSize={22} fontWeight="bold">
                  {item}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {comments?.map((item, ind) => {
            return (
              <TableRow key={ind}>
                <TableCell align="center">
                  <Grid container spacing={2} alignItems="center">
                    <Grid item md={2} xs={12}>
                      <Avatar src={item?.user?.profile} alt={item?.user?.name} />
                    </Grid>
                    <Grid item md={10} xs={12}>
                      <Typography fontSize={16} textAlign="start">
                        {item?.user?.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Typography fontSize={18} textAlign="justify">
                    {item?.comment}
                  </Typography>
                </TableCell>
                <TableCell>
                  {user?.user?.role === "student" && (
                    <DeleteIcon
                      className="fs-5 icon text-danger ms-4"
                      onClick={() => deleteComment(item?._id)}
                    />
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommentsTable;
