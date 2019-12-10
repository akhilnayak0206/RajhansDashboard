import React, { Component } from "react";
import { connect } from "react-redux";
import { OnAuth } from "../../store/actions/actions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Card, Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
// } from 'recharts';
import "../../styles/Home.css";

const data = [
  {
    name: "Page A",
    ch: 5,
    tc: 4,
    te: 7,
    bb: 2,
    amt: 1
  },
  {
    name: "Page B",
    ch: 3,
    tc: 1,
    te: 4,
    bb: 4,
    amt: 2
  },
  {
    name: "Page C",
    ch: 6,
    tc: 2,
    te: 1,
    bb: 6,
    amt: 3
  },
  {
    name: "Page D",
    ch: 2,
    tc: 5,
    te: 5,
    bb: 1,
    amt: 4
  },
  {
    name: "Page E",
    ch: 4,
    tc: 3,
    te: 1,
    bb: 3,
    amt: 5
  },
  {
    name: "Page F",
    ch: 1,
    tc: 6,
    te: 6,
    bb: 4,
    amt: 6
  }
];

const barData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ₹ ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Card
            style={{
              flex: "40%",
              margin: 5,
              // textAlign: "center",
              fontFamily: "'Open Sans', sans-serif",
              backgroundImage:
                "linear-gradient(45deg, #c31432 , #1832C4, #240b36)"
            }}
            // title="Total"
          >
            <Skeleton loading={false} paragraph={{ rows: 3 }}>
              <h1
                style={{
                  // textAlign: "center",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: "lighter",
                  fontSize: "40px",
                  margin: "0px",
                  color: "white"
                }}
              >
                <FontAwesomeIcon icon={faRupeeSign} />
                1234
              </h1>
              <p style={{ color: "white" }}>Total Collection</p>
              <BarChart width={150} height={40} data={data}>
                <Bar dataKey="tc" fill="#fff" />
              </BarChart>
            </Skeleton>
          </Card>
          <Card
            style={{
              flex: "40%",
              margin: 5,
              // textAlign: "center",
              fontFamily: "'Open Sans', sans-serif",
              backgroundImage:
                "linear-gradient(45deg, #310F84, #3494E6, #18B7C4)"
            }}
            // title="Total"
          >
            <Skeleton loading={false} paragraph={{ rows: 3 }}>
              <h1
                style={{
                  // textAlign: "center",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: "lighter",
                  fontSize: "40px",
                  margin: "0px",
                  color: "white"
                }}
              >
                <FontAwesomeIcon icon={faRupeeSign} />
                1234
              </h1>
              <p style={{ color: "white" }}>Cash In Hand</p>
              <BarChart width={150} height={40} data={data}>
                <Bar dataKey="ch" fill="#fff" />
              </BarChart>
            </Skeleton>
          </Card>
          <Card
            style={{
              flex: "40%",
              margin: 5,
              // textAlign: "center",
              fontFamily: "'Open Sans', sans-serif",
              backgroundImage:
                "linear-gradient(45deg, #240b36, #c31432, #cc2b5e)"
            }}
            // title="Total"
          >
            <Skeleton loading={false} paragraph={{ rows: 3 }}>
              <h1
                style={{
                  // textAlign: "center",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: "lighter",
                  fontSize: "40px",
                  margin: "0px",
                  color: "white"
                }}
              >
                <FontAwesomeIcon icon={faRupeeSign} />
                1234
              </h1>
              <p style={{ color: "white" }}>Total Expenses</p>
              <BarChart width={150} height={40} data={data}>
                <Bar dataKey="te" fill="#fff" />
              </BarChart>
            </Skeleton>
          </Card>
          <Card
            style={{
              flex: "40%",
              margin: 5,
              // textAlign: "center",
              fontFamily: "'Open Sans', sans-serif",
              backgroundImage:
                "linear-gradient(45deg, #1832C4, #310F84, #592E7C)"
            }}
            // title="Total"
          >
            <Skeleton loading={false} paragraph={{ rows: 3 }}>
              <h1
                style={{
                  // textAlign: "center",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: "lighter",
                  fontSize: "40px",
                  margin: "0px",
                  color: "white"
                }}
              >
                <FontAwesomeIcon icon={faRupeeSign} />
                1234
              </h1>
              <p style={{ color: "white" }}>Bank Collection</p>
              <BarChart width={150} height={40} data={data}>
                <Bar dataKey="bb" fill="#fff" />
              </BarChart>
            </Skeleton>
          </Card>
        </div>
        {/* 
        start below 4 cards sdljgzs sjfnzs kszbd ksdbASa skdfbSjkb
        remove thhis after complteting the page
        no use of this comment 
        only for development for Akhil to understand
         */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Card style={{ margin: 5 }}>
            <Skeleton paragraph={{ rows: 3 }} loading={false}>
            <h3 style={{ textAlign: "center" }}>Wing Contribution</h3>
              <div style={{ display: "flex" }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={barData}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="amt" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Skeleton>
          </Card>
          <Card style={{ margin: 5 }}>
            <Skeleton paragraph={{ rows: 3 }} loading={false}>
              <h3 style={{ textAlign: "center" }}>Jai Mitra Mandal</h3>
              <p style={{ color: "rgba(0,0,0,0.5)" }}>
                This website is made by Akhil Nayak if you have any doubt or
                suggestion you can contact me by emaili₹ng me to
                nnewn3@gmail.com
              </p>
            </Skeleton>
          </Card>
          <Card style={{ margin: 5 }}>
            <Skeleton paragraph={{ rows: 3 }} loading={false}>
              <h3 style={{ textAlign: "center" }}>Jai Mitra Mandal</h3>
              <p style={{ color: "rgba(0,0,0,0.5)" }}>
                This website is made by Akhil Nayak if you have any doubt or
                suggestion you can contact me by emailing me to nnewn3@gmail.com
              </p>
            </Skeleton>
          </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { firebase, auth } = state;
  return {
    firebase,
    auth
  };
}

export default compose(
  connect(mapStateToProps, {
    OnAuth
  })
)(Home);
