import React, { Component } from "react";
import { connect } from "react-redux";
import { OnAuth } from "../store/actions/actions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import firebase from "../config/fbConfig";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import "../styles/Dashboard.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class Dashboard extends Component {
  constructor(props){
   super(props);
  this.state = {
    collapsed: false
  };
}

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    console.log(this.state.collapsed)
    return (
      <Layout style={{width:'100%',height:'100%'}} >
        <Sider
        style={{overflow:'auto'}}
         trigger={null}
        breakpoint="md"
        collapsedWidth="0"
         collapsible 
         collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout >
        <Header style={{ background: '#fff', padding: 0, position:'fixed', zIndex:10, width:"100%", display:'flex'}}>
      <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{marginLeft:'5px'}}
            />
            {
              this.state.collapsed && (
                <div className="headerDivLogo" >
                <div className="headerLogo" />
                </div>
              )
            }
    </Header>
          <Content
            style={{
              margin: '65px 16px',
              padding: 24,
              height:'100%'
            }}
          >
            { this.state.collapsed && (
                <p>kiii</p>
              )}
            Content
           
Eiusmod aliqua minim eu sunt tempor labore sit et aliquip. Occaecat fugiat eiusmod mollit amet veniam do ea et ex in aliqua aliqua. Ipsum est in aute elit nulla do qui magna elit. Do consectetur ipsum reprehenderit minim.
          </Content>
        </Layout>
      </Layout>
    );
  }
}

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
  ),
  firestoreConnect([
    {
      collection: "auth"
    }
  ])
)(Dashboard);
