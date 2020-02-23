import React, { Component } from 'react';
import {
  Card,
  Input,
  Button,
  Skeleton,
  InputNumber,
  Form,
  Switch,
  Radio,
  notification,
  Select,
  Popover,
  DatePicker,
  Modal,
  Popconfirm
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

class AddEditWellWisher extends Component {
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
      confirmLoadingDelete: false
    };
  }

  shareReceipt = () => {
    this.setState({ receiptLoading: true }, () =>
      setTimeout(() => {
        this.setState({ receiptLoading: false });
      }, 5000)
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
      this.state.selectedValModal.Collected &&
      this.state.selectedValModal.Received &&
      this.state.selectedValModal.Amount > 0 &&
      !isNaN(this.state.selectedValModal.Amount)
    ) {
      if (this.state.selectedValModal.id) {
        this.setState(
          {
            confirmLoadingModal: true
          },
          () =>
            this.props.OnSetData({
              setData: {
                ...this.state.selectedValModal,
                timestamp: new Date(Date.now())
              },
              collection: 'wellWishers',
              id: this.state.selectedValModal.id
            })
        );
        jwt.sign({ foo: 'bar' }, secretSignKey, (err, token) => {
          console.log(err, 'error');
          console.log(token);
        });
      } else {
        this.setState(
          {
            confirmLoadingModal: true
          },
          () =>
            this.props.OnSetData({
              setData: {
                ...this.state.selectedValModal,
                timestamp: new Date(Date.now())
              },
              collection: 'wellWishers'
            })
        );
        // jwt.sign({ foo: 'bar' }, secretSignKey, (err, token) => {
        //   console.log(err, 'error');
        //   console.log(token);
        // });
      }
    } else {
      console.log(this.state.selectedValModal);
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

  filteringSearch = () => {
    let filterCards = this.state.cards.filter(val =>
      new RegExp(this.state.search, 'i').exec(val.Received)
    );
    this.setState({ filterCards });
  };

  handleSearchChange = e => {
    if (e.target) {
      this.setState({ search: e.target.value }, () => this.filteringSearch());
    }
  };

  handleSearchEnter = value => {
    if (value) {
      this.setState({ search: value }, () => this.filteringSearch());
    }
  };

  componentDidMount() {
    this.setState({ gettingData: true }, () =>
      this.props.OnGetData({ collection: 'wellWishers' })
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getData !== this.props.getData) {
      let sortedData = nextProps.getData.collectionData;
      sortedData.sort((a, b) => {
        return b.timestamp.seconds - a.timestamp.seconds;
      });
      this.setState({
        cards: sortedData,
        filterCards: sortedData,
        gettingData: false
      });
    }
    if (nextProps.deleteData !== this.props.deleteData) {
      if (nextProps.deleteData.collection == 'wellWishers') {
        notification['success']({
          message: 'Delete Successful',
          description: nextProps.deleteData.message
        });
        this.setState(
          {
            confirmLoadingDelete: false,
            gettingData: true,
            visibleModal: false
          },
          this.props.OnGetData({ collection: 'wellWishers' })
        );
      }
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
        nextProps.setData.collection == 'wellWishers' &&
        nextProps.setData.document
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
          this.props.OnGetData({ collection: 'wellWishers' })
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
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {this.state.selectedValModal && (
          <Modal
            title={
              this.state.selectedValModal.Received
                ? `${this.state.selectedValModal.Received}`
                : `Add Well-Wisher`
            }
            visible={this.state.visibleModal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key='back' onClick={this.handleCancel}>
                Cancel
              </Button>,

              this.state.selectedValModal.hasOwnProperty('id') && (
                <Popconfirm
                  key='delete'
                  title='Are you sure delete this task?'
                  onConfirm={() =>
                    this.setState(
                      {
                        confirmLoadingDelete: true
                      },
                      () =>
                        this.props.OnDeleteData({
                          ...this.state.selectedValModal,
                          collection: 'wellWishers',
                          documentTimestamp: this.state.selectedValModal
                            .timestamp,
                          timestamp: new Date(Date.now())
                        })
                    )
                  }
                  onCancel={() => alert('ok')}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button
                    type='danger'
                    loading={this.state.confirmLoadingDelete}
                  >
                    Delete Receipt
                  </Button>
                </Popconfirm>
              ),
              <Button
                key='submit'
                type='primary'
                loading={this.state.confirmLoadingModal}
                onClick={this.handleOk}
              >
                {this.state.selectedValModal.hasOwnProperty('id')
                  ? 'Replace Receipt'
                  : 'Make Receipt'}
              </Button>
            ]}
          >
            <h3>Donor's Name</h3>
            <Input
              value={this.state.selectedValModal.Received}
              placeholder={
                this.state.selectedValModal.Received
                  ? `${this.state.selectedValModal.Received}`
                  : `Donor's Name`
              }
              onChange={val =>
                this.setState({
                  selectedValModal: {
                    ...this.state.selectedValModal,
                    Received: val.target.value
                  }
                })
              }
              disabled={this.state.selectedValModal.secret}
            />
            <p style={{ marginTop: '5px' }}>
              <b>Hidden: </b>{' '}
              <Switch
                checked={this.state.selectedValModal.secret}
                onChange={val =>
                  val
                    ? this.setState({
                        selectedValModal: {
                          ...this.state.selectedValModal,
                          secret: val,
                          Received: 'Well Wisher'
                        }
                      })
                    : this.setState({
                        selectedValModal: {
                          ...this.state.selectedValModal,
                          secret: val,
                          secretName: ''
                        }
                      })
                }
              />
            </p>
            {this.state.selectedValModal.secret && (
              <p style={{ marginTop: '5px' }}>
                <b>Hidden Name: </b>{' '}
                <Input
                  value={
                    this.props.auth.dataEmail.Admin &&
                    this.state.selectedValModal.secretName
                  }
                  placeholder={`Secret Donor's Name`}
                  onChange={val =>
                    this.setState({
                      selectedValModal: {
                        ...this.state.selectedValModal,
                        secretName: val.target.value
                      }
                    })
                  }
                />
              </p>
            )}
            <h3>Collector's Name</h3>
            <Input
              placeholder={
                this.state.selectedValModal.Collected
                  ? `${this.state.selectedValModal.Collected}`
                  : `Collector's Name`
              }
              value={this.state.selectedValModal.Collected}
              onChange={val =>
                this.setState({
                  setData: {
                    ...this.state.selectedValModal,
                    Collected: val.target.value
                  }
                })
              }
            />
            <h3>Amount Received</h3>
            <InputNumber
              min={1}
              value={this.state.selectedValModal.Amount}
              placeholder={
                this.state.selectedValModal.hasOwnProperty('Amount')
                  ? `${this.state.selectedValModal.Amount}`
                  : `Amount`
              }
              onChange={value =>
                this.setState({
                  selectedValModal: {
                    ...this.state.selectedValModal,
                    Amount: value
                  }
                })
              }
            />
            <h3>Receipt</h3>
            <Button
              key='shareReceipt'
              loading={this.state.receiptLoading}
              onClick={this.shareReceipt}
            >
              Share
            </Button>
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
                  placeholder={`Enter Donor's Name`}
                  onSearch={value => this.handleSearchChange(value)}
                  onChange={e => this.handleSearchChange(e)}
                  enterButton
                />
              </div>
            </Card>
          </div>

          <div
            style={{
              width: '100%',
              height: '100%',
              marginBottom: 20
            }}
          >
            {this.state.filterCards &&
              this.state.filterCards.map((val, key) => (
                <Card
                  size='small'
                  title={`Donor: ${
                    this.props.auth.dataEmail.Admin && val.secretName
                      ? val.secretName
                      : val.Received
                  }`}
                  style={{ borderRadius: 5, width: '100%', marginBottom: 10 }}
                  key={key}
                  onClick={() => this.showModal(val)}
                >
                  <p>
                    <b>Amount: </b>₹{val.Amount}
                  </p>
                  <p>
                    <b>Date: </b>
                    {`${new Date(
                      Date(val.timestamp.seconds)
                    ).getDate()}/${new Date(
                      Date(val.timestamp.seconds)
                    ).getMonth() + 1}/${new Date(
                      Date(val.timestamp.seconds)
                    ).getFullYear()}`}
                  </p>
                </Card>
              ))}
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
            <Button
              type='primary'
              shape='circle'
              size='large'
              style={{ marginTop: 10 }}
              onClick={() => this.showModal({})}
            >
              <FontAwesomeIcon icon={faPlus} size={70} color='white' />
            </Button>
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
)(AddEditWellWisher);
