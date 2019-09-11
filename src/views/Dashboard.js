import React, { Component } from "react";
import { connect } from "react-redux";
import { OnAuth } from "../store/actions/actions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Link } from 'react-router-dom'
import "../styles/Dashboard.css";
import DashboardRouter from "../routers/DashboardRouter";

const { Header, Content, Sider } = Layout;
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
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <Link to="/dashboard/home" >
              <Icon type="home" />
              <span>Home</span>
              </Link>
            </Menu.Item>
            <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="database" />
                <span>Database</span>
              </span>
            }
          >
            <Menu.Item key="sub1/1">
              <Link to="/dashboard/home" >
              <Icon type="book" />
              <span>Overview</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="sub1/2">
              <Link to="/dashboard/home" >
              <Icon type="edit" />
              <span>Edit Receipt</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="sub1/3">
              <Link to="/dashboard/home" >
              <Icon type="user-add" />
              <span>Add User</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="sub1/4">
              <Link to="/dashboard/home" >
              <Icon type="delete" />
              <span>Reset Database</span>
              </Link>
            </Menu.Item>
          </SubMenu>
            <Menu.Item key="2">
              <Link to="/dashboard/downloads" >
              <Icon type="download" />
              <span>Downloads</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/dashboard/cashathand" >
              <Icon type="dollar" />
              <span>Cash At Hand</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/dashboard/account" >
              <Icon type="user" />
              <span>Account</span>
              </Link>
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
          <DashboardRouter />
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
