import React, { Component } from "react";
// import { connect } from "react-redux";
// import { OnAuth } from "../store/actions/actions";
// import { firestoreConnect } from "react-redux-firebase";
// import { compose } from "redux";
import firebase from '../config/fbConfig'
import { Form, Icon, Input, Button, Tooltip } from 'antd'
import '../styles/LoginPage.css'

class NormalLoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-div" >
        <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} /> }
              suffix={
        <Tooltip title="Email ID or username as given by the admin">
          <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

const LoginPage = Form.create({})(NormalLoginForm);

//const LoginPage = Form.create({ name: 'normal_login' })(NormalLoginPage);

export default LoginPage

// function mapStateToProps(state) {
  //   console.log("state",state.firebase.auth)
  //   const { firebase } = state;
  //   return {
    //     firebase
    //   };
    // }
    
    // export default compose(
      //   connect(mapStateToProps,{
        //     OnAuth
        //   }),
        // )(LoginPage);
        
        {/* <p>soething somehitng</p>
        <button onClick={() => this.props.OnAuth("login")}>
        <button onClick={()=>firebase.auth().signInWithEmailAndPassword("nnewn3@gmail.com", "12345678").then(()=>alert("Logged in"))}>
          <p>hello</p>
        </button>
        <p>{JSON.stringify(this.state.data)}</p>
        <button onClick={() => this.props.OnAuth("logout")}>p
        </button> */}