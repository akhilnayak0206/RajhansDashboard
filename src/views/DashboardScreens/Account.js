import React, { Component } from "react";
import { Switch, Card, Icon, Avatar, Input, Button, Skeleton } from "antd";
import { NavLink } from "react-router-dom";
import firebase from "../../config/fbConfig";
import "../../styles/Account.css";

const { Meta } = Card;
class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingSign:false,
      email: "",
      name: ""
    };
  }
  render() {
    return (
      <div>
        <h1 className="heading">Account Settings</h1>
        <div className="mainDiv">
          <Card className="cardBoth" style={{ margin: 5 }}>
            <Skeleton loading={this.state.loading} active={true} >
              <h3>Email</h3>
              <Input
                placeholder="Email is being Loaded"
                value={this.state.email}
              />
              <h3>Name</h3>
              <Input
                placeholder="Name is being Loaded"
                value={this.state.name}
              />
            </Skeleton>
          </Card>
          <Card className="cardBoth" style={{ margin: 5}}>
            <Skeleton loading={this.state.loadingSign} paragraph={{ rows: 3 }} >
              <h3 style={{ textAlign: "center" }}>Jai Mitra Mandal</h3>
              <p style={{ color: "rgba(0,0,0,0.5)" }}>
                This website is made by Akhil Nayak if you have any doubt or
                suggestion you can contact me by emailing me to nnewn3@gmail.com
              </p>
              <div style={{ textAlign: "center" }}>
                <Button type="danger">Sign Out</Button>
              </div>
            </Skeleton>
          </Card>
        </div>
      </div>
    );
  }
}

export default Account;
