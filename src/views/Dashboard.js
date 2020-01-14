import React, { Component } from 'react';
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
// import firebase from "../config/fbConfig"; //for data of JMM excel

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
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

  // for data

  // componentDidMount(){
  //   let data = []
  //   let citiesRef = firebase.firestore().collection('expenses').orderBy('timestamp');
  //   let query = citiesRef.get()
  //     .then(snapshot => {
  //       if (snapshot.empty) {
  //         console.log('No matching documents.');
  //         return;
  //       }

  //       snapshot.forEach(doc => {
  //         data.push(doc.data())
  //         // console.log(doc.id, '=>', doc.data());
  //       });
  //       console.log("data",JSON.stringify(data))
  //     })
  //     .catch(err => {
  //       console.log('Error getting documents', err);
  //     });
  // }

  render() {
    return (
      <Layout style={{ width: '100%', height: '100%' }}>
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
            <Menu.Item key='/dashboard/home'>
              <NavLink to='/dashboard/home'>
                <Icon>
                  <FontAwesomeIcon icon={faHome} />
                </Icon>
                <span>Home</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key='/dashboard/wings'>
              <NavLink to='/dashboard/wings'>
                <Icon>
                  <FontAwesomeIcon icon={faEdit} />
                </Icon>
                <span>Wings</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key='/dashboard/well-wishers'>
              <NavLink to='/dashboard/well-wishers'>
                <Icon>
                  <FontAwesomeIcon icon={faPlus} />
                </Icon>
                <span>Well-Wishers</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key='/dashboard/expenses'>
              <NavLink to='/dashboard/expenses'>
                <Icon>
                  <FontAwesomeIcon icon={faFileInvoiceDollar} />
                </Icon>
                <span>Expenses</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key='/dashboard/addeditusers'>
              <NavLink to='/dashboard/addeditusers'>
                <Icon>
                  <FontAwesomeIcon icon={faUsersCog} />
                </Icon>
                <span>Add/Edit Users</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key='/dashboard/downloads'>
              <NavLink to='/dashboard/downloads'>
                <Icon>
                  <FontAwesomeIcon icon={faDownload} />
                </Icon>
                <span>Download</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key='/dashboard/bankbook'>
              <NavLink to='/dashboard/bankbook'>
                <Icon>
                  <FontAwesomeIcon icon={faRupeeSign} />
                </Icon>
                <span>Bank Book</span>
              </NavLink>
            </Menu.Item>
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
        <Layout>
          <Header
            style={{
              background: '#fff',
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
              style={{ marginLeft: '5px' }}
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
  const { firebase } = state;
  return {
    firebase
  };
}

export default compose(
  connect(mapStateToProps, {
    OnAuth
  }),
  firestoreConnect([
    {
      collection: 'auth'
    }
  ])
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
}
