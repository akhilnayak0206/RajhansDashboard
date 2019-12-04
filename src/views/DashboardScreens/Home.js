import React, { Component } from "react";
import { connect } from "react-redux";
import { OnAuth } from "../../store/actions/actions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Card, Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import "../../styles/Account.css";

class Home extends Component {
  constructor(props){
    super(props)
    this.state={

    }
  }
  
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          <Card
            style={{
              flex: "40%",
              margin: 5,
              textAlign: "center",
              fontFamily: "'Open Sans', sans-serif"
            }}
            title="Total"
          >
            <Skeleton loading={false} paragraph={{ rows: 3 }}>
              <h1
                style={{
                  textAlign: "center",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: "bold",
                  fontSize: "30px"
                }}
              >
                <FontAwesomeIcon icon={faRupeeSign} />
                1234
              </h1>
            </Skeleton>
          </Card>
          <Card
            style={{
              flex: "40%",
              margin: 5,
              textAlign: "center",
              fontFamily: "'Open Sans', sans-serif"
            }}
            title="Cash In Hand"
          >
            <Skeleton loading={false} paragraph={{ rows: 3 }}>
              <h1
                style={{
                  textAlign: "center",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: "bold",
                  fontSize: "30px"
                }}
              >
                <FontAwesomeIcon icon={faRupeeSign} />
                1234
              </h1>
            </Skeleton>
          </Card>
          <Card
            style={{
              flex: "40%",
              margin: 5,
              textAlign: "center",
              fontFamily: "'Open Sans', sans-serif"
            }}
            title="Collected"
          >
            <Skeleton loading={false} paragraph={{ rows: 3 }}>
              <h1
                style={{
                  textAlign: "center",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: "bold",
                  fontSize: "30px"
                }}
              >
                <FontAwesomeIcon icon={faRupeeSign} />
                1234
              </h1>
            </Skeleton>
          </Card>
          <Card
            style={{
              flex: "40%",
              margin: 5,
              textAlign: "center",
              fontFamily: "'Open Sans', sans-serif"
            }}
            title="Expense"
          >
            <Skeleton loading={false} paragraph={{ rows: 3 }}>
              <h1
                style={{
                  textAlign: "center",
                  fontFamily: "'Open Sans', sans-serif",
                  fontWeight: "bold",
                  fontSize: "30px"
                }}
              >
                <FontAwesomeIcon icon={faRupeeSign} />
                1234
              </h1>
            </Skeleton>
          </Card>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Card style={{ margin: 5 }}>
            <Skeleton paragraph={{ rows: 3 }}>
              <h3 style={{ textAlign: "center" }}>Jai Mitra Mandal</h3>
              <p style={{ color: "rgba(0,0,0,0.5)" }}>
                This website is made by Akhil Nayak if you have any doubt or
                suggestion you can contact me by emailing me to nnewn3@gmail.com
              </p>
            </Skeleton>
          </Card>
          <Card style={{ margin: 5 }}>
            <Skeleton paragraph={{ rows: 3 }}>
              <h3 style={{ textAlign: "center" }}>Jai Mitra Mandal</h3>
              <p style={{ color: "rgba(0,0,0,0.5)" }}>
                This website is made by Akhil Nayak if you have any doubt or
                suggestion you can contact me by emailing me to nnewn3@gmail.com
              </p>
            </Skeleton>
          </Card>
          <Card style={{ margin: 5 }}>
            <Skeleton paragraph={{ rows: 3 }}>
              <h3 style={{ textAlign: "center" }}>Jai Mitra Mandal</h3>
              <p style={{ color: "rgba(0,0,0,0.5)" }}>
                This website is made by Akhil Nayak if you have any doubt or
                suggestion you can contact me by emailing me to nnewn3@gmail.com
              </p>
            </Skeleton>
          </Card>
        </div>
      </div>
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
)(Home);
