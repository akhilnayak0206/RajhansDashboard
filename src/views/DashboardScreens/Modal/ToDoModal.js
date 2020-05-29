import React from 'react';
import { Button, Input, Modal } from 'antd';

const ToDoModal = ({ showTask, passStateFunc, taskProp }) => {
  return (
    <Modal
      title='Task Details'
      visible={showTask}
      onCancel={() => passStateFunc()}
      footer={[
        <Button key='back' onClick={() => passStateFunc()}>
          Return
        </Button>,
      ]}
    >
      <h4>Title</h4>
      <Input
        // value={this.state.selectedValModal.Received}
        disabled={true}
      />
      <h4>Task Coordinator</h4>
      <Input
        // value={this.state.selectedValModal.Received}
        disabled={true}
      />
      <h4>Description</h4>
      <Input
        // value={this.state.selectedValModal.Received}
        disabled={true}
      />
      {taskProp.title && <h2>don't show me</h2>}
    </Modal>
  );
};

export default ToDoModal;
