import { Box, Button, CssBaseline, Switch } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7OutlinedIcon from '@material-ui/icons/Brightness7Outlined';
import 'App.scss';
import { useState } from 'react';

function App() {
  // const [isDarkTheme, setIsDarkTheme] = useState(false);
  // const modeThemeType = isDarkTheme ? 'dark' : 'light';
  // const darkTheme = createTheme({
  //   palette: {
  //     type: modeThemeType,
  //   },
  // });

  // const handleChangeModeTheme = () => {
  //   if (isDarkTheme) {
  //     setIsDarkTheme(false);
  //   }
  //   if (!isDarkTheme) {
  //     setIsDarkTheme(true);
  //   }
  // };

  return (
    // <ThemeProvider theme={darkTheme}>
    //   <CssBaseline>
    //     <Box className="app" width="100vw" height="100vh">
    //       <Switch
    //         icon={<Brightness7OutlinedIcon />}
    //         checkedIcon={<Brightness4Icon />}
    //         onChange={handleChangeModeTheme}
    //         checked={isDarkTheme}
    //       />
    //       <Button variant="contained" color="primary">
    //         Dark/light
    //       </Button>
    //     </Box>
    //   </CssBaseline>
    // </ThemeProvider>
  );
}

export default App;
