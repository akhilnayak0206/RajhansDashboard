import React, { useState, useEffect } from 'react';
import { Button, Skeleton, Card, Input, Avatar, Collapse, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {} from '../../store/actions/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import '../../styles/ToDo.css';
import ToDoModal from './Modal/ToDoModal';

const { Search, TextArea } = Input;
const { Meta } = Card;
const { Panel } = Collapse;

const ToDo = () => {
  const [addTask, setAddTask] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [taskProp, setTaskProp] = useState('');
  const [skeleton, setSkeleton] = useState(true);

  useEffect(() => {
    setSkeleton(false);
    // eslint-disable-next-line
  }, []);

  const passStateFunc = () => {
    setShowTask(false);
    setTaskProp('');
  };

  return (
    <Skeleton loading={skeleton} active>
      <ToDoModal
        showTask={showTask}
        passStateFunc={passStateFunc}
        taskProp={taskProp}
      />
      <Modal
        title='Add Task'
        visible={addTask}
        onOk={() => setAddTask((state) => !state)}
        onCancel={() => setAddTask((state) => !state)}
        footer={[
          <Button key='back' onClick={() => setAddTask((state) => !state)}>
            Return
          </Button>,
          <Button
            key='submit'
            type='primary'
            //  loading={loading}
            onClick={() => setAddTask((state) => !state)}
          >
            Submit
          </Button>,
        ]}
      >
        <h4>Title</h4>
        <h4>Task Coordinator</h4>
        <h4>Description</h4>
      </Modal>
      <div className='searchSticky'>
        <Card
          size='small'
          style={{ borderRadius: 5, width: '100%' }}
          bodyStyle={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}
          hoverable
        >
          <Search
            placeholder={`Enter Title of the Task`}
            // onSearch={value => this.handleSearchChange(value)}
            // onChange={e => this.handleSearchChange(e)}
            enterButton
          />
        </Card>
      </div>
      <div className='showAllCards'>
        <Collapse accordion>
          <Panel header='Remaining Tasks' key='1'>
            <Card
              style={{ margin: '10px' }}
              actions={[
                <Button type='primary'>Mark Completed</Button>,
                <Button type='danger'>Delete Task</Button>,
              ]}
              onClick={() => {
                setTaskProp('I have been set  by key');
                setShowTask((state) => !state);
              }}
            >
              <Meta
                avatar={<Avatar>A</Avatar>}
                title='Card title'
                description='This is the description'
              />
            </Card>
          </Panel>
          <Panel header='Completed Tasks' key='2'>
            <Card
              style={{ margin: '10px' }}
              actions={[
                <Button type='primary'>Mark Incomplete</Button>,
                <Button type='danger'>Delete Task</Button>,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                }
                title='Card title'
                description='This is the description'
              />
            </Card>
          </Panel>
          <Panel header='Deleted Task' key='3'>
            <Card
              style={{ margin: '10px' }}
              actions={[
                <Button type='primary'>Mark Incomplete</Button>,
                <Button type='danger'>Mark Completed</Button>,
              ]}
            >
              <Meta
                avatar={<Avatar>A</Avatar>}
                title='Card title'
                description='This is the description'
              />
            </Card>
          </Panel>
        </Collapse>
      </div>
      <div className='bottomButton'>
        <Button
          type='primary'
          shape='circle'
          size='large'
          className='buttonShape marginTop'
          onClick={() => setAddTask((state) => !state)}
        >
          <FontAwesomeIcon icon={faPlus} size='lg' color='white' />
        </Button>
      </div>
    </Skeleton>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default compose(connect(mapStateToProps, mapDispatchToProps))(ToDo);
