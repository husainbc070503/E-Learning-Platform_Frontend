import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useGlobalContext } from "../contexts/AppContext";

const SelectField = ({ value, onChange }) => {
  const { categories, user } = useGlobalContext();
  const myCats = categories?.filter(
    (item) => item?.instructor?._id === user?.user?._id
  );

  return (
    <FormControl fullWidth>
      <InputLabel id="category">Category</InputLabel>
      <Select
        labelId="category"
        id="select-cat"
        value={value}
        label="Category"
        onChange={onChange}
        name="category"
      >
        {myCats?.map((item) => (
          <MenuItem value={item._id}>{item.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
