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
  PieChart,
  Pie,
  Sector,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Treemap
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
  }
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

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 278 },
  { name: "Group F", value: 189 }
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#008800",
  "#FBFB28"
];

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 15} dy={8} textAnchor="middle" fill={fill}>
        ₹{payload.value}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

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
          <Card
            style={{ margin: 5 }}
            bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <Skeleton paragraph={{ rows: 3 }} loading={false}>
              <h3 style={{ textAlign: "center" }}>Wing Contribution</h3>
              <div style={{ display: "flex", paddingRight: "24px" }}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
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
          {/* Added below */}
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            <Card
              className="card-tree"
            >
            <Skeleton loading={false} paragraph={{ rows: 3 }}>
                <h3 style={{ textAlign: "center" }}>Total Contribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <Treemap
                    data={pieData}
                    dataKey="value"
                    ratio={4 / 3}
                    stroke="#fff"
                    fill="#8884d8"
                  />
                </ResponsiveContainer>
              </Skeleton>
            </Card>
            <Card style={{ margin: 5, flex: "40%" }}>
              <Skeleton paragraph={{ rows: 3 }} loading={false}>
                <h3 style={{ textAlign: "center" }}>Total Contribution</h3>
                <ResponsiveContainer width="90%" height={300}>
                  <PieChart>
                    <Pie
                      activeIndex={this.state.activeIndex}
                      activeShape={renderActiveShape}
                      dataKey="value"
                      data={pieData}
                      cx={"55%"}
                      cy={150}
                      fill="#8884d8"
                      outerRadius={80}
                      innerRadius={60}
                      onMouseEnter={this.onPieEnter}
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Skeleton>
            </Card>
          </div>
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

// <PieChart>
// <Pie
//   dataKey="value"
//   data={pieData}
//   cx={"50%"}
//   cy={150}
//   fill="#8884d8"
//   outerRadius={80}
//   labelLine={false}
//   label={renderCustomizedLabel}
// >
//   {data.map((entry, index) => (
//     <Cell
//       key={`cell-${index}`}
//       fill={COLORS[index % COLORS.length]}
//     />
//   ))}
// </Pie>
// </PieChart>

// const sin = Math.sin(-RADIAN * midAngle);
// const cos = Math.cos(-RADIAN * midAngle);
// const sx = cx + (outerRadius + 10) * cos;
// const sy = cy + (outerRadius + 10) * sin;
// const mx = cx + (outerRadius + 30) * cos;
// const my = cy + (outerRadius + 30) * sin;
// const ex = mx + (cos >= 0 ? 1 : -1) * 22;
// const ey = my;
// const textAnchor = cos >= 0 ? "start" : "end";

{
  /* <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`₹ ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text> */
}
