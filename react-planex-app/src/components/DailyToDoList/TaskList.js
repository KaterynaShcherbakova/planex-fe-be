import React from 'react'
import { useState } from 'react'
import { MyTask } from './MyTask';
import './MyTask.css'

const TaskList = (props) => {

  const [taskList, setTasks] = useState(props.tasks);

  const category = {'High' : 1, 'Middle':2, 'Low':3};
 
  const handleCheck = (id) =>{
    const listTasks = taskList.map((task) => task.id === id ? {...task, checked: !task.checked } : task);
    setTasks(listTasks)
  }

 

  return (
    <ul className='task-list'>
      {
        taskList.map((task) => (
          <MyTask 
            key={task.id}
            task = {task}
            handleCheck={handleCheck}/>
        ))
      }
    </ul>
  )
}

export { TaskList };