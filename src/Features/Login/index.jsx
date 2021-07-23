import { yupResolver } from "@hookform/resolvers/yup";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import InputTextField from "Components/FormFields/inputTextField";
import { router } from "Constants/constants";
import { useSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://source.unsplash.com">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light" ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const initialValues = { email: "", password: "" };

const schema = yup.object().shape({
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

export default function LoginPage() {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [t, i18n] = useTranslation();
  const form = useForm({
    mode: "onSubmit",
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleSubmitLogin = async (data) => {
    window.localStorage.setItem("user", JSON.stringify(data));
    enqueueSnackbar("Login successfully", {
      variant: "success",
      preventDuplicate: true,
    });
    history.push(router.home);
  };

  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t("common.login")}
          </Typography>
          <form className={classes.form} onSubmit={form.handleSubmit(handleSubmitLogin)}>
            <InputTextField name="email" label="email" form={form} />
            <InputTextField name="password" label="password" form={form} />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label={t("common.login_remember")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {t("common.login")}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  {t("common.login_forgotPassword")}
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {t("common.login_haveAccount")}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
