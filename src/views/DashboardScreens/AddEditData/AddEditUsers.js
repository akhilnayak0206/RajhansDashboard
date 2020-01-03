import React, { Component } from 'react';
import { Card, Input, Button, Skeleton, Select, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const { Search } = Input;
const { Option } = Select;

class AddEditUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        1,
        2,
        3,
        4,
        56,
        7,
        8,
        9,
        14,
        5,
        6,
        8,
        'ak',
        'sakhcbas',
        'sygew',
        'kjbiubc'
      ],
      filterCards: [
        1,
        2,
        3,
        4,
        56,
        7,
        8,
        9,
        14,
        5,
        6,
        8,
        'ak',
        'sakhcbas',
        'sygew',
        'kjbiubc'
      ],
      selectedWings: 'wingA',
      showCards: 'noFil',
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

  filteringCards = () => {
    let filterCards = this.state.cards.filter(val =>
      new RegExp(this.state.search, 'i').exec(val)
    );
    this.setState({ filterCards });
  };

  handleSearchChange = e => {
    let value = e.target.value;
    this.setState({ search: value }, () => this.filteringCards());
  };

  handleSearchChange = e => {
    if (e.target) {
      this.setState({ search: e.target.value }, () => this.filteringCards());
    }
  };

  handleSearchEnter = value => {
    if (value) {
      this.setState({ search: value }, () => this.filteringCards());
    }
  };

  handleChangeWings = value => {
    this.setState({ selectedWings: value }, () => this.filteringCards());
  };

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
        <Skeleton loading={false} paragraph={{ rows: 50 }} active>
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
                {/* <Select
                  defaultValue="wingA"
                  style={{ marginLeft: 5 }}
                  onChange={this.handleChangeWings}
                >
                  <Option value="wingA">Wing A</Option>
                  <Option value="wingB">Wing B</Option>
                  <Option value="wingC">Wing C</Option>
                  <Option value="wingD">Wing D</Option>
                  <Option value="wingE">Wing E</Option>
                  <Option value="wingAll">All Wings</Option>
                </Select>
                <Select
                  defaultValue="noFil"
                  style={{ marginLeft: 5 }}
                  onChange={this.handleChangeFilter}
                  maxTagPlaceholder={5}
                >
                  <Option value="noFil">No Filter</Option>
                  <Option value="coll">Collected</Option>
                  <Option value="noColl">Not Collected</Option>
                </Select> */}
              </div>
            </Card>
          </div>
          <div style={{ width: '100%', height: '100%', marginBottom: 20 }}>
            {this.state.filterCards.map((val, key) =>
              val % 2 === 0 ? (
                <Card
                  size='small'
                  title={`FlatNo: ${val}`}
                  style={{
                    borderRadius: 5,
                    width: '100%',
                    marginBottom: 10,
                    backgroundColor: '#f44336'
                  }}
                  key={key}
                >
                  <b>Not Collected yet</b>
                </Card>
              ) : (
                <Card
                  size='small'
                  title={`FlatNo: ${val}`}
                  style={{ borderRadius: 5, width: '100%', marginBottom: 10 }}
                  key={key}
                >
                  <p>
                    <b>Name: </b>
                    {val}
                  </p>
                  <p>
                    <b>Amount: </b>₹{val}
                  </p>
                </Card>
              )
            )}
          </div>
        </Skeleton>
      </div>
    );
  }
}

export default AddEditUsers;
