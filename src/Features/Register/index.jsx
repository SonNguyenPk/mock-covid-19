import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LoadingButton from "Components/LoadingButton";
import InputTextField from "Components/FormFields/inputTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SelectionLanguage from "Components/Layouts/SelectionLanguage";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    width: "100%",
    margin: theme.spacing(3, 0, 2),
    border: "0",
    padding: "0",
  },
  [theme.breakpoints.up("sm")]: {
    paper: {
      marginTop: theme.spacing(8),
    },
    changeLanguageButton: {
      "&>div>*": {
        color: "black",
      },
    },
  },
}));
const initialValues = { firstName: "", lastName: "", email: "", password: "" };

const schema = yup.object().shape({
  firstName: yup.string().required("You must fill your name"),
  lastName: yup.string().required("You must fill your name"),
  email: yup
    .string()
    .required("Please fill your email")
    // .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'you email is not valid'),
    .email(),
  password: yup
    .string()
    .required("Please enter your password")
    .min(5, "password must have at least 5 letters"),
});

export default function SignUp() {
  const classes = useStyles();
  const [t, i18n] = useTranslation();

  const form = useForm({
    mode: "onSubmit",
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleChangeLanguage = (value) => {
    i18n.changeLanguage(value);
  };
  const handleRegister = (data) => {
    JSON.stringify(window.localStorage.setItem("user"));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={form.handleSubmit(handleRegister)}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} marginTop="0">
              <InputTextField
                name="firstName"
                label="firstName"
                form={form}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6} marginTop="0">
              <InputTextField
                name="lastName"
                label="lastName"
                form={form}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <InputTextField name="email" label="email" form={form} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <InputTextField
                name="password"
                label="password"
                form={form}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox value="allowExtraEmails" color="primary" variant="outlined" />
                }
                label={t("common.signup_checkBox")}
              />
            </Grid>
          </Grid>
          <Box className={classes.submit} component="button" type="submit">
            <LoadingButton>{t("register")}</LoadingButton>
          </Box>

          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Link href="#" variant="body2">
                {t("common.signup_haveAccount")}
              </Link>
            </Grid>
            <Grid item className={classes.changeLanguageButton}>
              <SelectionLanguage onChangeLanguage={handleChangeLanguage} />
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}
