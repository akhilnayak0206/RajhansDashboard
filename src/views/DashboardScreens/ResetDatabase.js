import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { OnAuth, OnDownload } from '../../store/actions/actions';
import { compose } from 'redux';
import { CSVLink } from 'react-csv';
import { Card, Icon, Button, notification, Skeleton } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import '../../styles/ResetDatabase.css';

const ResetDatabase = ({ OnDownload, download, auth }) => {
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [downloadWings, setDownloadWings] = useState(false);
  const [downloadWellWishers, setDownloadWellWishers] = useState(false);
  const [downloadExpenses, setDownloadExpenses] = useState(false);

  const csvAllWings = useRef();
  const csvWellWisher = useRef();
  const csvExpenses = useRef();

  useEffect(() => {
    if (download.dataChanged) {
      if (download.error) {
        setButtonDisabled(false);
        notification['error']({
          message: 'Error in Excel File',
          description: download.message
        });
      } else {
        notification['success']({
          message: 'Excel File',
          description: download.message
        });
      }
    }
    // eslint-disable-next-line
  }, [download.dataChanged]);

  useEffect(() => {
    if (download.wellWishers.length) {
      setDownloadWellWishers(true);
    }
  }, [download.wellWishers]);

  useEffect(() => {
    if (downloadWellWishers) {
      csvWellWisher.current.link.click();
      setDownloadWellWishers(false);
      setButtonDisabled(false);
    }
  }, [downloadWellWishers]);

  useEffect(() => {
    if (download.expenses.length) {
      setDownloadExpenses(true);
    }
  }, [download.expenses]);

  useEffect(() => {
    if (downloadExpenses) {
      csvExpenses.current.link.click();
      setDownloadExpenses(false);
      setButtonDisabled(false);
    }
  }, [downloadExpenses]);

  useEffect(() => {
    if (download.allWings.length) {
      setDownloadWings(true);
    }
  }, [download.allWings]);

  useEffect(() => {
    if (downloadWings) {
      csvAllWings.current.link.click();
      setDownloadWings(false);
      setButtonDisabled(false);
    }
  }, [downloadWings]);

  useEffect(() => {
    if (auth.dataEmail.Admin) {
      return setLoadingSkeleton(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Skeleton loading={loadingSkeleton} active>
      <h1 className='heading'>Database Settings</h1>
      <div className='mainDiv'>
        <Card className='cardBoth'>
          <h3 style={{ textAlign: 'center' }}>Download Current Year Data</h3>
          <div className='downloadButtonDiv'>
            <Button
              className='downloadCSVButton'
              type='primary'
              onClick={e => {
                OnDownload({ type: 'wings' });
                setButtonDisabled(true);
                setDownloadWings(false);
              }}
              loading={downloadWings}
              disabled={buttonDisabled}
            >
              <span>
                <CSVLink
                  ref={csvAllWings}
                  className='downloadInnerButton'
                  filename={'All_Wings_Current_Year.csv'}
                  data={download.allWings}
                  asyncOnClick={true}
                  onClick={(event, done) => {
                    event.stopPropagation();
                    done(downloadWings);
                  }}
                >
                  <div>
                    <Icon viewBox='0 0 1024 1024'>
                      <FontAwesomeIcon icon={faFileDownload} color='white' />
                    </Icon>
                    <span style={{ color: 'white' }}> All Wings</span>
                  </div>
                </CSVLink>
              </span>
            </Button>
            <Button
              className='downloadCSVButton'
              type='primary'
              onClick={e => {
                OnDownload({ type: 'wellWishers' });
                setButtonDisabled(true);
                setDownloadWellWishers(false);
              }}
              disabled={buttonDisabled}
              loading={downloadWellWishers}
            >
              <span>
                <CSVLink
                  ref={csvWellWisher}
                  className='downloadInnerButton'
                  filename={'Well-Wisher_Current_Year.csv'}
                  data={download.wellWishers}
                  asyncOnClick={true}
                  onClick={(event, done) => {
                    event.stopPropagation();
                    done(downloadWellWishers);
                  }}
                >
                  <div>
                    <Icon viewBox='0 0 1024 1024'>
                      <FontAwesomeIcon icon={faFileDownload} color='white' />
                    </Icon>
                    <span style={{ color: 'white' }}> Well-Wisher</span>
                  </div>
                </CSVLink>
              </span>
            </Button>
            <Button
              className='downloadCSVButton'
              type='primary'
              onClick={e => {
                OnDownload({ type: 'expenses' });
                setButtonDisabled(true);
                setDownloadExpenses(false);
              }}
              disabled={buttonDisabled}
              loading={downloadExpenses}
            >
              <span>
                <CSVLink
                  ref={csvExpenses}
                  className='downloadInnerButton'
                  filename={'Expenses_Current_Year.csv'}
                  data={download.expenses}
                  asyncOnClick={true}
                  onClick={(event, done) => {
                    event.stopPropagation();
                    done(downloadExpenses);
                  }}
                >
                  <div>
                    <Icon viewBox='0 0 1024 1024'>
                      <FontAwesomeIcon icon={faFileDownload} color='white' />
                    </Icon>
                    <span style={{ color: 'white' }}> Expenses</span>
                  </div>
                </CSVLink>
              </span>
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
    </Skeleton>
  );
};

function mapStateToProps(state) {
  const { firebase, auth, download } = state;
  return {
    firebase,
    auth,
    download
  };
}

export default compose(
  connect(mapStateToProps, {
    OnAuth,
    OnDownload
  })
)(ResetDatabase);
