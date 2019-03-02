import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import './index.scss';


class Salary extends React.Component {
  state = {
    dataLine: {
      labels: ["1987-06-26", "1988-06-25", "1990-06-25", '1993-06-24', '1994-06-24', '1995-06-24', '2000-06-22'],
      datasets: [
        {
          label: "Emils test data",
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(22,188,185,0.4)",
          borderColor: "rgba(22,188,185,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(22,188,185,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(22,188,185,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [12000, 12500, 13500, 13000, 14000, 15000, 15200]
        }
      ]
    }
  }

render() {
    return (
      <MDBContainer>
        <h1>Salary</h1>
        <h3 className="mt-5">Salary history</h3>
        <Line data={this.state.dataLine} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}

export default Salary;