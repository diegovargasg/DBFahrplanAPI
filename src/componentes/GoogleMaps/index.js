import React from "react";
import GoogleMapReact from "google-map-react";

const MAPS_KEY = process.env.REACT_APP_MAPS_KEY;

function GoogleMaps(props) {
  return (
    <React.Fragment>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: MAPS_KEY,
        }}
        center={{
          lat: props.lat,
          lng: props.lng,
        }}
        defaultZoom={15}
        distanceToMouse={() => {}}
      >
        <div lat={props.lat} lng={props.lng} className="mapMaker">
          <div className="inner">DB</div>
        </div>
      </GoogleMapReact>
    </React.Fragment>
  );
}

export default GoogleMaps;
