import { router } from "Constants/constants";
import { Redirect, Route } from "react-router-dom";
import { checkLogin } from "Utilise/utilise";

export const AuthRoute = ({ component: Component, ...rest }) => {
  <Route
    {...rest}
    render={(props) =>
      checkLogin() ? <Redirect to={router.login}/> : <Component {...props} />
    }
  />;
};

export const PrivateRoute = ({ component: Component , ...rest}) => {
    <Route 
        {...rest}
        render ={props =>
        checkLogin() ? <Component {...props} /> : <Redirect to={router.login} />
        }
    />

};
