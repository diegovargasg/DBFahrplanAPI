import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";

function Arrivals(props) {
  return (
    <React.Fragment>
      <h3>Arrivals for {props.date}:</h3>
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
          {props.arrivals.map((item) => {
            const onlyTime = moment(item.dateTime).format("HH:mm");
            return (
              <tr>
                <td>{item.track}</td>
                <td>{decodeURIComponent(item.name)}</td>
                <td>{decodeURIComponent(item.origin)}</td>
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

export default Arrivals;
