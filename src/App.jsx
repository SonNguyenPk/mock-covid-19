import { CssBaseline } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "App.scss";
import PageNotFound from "Components/PageNotFound";
import { PrivateRoute } from "Components/ProtectedRoute";
import { AuthRoute } from "Components/ProtectedRoute";
import { router } from "Constants/constants";
import HomePage from "Features/Home/Pages/DashBoard";
import CountryDetail from "Features/Home/Pages/Detail";
import LoginPage from "Features/Login";
import NewsDetail from "Features/News/Pages/NewsDetail";
import NewsPage from "Features/News/Pages/NewsList";
import RegisterPage from "Features/Register";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

function App() {
  const globalState = useSelector((state) => state.global);
  const { i18n } = useTranslation();
  const theme = createTheme({
    palette: {
      type: globalState.themeMode,
    },
  });

  useEffect(() => {
    i18n.changeLanguage(globalState.language);
  }, [globalState]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Switch>
          <PrivateRoute exact path={router.home} component={HomePage} />
          <Route path={router.news} component={NewsPage} />
          <PrivateRoute
            path={`${router.homeDetail}/:country`}
            component={CountryDetail}
          />
          <Route path={`${router.news}/:id`} component={NewsDetail} />
          <AuthRoute path={router.login} component={LoginPage} />
          <Route path={router.register} component={RegisterPage} />
          <Route component={PageNotFound} />
        </Switch>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
