import { makeStyles, Select } from "@material-ui/core";
import { languageList } from "Constants/constants";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

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

function SelectionLanguage({ onChangeLanguage, currentLanguage }) {
  const classes = useStyles();
  const handleChangeLanguage = (e) => {
    if (onChangeLanguage) {
      console.log("language ", e.target.value);
      onChangeLanguage(e.target.value);
    }
  };
  return (
    <div>
      <Select
        native
        className={classes.selectionLanguage}
        onChange={handleChangeLanguage}
        value={currentLanguage || "en"}
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
