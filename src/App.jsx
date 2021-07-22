import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import "App.scss";
import PageNotFound from "Components/PageNotFound";
import { AuthRoute } from "Components/ProtectedRoute";
import { router } from "Constants/constants";
import HomePage from "Features/Home/Pages/DashBoard";
import CountryDetail from "Features/Home/Pages/Detail";
import LoginPage from "Features/Login";
import NewsDetail from "Features/News/Pages/NewsDetail";
import NewsPage from "Features/News/Pages/NewsList";
import RegisterPage from "Features/Register";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <ThemeProvider>
      <CssBaseline>
        <Switch>
          <Route exact path={router.home} component={HomePage} />
          <Route path={router.news} component={NewsPage} />
          <AuthRoute path={`${router.homeDetail}/:country`} component={CountryDetail} />
          <AuthRoute path={`${router.homeDetail}/:id`} component={NewsDetail} />
          <Route path={router.login} component={LoginPage} />
          <Route path={router.register} component={RegisterPage} />
          <Route component={PageNotFound} />
        </Switch>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
