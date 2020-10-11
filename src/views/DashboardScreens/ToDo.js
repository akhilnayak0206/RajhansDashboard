import React, { useState, useEffect } from 'react';
import {
  Button,
  Skeleton,
  Card,
  Input,
  Avatar,
  Collapse,
  Modal,
  notification,
} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { OnAddData, OnSetData } from '../../store/actions/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import '../../styles/ToDo.css';
import ToDoModal from './Modal/ToDoModal';

const { Search, TextArea } = Input;
const { Meta } = Card;
const { Panel } = Collapse;

const ToDo = ({ addData, OnAddData }) => {
  const [addTask, setAddTask] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [skeleton, setSkeleton] = useState(true);
  const [addButton, setAddButton] = useState(false);
  const [taskProp, setTaskProp] = useState({});
  const [searchTask, setSearchTask] = useState('');
  const [data, setData] = useState({
    title: '',
    taskCoordinator: '',
    description: '',
  });

  useEffect(() => {
    setSkeleton(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (addButton) {
      if (addData.result) {
        notification['success']({
          message: 'To-Do Task',
          description: addData.message,
        });
        setAddButton(false);
        setAddTask((state) => !state);
      } else {
        notification['warning']({
          message: 'To-Do Task',
          description: addData.message,
        });
        setAddButton(false);
      }
    }
    // eslint-disable-next-line
  }, [addData]);

  const passStateFunc = () => {
    setShowTask(false);
    setTaskProp({});
  };

  const submitTask = () => {
    if (data.title && data.taskCoordinator && data.description) {
      setAddButton(true);
      OnAddData({
        collection: 'toDo',
        newData: { ...data, markCompleted: false, deleted: false },
      });
    } else {
      notification['warning']({
        message: 'To-Do Task',
        description:
          'Bhai please enter title, task-coordinator and description',
      });
    }
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
        onOk={submitTask}
        onCancel={() => setAddTask((state) => !state)}
        footer={[
          <Button key='back' onClick={() => setAddTask((state) => !state)}>
            Return
          </Button>,
          <Button
            key='submit'
            type='primary'
            loading={addButton}
            onClick={submitTask}
          >
            Submit
          </Button>,
        ]}
      >
        <h4>Title</h4>
        <Input
          value={data.title}
          placeholder='Enter Title of task'
          onChange={(val) => {
            let title = val.target.value;
            setData((state) => ({ ...state, title }));
          }}
        />
        <h4>Task Coordinator</h4>
        <Input
          value={data.taskCoordinator}
          placeholder="Enter Task Coordinator's name"
          onChange={(val) => {
            let taskCoordinator = val.target.value;
            setData((state) => ({
              ...state,
              taskCoordinator,
            }));
          }}
        />
        <h4>Description</h4>
        <TextArea
          rows={4}
          value={data.description}
          placeholder='Enter everything about task'
          onChange={(val) => {
            let description = val.target.value;
            setData((state) => ({
              ...state,
              description,
            }));
          }}
        />
      </Modal>

      <div className='showAllCards'>
        <Collapse accordion>
          <Panel header='Remaining Tasks' key='1'>
            <Card
              style={{ margin: '10px' }}
              actions={[
                <Button
                  type='primary'
                  onClick={(e) => {
                    console.log('mark');
                    e.stopPropagation();
                  }}
                >
                  Mark Completed
                </Button>,
                <Button
                  type='danger'
                  onClick={(e) => {
                    console.log('delete');
                    e.stopPropagation();
                  }}
                >
                  Delete Task
                </Button>,
              ]}
              onClick={() => {
                setTaskProp('I have been set  by key');
                setShowTask((state) => !state);
              }}
            >
              <Meta
                avatar={<Avatar>A</Avatar>}
                title='Card title'
                description={`Coordinator's name`}
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
                description={`Coordinator's name`}
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
                description={`Coordinator's name`}
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

const mapStateToProps = (state) => {
  const { addData } = state;
  return {
    addData,
  };
};

const mapDispatchToProps = { OnAddData, OnSetData };

export default compose(connect(mapStateToProps, mapDispatchToProps))(ToDo);

// eslint-disable-next-line no-lone-blocks
{
  /* <div className='searchSticky'>
        <Card
          size='small'
          style={{ borderRadius: 5, width: '100%' }}
          bodyStyle={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}
          hoverable
        >
          <Search
            value={searchTask}
            placeholder={`Enter Title of the Task`}
            allowClear
            onSearch={(value) => searchChange(value)}
            onChange={(e) => searchChange(e)}
            enterButton
          />
        </Card>
      </div>
      
        // const searchChange = (e) => {
  //   setSearchTask(e.target.value);
  //   console.log(e.target.value);
  //   //  add filter to show task and use filtered task  to show the task
  // };
       */
}
