import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";

function Departures(props) {
  return (
    <React.Fragment>
      <h3>Departures for {props.date}:</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Track</th>
            <th>Name</th>
            <th>Oraigin</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {props.departures.map((item) => {
            const onlyTime = moment(item.dateTime).format("HH:mm");
            return (
              <tr>
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
