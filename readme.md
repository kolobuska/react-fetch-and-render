# React weather
## Overview
***React weather*** is a coding exercise for MIT xPRO [Front-End Development with React](https://executive-ed.xpro.mit.edu/front-end-development-react) program.

This challenge has the following goals:
* Fetch, and render data from external source with React
* Practice with fetch or [Axios](https://github.com/axios/axios) library
* Practice with React hooks: 
    * [useState] (https://reactjs.org/docs/hooks-state.html)
    * [useEffect] (https://reactjs.org/docs/hooks-effect.html)
    * [useReducer] (https://reactjs.org/docs/hooks-reference.html)
* Practice with bootstrap and styling
* Practice with github readme files

The data for this project is retrieved from [Metaweather](https://www.metaweather.com/api/).
## Features
***React weather*** project has the following features:
* Weather forecast is shown for the next 5 days, including weather, temperature, wind, humidity, pressure and visability
* Users are able to select city from the list (the biggest 10 US cities are available)


![image]()

### API Calls
To get the weather forecast, the following API query is used:
```
https://www.metaweather.com/api/location/{locationId}
```
The response looks like this:
```
 "consolidated_weather": [{
            "id": 6178471467286528,
            "weather_state_name": "Heavy Rain",
            "weather_state_abbr": "hr",
            "wind_direction_compass": "S",
            "created": "2021-05-15T21:36:20.103605Z",
            "applicable_date": "2021-05-15",
            "min_temp": 11.365,
            "max_temp": 15.29,
            "the_temp": 16.05,
            "wind_speed": 5.21845939581113,
            "wind_direction": 174.8359094193603,
            "air_pressure": 1024.0,
            "humidity": 64,
            "visibility": 7.071204167660861,
            "predictability": 77
        },
```

To bypass CORS restrictions from the API, service [Thingproxy](https://thingproxy.freeboard.io/) is used.
Request is modified like 
```
https://thingproxy.freeboard.io/fetch/https://www.metaweather.com/api/locationId
```

## Getting Started
To run the project locally,
1. Clone this repo.
2. ```cd``` into current directory.
3. Run local webserver (e.g. http-server -c-1 for the simple node.js server)
4. Navigate to  ```index.html```.

## Possible improvements
1. Show current time, sunrise and sunset for the city (info is already available from the API)
2. Add settings to change units (e.g. F or C)
3. Possibility to add more citites (or autocomplete input which allows to search by city)