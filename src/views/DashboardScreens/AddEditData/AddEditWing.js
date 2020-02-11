import React, { Component } from 'react';
import {
  Card,
  Input,
  Button,
  Skeleton,
  Form,
  Radio,
  notification,
  Select,
  Popover,
  DatePicker,
  Modal
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  OnAuth,
  OnGetData,
  OnAddData,
  OnDeleteData,
  OnSetData,
  OnTotalData
} from '../../../store/actions/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import secretSignKey from '../../../secretToken.js';

const { Search } = Input;
const { Option } = Select;

class AddEditWing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      filterCards: [],
      selectedWings: 'wingA',
      showCards: 'noFil',
      search: '',
      visiblePopover: false,
      filterDate: '',
      visibleModal: false,
      confirmLoadingModal: false,
      selectedValModal: '',
      gettingData: true,
      setData: {
        Received: '',
        Collected: '',
        Amount: ''
      }
    };
  }

  showModal = val => {
    this.setState({
      visibleModal: true,
      selectedValModal: val
    });
  };

  handleOk = () => {
    if (
      this.state.setData.Collected &&
      this.state.setData.Received &&
      this.state.setData.Amount > 0 &&
      !isNaN(this.state.setData.Amount)
    ) {
      this.setState(
        {
          confirmLoadingModal: true
        }
        // () => this.props.OnSetData({})
      );
      jwt.sign({ foo: 'bar' }, secretSignKey, (err, token) => {
        console.log(err, 'error');
        console.log(token);
      });
    } else {
      console.log(this.state.setData);
      notification['error']({
        message: 'Invalid Inputs',
        description: 'Please fill all the details'
      });
    }
  };

  handleCancel = () => {
    this.setState({
      visibleModal: false
    });
  };

  onChangeDate = (date, dateString) => {
    if (dateString) {
      let filterCards = this.state.filterCards.filter(val => {
        if (val.Amount != 0) {
          return (
            `${new Date(
              val.Receipt[val.Receipt.length - 1].timestamp
            ).getDate()}/${new Date(
              val.Receipt[val.Receipt.length - 1].timestamp
            ).getMonth()}/${new Date(
              val.Receipt[val.Receipt.length - 1].timestamp
            ).getFullYear()}` ==
            `${new Date(date).getDate()}/${new Date(
              date
            ).getMonth()}/${new Date(date).getFullYear()}`
          );
        }
      });
      this.setState({ filterCards, filterDate: dateString, showCards: 'coll' });
    } else {
      this.setState({ filterDate: dateString }, () =>
        this.handleChangeFilter('noFil')
      );
    }
  };

  handlePopoverChange = visiblePopover => {
    this.setState({ visiblePopover });
  };

  filteringSearch = () => {
    let filterCards = this.state.cards.filter(val =>
      new RegExp(this.state.search, 'i').exec(val.Flatno)
    );
    this.setState({ filterCards, showCards: 'noFil', filterDate: '' });
  };

  handleSearchChange = e => {
    if (e.target) {
      this.setState({ search: e.target.value }, () => this.filteringSearch());
    }
  };

  handleSearchEnter = value => {
    if (value) {
      this.setState({ search: value, showCards: 'noFil', filterDate: '' }, () =>
        this.filteringSearch()
      );
    }
  };

  handleChangeFilter = value => {
    if (value == 'coll') {
      let filterCards = this.state.cards.filter(val => val.Amount != 0);
      this.setState({ filterCards, showCards: value, filterDate: '' });
    } else if (value == 'noColl') {
      let filterCards = this.state.cards.filter(val => val.Amount == 0);
      this.setState({ filterCards, showCards: value, filterDate: '' });
    } else {
      this.setState({
        filterCards: this.state.cards,
        showCards: value,
        filterDate: ''
      });
    }
  };

  handleChangeWings = value => {
    if (value) {
      this.setState(
        { selectedWings: value, showCards: 'noFil', filterDate: '' },
        () => this.props.OnGetData({ collection: value })
      );
    }
  };

  componentDidMount() {
    this.setState({ gettingData: true }, () =>
      this.props.OnGetData({ collection: 'wingA' })
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getData !== this.props.getData) {
      let sortedData = nextProps.getData.collectionData;
      sortedData.sort((a, b) => {
        return a.Flatno - b.Flatno;
      });
      this.setState({
        cards: sortedData,
        filterCards: sortedData,
        gettingData: false
      });
    }
    if (nextProps.setData !== this.props.setData) {
      if (nextProps.setData.error) {
        notification['success']({
          message: 'Receipt Made',
          description: nextProps.setData.message
        });
      } else {
        notification['error']({
          message: 'Error sending Request',
          description: nextProps.setData.message
        });
      }
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {this.state.selectedValModal && (
          <Modal
            title='Title'
            visible={this.state.visibleModal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key='back' onClick={this.handleCancel}>
                Cancel
              </Button>,
              <Button
                key='submit'
                type='primary'
                loading={this.state.confirmLoadingModal}
                onClick={this.handleOk}
              >
                {this.state.selectedValModal.Amount == 0
                  ? 'Make Receipt'
                  : 'Replace Receipt'}
              </Button>
            ]}
          >
            <h3>Donor's Name</h3>
            <Input
              placeholder={
                this.state.selectedValModal.Received
                  ? `${this.state.selectedValModal.Received}`
                  : `Donor's Name`
              }
              onChange={val =>
                this.setState({
                  setData: { ...this.state.setData, Received: val.target.value }
                })
              }
            />
            <h3>Collector's Name</h3>
            <Input
              placeholder={
                this.state.selectedValModal.Collected
                  ? `${this.state.selectedValModal.Collected}`
                  : `Collector's Name`
              }
              onChange={val =>
                this.setState({
                  setData: {
                    ...this.state.setData,
                    Collected: val.target.value
                  }
                })
              }
            />
            <h3>Amount Received</h3>
            <Input
              placeholder={
                this.state.selectedValModal.Amount != 0
                  ? `${this.state.selectedValModal.Amount}`
                  : `Amount Received`
              }
              onChange={val =>
                this.setState({
                  setData: { ...this.state.setData, Amount: val.target.value }
                })
              }
            />
            <h3>Receipt</h3>
            <Button>Share</Button>
          </Modal>
        )}
        <Skeleton loading={this.state.gettingData} active>
          <div
            style={{
              width: '100%',
              marginBottom: 20,
              position: 'sticky',
              zIndex: 5,
              top: 65
            }}
          >
            <Card
              size='small'
              style={{ borderRadius: 5, width: '100%' }}
              bodyStyle={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}
              hoverable
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }}
              >
                <Search
                  placeholder='Enter Flat Number'
                  onSearch={value => this.handleSearchChange(value)}
                  onChange={e => this.handleSearchChange(e)}
                  enterButton
                />
              </div>
            </Card>
          </div>

          <div style={{ width: '100%', height: '100%', marginBottom: 20 }}>
            {this.state.filterCards &&
              this.state.filterCards.map((val, key) =>
                val.Amount == 0 ? (
                  <Card
                    size='small'
                    title={`FlatNo: ${val.Flatno}`}
                    style={{
                      borderRadius: 5,
                      width: '100%',
                      marginBottom: 10,
                      backgroundColor: '#f44336'
                    }}
                    key={key}
                    onClick={() => this.showModal(val)}
                  >
                    <b>Not Collected yet</b>
                  </Card>
                ) : (
                  <Card
                    size='small'
                    title={`FlatNo: ${val.Flatno}`}
                    style={{ borderRadius: 5, width: '100%', marginBottom: 10 }}
                    key={key}
                    onClick={() => this.showModal(val)}
                  >
                    <p>
                      <b>Donor: </b>
                      {val.Received}
                    </p>
                    <p>
                      <b>Amount: </b>₹{val.Amount}
                    </p>
                  </Card>
                )
              )}
          </div>
          <div
            style={{
              flexDirection: 'column',
              display: 'flex',
              zIndex: 15,
              position: 'fixed',
              bottom: 62,
              right: 38
            }}
          >
            <Popover
              placement='leftTop'
              content={
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Select
                    size='large'
                    defaultValue='wingA'
                    style={{ marginBottom: 5 }}
                    onChange={this.handleChangeWings}
                  >
                    <Option value='wingA'>Wing A</Option>
                    <Option value='wingB'>Wing B</Option>
                    <Option value='wingC'>Wing C</Option>
                    <Option value='wingD'>Wing D</Option>
                    <Option value='wingE'>Wing E</Option>
                  </Select>
                  <Select
                    size='large'
                    defaultValue='noFil'
                    style={{ marginBottom: 5 }}
                    onChange={this.handleChangeFilter}
                    maxTagPlaceholder={5}
                    value={this.state.showCards}
                  >
                    <Option value='noFil'>No Filter</Option>
                    <Option value='coll'>Collected</Option>
                    <Option value='noColl'>Not Collected</Option>
                  </Select>
                  <DatePicker
                    size='large'
                    onChange={this.onChangeDate}
                    format='DD/MM/YYYY'
                  />
                </div>
              }
              title='Select Filters'
              trigger='click'
              visible={this.state.visiblePopover}
              onVisibleChange={this.handlePopoverChange}
            >
              <Button
                type='primary'
                shape='circle'
                size='large'
                style={{ background: '#302b63' }}
              >
                <FontAwesomeIcon icon={faFilter} size={70} color='white' />
              </Button>
            </Popover>
            {/* <Button
              type="primary"
              shape="circle"
              size="large"
              style={{ marginTop: 10 }}
            >
              <FontAwesomeIcon icon={faPlus} size={70} color="white" />
            </Button> */}
          </div>
        </Skeleton>
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
)(AddEditWing);
