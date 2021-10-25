import { AppBar, Box, InputBase, Toolbar, Typography } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";
import useStyles from "./styles";

export default function Header({ setCoordinates }) {
  const classes = useStyles();
  const [autoComplete, setAutoComplete] = useState(null);

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>Travel Advisor</Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>Explore new places</Typography>
          <Autocomplete
            onLoad={(data) => setAutoComplete(data)}
            onPlaceChanged={() => {
              const lat = autoComplete.getPlaces().geometry.location.lat();
              const lng = autoComplete.getPlaces().geometry.location.lng();
              setCoordinates({ lat, lng })
            }}
          >
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search..." classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  )
}