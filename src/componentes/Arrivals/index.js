import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

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
            <th className="text-center">Track</th>
            <th>Name</th>
            <th>Origin</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {props.arrivals.map((item, key) => {
            const onlyTime = moment(item.dateTime).format("HH:mm");
            return (
              <OverlayTrigger
                delay={1000}
                key={key}
                trigger="hover"
                placement="right"
                overlay={
                  <Popover>
                    <Popover.Title as="h3" className="text-dark">
                      Response Object
                    </Popover.Title>
                    <Popover.Content>
                      <pre>{JSON.stringify(item, null, 2)}</pre>
                    </Popover.Content>
                  </Popover>
                }
              >
                <tr className="popover-contained">
                  <td className="text-center">{item.track}</td>
                  <td>{decodeURIComponent(item.name)}</td>
                  <td>{decodeURIComponent(item.origin)}</td>
                  <td>{onlyTime}</td>
                </tr>
              </OverlayTrigger>
            );
          })}
          <tr></tr>
        </tbody>
      </Table>
    </React.Fragment>
  );
}

export default Arrivals;
