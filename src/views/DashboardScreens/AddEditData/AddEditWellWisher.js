import React, { Component } from "react";
import { Card, Input, Button, Skeleton, Select, Popover, DatePicker, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";

const { Search } = Input;
const { Option } = Select;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

class AddEditWellWisher extends Component {
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
        "ak",
        "sakhcbas",
        "sygew",
        "kjbiubc"
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
        "ak",
        "sakhcbas",
        "sygew",
        "kjbiubc"
      ],
      selectedWings: "wingA",
      showCards: "noFil",
      search: "",
      visiblePopover: false,
      filterDate:"",
    visibleModal: false,
    confirmLoadingModal: false,
    selectedValModal:""
    };
  }

  showModal = (val) => {
    this.setState({
      visibleModal: true,
      selectedValModal:val
    });
  };

  handleOk = () => {
    this.setState({
      confirmLoadingModal: true,
    });
    setTimeout(() => {
      this.setState({
        visibleModal: false,
        confirmLoadingModal: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visibleModal: false,
    });
  };

  onChangeDate = (date, dateString) => {
    this.setState({filterDate:dateString})
  }

  handlePopoverChange = visiblePopover => {
    this.setState({ visiblePopover });
  };

  filteringCards = () => {
    let filterCards = this.state.cards.filter(val =>
      new RegExp(this.state.search, "i").exec(val)
    );
    this.setState({ filterCards });
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

  handleChangeFilter = value => {
    this.setState({ showCards: value }, () => this.filteringCards());
  };

  handleChangeWings = value => {
    this.setState({ selectedWings: value }, () => this.filteringCards());
  };

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
      <Modal
          title="Title"
          visible={this.state.visibleModal}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoadingModal}
          onCancel={this.handleCancel}
        >
          <p>{JSON.stringify(this.state.selectedValModal)}</p>
        </Modal>
        <Skeleton loading={false} paragraph={{ rows: 50 }} active>
          <div
            style={{
              width: "100%",
              marginBottom: 20,
              position: "sticky",
              zIndex: 5,
              top: 65
            }}
          >
            <Card
              size="small"
              style={{ borderRadius: 5, width: "100%" }}
              bodyStyle={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)" }}
              hoverable
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <Search
                  placeholder="input search text"
                  onSearch={value => this.handleSearchChange(value)}
                  onChange={e => this.handleSearchChange(e)}
                  enterButton
                />
              </div>
            </Card>
          </div>
          <div style={{ width: "100%", height: "100%", marginBottom: 20 }}>
            {this.state.filterCards.map((val, key) =>
              val % 2 === 0 ? (
                <Card
                  size="small"
                  title={`FlatNo: ${val}`}
                  style={{
                    borderRadius: 5,
                    width: "100%",
                    marginBottom: 10,
                    backgroundColor: "#f44336"
                  }}
                  key={key}
                  onClick={()=>this.showModal(val)}
                >
                  <b>Not Collected yet</b>
                </Card>
              ) : (
                <Card
                  size="small"
                  title={`FlatNo: ${val}`}
                  style={{ borderRadius: 5, width: "100%", marginBottom: 10 }}
                  key={key}
                  onClick={()=>this.showModal(val)}
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
          <div
            style={{
              flexDirection: "column",
              display: "flex",
              zIndex: 15,
              position: "fixed",
              bottom: 62,
              right: 38
            }}
          >
            <Popover
              placement="leftTop"
              content={
                <div style={{display:'flex', flexDirection:'column'}} >
                  <Select
                  size="large"
                  defaultValue="wingA"
                  style={{ marginBottom: 5 }}
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
                  size="large"
                    defaultValue="noFil"
                    style={{ marginBottom: 5 }}
                    onChange={this.handleChangeFilter}
                    maxTagPlaceholder={5}
                    value={this.state.showCards}
                  >
                    <Option value="noFil">No Filter</Option>
                    <Option value="coll">Collected</Option>
                    <Option value="noColl">Not Collected</Option>
                  </Select>
                  <DatePicker size="large" onChange={this.onChangeDate} format="DD/MM/YYYY" />
                </div>
              }
              title="Select Filters"
              trigger="click"
              visible={this.state.visiblePopover}
              onVisibleChange={this.handlePopoverChange}
            >
              <Button type="primary" shape="circle" size="large" style={{}}>
                <FontAwesomeIcon icon={faFilter} size={70} color="white" />
              </Button>
            </Popover>
            <Button
              type="primary"
              shape="circle"
              size="large"
              style={{ marginTop: 10 }}
            >
              <FontAwesomeIcon icon={faPlus} size={70} color="white" />
            </Button>
          </div>
        </Skeleton>
      </div>
    );
  }
}

export default AddEditWellWisher;
