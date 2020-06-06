import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { OnTotalData } from '../../store/actions/actions';
import { compose } from 'redux';
import { Card } from 'antd';
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
  Treemap,
} from 'recharts';
import '../../styles/Home.css';

const data = [
  {
    name: 'Page A',
    ch: 5,
    tc: 4,
    te: 7,
    bb: 2,
    amt: 1,
  },
  {
    name: 'Page BB',
    ch: 3,
    tc: 1,
    te: 4,
    bb: 4,
    amt: 2,
  },
  {
    name: 'Page C',
    ch: 6,
    tc: 2,
    te: 1,
    bb: 6,
    amt: 3,
  },
  {
    name: 'Page D',
    ch: 2,
    tc: 5,
    te: 5,
    bb: 1,
    amt: 4,
  },
  {
    name: 'Page E',
    ch: 4,
    tc: 3,
    te: 1,
    bb: 3,
    amt: 5,
  },
  {
    name: 'Page F',
    ch: 1,
    tc: 6,
    te: 6,
    bb: 4,
    amt: 6,
  },
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
  '#996600',
  '#008800',
];

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
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
  '#F8C12D',
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
      colors,
      name,
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
            strokeOpacity: 1 / (depth + 1e-10),
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
          name: 'A Wing',
          amt: 0,
        },
        {
          name: 'B Wing',
          amt: 0,
        },
        {
          name: 'C Wing',
          amt: 0,
        },
        {
          name: 'D Wing',
          amt: 0,
        },
        {
          name: 'E Wing',
          amt: 0,
        },
      ],
      pieData: [
        { name: 'A Wing', value: 0 },
        { name: 'B Wing', value: 0 },
        { name: 'C Wing', value: 0 },
        { name: 'D Wing', value: 0 },
        { name: 'E Wing', value: 0 },
        { name: 'Well Wishers', value: 0 },
      ],
      treeData: [
        {
          name: 'Overview',
          children: [
            { name: 'A Wing', size: 0 },
            { name: 'B Wing', size: 0 },
            { name: 'C Wing', size: 0 },
            { name: 'D Wing', size: 0 },
            { name: 'E Wing', size: 0 },
            { name: 'Well Wishers', size: 0 },
            { name: 'Expenses', size: 0 },
          ],
        },
      ],
    };
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  componentDidMount() {
    if (this.props.totalData.dataChanged === 0) {
      this.props.OnTotalData();
    } else {
      this.setState({
        totalData: this.props.totalData,
        barData: [
          {
            name: 'A Wing',
            amt: this.props.totalData.totalWingA,
          },
          {
            name: 'B Wing',
            amt: this.props.totalData.totalWingB,
          },
          {
            name: 'C Wing',
            amt: this.props.totalData.totalWingC,
          },
          {
            name: 'D Wing',
            amt: this.props.totalData.totalWingD,
          },
          {
            name: 'E Wing',
            amt: this.props.totalData.totalWingE,
          },
        ],
        pieData: [
          {
            name: 'A Wing',
            value: this.props.totalData.totalWingA,
          },
          {
            name: 'B Wing',
            value: this.props.totalData.totalWingB,
          },
          {
            name: 'C Wing',
            value: this.props.totalData.totalWingC,
          },
          {
            name: 'D Wing',
            value: this.props.totalData.totalWingD,
          },
          {
            name: 'E Wing',
            value: this.props.totalData.totalWingE,
          },
          {
            name: 'Well Wishers',
            value: this.props.totalData.totalWellWishers,
          },
        ],
        treeData: [
          {
            name: 'A Wing',
            children: [
              {
                name: 'A Wing',
                size: this.props.totalData.totalWingA,
              },
            ],
          },
          {
            name: 'B Wing',
            children: [
              {
                name: 'B Wing',
                size: this.props.totalData.totalWingB,
              },
            ],
          },
          {
            name: 'C Wing',
            children: [
              {
                name: 'C Wing',
                size: this.props.totalData.totalWingC,
              },
            ],
          },
          {
            name: 'D Wing',
            children: [
              {
                name: 'D Wing',
                size: this.props.totalData.totalWingD,
              },
            ],
          },
          {
            name: 'E Wing',
            children: [
              {
                name: 'E Wing',
                size: this.props.totalData.totalWingE,
              },
            ],
          },
          {
            name: 'Well Wishers',
            children: [
              {
                name: 'Well Wishers',
                size: this.props.totalData.totalWellWishers,
              },
            ],
          },
          {
            name: 'Expenses',
            children: [
              {
                name: 'Expenses',
                size: this.props.totalData.totalExpenses,
              },
            ],
          },
        ],
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.totalData !== this.props.totalData) {
      this.setState({
        totalData: nextProps.totalData,
        barData: [
          {
            name: 'A Wing',
            amt: nextProps.totalData.totalWingA,
          },
          {
            name: 'B Wing',
            amt: nextProps.totalData.totalWingB,
          },
          {
            name: 'C Wing',
            amt: nextProps.totalData.totalWingC,
          },
          {
            name: 'D Wing',
            amt: nextProps.totalData.totalWingD,
          },
          {
            name: 'E Wing',
            amt: nextProps.totalData.totalWingE,
          },
        ],
        pieData: [
          {
            name: 'A Wing',
            value: nextProps.totalData.totalWingA,
          },
          {
            name: 'B Wing',
            value: nextProps.totalData.totalWingB,
          },
          {
            name: 'C Wing',
            value: nextProps.totalData.totalWingC,
          },
          {
            name: 'D Wing',
            value: nextProps.totalData.totalWingD,
          },
          {
            name: 'E Wing',
            value: nextProps.totalData.totalWingE,
          },
          {
            name: 'Well Wishers',
            value: nextProps.totalData.totalWellWishers,
          },
        ],
        treeData: [
          {
            name: 'A Wing',
            children: [
              {
                name: 'A Wing',
                size: nextProps.totalData.totalWingA,
              },
            ],
          },
          {
            name: 'B Wing',
            children: [
              {
                name: 'B Wing',
                size: nextProps.totalData.totalWingB,
              },
            ],
          },
          {
            name: 'C Wing',
            children: [
              {
                name: 'C Wing',
                size: nextProps.totalData.totalWingC,
              },
            ],
          },
          {
            name: 'D Wing',
            children: [
              {
                name: 'D Wing',
                size: nextProps.totalData.totalWingD,
              },
            ],
          },
          {
            name: 'E Wing',
            children: [
              {
                name: 'E Wing',
                size: nextProps.totalData.totalWingE,
              },
            ],
          },
          {
            name: 'Well Wishers',
            children: [
              {
                name: 'Well Wishers',
                size: nextProps.totalData.totalWellWishers,
              },
            ],
          },
          {
            name: 'Expenses',
            children: [
              {
                name: 'Expenses',
                size: nextProps.totalData.totalExpenses,
              },
            ],
          },
        ],
      });
    }
  }

  render() {
    return (
      <div className='MainApp'>
        <div className='overViewCards'>
          <Card className='collectionCard'>
            <h1 className='collectionCardH1'>
              <FontAwesomeIcon icon={faRupeeSign} />{' '}
              {this.state.totalData.totalCollection}
            </h1>
            <p className='colorWhite'>Total Collection</p>
            <BarChart width={150} height={40} data={data}>
              <Bar isAnimationActive={false} dataKey='tc' fill='#fff' />
            </BarChart>
          </Card>
          <Card
            style={{
              backgroundImage:
                'linear-gradient(45deg, #310F84, #3494E6, #18B7C4)',
            }}
            className='collectionCard'
          >
            <h1 className='collectionCardH1'>
              <FontAwesomeIcon icon={faRupeeSign} />{' '}
              {this.state.totalData.cashInHand}
            </h1>
            <p className='colorWhite'>Cash In Hand</p>
            <BarChart width={150} height={40} data={data}>
              <Bar isAnimationActive={false} dataKey='ch' fill='#fff' />
            </BarChart>
          </Card>
          <Card
            style={{
              backgroundImage:
                'linear-gradient(45deg, #240b36, #c31432, #cc2b5e)',
            }}
            className='collectionCard'
          >
            <h1 className='collectionCardH1'>
              <FontAwesomeIcon icon={faRupeeSign} />{' '}
              {this.state.totalData.totalExpenses}
            </h1>
            <p className='colorWhite'>Total Expenses</p>
            <BarChart width={150} height={40} data={data}>
              <Bar isAnimationActive={false} dataKey='te' fill='#fff' />
            </BarChart>
          </Card>
          <Card
            style={{
              backgroundImage:
                'linear-gradient(45deg, #1832C4, #310F84, #592E7C)',
            }}
            className='collectionCard'
          >
            <h1 className='collectionCardH1'>
              <FontAwesomeIcon icon={faRupeeSign} />{' '}
              {this.state.totalData.totalBankBook}
            </h1>
            <p className='colorWhite'>Bank Collection</p>
            <BarChart width={150} height={40} data={data}>
              <Bar isAnimationActive={false} dataKey='bb' fill='#fff' />
            </BarChart>
          </Card>
        </div>
        <div className='mainApp'>
          <Card
            style={{ margin: 5 }}
            bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <h3 className='textCenterChart'>Wing Contribution</h3>
            <div className='barChart'>
              <ResponsiveContainer width='100%' height={300}>
                <BarChart data={this.state.barData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar isAnimationActive={false} dataKey='amt' fill='#3494E6' />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className='overViewCards'>
            <Card className='card-tree'>
              <h3 className='textCenterChart'>Total Income</h3>
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
            </Card>
            <Card style={{ margin: 5, flex: '40%' }}>
              <h3 className='textCenterChart'>Total Contribution</h3>
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
            </Card>
          </div>
          <Card style={{ margin: 5 }}>
            <h3 className='textCenterChart'>Overview</h3>
            <div className='barChart'>
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
          </Card>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { totalData } = state;
  return {
    totalData,
  };
}

export default compose(
  connect(mapStateToProps, {
    OnTotalData,
  })
)(Home);
