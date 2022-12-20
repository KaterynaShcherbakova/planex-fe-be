import CalendarColumn from './СalendarColumn';
import './WeeklyCalendar.css'
import moment from 'moment';



const WeeklyCalendarTable = (props) => {

  const day = props.startDay.clone().subtract(1, 'day');
  const daysArray = [...Array(7)].map(() => day.add(1, 'day').clone());
  const time = [];
  for (let i = 7; i <= 22; i++) {
    time.push(`${i}:00`);
  }
  
  return (
    <div class='weekly-calendar'>
      <div className="wc_lines">
        {time.map((elem) => (
          <div className="time_line">{elem}</div>
        ))}


      </div>
      {
        daysArray.map((dayItem) => (
          <CalendarColumn
            events={dayItem.format('DDMMYYYY') in props.events() ? props.events()[dayItem.format('DDMMYYYY')] : []}
            clickedToDoList={props.clickedToDoList}
            showToDoList={props.showToDoList}
            dayItem={dayItem.format('DDMMYYYY')}
            weekday={dayItem.format('dddd')}
            daynum={dayItem.format('D')}
            editStatus={(a) =>props.editStatus(a)}
            delStatus={(a) =>props.delStatus(a)}
            currEvent={props.currEvent}
            currColumn={props.currColumn}
            setCurrEvent={props.setCurrEvent}
            setCurrEvDate={props.setCurrEvDate}
            setCurrColumn={props.setCurrColumn}

          />
        )
        )
      }
    </div>


  )


}

export default WeeklyCalendarTable;