const cities = [
  {
    id: '2379574',
    name: 'Chicago'
  },
  {
    id: '2490383',
    name: 'Seattle'
  },
  {
    id: '2459115',
    name: 'New York City'
  },
  {
    id: '2442047',
    name: 'Los Angeles'
  },
  {
    id: '2424766',
    name: 'Houston',
  },
  {
    id: '2471390',
    name: 'Phoenix',
  },
  {
    id: '2471217',
    name: 'Philadelphia',
  },
  {
    id: '2487796',
    name: 'San Antonio'
  },
  {
    id: '2487889',
    name: 'San Diego',
  },
  {
    id: '2388929',
    name: 'Dallas'
  }
];

const useDataApi = (initialUrl, initialData) => {
  const { useState, useEffect, useReducer } = React;
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};


// App that gets data from Hacker News url
function App() {
  const { useState, useEffect, useReducer } = React;
  const [city, setCity] = useState("2379574");
  const { Button } = ReactBootstrap;
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "https://thingproxy.freeboard.io/fetch/https://www.metaweather.com/api/location/2379574",
    {
      consolidated_weather: []
    }
  );

  let page = data.consolidated_weather;

  return (
    <div className="container">

      <div className="row mt-5 mb-2">
        <form className="form-row"
          onSubmit={event => {
            doFetch(`https://thingproxy.freeboard.io/fetch/https://www.metaweather.com/api/location/${city}`);
            event.preventDefault();
          }}
        >

          <div className="mr-2">
            <label htmlFor="city" className="control-label">Select city:</label>
          </div>
          <div className="input-group">
            <select className="form-control" name="city" id="cities" onChange={
              event => { setCity(event.target.value) }
            }>
              {cities.map(city => (
                <option key={city.name} value={city.id}>{city.name}</option>
              ))}
            </select>

            <Button className="form-control" variant="primary" type="submit">Show</Button>
          </div>
        </form>
      </div>

      {isError && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div className="d-flex justify-content-center">
        <div className="spinner spinner-border" role="status" style={{width: '200px', height: '200px'}}>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      ) : (
        <div className="row">
          {page.filter((el, index) => index != 0).map(item => (
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-4" key={item.applicable_date}>
              <h3 className="date">
                {new Date(item.applicable_date).toLocaleDateString()}
              </h3>

              <dl>
                <dt>Weather</dt>

                <dd className="weatherstate">
                  <div className={`state-icon-sml state-${item.weather_state_abbr}`}></div>
                  <span className="hidden-xs hidden-sm">{item.weather_state_name}</span>
                </dd>

                <dt>Temperature</dt>
                <dd>
                    Max: {Math.round(item.max_temp)}°C<br />
                    Min: {Math.round(item.min_temp)}°C
                </dd>

                <dt>Wind</dt>
                <dd className="wind">
                  <span className={`dir dir-${item.wind_direction_compass}`}></span>
                  {Math.round(item.wind_speed)} mph
                </dd>

                <dt className="humidity">Humidity</dt>
                <dd> {item.humidity}%</dd>

                <dt className="visibility">Visibility</dt>
                <dd> {Math.round(item.visibility)} miles</dd>

                <dt className="dewpoint">Pressure</dt>
                <dd> {Math.round(item.air_pressure)} mb</dd>

              </dl>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ========================================
ReactDOM.render(<App />, document.getElementById("root"));
