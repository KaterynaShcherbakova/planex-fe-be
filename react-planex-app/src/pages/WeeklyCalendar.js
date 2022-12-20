import WeeklyCalendarTable from '../components/WeeklyCaledar/WeeklyCalendarTable';
import { DailyToDoList } from '../components/DailyToDoList/DailyToDoList';
import { useState, useEffect } from 'react';
import moment from "moment";
import '../components/WeeklyCaledar/WeeklyCalendar.css'
import AxiosClient from '../utilities/AxiosClient';
import { MonthCalendarHeader } from '../components/MonthCalendar/MonthCalendarHeader';
import { apiAddEvent, apiGetAllEvents, apiDeleteEvent, apiUpdateEvent, apiGetAllEventsPeriod } from '../api/event_api';
import { RepeatMessage } from '../components/Event/RepeatMessage';
import { AllocationMessage } from '../components/DailyToDoList/AllocationMessage';
import { RedirectToHome } from './RedirectToHome';
import { apiAddTask, apiDeleteTask, apiGetAllTasks, apiEditTask } from "../api/task_api";



const WeeklyCalendar = (props) => {

     moment.updateLocale('en', { week: { dow: 1 } });
     const [today, setToday] = useState(moment());
     const startDay = today.clone().startOf('week');
     const [events, setEvents] = useState({});
     const [activateDel, setActivateDel] = useState(false);
     const [activateEdit, setActivateEdit] = useState(false);
     const [currEvent, setCurrEvent] = useState(null);
     const [currColumn, setCurrColumn] = useState(null);
     const [currEvDate, setCurrEvDate] = useState(null);
     const [showMessage, setShowMessage] = useState(false);
     const [tasks, setTasks] = useState({});
     const [showRepeatMessage, setShowRepeatMessage] = useState(false);
     const [showAllocationMessage, setShowAllocationMessage] = useState(false);
     const [access, setAccess] = useState(false);
     const [currTask, setCurrTask] = useState(null);
     const [currTaskDate, setCurrTaskDate] = useState(null);


     async function myGetEvents(curr_date) {
          let moment_str = curr_date.clone().startOf('week');
          let moment_end = curr_date.clone().endOf('week');

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
          setToday(prev => prev.clone().subtract(1, 'week'));

          await myGetEvents(today.clone().subtract(1, 'week'));
     }
     const nextHandler = async () => {
          console.log('next');
          setToday(prev => prev.clone().add(1, 'week'))

          await myGetEvents(today.clone().add(1, 'week'));
     };

     const [clickedToDoList, setClickToDoList] = useState(false);

     const showToDoList = () => {
          setClickToDoList(!clickedToDoList);

     }




     const editStatus = (a) => {
          setActivateEdit(a);

     }

     const delStatus = (a) => {
          setActivateDel(a);

     }

     useEffect(() => async () => {

          console.log("useEffect");
          await myGetEvents(today);

     }, []);


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

          const task_list = tasks[currColumn];
          console.log(currTaskDate)
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

          let t = tasks[currColumn].find(temp => temp.id === id);
          t.checked = !t.checked;
          await apiEditTask(t);
          console.log(t.checked);

     };

     useEffect(() => {
          if (showRepeatMessage && showAllocationMessage) {
               setShowAllocationMessage(false);
          }
     }, [showRepeatMessage]);

     useEffect(() => {
          if (showRepeatMessage && showAllocationMessage) {
               setShowRepeatMessage(false);
          }
     }, [showAllocationMessage]);


     return (
          <>

               <div className="weekly-calendar-page">
               <RepeatMessage text={'Reload page to see all repeats'} showMessage={props.showRepeatMessage} setShowMessage={props.setShowRepeatMessage} />
               <AllocationMessage text={'Your task will be auto allocated in available time before deadline '} showMessage={props.showAllocationMessage} setShowMessage={props.setShowAllocationMessage} />
                    <DailyToDoList
                         clickedToDoList={clickedToDoList}
                         showToDoList={showToDoList}
                         tasks={currColumn in tasks ? tasks[currColumn] : []}
                         clickedColumn={currColumn}
                         handleCheck={handleCheck}
                         currTask={currTask}
                         setCurrTask={setCurrTask}
                         setCurrTaskDate={setCurrTaskDate}
                         editStatus={(a) => editStatus(a)}
                         delStatus={(a) => delStatus(a)} />


                    <div style={{ 'margin': '10% 2% 0 20%' }}>
                         <MonthCalendarHeader
                              events={props.getEvents}
                              today={today}
                              prevHandler={prevHandler}
                              nextHandler={nextHandler}
                              currCalendar="week"
                              addEvent={props.addEvent}
                              editEvent={props.editEvent}
                              deleteEvent={props.deleteEvent}
                              deleteTask={deleteTask}
                              addTask={addTask}
                              editTask={editTask}
                              activateDel={activateDel}
                              activateEdit={activateEdit}
                              currEvent={currEvent}
                              setCurrEvent={setCurrEvent}
                              currEvDate={currEvDate}
                              setShowAllocationMessage={props.setShowAllocationMessage}
                              currTask={currTask}
                              setCurrTask={setCurrTask}
                              currTaskDate={currTaskDate}
                              tasks={getTasks}
                         />

                         <WeeklyCalendarTable
                              events={props.getEvents}
                              showToDoList={showToDoList}
                              today={today}
                              clickedToDoList={clickedToDoList}
                              startDay={startDay}
                              editStatus={(a) => editStatus(a)}
                              delStatus={(a) => delStatus(a)}
                              currEvent={currEvent}
                              currColumn={currColumn}
                              setCurrEvent={setCurrEvent}
                              setCurrEvDate={setCurrEvDate}
                              setCurrColumn={setCurrColumn}

                         />
                    </div>

               </div>

          </>
     )

};


export { WeeklyCalendar };

