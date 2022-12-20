import './DailyToDoList.css'
import { useEffect, useState } from 'react';
import { MyTask } from './MyTask';
import { SlClose } from 'react-icons/sl'
import format from 'date-fns/format';
import moment from "moment";


const DailyToDoList = (props) => {

  //const InitialState = props.tasks

  const [tasks, setTasks] = useState(props.tasks)

  const category = { 'High': 1, 'Middle': 2, 'Low': 3 };


  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks])


  function dateOfClickedTask(date){
    console.log('9');
    
  }


  return (
    <div className={props.clickedToDoList ? 'daily-to-do list_active' : 'daily-to-do'}>

      <SlClose
        onClick={() => props.showToDoList(props.clickedDay)}
        size={40}
        class="sidebar_close_icon" />
      <h1 class='to-do-list-header'>To-Do List</h1>
      <div class='left-line' />
      <div class='right-line' />
      <div>

        {tasks.sort((a, b) => {
          if (category[a.selectedCategory] > category[b.selectedCategory]) return 1;
          if (category[a.selectedCategory] < category[b.selectedCategory]) return -1;
          return 0;
        }).map((e) => (
          <MyTask
            task={e}
            handleCheck={props.handleCheck}
            currTask={props.currTask}
            setCurrTask={props.setCurrTask}
            dateOfClickedTask={dateOfClickedTask}
            setCurrTaskDate={props.setCurrTaskDate}
            editStatus={(a) => props.editStatus(a)}
            delStatus={(a) => props.delStatus(a)}/>
          ))}
          </div>

    </div>
  )
};


export { DailyToDoList };