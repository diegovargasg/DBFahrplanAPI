import React, { useState, Fragment } from "react";
import _ from "lodash";
import moment from "moment";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Arrivals from "./componentes/Arrivals";
import Departures from "./componentes/Departures";
import Api from "./Api";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import GoogleMapReact from "google-map-react";

const now = moment();
const MAPS_KEY = process.env.REACT_APP_MAPS_KEY;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [lat, setLat] = useState(50.1096947);
  const [lng, setlng] = useState(8.6669987);
  const [name, setName] = useState("");
  const [arrivals, setArrivals] = useState([]);
  const [departures, setDepartures] = useState([]);
  const [arrivalsError, setArrivalsErrors] = useState({});
  const [departuresError, setDeparturesErrors] = useState({});

  const handleSearch = async (query) => {
    try {
      setIsLoading(true);
      const response = await Api.get(`/location/${query}`);
      const parsedOpt = response.data.map((item) => {
        return {
          name: item.name,
          id: item.id,
          lat: item.lat,
          lon: item.lon,
        };
      });

      setOptions(parsedOpt);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (item) => {
    if (item.length === 0) {
      return;
    }

    setLat(item[0].lat);
    setlng(item[0].lon);
    setName(item[0].name);
    const id = item[0].id;
    await Promise.all[(handleArrivals(id), handleDepartures(id))];
  };

  const handleArrivals = async (id) => {
    try {
      const date = now.format("YYYY-MM-DD");
      const response = await Api.get(`/arrivalBoard/${id}?date=${date}`);
      setArrivals(response.data);
      setArrivalsErrors({});
    } catch (error) {
      setArrivalsErrors({
        title: "Something went wrong fetching arrivals",
        message: error.message,
      });
    }
  };

  const handleDepartures = async (id) => {
    try {
      const date = now.format("YYYY-MM-DD");
      const response = await Api.get(`/departureBoard/${id}?date=${date}`);
      setDepartures(response.data);
      setDeparturesErrors({});
    } catch (error) {
      setDeparturesErrors({
        title: "Something went wrong fetching departures",
        message: error.message,
      });
    }
  };

  return (
    <Container fluid className="h-100">
      <Row className="h-100">
        <Col xs={12} md={5}>
          <Form className="mt-5">
            <Form.Group controlId="name">
              <h5>Location:</h5>
              <AsyncTypeahead
                id="name"
                isLoading={isLoading}
                labelKey="name"
                minLength={3}
                onSearch={handleSearch}
                onChange={handleChange}
                options={options}
                placeholder="Search for a DB station..."
                renderMenuItemChildren={(option) => {
                  return (
                    <Fragment>
                      <span>{option.name}</span>
                    </Fragment>
                  );
                }}
              />
            </Form.Group>
          </Form>
          {(!_.isEmpty(departures) || !_.isEmpty(arrivals)) && (
            <h2 className="mt-5 mb-5 text-center">
              Schedule for {now.format("dddd, MMMM D YYYY")}
            </h2>
          )}
          {!_.isEmpty(departuresError) && (
            <Alert variant="danger">
              <Alert.Heading>{departuresError.title}</Alert.Heading>
              <p>{departuresError.message}</p>
            </Alert>
          )}
          <Departures departures={departures} origin={name} />
          {!_.isEmpty(arrivalsError) && (
            <Alert variant="danger">
              <Alert.Heading>{arrivalsError.title}</Alert.Heading>
              <p>{arrivalsError.message}</p>
            </Alert>
          )}
          <Arrivals arrivals={arrivals} />
        </Col>
        <Col xs={12} md={7} className="h-100">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: MAPS_KEY,
            }}
            center={{
              lat: lat,
              lng: lng,
            }}
            defaultCenter={{
              lat: 50.1096947,
              lng: 8.6669987,
            }}
            defaultZoom={15}
          ></GoogleMapReact>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
