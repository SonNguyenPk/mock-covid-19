import { Box, Button, Container, Switch } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { createTheme, makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7OutlinedIcon from "@material-ui/icons/Brightness7Outlined";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { router } from "Constants/constants";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { checkLogin } from "Utilise/utilise";
import NavigationBar from "./NavigationBar";
import SelectionLanguage from "./SelectionLanguage";

const drawerWidth = "100vw";

const useStyles = makeStyles((theme) => ({
  mainAppBar: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarMenuButton: {
    display: "flex",
    // marginLeft: "-21px",
  },
  appBarHomeButton: {
    color: "white",
    marginLeft: "-12px",
  },
  appBarTitle: {
    display: "none",
  },
  appBarNavigation: {
    display: "none",
  },
  grow: {
    flex: "1 0 auto",
  },
  appBarSelectionLanguage: {
    display: "none",
  },

  appBarDarkModeButton: {
    height: "40px",
    margin: "0  8px",
  },

  sliderBar: {
    display: "flex",
  },

  drawer: {
    width: "100vw",
    flexShrink: 0,
  },

  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
    "& h6": {
      flex: "1 0 auto",
    },
  },
  navigationBarMobile: {
    "&>*": {
      flexFlow: "column nowrap",
      alignItems: "flex-start",
      "&>*": {
        width: "100%",
      },
    },
  },

  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: "-100%",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  // responsive
  [theme.breakpoints.up("sm")]: {
    appBarMenuButton: {
      display: "none",
    },
    appBarTitle: {
      display: "flex",
    },
    grow: {
      display: "none",
    },
    appBarSelectionLanguage: {
      display: "flex",
    },
    appBarNavigation: {
      display: "flex",
      flex: "1 0 auto",
      "&>*": {
        justifyContent: "center",
        "& button": {
          color: "white",
        },
      },
    },
    drawer: {
      display: "none",
    },
    content: {
      marginLeft: 0,
    },
  },
}));

export default function MainLayout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const modeThemeType = isDarkTheme ? "dark" : "light";
  const darkTheme = createTheme({
    palette: {
      type: modeThemeType,
    },
  });

  const handleChangeModeTheme = () => {
    if (isDarkTheme) {
      setIsDarkTheme(false);
    }
    if (!isDarkTheme) {
      setIsDarkTheme(true);
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.mainAppBar}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Container>
          <Toolbar disableGutters>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.appBarMenuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Link to={router.home}>
              <IconButton className={classes.appBarHomeButton} aria-label="Home">
                <HomeIcon />
              </IconButton>
            </Link>
            <Typography className={classes.appBarTitle} variant="h6" noWrap>
              Covid-19
            </Typography>
            <div className={classes.appBarNavigation}>
              <NavigationBar />
            </div>

            <div className={classes.grow}></div>
            <div className={classes.appBarSelectionLanguage}>
              <SelectionLanguage />
            </div>
            {/* Dark mode button */}
            <Switch
              className={classes.appBarDarkModeButton}
              icon={<Brightness7OutlinedIcon />}
              checkedIcon={<Brightness4Icon />}
              onChange={handleChangeModeTheme}
              checked={isDarkTheme}
            />
            {checkLogin() ? (
              <Button variant="contained" color="primary" size="small">
                Log out
              </Button>
            ) : (
              <Button variant="contained" color="primary" size="small">
                Log in
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Container>
          <div className={classes.drawerHeader}>
            <Typography variant="h6" noWrap>
              Covid-19
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <Box className={classes.navigationBarMobile}>
            <NavigationBar />
          </Box>
          <Divider />
          <Box mt="1rem">
            <SelectionLanguage />
          </Box>
        </Container>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Container>{props.children}</Container>
      </main>
    </div>
  );
}
