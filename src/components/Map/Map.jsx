import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import { LocationOnOutlined } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import GoogleMapReact from "google-map-react";
import useStyles from "./styles";

export default function Map({ coordinates, setCoordinates, setBounds, places, setChildClicked }) {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDZFmFzHANgVJ7se8EcHUbLSejJzOh9Tgk' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{}}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, ind) => (
          <div 
            className={classes.markerContainer}
            lat={+place.latitude}
            lng={+place.longitude}
            key={ind}
          >
            {!isDesktop ? (
              <LocationOnOutlined color="primary" fontSize="large" />
            ) : (
              <Paper className={classes.paper} elevation={3}>
                <Typography className={classes.typography} gutterBottom variant="subtitle2">{place.name}</Typography>
                <img src={place?.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} className={classes.pointer} alt={place.name} />
                <Rating size="small" value={+place.rating} readOnly />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
}