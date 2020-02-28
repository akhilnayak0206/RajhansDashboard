import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { OnAuth } from '../../store/actions/actions';
import { compose } from 'redux';
import {
  Switch,
  Card,
  Icon,
  Avatar,
  Input,
  Button,
  Skeleton,
  notification
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRupeeSign,
  faUserEdit,
  faDatabase,
  faHome,
  faEdit,
  faDownload,
  faPlus,
  faUsers,
  faUserAlt,
  faFileInvoiceDollar,
  faUsersCog,
  faFileDownload
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import firebase from '../../config/fbConfig';
import '../../styles/ResetDatabase.css';

const ResetDatabase = ({ OnAuth, auth }) => {
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  useEffect(() => {
    if (auth.dataEmail.Admin) {
      return setLoadingSkeleton(true);
    }
  }, []);

  return (
    <Fragment>
      <h1 className='heading'>Database Settings</h1>
      <div className='mainDiv'>
        <Card className='cardBoth'>
          <h3>Download Current Year Data</h3>
          <div className='downloadButtonDiv'>
            <Button
              type='primary'
              className='downloadInnerButton'
              //   onClick={() => this.resetPassword()}
              //   disabled={this.state.btnReset}
            >
              <Icon viewBox='0 0 1024 1024'>
                <FontAwesomeIcon icon={faFileDownload} />
              </Icon>
              <span>Wings</span>
            </Button>
          </div>
          <div className='downloadButtonDiv'>
            <Button
              className='downloadInnerButton'
              type='primary'
              //   onClick={() => this.resetPassword()}
              //   disabled={this.state.btnReset}
            >
              <Icon viewBox='0 0 1024 1024'>
                <FontAwesomeIcon icon={faFileDownload} />
              </Icon>
              <span>Well-Wisher</span>
            </Button>
          </div>
          <div className='downloadButtonDiv'>
            <Button
              className='downloadInnerButton'
              type='primary'
              //   onClick={() => this.resetPassword()}
              //   disabled={this.state.btnReset}
            >
              <Icon viewBox='0 0 1024 1024'>
                <FontAwesomeIcon icon={faFileDownload} />
              </Icon>
              <span>Expenses</span>
            </Button>
          </div>
        </Card>
        <Card className='cardBoth'>
          <h3 className='textCenter'>Jai Mitra Mandal</h3>
          <p style={{ color: 'rgba(0,0,0,0.5)' }}>
            Backing up the data of the same year replaces the previous data with
            the current data of that year(e.g. if there already exists 2019 in
            downloads then if you are trying to backup the data of 2019 then it
            will get replaced. If the data is of the year that doesn't exist in
            the Downloads then there is no worries.)
            <br />
            So have a talk with Akhil if you want to get any doubts cleared.
            <br />
          </p>
          <div style={{ textAlign: 'center', marginBottom: '5px' }}>
            <Button
              style={{ backgroundColor: '#e6b800', color: 'white' }}
              // onClick={() => this.onSignOut()}
              // disabled={this.state.btnSignOut}
            >
              Backup Database
            </Button>
          </div>
        </Card>
        <Card className='cardBoth'>
          <h3 className='textCenter'>Jai Mitra Mandal</h3>
          <p style={{ color: 'rgba(0,0,0,0.5)' }}>
            Do take a backup before resetting the data.
            <br />
            To check if the data is backed up go to Downloads, if you see the
            year that should be saved then the data is present.
            <br />
            Make sure to have a talk with JMM members before resetting the
            database.
            <br />
            This is a irreversible action.
            <br />
          </p>
          <div style={{ textAlign: 'center', marginBottom: '5px' }}>
            <Button
              type='danger'
              // onClick={() => this.onSignOut()}
              // disabled={this.state.btnSignOut}
            >
              Reset Database
            </Button>
          </div>
        </Card>
      </div>
    </Fragment>
  );
};

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
)(ResetDatabase);
