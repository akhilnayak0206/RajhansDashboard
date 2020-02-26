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
} from '../../../store/actions/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import secretSignKey from '../../../secretToken.js';

const { Search, TextArea } = Input;
const { Option } = Select;

class AddEditExpense extends Component {
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
      confirmLoadingDelete: false,
      addAmount: 0
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
    if (val.MadeBy) {
      this.setState({
        visibleModal: true,
        selectedValModal: val,
        addAmount: 0
      });
    } else {
      this.setState({
        visibleModal: true,
        selectedValModal: {
          ...val,
          MadeBy: this.props.auth.dataEmail.Name
        },
        addAmount: 0
      });
    }
  };

  handleOk = () => {
    if (
      this.state.selectedValModal.Title &&
      this.state.selectedValModal.Description &&
      this.state.selectedValModal.MadeBy
    ) {
      if (this.state.selectedValModal.doc) {
        this.setState(
          {
            confirmLoadingModal: true
          },
          () =>
            this.props.OnSetData({
              setData: {
                ...this.state.selectedValModal,
                Amount:
                  Number(this.state.selectedValModal.Amount) +
                  Number(this.state.addAmount),
                timestamp: new Date(Date.now())
              },
              collection: 'expenses',
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
                Amount: this.state.addAmount,
                timestamp: new Date(Date.now())
              },
              collection: 'expenses'
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
      visibleModal: false,
      addAmount: 0
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
      this.props.OnGetData({ collection: 'expenses' })
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
      if (nextProps.deleteData.collection == 'expenses') {
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
          this.props.OnGetData({ collection: 'expenses' })
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
        nextProps.setData.collection == 'expenses' &&
        nextProps.setData.document
      ) {
        notification['success']({
          message: 'Expense Made',
          description: nextProps.setData.message
        });
        this.setState(
          {
            confirmLoadingModal: false,
            gettingData: true
          },
          this.props.OnGetData({ collection: 'expenses' })
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
                : `Add Expense`
            }
            visible={this.state.visibleModal}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key='back' onClick={this.handleCancel}>
                Cancel
              </Button>,
              this.state.selectedValModal.hasOwnProperty('doc') && (
                <Popconfirm
                  key='delete'
                  title='Are you sure delete this expense?'
                  onConfirm={() =>
                    this.setState(
                      {
                        confirmLoadingDelete: true
                      },
                      () =>
                        this.props.OnDeleteData({
                          ...this.state.selectedValModal,
                          collection: 'expenses',
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
                    Delete Expense
                  </Button>
                </Popconfirm>
              ),
              <Button
                key='submit'
                type='primary'
                loading={this.state.confirmLoadingModal}
                onClick={this.handleOk}
              >
                {this.state.selectedValModal.hasOwnProperty('doc')
                  ? 'Replace Expense'
                  : 'Add Expense'}
              </Button>
            ]}
          >
            <h3>Title</h3>
            <Input
              value={this.state.selectedValModal.Title}
              placeholder={`Expense Title`}
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
              placeholder={`Expense Made by`}
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

            {this.state.selectedValModal.Amount ? (
              <Fragment>
                <h3>Add Amount:</h3>
                <InputNumber
                  value={this.state.addAmount}
                  placeholder={`Amount to be added`}
                  onChange={val =>
                    this.setState({
                      addAmount: val
                    })
                  }
                />
                <h3>Total Amount:</h3>
                <InputNumber
                  disabled
                  value={this.state.selectedValModal.Amount}
                />
              </Fragment>
            ) : (
              <Fragment>
                <h3>Amount:</h3>
                <InputNumber
                  value={this.state.addAmount}
                  placeholder={`Amount to be added`}
                  onChange={value =>
                    this.setState({
                      addAmount: value
                    })
                  }
                />
              </Fragment>
            )}
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
                  placeholder={`Enter Expense Title`}
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
                  title={`${val.Title}`}
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
)(AddEditExpense);
