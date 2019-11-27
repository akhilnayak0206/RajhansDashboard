import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { OnAuth } from "../store/actions/actions";
import { Redirect } from "react-router-dom";
import firebase from "../config/fbConfig";
import { Form, Icon, Input, Button, Tooltip, notification } from "antd";
import "../styles/LoginPage.css";

class NormalLoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: props.firebase.auth.email,
      btnLogIn: false
    };
  }

  handleSubmit = e => {
    this.setState({
      btnLogIn: true
    });
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.SESSION)
          .then(() => {
            return firebase
              .auth()
              .signInWithEmailAndPassword(values.username, values.password)
              .then(() => {
                notification["success"]({
                  message: "Jai Mata Di",
                  description: "Let's get started with the Rajhans App's Dashboard."
                });
                this.props.OnAuth({type:"login",email:values.username})
              })
              .catch(err => {
                this.setState({
                  btnLogIn: false
                });
                notification["error"]({
                  message: "Incorrect credential",
                  description: "Hey User, the username or password is invalid."
                });
                //console.log("error", err);
              });
          });
      } else {
        this.setState({
          btnLogIn: false
        });
      }
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.firebase.auth !== prevState.auth) {
      return { auth: nextProps.firebase.auth.email };
    } else return null; // Triggers no change in the state
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.auth) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="login-div">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <img
            src="https://res.cloudinary.com/dx0wpoeyu/image/upload/v1567675657/JMMLogo.jpg"
            alt="Jai Mitra Mandal"
          />
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                suffix={
                  <Tooltip title="Email ID or username as given by the admin">
                    <Icon
                      type="info-circle"
                      style={{ color: "rgba(0,0,0,.45)" }}
                    />
                  </Tooltip>
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input.Password
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={this.state.btnLogIn}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const LoginPage = Form.create({})(NormalLoginForm);

function mapStateToProps(state) {
  const { firebase } = state;
  return {
    firebase
  };
}
export default compose(
  connect(
    mapStateToProps,
    {
      OnAuth
    }
  ))(LoginPage);

// export default compose(connect(mapStateToProps))(LoginPage);
