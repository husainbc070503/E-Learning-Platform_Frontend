import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(catName, category, theme) {
  return {
    fontWeight:
      category.indexOf(catName) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CategoryField = ({ cats, setFilteredCats }) => {
  const theme = useTheme();
  const [category, setCategory] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(typeof value === "string" ? value.split(",") : value);
    setFilteredCats([...value]);
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="cats">Categories</InputLabel>
        <Select
          labelId="cats"
          id="cats"
          multiple
          value={category}
          onChange={handleChange}
          input={<OutlinedInput label="Categories" />}
          MenuProps={MenuProps}
        >
          {cats?.map((item, ind) => (
            <MenuItem
              key={ind}
              value={item?.name}
              style={getStyles(item?.name, category, theme)}
            >
              {item?.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CategoryField;
