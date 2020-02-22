import React, { Fragment } from 'react';

const AddUser = () => {
  return (
    <Fragment>
      <p>
        <b>Name: </b>
        {/* {this.state.selectedValModal.Name} */}
      </p>
      <p>
        <b>Email: </b>
        {/* {this.state.selectedValModal.email
              ? this.state.selectedValModal.email
              : 'Inform the admin to add Email.'} */}
      </p>
      <p>
        <b>Admin Verified: </b>
        {/* {this.state.selectedValModal.adminVerified
              ? 'true'
              : 'Inform the admin to verify.'} */}
      </p>
      {/* {this.props.auth.dataEmail.Admin && (
            <p>
              <b>Admin Verification:</b>
              <Button style={{ marginLeft: '5px' }}>
                {this.state.selectedValModal.adminVerified
                  ? 'Deactivate User'
                  : 'Activate'}
              </Button>
            </p>
          )} */}
    </Fragment>
  );
};

export default AddUser;
