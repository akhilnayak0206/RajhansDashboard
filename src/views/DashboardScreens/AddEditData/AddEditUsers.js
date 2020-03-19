import React, { Component } from 'react';
import { Card, Input, Button, Skeleton, Modal, notification } from 'antd';
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
import firebase from '../../../config/fbConfig';

const { Search } = Input;

class AddEditUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      filterCards: [],
      search: '',
      visibleModal: false,
      confirmLoadingModal: false,
      selectedValModal: {},
      addVisible: false,
      confirmAddVisible: false,
      setData: {
        Name: '',
        email: '',
        Admin: false,
        adminVerified: false
      }
    };
  }

  showModal = val => {
    this.setState({
      visibleModal: true,
      selectedValModal: val
    });
  };

  handleAddCancel = () => {
    this.setState({
      addVisible: false
    });
  };

  handleAddOk = () => {
    if (this.state.setData.Name) {
      if (
        // eslint-disable-next-line
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          this.state.setData.email
        )
      ) {
        this.setState(
          {
            confirmAddVisible: true
          },
          () =>
            this.props.OnAuth({
              type: 'add_users',
              setData: this.state.setData
            })
        );
      } else {
        notification['error']({
          message: 'Error',
          description: 'Enter valid email address.'
        });
      }
    } else {
      notification['error']({
        message: 'Error',
        description: `Enter Member's Name.`
      });
    }
  };

  handleOk = () => {
    this.setState(
      {
        confirmLoadingModal: true
      },
      () =>
        this.props.OnAuth({
          type: 'add_users',
          setData: this.state.selectedValModal
        })
    );
  };

  handleCancel = () => {
    this.setState({
      visibleModal: false
    });
  };

  filteringSearch = () => {
    let filterCards = this.state.cards.filter(val =>
      new RegExp(this.state.search, 'i').exec(val.Name)
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
    if (this.props.auth.dataEmail.Admin) {
      this.props.OnAuth({ type: 'get_users' });
    } else if (this.props.auth.users.length) {
      this.props.OnAuth({ type: 'email_data' });
      this.props.OnAuth({ type: 'get_users' });
    } else {
      this.setState({
        cards: this.props.auth.users,
        filterCards: this.props.auth.users,
        search: ''
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.cards !== nextProps.auth.users) {
      this.setState({
        cards: nextProps.auth.users,
        filterCards: nextProps.auth.users,
        search: ''
      });
    }

    if (
      this.props.auth.dataAddUser !== nextProps.auth.dataAddUser ||
      this.props.auth.errorAddUser !== nextProps.auth.errorAddUser
    ) {
      if (nextProps.auth.errorAddUser) {
        this.setState(
          { confirmLoadingModal: false, confirmAddVisible: false },
          () =>
            notification['error']({
              message: 'Error',
              description: nextProps.auth.messageAddUser
            })
        );
      } else {
        this.setState(
          {
            confirmLoadingModal: false,
            visibleModal: false,
            confirmAddVisible: false,
            addVisible: false,
            setData: {
              Name: '',
              email: '',
              Admin: false,
              adminVerified: false
            }
          },
          () =>
            notification['success']({
              message: 'Successfully Added',
              description: nextProps.auth.messageAddUser
            })
        );
      }
    }
  }

  render() {
    return (
      <div className='mainApp'>
        <Modal
          title={`${this.state.selectedValModal.Name}'s Details`}
          visible={this.state.visibleModal}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoadingModal}
          onCancel={this.handleCancel}
        >
          <h3>Name: </h3>
          <p>
            <Input
              value={this.state.selectedValModal.Name}
              placeholder={`Enter Member's Name`}
              onChange={val =>
                this.setState({
                  selectedValModal: {
                    ...this.state.selectedValModal,
                    Name: val.target.value
                  }
                })
              }
            />
          </p>

          <h3>Email: </h3>
          <p>
            {this.state.selectedValModal.email
              ? this.state.selectedValModal.email
              : 'Inform the admin to add Email.'}
          </p>

          {this.props.auth.dataEmail.Admin && (
            <p>
              <b>Admin Verification:</b>
              <br />
              <Button
                onClick={() =>
                  this.setState(prevState => ({
                    selectedValModal: {
                      ...prevState.selectedValModal,
                      adminVerified: !prevState.selectedValModal.adminVerified
                    }
                  }))
                }
              >
                {this.state.selectedValModal.adminVerified
                  ? 'Deactivate User'
                  : 'Activate'}
              </Button>
            </p>
          )}
          {this.props.auth.dataEmail.Admin && (
            <p>
              <b>Reset Password:</b>
              <br />
              <Button
                onClick={() =>
                  firebase
                    .auth()
                    .sendPasswordResetEmail(this.state.selectedValModal.email)
                    .then(() => {
                      notification['success']({
                        message: 'Successfully Sent',
                        description: 'Reset Mail sent successfully'
                      });
                    })
                    .catch(error => {
                      notification['error']({
                        message: 'Error',
                        description: 'Error sending Reset Mail'
                      });
                    })
                }
              >
                Reset Mail
              </Button>
            </p>
          )}
        </Modal>
        <Modal
          title='Add User'
          visible={this.state.addVisible}
          onOk={this.handleAddOk}
          confirmLoading={this.state.confirmAddVisible}
          onCancel={this.handleAddCancel}
        >
          <h3>Member's Name</h3>
          <Input
            value={this.state.setData.Name}
            placeholder={`Enter Member's Name`}
            onChange={val =>
              this.setState({
                setData: { ...this.state.setData, Name: val.target.value }
              })
            }
          />
          <h3>Member's Email</h3>
          <Input
            placeholder={`Enter Member's Email`}
            value={this.state.setData.email}
            onChange={val =>
              this.setState({
                setData: {
                  ...this.state.setData,
                  email: val.target.value
                }
              })
            }
          />
          <p style={{ color: 'gray' }}>The initial password is 123456</p>
        </Modal>
        <Skeleton loading={false} active>
          <div className='searchSticky'>
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
                  placeholder='input search text'
                  onSearch={value => this.handleSearchChange(value)}
                  onChange={e => this.handleSearchChange(e)}
                  enterButton
                />
                {this.props.auth.dataEmail.Admin && (
                  <Button
                    type='primary'
                    shape='round'
                    style={{ marginLeft: 5 }}
                    onClick={() =>
                      this.setState({
                        addVisible: true
                      })
                    }
                  >
                    Add User
                  </Button>
                )}
              </div>
            </Card>
          </div>
          <div className='showAllCards'>
            {this.state.filterCards.map((val, key) => (
              <Card
                size='small'
                className='singleCards'
                key={key}
                onClick={() => this.showModal(val)}
              >
                <p>
                  <b>Name: </b>
                  {val.Name}
                </p>
                {val.email ? (
                  <p>
                    <b>Email: </b>
                    {val.email}
                  </p>
                ) : (
                  <p className='colorRed'>Ask admin to add the email</p>
                )}
                {this.props.auth.dataEmail.Admin && !val.adminVerified && (
                  <p className='colorRed'>Admin verify the email</p>
                )}
              </Card>
            ))}
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
)(AddEditUsers);
