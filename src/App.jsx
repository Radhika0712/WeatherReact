import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import {
  CircularProgress,
  createTheme,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import {grey} from "@mui/material/colors";
import SearchCity from "./components/Searchbar/SearchCity";
import Landing from "./components/Landing/Landing";
import {useState } from "react";
import useGetWeather from "./hooks/useGetWeather";
import WeatherContent from "./components/Weather/WeatherContent";

const theme = createTheme({
  palette: {
    primary: {
      light: grey[100],
      main: grey[300],
      dark: grey[500],
    },
    secondary: {
      main: "#ade8f4",
    },
  },
  typography: {
    fontFamily: ["Poppins"],

    h5:{
      '@media(max-width:500px)':{
        fontSize:"1.3em"
      }
    },
    h6:{
      '@media(max-width:500px)':{
        fontSize:"0.8em"
      }
    },
    body1:{
      '@media(max-width:500px)':{
        fontSize:"0.7em"
      }
    },
    body2:{
      '@media(max-width:500px)':{
        fontSize:"0.7em"
      }
    }



  },
});

function App() {
  const { isLoading, getCoordinatesData, weatherInfo, errorState } =
    useGetWeather();

  const [isInitial, setIsInitial] = useState(true);

  let appContent;

  if (errorState)
    appContent = (
      <Stack
        width={"100%"}
        height={"85%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="h6" color={"primary"}>
          {errorState}
        </Typography>
      </Stack>
    );
  else if (isInitial) appContent = <Landing />;
  else if (isLoading)
    appContent = (
      <Stack
        width={"100%"}
        height={"85%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CircularProgress />
      </Stack>
    );
  else
    appContent = (
      <WeatherContent
        currentWeatherData={weatherInfo[0]}
        todayForecastData={weatherInfo[1]}
        weekForecastData={weatherInfo[2]}
      />
    );

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Navbar />
        <SearchCity
          findCoordinates={getCoordinatesData}
          changeIsInitial={setIsInitial}
        />

        {appContent}
      </main>
    </ThemeProvider>
  );
}

export default App;
