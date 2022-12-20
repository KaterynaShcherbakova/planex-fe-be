import { TaskList } from "../DailyToDoList/TaskList";
import { WToDoListColumn } from "./WToDoListColumn";
import "./WToDoListColumn.css"


const WeeklyToDoListTable = (props) => {
 

  const day = props.startDay.clone().subtract(1, 'day');
  const daysArray =[...Array(7)].map(()=>day.add(1, 'day').clone());
 return(
  <div class='weekly-toDoList-table'>
    {
      daysArray.map((dayItem) =>(
          <WToDoListColumn 
            tasks={dayItem.format('DDMMYYYY') in props.tasks() ? props.tasks()[dayItem.format('DDMMYYYY')] : []}
            key = {dayItem.format('DDMMYYYY')}
            date = {dayItem.format('DDMMYYYY')}
            dayItem={dayItem}
            handleCheck={props.handleCheck}
            weekday = {dayItem.format('dddd')}
            daynum = {dayItem.format('D')}
            currTask={props.currTask}
            setCurrTask={props.setCurrTask}
            setCurrTaskDate={props.setCurrTaskDate}
            editStatus={(a) => props.editStatus(a)}
            delStatus={(a) => props.delStatus(a)}
            />
          
      ))
    }
  </div>
 )}
  
 export {WeeklyToDoListTable};