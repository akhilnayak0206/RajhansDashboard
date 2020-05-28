import React from 'react';
import { Button, Skeleton, Card, Input, Avatar, Collapse, Modal } from 'antd';

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
      <h4>Task Coordinator</h4>
      <h4>Description</h4>
      {/* <h2>{taskProp}</h2> */}
    </Modal>
  );
};

export default ToDoModal;
