import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { OnAuth } from '../store/actions/actions';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRupeeSign,
  faUserEdit,
  faHome,
  faEdit,
  faDownload,
  faPlus,
  faUsers,
  faUserAlt,
  faFileInvoiceDollar,
  faUsersCog
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Dashboard.css';
import DashboardRouter from '../routers/DashboardRouter';
import firebase from '../config/fbConfig'; //for data of JMM excel

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      items: [
        { path: '/dashboard/home', icon: faHome, name: 'Home' },
        { path: '/dashboard/wings', icon: faEdit, name: 'Wings' },
        { path: '/dashboard/well-wishers', icon: faPlus, name: 'Well-Wishers' },
        {
          path: '/dashboard/expenses',
          icon: faFileInvoiceDollar,
          name: 'Expenses'
        },
        {
          path: '/dashboard/addeditusers',
          icon: faUsersCog,
          name: 'Add/Edit Users'
        },
        { path: '/dashboard/downloads', icon: faDownload, name: 'Download' },
        { path: '/dashboard/bankbook', icon: faRupeeSign, name: 'Bank Book' }
      ]
    };
    console.log('inHoe', this.props);
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

  componentDidMount() {
    this.props.OnAuth({
      type: 'email_data'
    });
  }

  render() {
    return (
      <Layout
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, #de6161, #2657eb)'
        }}
      >
        <Sider
          style={{ overflow: 'auto' }}
          trigger={null}
          breakpoint='md'
          onBreakpoint={broken => {
            this.setState({
              collapsed: broken
            });
          }}
          collapsedWidth='0'
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className='logo' />
          <Menu
            theme='dark'
            mode='inline'
            selectedKeys={[this.props.location.pathname]}
          >
            {this.props.auth.dataEmail.adminVerified &&
              this.state.items.map((val, key) => (
                <Menu.Item key={val.path}>
                  <NavLink to={val.path}>
                    <Icon>
                      <FontAwesomeIcon icon={val.icon} />
                    </Icon>
                    <span>{val.name}</span>
                  </NavLink>
                </Menu.Item>
              ))}
            <Menu.Item key='/dashboard/account'>
              <NavLink to='/dashboard/account'>
                <Icon>
                  <FontAwesomeIcon icon={faUserAlt} />
                </Icon>
                <span>Account</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className='layoutScroll'>
          <Header
            style={{
              background: 'linear-gradient(to right, #780206, #061161)',
              padding: 0,
              position: 'fixed',
              zIndex: 10,
              width: '100%',
              display: 'flex'
            }}
          >
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
              style={{ marginLeft: '5px', color: 'white' }}
            />
            {this.state.collapsed && (
              <div className='headerDivLogo'>
                <div className='headerLogo' />
              </div>
            )}
          </Header>
          <Content
            style={{
              margin: '65px 16px',
              padding: 12,
              height: '100%'
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
  const { firebase, auth } = state;
  return {
    firebase,
    auth
  };
}

export default compose(
  connect(mapStateToProps, {
    OnAuth
  })
)(Dashboard);

{
  /* <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="database" />
                  <span>Database</span>
                </span>
              }
            >
              <Menu.Item key="/dashboard/home">
              <NavLink to="/dashboard/home" >
              <Icon type="book" />
              <span>Overview</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/dashboard/home">
              <NavLink to="/dashboard/home" >
              <Icon type="edit" />
              <span>Edit Receipt</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/dashboard/home">
              <NavLink to="/dashboard/home" >
              <Icon type="user-add" />
              <span>Add User</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="/dashboard/home">
              <NavLink to="/dashboard/home" >
              <Icon type="delete" />
              <span>Reset Database</span>
              </NavLink>
            </Menu.Item>
            </SubMenu> */
  //   <Menu.Item key='/dashboard/wings'>
  //   <NavLink to='/dashboard/wings'>
  //     <Icon>
  //       <FontAwesomeIcon icon={faEdit} />
  //     </Icon>
  //     <span>Wings</span>
  //   </NavLink>
  // </Menu.Item>
  // <Menu.Item key='/dashboard/well-wishers'>
  //   <NavLink to='/dashboard/well-wishers'>
  //     <Icon>
  //       <FontAwesomeIcon icon={faPlus} />
  //     </Icon>
  //     <span>Well-Wishers</span>
  //   </NavLink>
  // </Menu.Item>
  // <Menu.Item key='/dashboard/expenses'>
  //   <NavLink to='/dashboard/expenses'>
  //     <Icon>
  //       <FontAwesomeIcon icon={faFileInvoiceDollar} />
  //     </Icon>
  //     <span>Expenses</span>
  //   </NavLink>
  // </Menu.Item>
  // <Menu.Item key='/dashboard/addeditusers'>
  //   <NavLink to='/dashboard/addeditusers'>
  //     <Icon>
  //       <FontAwesomeIcon icon={faUsersCog} />
  //     </Icon>
  //     <span>Add/Edit Users</span>
  //   </NavLink>
  // </Menu.Item>
  // <Menu.Item key='/dashboard/downloads'>
  //   <NavLink to='/dashboard/downloads'>
  //     <Icon>
  //       <FontAwesomeIcon icon={faDownload} />
  //     </Icon>
  //     <span>Download</span>
  //   </NavLink>
  // </Menu.Item>
  // <Menu.Item key='/dashboard/bankbook'>
  //   <NavLink to='/dashboard/bankbook'>
  //     <Icon>
  //       <FontAwesomeIcon icon={faRupeeSign} />
  //     </Icon>
  //     <span>Bank Book</span>
  //   </NavLink>
  // </Menu.Item>
}
