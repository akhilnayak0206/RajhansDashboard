import React, { Component, Fragment } from 'react';
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
} from '../../store/actions/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';

const { Search, TextArea } = Input;

class BankBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      filterCards: [],
      search: '',
      visiblePopover: false,
      filterDate: '',
      visibleModal: false,
      confirmLoadingModal: false,
      receiptLoading: false,
      selectedValModal: '',
      gettingData: true,
      confirmLoadingDelete: false,
      confirmLoadingTransfer: false
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
    if (val.hasOwnProperty('doc')) {
      this.setState({
        visibleModal: true,
        selectedValModal: val
      });
    } else {
      this.setState({
        visibleModal: true,
        selectedValModal: {
          ...val,
          MadeBy: this.props.auth.dataEmail.Name
        }
      });
    }
  };

  handleOk = () => {
    if (
      this.state.selectedValModal.MadeBy &&
      this.state.selectedValModal.Title &&
      !isNaN(this.state.selectedValModal.Amount)
    ) {
      if (this.state.selectedValModal.doc) {
        if (Number(this.state.selectedValModal.Amount) < 0) {
          this.setState(
            {
              confirmLoadingModal: true
            },
            () =>
              this.props.OnSetData({
                setData: {
                  ...this.state.selectedValModal,
                  type: 'debited',
                  timestamp: new Date(Date.now())
                },
                collection: 'bankBook',
                doc: this.state.selectedValModal.doc
              })
          );
        } else if (this.state.selectedValModal.type == 'debited') {
          this.setState(
            {
              confirmLoadingModal: true
            },
            () =>
              this.props.OnSetData({
                setData: {
                  ...this.state.selectedValModal,
                  Amount: ~this.state.selectedValModal.Amount + 1,
                  timestamp: new Date(Date.now())
                },
                collection: 'bankBook',
                doc: this.state.selectedValModal.doc
              })
          );
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
                collection: 'bankBook',
                doc: this.state.selectedValModal.doc
              })
          );
        }
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
              collection: 'bankBook'
            })
        );
      }
    } else {
      console.log(this.state.selectedValModal);
      this.setState({ confirmLoadingTransfer: false });
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
      new RegExp(this.state.search, 'i').exec(val.Title)
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
      this.props.OnGetData({ collection: 'bankBook' })
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
      if (nextProps.deleteData.collection == 'bankBook') {
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
          this.props.OnGetData({ collection: 'bankBook' })
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
        nextProps.setData.collection == 'bankBook' &&
        nextProps.setData.document
      ) {
        notification['success']({
          message: 'Changes Done',
          description: nextProps.setData.message
        });
        this.setState(
          {
            confirmLoadingModal: false,
            gettingData: true
          },
          this.props.OnGetData({ collection: 'bankBook' })
        );
        this.handleCancel();
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
              this.state.selectedValModal.Title
                ? `${this.state.selectedValModal.Title}`
                : `Add Money in Bank Book`
            }
            visible={this.state.visibleModal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              !this.state.selectedValModal.hasOwnProperty('doc') && (
                <Popconfirm
                  key='transfer'
                  title='Are you sure to transfer the amount?'
                  onConfirm={() =>
                    this.setState(
                      {
                        confirmLoadingTransfer: true,
                        selectedValModal: {
                          ...this.state.selectedValModal,
                          type: 'debited',
                          Amount:
                            ~Number(this.state.selectedValModal.Amount) + 1
                        }
                      },
                      () => this.handleOk()
                    )
                  }
                  onCancel={() => alert('ok')}
                  okText='Yes'
                  cancelText='No'
                >
                  <Button
                    type='warning'
                    loading={this.state.confirmLoadingTransfer}
                  >
                    Transfer Amount
                  </Button>
                </Popconfirm>
              ),
              this.state.selectedValModal.hasOwnProperty('doc') && (
                <Popconfirm
                  key='delete'
                  title='Are you sure delete this amount?'
                  onConfirm={() =>
                    this.setState(
                      {
                        confirmLoadingDelete: true
                      },
                      () =>
                        this.props.OnDeleteData({
                          ...this.state.selectedValModal,
                          collection: 'bankBook',
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
                    Delete Amount
                  </Button>
                </Popconfirm>
              ),
              <Button
                key='submit'
                type='primary'
                loading={this.state.confirmLoadingModal}
                onClick={() =>
                  this.setState(
                    {
                      selectedValModal: {
                        type: 'credited',
                        ...this.state.selectedValModal
                      }
                    },
                    () => this.handleOk()
                  )
                }
              >
                {this.state.selectedValModal.hasOwnProperty('doc')
                  ? 'Replace Amount'
                  : 'Add Amount'}
              </Button>
            ]}
          >
            <h3>Title:</h3>
            <Input
              value={this.state.selectedValModal.Title}
              placeholder={
                this.state.selectedValModal.Title
                  ? `${this.state.selectedValModal.Title}`
                  : `Add title for this amount`
              }
              onChange={val =>
                this.setState({
                  selectedValModal: {
                    ...this.state.selectedValModal,
                    Title: val.target.value
                  }
                })
              }
            />
            <h3>Made By:</h3>
            <Input
              value={this.state.selectedValModal.MadeBy}
              placeholder={
                this.state.selectedValModal.MadeBy
                  ? `${this.state.selectedValModal.MadeBy}`
                  : `Member's name`
              }
              onChange={val =>
                this.setState({
                  selectedValModal: {
                    ...this.state.selectedValModal,
                    MadeBy: val.target.value
                  }
                })
              }
            />
            <h3>Description:</h3>
            <TextArea
              rows={4}
              value={this.state.selectedValModal.Description}
              placeholder={`Add Description`}
              onChange={val =>
                this.setState({
                  selectedValModal: {
                    ...this.state.selectedValModal,
                    Description: val.target.value
                  }
                })
              }
            />
            <h3>Amount:</h3>
            <InputNumber
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
                  placeholder={`Enter Title of the Amount credited or debited`}
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
                  title={val.Title}
                  style={{ borderRadius: 5, width: '100%', marginBottom: 10 }}
                  key={key}
                  onClick={() => this.showModal(val)}
                >
                  {val.type == 'debited' ? (
                    <p style={{ color: 'red' }}>
                      <b>Amount: </b>₹{val.Amount}
                    </p>
                  ) : (
                    <p style={{ color: 'green' }}>
                      <b>Amount: </b>₹{val.Amount}
                    </p>
                  )}
                  <p>
                    <b>Date: </b>
                    {`${new Date(
                      val.timestamp.seconds * 1000
                    ).getDate()}/${new Date(
                      val.timestamp.seconds * 1000
                    ).getMonth() + 1}/${new Date(
                      val.timestamp.seconds * 1000
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
              <FontAwesomeIcon icon={faPlus} size='lg' color='white' />
            </Button>
          </div>
        </Skeleton>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth, getData, addData, deleteData, setData, totalData } = state;
  return {
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
)(BankBook);
