import React, { Component } from 'react';
import { Card, Input, Button, Skeleton, Select, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
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

const { Search } = Input;
const { Option } = Select;

class AddEditUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      filterCards: [],
      search: '',
      visibleModal: false,
      confirmLoadingModal: false
    };
  }

  showModal = () => {
    this.setState({
      visibleModal: true
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoadingModal: true
    });
    setTimeout(() => {
      this.setState({
        visibleModal: false,
        confirmLoadingModal: false
      });
    }, 2000);
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
    this.props.OnAuth({ type: 'email_data' });
    this.props.OnAuth({ type: 'get_users' });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.cards !== nextProps.auth.users) {
      this.setState({
        cards: nextProps.auth.users,
        filterCards: nextProps.auth.users,
        search: ''
      });
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Modal
          title='Title'
          visible={this.state.visibleModal}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoadingModal}
          onCancel={this.handleCancel}
        >
          <p>inside modal</p>
        </Modal>
        <Skeleton loading={false} active>
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
                        visibleModal: true
                      })
                    }
                  >
                    Add User
                  </Button>
                )}
              </div>
            </Card>
          </div>
          <div style={{ width: '100%', height: '100%', marginBottom: 20 }}>
            {this.state.filterCards.map((val, key) => (
              <Card
                size='small'
                style={{ borderRadius: 5, width: '100%', marginBottom: 10 }}
                key={key}
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
                  <p style={{ color: 'red' }}>Ask admin to add email</p>
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
