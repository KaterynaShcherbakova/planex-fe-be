import './WToDoListColumn.css'
import { useState, useEffect } from 'react';
import { MyTask } from '../DailyToDoList/MyTask';

const WToDoListColumn = (props) => {

  const [tasks, setTasks] = useState(props.tasks);

  const category = { 'High': 1, 'Middle': 2, 'Low': 3 };

  function dateOfClickedTask(){
    props.setCurrTaskDate(props.dayItem);
    
  }

  useEffect(() => {
    setTasks(props.tasks);
  }, [props.tasks])
  

  return (
    <div class = 'columnT'>
    <h1 class='columnTitleT'>
      {props.weekday}
      <p>
      {props.daynum}
      </p>
    </h1>
    <div>
      {console.log(tasks)}
        {tasks.sort((a, b) => { if(category[a.selectedCategory]>category[b.selectedCategory])return 1;
          if(category[a.selectedCategory]<category[b.selectedCategory])return -1;
          return 0;}).map((e) => (
          <MyTask
            task={e}
            date={props.date}
            handleCheck={props.handleCheck}
            dateOfClickedTask={dateOfClickedTask}
            currTask={props.currTask}
            setCurrTask={props.setCurrTask}
            editStatus={(a) => props.editStatus(a)}
            delStatus={(a) => props.delStatus(a)}
            />
            

        ))}

      </div>
    </div>
  )
}

export { WToDoListColumn };