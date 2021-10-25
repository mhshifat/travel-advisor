import { CssBaseline, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { getPlacesData } from "./api";
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";

export default function App() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    })
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
      setFilteredPlaces([]);
      setPlaces(data);
    }).finally(() => setIsLoading(false));
  }, [bounds, coordinates, type]);

  useEffect(() => {
    const filteredPlaces = places.filter(place => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating])

  return <>
    <CssBaseline />
    <Header setCoordinates={setCoordinates} />
    <Grid container spacing={3} style={{ width: "100%" }}>
      <Grid item xs={12} md={4}>
        <List isLoading={isLoading} childClicked={childClicked} places={filteredPlaces.length ? filteredPlaces : places} type={type} setType={setType} rating={rating} setRating={setRating} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Map places={filteredPlaces.length ? filteredPlaces : places} setChildClicked={setChildClicked} setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} />
      </Grid>
    </Grid>
  </>
}