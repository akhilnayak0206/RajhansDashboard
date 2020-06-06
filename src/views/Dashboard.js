import React, { Component } from 'react';
import { connect } from 'react-redux';
import { OnAuth } from '../store/actions/actions';
import { compose } from 'redux';
import { Layout, Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRupeeSign,
  faDatabase,
  faHome,
  faEdit,
  faDownload,
  faPlus,
  faUserAlt,
  faFileInvoiceDollar,
  faUsersCog,
  faTasks,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/Dashboard.css';
import DashboardRouter from '../routers/DashboardRouter';

const { Header, Content, Sider } = Layout;

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
          name: 'Expenses',
        },
        { path: '/dashboard/tasks', icon: faTasks, name: 'To-Do Task' },
        {
          path: '/dashboard/addeditusers',
          icon: faUsersCog,
          name: 'Add/Edit Users',
        },
        { path: '/dashboard/downloads', icon: faDownload, name: 'Download' },
        { path: '/dashboard/bankbook', icon: faRupeeSign, name: 'Bank Book' },
      ],
      adminItems: [
        {
          path: '/dashboard/resetdatabase',
          icon: faDatabase,
          name: 'Reset Database',
        },
      ],
    };
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className='layoutParent'>
        <Sider
          className='overflowAuto'
          trigger={null}
          breakpoint='md'
          onBreakpoint={(broken) => {
            this.setState({
              collapsed: broken,
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
                    <Icon viewBox='0 0 1024 1024'>
                      <FontAwesomeIcon icon={val.icon} />
                    </Icon>
                    <span>{val.name}</span>
                  </NavLink>
                </Menu.Item>
              ))}
            {this.props.auth.dataEmail.adminVerified &&
              this.props.auth.dataEmail.Admin &&
              this.state.adminItems.map((val, key) => (
                <Menu.Item key={val.path}>
                  <NavLink to={val.path}>
                    <Icon viewBox='0 0 1024 1024'>
                      <FontAwesomeIcon icon={val.icon} />
                    </Icon>
                    <span>{val.name}</span>
                  </NavLink>
                </Menu.Item>
              ))}
            <Menu.Item key='/dashboard/account'>
              <NavLink to='/dashboard/account'>
                <Icon viewBox='0 0 1024 1024'>
                  <FontAwesomeIcon icon={faUserAlt} />
                </Icon>
                <span>Account</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className='layoutScroll'>
          <Header className='layoutHeader'>
            <Icon
              className='trigger'
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            {this.state.collapsed && (
              <div className='headerDivLogo'>
                {/* <div className='headerLogo' /> */}
              </div>
            )}
          </Header>
          <Content className='layoutContent'>
            <DashboardRouter />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  return {
    auth,
  };
}

export default compose(
  connect(mapStateToProps, {
    OnAuth,
  })
)(Dashboard);
