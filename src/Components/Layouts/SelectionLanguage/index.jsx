import { makeStyles, Select } from "@material-ui/core";
import { languageList } from "Constants/constants";
import React from "react";
import { useTranslation } from "react-i18next";

SelectionLanguage.propTypes = {};

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.up("sm")]: {
    selectionLanguage: {
      // backgroundColor: "transparent",
      color: "white",
      "& option": {
        color: "black",
      },
    },
  },
}));

function SelectionLanguage({ onChangeLangue }) {
  const classes = useStyles();
  const handleChangeLanguage = (value) => {
    if (onChangeLangue) {
      console.log("language ", value);
      onChangeLangue(value);
    }
  };
  return (
    <div>
      <Select
        native
        className={classes.selectionLanguage}
        defaultValue={languageList.english}
        onChange={handleChangeLanguage}
        variant="standard"
        inputProps={{
          name: "age",
          id: "filled-age-native-simple",
        }}
      >
        <option value={languageList.vietNam}>Tiếng Việt</option>
        <option value={languageList.english}>English</option>
      </Select>
    </div>
  );
}

export default SelectionLanguage;
