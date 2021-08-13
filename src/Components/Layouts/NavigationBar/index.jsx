import { Box, Button, Divider, makeStyles } from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { router } from "Constants/constants";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory } from "react-router-dom";
import { checkLogin } from "Utilise/utilise";

const useStyles = makeStyles((theme) => ({
  appBarNavigation: {
    display: "flex",
    width: "100%",
    "&>a": {
      textDecoration: "none",
      "& button": {
        marginRight: "16px",
      },
    },
    "& a.active": {
      "& button": {
        color: "red",
      },
    },
  },
}));

function NavigationBar(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  const handleCheckLogin = () => {
    if (!checkLogin()) {
      alert("you must login to see Home page");
    }
  };
  return (
    <Box className={classes.appBarNavigation}>
      <NavLink exact to={router.home}>
        <Button onClick={handleCheckLogin} startIcon={<HomeOutlinedIcon />}>
          {t("common.home")}
        </Button>
      </NavLink>
      <Divider />
      <NavLink to={router.news}>
        <Button startIcon={<WhatshotIcon />}>{t("common.news")}</Button>
      </NavLink>
    </Box>
  );
}

export default NavigationBar;
