import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  OnAuth,
  OnGetData,
  OnAddData,
  OnDeleteData,
  OnSetData,
  OnTotalData
} from '../../store/actions/actions';
import { compose } from 'redux';
import { Card, Skeleton, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRupeeSign } from '@fortawesome/free-solid-svg-icons';
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
  Treemap
} from 'recharts';
import '../../styles/Home.css';

const data = [
  {
    name: 'Page A',
    ch: 5,
    tc: 4,
    te: 7,
    bb: 2,
    amt: 1
  },
  {
    name: 'Page BB',
    ch: 3,
    tc: 1,
    te: 4,
    bb: 4,
    amt: 2
  },
  {
    name: 'Page C',
    ch: 6,
    tc: 2,
    te: 1,
    bb: 6,
    amt: 3
  },
  {
    name: 'Page D',
    ch: 2,
    tc: 5,
    te: 5,
    bb: 1,
    amt: 4
  },
  {
    name: 'Page E',
    ch: 4,
    tc: 3,
    te: 1,
    bb: 3,
    amt: 5
  },
  {
    name: 'Page F',
    ch: 1,
    tc: 6,
    te: 6,
    bb: 4,
    amt: 6
  }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className='custom-tooltip'>
        <p className='label'>{`${label} : ₹ ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#008800',
  '#FBFB28'
];

const renderActiveShape = props => {
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
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 15} dy={8} textAnchor='middle' fill={fill}>
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

const TREE_COLORS = [
  '#8889DD',
  '#9597E4',
  '#8DC77B',
  '#A5D297',
  '#E2CF45',
  '#F8C12D'
];

class CustomizedContent extends PureComponent {
  render() {
    const {
      root,
      depth,
      x,
      y,
      width,
      height,
      index,
      payload,
      colors,
      rank,
      name
    } = this.props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill:
              depth < 2
                ? colors[Math.floor((index / root.children.length) * 6)]
                : 'none',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10)
          }}
        />
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor='middle'
            fill='#fff'
            fontSize={14}
          >
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text
            x={x + 4}
            y={y + 18}
            fill='#fff'
            fontSize={16}
            fillOpacity={0.9}
          >
            {index + 1}
          </text>
        ) : null}
      </g>
    );
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      totalData: {},
      barData: [
        {
          name: 'Wing A',
          amt: 0
        },
        {
          name: 'Wing B',
          amt: 0
        },
        {
          name: 'Wing C',
          amt: 0
        },
        {
          name: 'Wing D',
          amt: 0
        },
        {
          name: 'Wing E',
          amt: 0
        }
      ],
      pieData: [
        { name: 'Wing A', value: 0 },
        { name: 'Wing B', value: 0 },
        { name: 'Wing C', value: 0 },
        { name: 'Wing D', value: 0 },
        { name: 'Wing E', value: 0 },
        { name: 'Well Wishers', value: 0 }
      ],
      treeData: [
        {
          name: 'Overview',
          children: [
            { name: 'wing A', size: 0 },
            { name: 'wing B', size: 0 },
            { name: 'Wing C', size: 0 },
            { name: 'wing D', size: 0 },
            { name: 'Wing E', size: 0 },
            { name: 'Well Wishers', size: 0 },
            { name: 'Expenses', size: 0 }
          ]
        }
      ]
    };
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  componentDidMount() {
    this.props.OnTotalData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.totalData !== this.props.totalData) {
      this.setState({
        totalData: nextProps.totalData,
        barData: [
          {
            name: 'Wing A',
            amt: nextProps.totalData.totalWingA
          },
          {
            name: 'Wing B',
            amt: nextProps.totalData.totalWingB
          },
          {
            name: 'Wing C',
            amt: nextProps.totalData.totalWingC
          },
          {
            name: 'Wing D',
            amt: nextProps.totalData.totalWingD
          },
          {
            name: 'Wing E',
            amt: nextProps.totalData.totalWingE
          }
        ],
        pieData: [
          {
            name: 'Wing A',
            value: nextProps.totalData.totalWingA
          },
          {
            name: 'Wing B',
            value: nextProps.totalData.totalWingB
          },
          {
            name: 'Wing C',
            value: nextProps.totalData.totalWingC
          },
          {
            name: 'Wing D',
            value: nextProps.totalData.totalWingD
          },
          {
            name: 'Wing E',
            value: nextProps.totalData.totalWingE
          },
          {
            name: 'Well Wishers',
            value: nextProps.totalData.totalWellWishers
          }
        ],
        treeData: [
          {
            name: 'wing A',
            children: [
              {
                name: 'Wing A',
                size: nextProps.totalData.totalWingA
              }
            ]
          },
          {
            name: 'wing B',
            children: [
              {
                name: 'Wing B',
                size: nextProps.totalData.totalWingB
              }
            ]
          },
          {
            name: 'wing C',
            children: [
              {
                name: 'Wing C',
                size: nextProps.totalData.totalWingC
              }
            ]
          },
          {
            name: 'wing D',
            children: [
              {
                name: 'Wing D',
                size: nextProps.totalData.totalWingD
              }
            ]
          },
          {
            name: 'wing E',
            children: [
              {
                name: 'Wing E',
                size: nextProps.totalData.totalWingE
              }
            ]
          },
          {
            name: 'Well Wishers',
            children: [
              {
                name: 'Well Wishers',
                size: nextProps.totalData.totalWellWishers
              }
            ]
          },
          {
            name: 'Expenses',
            children: [
              {
                name: 'Expenses',
                size: nextProps.totalData.totalExpenses
              }
            ]
          }
        ]
      });
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        >
          <Card
            style={{
              flex: '40%',
              margin: 5,
              // textAlign: "center",
              fontFamily: "'Open Sans', sans-serif",
              backgroundImage:
                'linear-gradient(45deg, #c31432 , #1832C4, #240b36)'
            }}
            // title="Total"
          >
            <Skeleton loading={false} paragraph={{ rows: 3 }}>
              <h1
                style={{
                  // textAlign: "center",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 'lighter',
                  fontSize: '40px',
                  margin: '0px',
                  color: 'white'
                }}
              >
                <FontAwesomeIcon icon={faRupeeSign} />
                {this.state.totalData.totalCollection}
              </h1>
              <p style={{ color: 'white' }}>Total Collection</p>
              <BarChart width={150} height={40} data={data}>
                <Bar isAnimationActive={false} dataKey='tc' fill='#fff' />
              </BarChart>
            </Skeleton>
          </Card>
          <Card
            style={{
              flex: '40%',
              margin: 5,
              // textAlign: "center",
              fontFamily: "'Open Sans', sans-serif",
              backgroundImage:
                'linear-gradient(45deg, #310F84, #3494E6, #18B7C4)'
            }}
            // title="Total"
          >
            <Skeleton loading={false} paragraph={{ rows: 3 }}>
              <h1
                style={{
                  // textAlign: "center",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 'lighter',
                  fontSize: '40px',
                  margin: '0px',
                  color: 'white'
                }}
              >
                <FontAwesomeIcon icon={faRupeeSign} />
                {this.state.totalData.cashInHand}
              </h1>
              <p style={{ color: 'white' }}>Cash In Hand</p>
              <BarChart width={150} height={40} data={data}>
                <Bar isAnimationActive={false} dataKey='ch' fill='#fff' />
              </BarChart>
            </Skeleton>
          </Card>
          <Card
            style={{
              flex: '40%',
              margin: 5,
              // textAlign: "center",
              fontFamily: "'Open Sans', sans-serif",
              backgroundImage:
                'linear-gradient(45deg, #240b36, #c31432, #cc2b5e)'
            }}
            // title="Total"
          >
            <Skeleton loading={false} paragraph={{ rows: 3 }}>
              <h1
                style={{
                  // textAlign: "center",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 'lighter',
                  fontSize: '40px',
                  margin: '0px',
                  color: 'white'
                }}
              >
                <FontAwesomeIcon icon={faRupeeSign} />
                {this.state.totalData.totalExpenses}
              </h1>
              <p style={{ color: 'white' }}>Total Expenses</p>
              <BarChart width={150} height={40} data={data}>
                <Bar isAnimationActive={false} dataKey='te' fill='#fff' />
              </BarChart>
            </Skeleton>
          </Card>
          <Card
            style={{
              flex: '40%',
              margin: 5,
              // textAlign: "center",
              fontFamily: "'Open Sans', sans-serif",
              backgroundImage:
                'linear-gradient(45deg, #1832C4, #310F84, #592E7C)'
            }}
            // title="Total"
          >
            <Skeleton loading={false} paragraph={{ rows: 3 }}>
              <h1
                style={{
                  // textAlign: "center",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: 'lighter',
                  fontSize: '40px',
                  margin: '0px',
                  color: 'white'
                }}
              >
                <FontAwesomeIcon icon={faRupeeSign} />
                {this.state.totalData.totalBankBook}
              </h1>
              <p style={{ color: 'white' }}>Bank Collection</p>
              <BarChart width={150} height={40} data={data}>
                <Bar isAnimationActive={false} dataKey='bb' fill='#fff' />
              </BarChart>
            </Skeleton>
          </Card>
        </div>
        {/*
        start below 4 cards
        remove this after completing the page
        no use of this comment
        only for development for Akhil to understand
         */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Card
            style={{ margin: 5 }}
            bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <Skeleton paragraph={{ rows: 3 }} loading={false}>
              <h3 style={{ textAlign: 'center' }}>Wing Contribution</h3>
              <div style={{ display: 'flex', paddingRight: '24px' }}>
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart data={this.state.barData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      isAnimationActive={false}
                      dataKey='amt'
                      fill='#3494E6'
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Skeleton>
          </Card>
          <div
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
          >
            <Card className='card-tree'>
              <Skeleton loading={false} paragraph={{ rows: 3 }}>
                <h3 style={{ textAlign: 'center' }}>Total Contribution</h3>
                <ResponsiveContainer width='100%' height={300}>
                  <Treemap
                    isAnimationActive={false}
                    data={this.state.pieData}
                    dataKey='value'
                    ratio={4 / 3}
                    stroke='#fff'
                    content={<CustomizedContent colors={TREE_COLORS} />}
                  />
                </ResponsiveContainer>
              </Skeleton>
            </Card>
            <Card style={{ margin: 5, flex: '40%' }}>
              <Skeleton paragraph={{ rows: 3 }} loading={false}>
                <h3 style={{ textAlign: 'center' }}>Total Contribution</h3>
                <ResponsiveContainer width='90%' height={300}>
                  <PieChart>
                    <Pie
                      isAnimationActive={false}
                      activeIndex={this.state.activeIndex}
                      activeShape={renderActiveShape}
                      dataKey='value'
                      data={this.state.pieData}
                      cx={'55%'}
                      cy={150}
                      fill='#8884d8'
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
              <h3 style={{ textAlign: 'center' }}>Overview</h3>
              <div style={{ display: 'flex', paddingRight: '24px' }}>
                <ResponsiveContainer width='100%' height={300}>
                  <Treemap
                    isAnimationActive={false}
                    width={400}
                    height={200}
                    data={this.state.treeData}
                    dataKey='size'
                    ratio={4 / 3}
                    stroke='#fff'
                    fill='#8884d8'
                    content={<CustomizedContent colors={TREE_COLORS} />}
                  />
                </ResponsiveContainer>
              </div>
            </Skeleton>
          </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    firebase,
    auth,
    getData,
    addData,
    deleteData,
    setData,
    totalData
  } = state;
  return {
    firebase,
    auth,
    getData,
    addData,
    deleteData,
    setData,
    totalData
  };
}

export default compose(
  connect(mapStateToProps, {
    OnAuth,
    OnGetData,
    OnAddData,
    OnDeleteData,
    OnSetData,
    OnTotalData
  })
)(Home);
