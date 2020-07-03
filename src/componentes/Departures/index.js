import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";

function Departures(props) {
  if (props.departures.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <h5>Departures</h5>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Track</th>
            <th>Name</th>
            <th>Origin</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {props.departures.map((item, key) => {
            const onlyTime = moment(item.dateTime).format("HH:mm");
            return (
              <tr key={key}>
                <td>{item.track}</td>
                <td>{decodeURIComponent(item.name)}</td>
                <td>{props.origin}</td>
                <td>{onlyTime}</td>
              </tr>
            );
          })}
          <tr></tr>
        </tbody>
      </Table>
    </React.Fragment>
  );
}

export default Departures;
