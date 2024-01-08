import {
  Box,
  Button,
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
import React, { useState } from "react";
import InputField from "../components/InputField";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from "../contexts/AppContext";

const Categories = () => {
  const [value, setValue] = useState("");
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");

  const { categories, user, addCategory, editCategory, deleteCategory } =
    useGlobalContext();

  const myCats = categories?.filter(
    (item) => item?.instructor?._id === user?.user?._id
  );

  return (
    <Container maxWidth="lg" className="container">
      <Box>
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item md={6} xs={12}>
            <Typography fontSize={28} fontWeight="bold" color="primary" mb={4}>
              {!edit ? "Add" : "Edit"} Category
            </Typography>
            <InputField
              title="Category Name"
              type="text"
              others="name"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button
              color="success"
              variant="contained"
              onClick={() =>
                edit
                  ? editCategory(value, id, setValue, setEdit)
                  : addCategory(value, setValue)
              }
            >
              {!edit ? "Add" : "Edit"}
            </Button>
            {edit && (
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  setEdit(false);
                  setValue("");
                }}
                className="mx-4"
              >
                Cancel Editing
              </Button>
            )}
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography
              fontSize={28}
              fontWeight="bold"
              color="secondary"
              mb={4}
            >
              Categories
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {["Sr.No.", "Catergory", "Action"].map((item, ind) => (
                      <TableCell align="center" key={ind}>
                        <Typography fontWeight="bold" fontSize={20}>
                          {item}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myCats?.map((item, ind) => {
                    const { name, _id } = item;
                    return (
                      <TableRow>
                        <TableCell align="center">{ind + 1}.</TableCell>
                        <TableCell align="center">
                          <Typography>{name}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <EditIcon
                            className="icon fs-5"
                            color="yellow"
                            onClick={() => {
                              setEdit(true);
                              setValue(name);
                              setId(_id);
                            }}
                          />
                          <DeleteIcon
                            className="icon mx-2 fs-5"
                            color="error"
                            onClick={() => deleteCategory(_id)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow></TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Categories;
