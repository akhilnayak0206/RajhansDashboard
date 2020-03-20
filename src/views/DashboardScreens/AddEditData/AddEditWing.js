import React, { Component } from 'react';
import {
  Card,
  Input,
  Button,
  Skeleton,
  notification,
  Select,
  Popover,
  DatePicker,
  Modal
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { OnGetData, OnSetData, OnShare } from '../../../store/actions/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import jwt from 'jsonwebtoken';
// import secretSignKey from '../../../secretToken.js';
import '../../../styles/AddEdit.css';

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
      receiptLoading: false,
      selectedValModal: '',
      gettingData: true,
      setData: {
        Received: '',
        Collected: '',
        Amount: ''
      },
      personalData: ''
    };
  }

  shareReceipt = val => {
    this.setState({ receiptLoading: true }, () =>
      this.props.OnShare({
        collection: this.state.selectedWings,
        doc: JSON.stringify(this.state.selectedValModal.Flatno),
        personal: this.state.personalData,
        ...val
      })
    );
  };

  showModal = val => {
    if (val.Collected) {
      this.setState({
        visibleModal: true,
        selectedValModal: val
      });
    } else {
      this.setState({
        visibleModal: true,
        selectedValModal: {
          ...val,
          Collected: this.props.auth.dataEmail.Name
        }
      });
    }
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
        },
        () =>
          this.props.OnSetData({
            setData: {
              ...this.state.setData,
              timestamp: new Date(Date.now())
            },
            collection: this.state.selectedWings,
            doc: this.state.selectedValModal.Flatno
          })
      );
      // jwt.sign({ foo: 'bar' }, secretSignKey, (err, token) => {
      //   console.log(err, 'error');
      //   console.log(token);
      // });
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
      visibleModal: false,
      setData: {
        Received: '',
        Collected: '',
        Amount: ''
      },
      personalData: ''
    });
  };

  onChangeDate = (date, dateString) => {
    if (dateString) {
      let filterCards = this.state.filterCards.filter(val => {
        // eslint-disable-next-line
        if (val.Amount != 0) {
          return (
            `${new Date(
              val.Receipt[val.Receipt.length - 1].timestamp
            ).getDate()}/${new Date(
              val.Receipt[val.Receipt.length - 1].timestamp
            ).getMonth()}/${new Date(
              val.Receipt[val.Receipt.length - 1].timestamp
              // eslint-disable-next-line
            ).getFullYear()}` ==
            `${new Date(date).getDate()}/${new Date(
              date
            ).getMonth()}/${new Date(date).getFullYear()}`
          );
        } else {
          return false;
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
    // eslint-disable-next-line
    if (value == 'coll') {
      // eslint-disable-next-line
      let filterCards = this.state.cards.filter(val => val.Amount != 0);
      this.setState({ filterCards, showCards: value, filterDate: '' });
      // eslint-disable-next-line
    } else if (value == 'noColl') {
      // eslint-disable-next-line
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

  // eslint-disable-next-line
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
        notification['error']({
          message: 'Error sending Request',
          description: nextProps.setData.message
        });
        this.setState({
          confirmLoadingModal: false
        });
      } else if (
        // eslint-disable-next-line
        nextProps.setData.collection == this.state.selectedWings &&
        // eslint-disable-next-line
        nextProps.setData.document == this.state.selectedValModal.Flatno
      ) {
        notification['success']({
          message: 'Receipt Made',
          description: nextProps.setData.message
        });
        this.setState(
          {
            confirmLoadingModal: false,
            gettingData: true
          },
          this.props.OnGetData({ collection: this.state.selectedWings })
        );
      } else {
        notification['error']({
          message: 'Report to admin along with the message',
          description: nextProps.setData.message
        });
        this.setState({
          confirmLoadingModal: false
        });
      }
    }
    if (nextProps.share !== this.props.share) {
      if (nextProps.share.error) {
        this.setState({ receiptLoading: false });
        notification['error']({
          message: nextProps.share.message,
          description: nextProps.share.description
        });
      } else if (nextProps.share.url) {
        this.setState({
          receiptLoading: false,
          personalData: '',
          visibleModal: false
        });
        const win = window.open(nextProps.share.url, '_blank');
        if (win != null) {
          win.focus();
        }
      }
    }
  }

  render() {
    return (
      <div className='mainApp'>
        {this.state.selectedValModal && (
          <Modal
            title={`Flat Number: ${JSON.stringify(
              this.state.selectedValModal.Flatno
            )}`}
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
                {/* eslint-disable-next-line */}
                {this.state.selectedValModal.Amount == 0
                  ? 'Make Receipt'
                  : 'Replace Receipt'}
              </Button>
            ]}
          >
            <h3>Donor's Name</h3>
            <Input
              value={this.state.setData.Received}
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
              value={this.state.setData.Collected}
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
              value={this.state.setData.Amount}
              placeholder={
                // eslint-disable-next-line
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
            <h3>Phone/ E-Mail</h3>
            <Input
              placeholder='Entering Phone Number or Email Address is optional'
              value={this.state.personalData}
              onChange={val =>
                this.setState({
                  personalData: val.target.value
                })
              }
            />
            <h3>Receipt</h3>
            <Button
              loading={this.state.receiptLoading}
              onClick={() => this.shareReceipt({ mail: false })}
            >
              WhatsApp
            </Button>
            <Button
              style={{ marginLeft: '5px' }}
              loading={this.state.receiptLoading}
              onClick={() => this.shareReceipt({ mail: true })}
            >
              Mail
            </Button>
          </Modal>
        )}
        <Skeleton loading={this.state.gettingData} active>
          <div className='searchSticky'>
            <Card
              size='small'
              style={{ borderRadius: 5, width: '100%' }}
              bodyStyle={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}
              hoverable
            >
              <Search
                placeholder='Enter Flat Number'
                onSearch={value => this.handleSearchChange(value)}
                onChange={e => this.handleSearchChange(e)}
                enterButton
              />
            </Card>
          </div>

          <div className='showCards'>
            {this.state.filterCards &&
              this.state.filterCards.map((val, key) =>
                // eslint-disable-next-line
                val.Amount == 0 ? (
                  <Card
                    size='small'
                    title={`Flat Number: ${val.Flatno}`}
                    style={{
                      backgroundColor: '#f44336'
                    }}
                    className='singleCards'
                    key={key}
                    onClick={() => this.showModal(val)}
                  >
                    <b className='cardsDescription'>Not Collected yet</b>
                  </Card>
                ) : (
                  <Card
                    size='small'
                    title={`Flat Number: ${val.Flatno}`}
                    className='singleCards'
                    key={key}
                    onClick={() => this.showModal(val)}
                  >
                    <p className='cardsDescription'>
                      <b>Donor: </b>
                      {val.Received}
                    </p>
                    <p className='cardsDescription'>
                      <b>Amount: </b>₹{val.Amount}
                    </p>
                  </Card>
                )
              )}
          </div>
          <div className='bottomButton'>
            <Popover
              placement='leftTop'
              content={
                <div className='mainApp'>
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
                className='buttonShape'
              >
                <FontAwesomeIcon icon={faFilter} size='lg' color='white' />
              </Button>
            </Popover>
          </div>
        </Skeleton>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { getData, setData, auth, share } = state;
  return {
    auth,
    getData,
    setData,
    share
  };
}

export default compose(
  connect(mapStateToProps, {
    OnGetData,
    OnSetData,
    OnShare
  })
)(AddEditWing);
