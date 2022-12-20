import React, { useState, useEffect } from 'react'
import { MonthCalendarGrid } from '../components/MonthCalendar/MonthCalendarGrid'
import moment from "moment";
import { MonthCalendarHeader } from '../components/MonthCalendar/MonthCalendarHeader';
import { DailyToDoList } from '../components/DailyToDoList/DailyToDoList';
import { RepeatMessage } from '../components/Event/RepeatMessage';
import { apiAddEvent, apiGetAllEvents, apiDeleteEvent, apiUpdateEvent, apiGetAllEventsPeriod } from '../api/event_api';
import { add } from 'date-fns';
import { AllocationMessage } from '../components/DailyToDoList/AllocationMessage';
import { apiAddTask, apiDeleteTask, apiGetAllTasks, apiEditTask } from "../api/task_api";


const MonthCalendar = (props) => {

     moment.updateLocale('en', { week: { dow: 1 } });
     const [activateDel, setActivateDel] = useState(false);
     const [activateEdit, setActivateEdit] = useState(false);
     const [today, setToday] = useState(moment());
     const startDay = today.clone().startOf('month').startOf('week');
     const [events, setEvents] = useState({});
     const [currEvent, setCurrEvent] = useState(null);
     const [currEvDate, setCurrEvDate] = useState(null);
     const [tasks, setTasks] = useState({});
     const [clickedDay, setClickedDay] = useState(null);
     const [currTask, setCurrTask] = useState(null);
     const [currTaskDate, setCurrTaskDate] = useState(null);
     async function myGetEvents(curr_date) {
          let moment_str = curr_date.clone()/*.subtract(1, 'month')*/.startOf('month');
          let moment_end = curr_date.clone()/*.add(1, 'month')*/.endOf('month');

          const m_format = 'YYYY-MM-DD[T]HH:mm:ss';
          let events2 = await apiGetAllEventsPeriod(moment_str.format(m_format), moment_end.format(m_format));

          console.log("get events", events2);
          let new_events = {};

          events2.forEach(ev => {
               const event_list = moment(ev.dateOfEvent).format('DDMMYYYY') in new_events ? new_events[moment(ev.dateOfEvent).format('DDMMYYYY')] : [];

               event_list.push(ev);
               new_events[moment(ev.dateOfEvent).format('DDMMYYYY')] = event_list;
          });
          setEvents(new_events);
     }



     const prevHandler = async () => {
          console.log('prev');
          setToday(prev => prev.clone().subtract(1, 'month'));

          await myGetEvents(today.clone().subtract(1, 'month'));
     };

     const nextHandler = async () => {
          console.log('next');
          setToday(prev => prev.clone().add(1, 'month'));

          await myGetEvents(today.clone().add(1, 'month'));
     };

     const [clickedToDoList, setClickToDoList] = useState(false);

     const showToDoList = (dayItem) => {
          if (moment(clickedDay).format('DDMMYYYY') === dayItem.format('DDMMYYYY')) {
               setClickToDoList(!clickedToDoList);
          }
          else {
               setClickToDoList(true);

          }
          setClickedDay(dayItem);

     }


     const editStatus = (a) => {
          setActivateEdit(a);

     }

     const delStatus = (a) => {
          setActivateDel(a);

     }


     function getTasks() {
          return tasks;
     }


     async function myGetTasks() {
          let tasks_temp = await apiGetAllTasks();

          console.log("get tasks", tasks_temp);
          let new_tasks = {};
          tasks_temp.forEach(tsk => {

               let task_list = moment(tsk.dateOfTask).format('DDMMYYYY') in new_tasks ? new_tasks[moment(tsk.dateOfTask).format('DDMMYYYY')] : [];

               task_list.push(tsk);
               new_tasks[moment(tsk.dateOfTask).format('DDMMYYYY')] = task_list;
          });

          // console.log("res new tasks", new_tasks);
          setTasks(new_tasks);


     }

     const [tempTask, setTempTask] = useState({});
     async function addTask(e) {
          // console.log("task", e);
          await apiAddTask(e);
          await apiGetAllTasks();

          const task_list = moment(e.dateOfTask).format('DDMMYYYY') in tasks ? tasks[moment(e.dateOfTask).format('DDMMYYYY')] : [];
          task_list.push(e);
          setTasks({
               ...tasks,
               [moment(e.dateOfTask).format('DDMMYYYY')]: task_list
          });

          console.log(tasks);
     }

     useEffect(() => async () => {
          await myGetTasks();
     }, []);


     async function deleteTask(id) {

          const task_list = tasks[moment(clickedDay).format('DDMMYYYY')];
          let i = task_list.findIndex(task => task.id === id);

          await apiDeleteTask(task_list[i]);
          task_list.splice(i, 1);
     }

     async function editTask(id, date, newTask) {
          newTask.id = id;
          await apiEditTask(newTask);

          const t_list = tasks[moment(date).format('DDMMYYYY')];
          let i = t_list.findIndex(task => task.id === id);

          const t_date = moment(newTask.dateOfTask).format('DDMMYYYY');
          if (date != t_date) {
               t_list.splice(i, 1);
               const task_list = t_date in tasks ? tasks[t_date] : [];
               task_list.push(newTask);
               setTasks({
                    ...tasks,
                    [t_date]: task_list
               });
          } else {
               Object.assign(t_list[i], newTask);
          }


     }

     const handleCheck = async (id) => {

          let t = tasks[currTask].find(temp => temp.id === id);
          t.checked = !t.checked;
          await apiEditTask(t);
          console.log(t.checked);

     };


     return (
          <div >
               <RepeatMessage text={'Reload page to see all repeats'} showMessage={props.showRepeatMessage} setShowMessage={props.setShowRepeatMessage} />
               <AllocationMessage text={'Your task will be auto allocated in available time before deadline '} showMessage={props.showAllocationMessage} setShowMessage={props.setShowAllocationMessage} />
               <DailyToDoList
                    currTask={currTask}
                    setCurrTask={setCurrTask}
                    setCurrTaskDate={setCurrTaskDate}
                    clickedToDoList={clickedToDoList}
                    showToDoList={showToDoList}
                    editStatus={(a) => editStatus(a)}
                    delStatus={(a) => delStatus(a)}
                    handleCheck={handleCheck}
                    clickedDay={clickedDay}
                    tasks={clickedDay !== null && moment(clickedDay).format('DDMMYYYY') in tasks ? tasks[moment(clickedDay).format('DDMMYYYY')] : []}
               />
               <div style={{ 'margin': '10% 2% 0 20%' }}>

                    <MonthCalendarHeader
                         events={props.getEvents}
                         today={today}
                         prevHandler={prevHandler}
                         nextHandler={nextHandler}
                         currCalendar="month"
                         addEvent={props.addEvent}
                         addTask={addTask}
                         deleteTask={deleteTask}
                         editTask={editTask}
                         editEvent={props.editEvent}
                         deleteEvent={props.deleteEvent}
                         activateDel={activateDel}
                         activateEdit={activateEdit}
                         currEvent={currEvent}
                         setCurrEvent={setCurrEvent}
                         currEvDate={currEvDate}
                         setShowAllocationMessage={props.setShowAllocationMessage}
                         currTask={currTask}
                         setCurrTask={setCurrTask}
                         currTaskDate={clickedDay}
                         tasks={getTasks}

                    />
                    <MonthCalendarGrid
                         today={today}
                         startDay={startDay}
                         showToDoList={showToDoList}
                         clickedToDoList={clickedToDoList}
                         events={props.getEvents}
                         editStatus={(a) => editStatus(a)}
                         delStatus={(a) => delStatus(a)}
                         currEvent={currEvent}
                         clickedDay={clickedDay}
                         setClickedDay={setClickedDay}
                         setCurrEvent={setCurrEvent}
                         setCurrEvDate={setCurrEvDate}

                    />
               </div>
          </div>

     )
};
export { MonthCalendar };
