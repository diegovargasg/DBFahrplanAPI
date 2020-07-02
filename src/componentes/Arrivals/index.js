import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import Alert from "react-bootstrap/Alert";

function Arrivals(props) {
  if (props.arrivals.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <h5>Arrivals</h5>
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
