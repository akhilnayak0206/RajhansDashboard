import React, { Component } from 'react'
import {connect} from 'react-redux'
import { OnAuth } from '../store/actions/actions'

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.state={
            data:{}
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            data:this.props.auth
        })
    }
  render() {
    return (
      <div>
        <p>soething somehitng</p>
        <button onClick={()=>this.props.OnAuth()}><p>hello</p></button>
        <p>{JSON.stringify(this.state.data)}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
    const {
      auth
    } = state;
    return {
      auth
    };
  }
  
  export default connect(
    mapStateToProps,
    {
      OnAuth
    }
  )(LoginPage);
