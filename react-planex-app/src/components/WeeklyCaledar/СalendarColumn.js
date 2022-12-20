import './CalendarColumn.css'
import { WeekEvent } from '../Event/WeekEvent';
import { useState } from 'react';



const СalendarColumn = (props) => {

  function dateOfClickedEvent(){
    props.setCurrEvDate(props.dayItem);
    
  }

  function dateOfClickedColumn(){
    props.setCurrColumn(props.dayItem);
    
  }

  function handleClick(){
    if(props.clickedToDoList)
    {
      dateOfClickedColumn();
    }
    else{
      props.showToDoList();
      dateOfClickedColumn();
    }
  }
  return (
    <div class='columnC'>

      <div className="wcp_events">
        {props.events.map((e) => (
          <WeekEvent
            top={(parseInt(e.time_from.split(':')[0]) - 8) * 65 + parseInt(e.time_from.split(':')[1]) / 60 * 65 + 156}
            height={(parseInt(e.time_to.split(':')[0]) - parseInt(e.time_from.split(':')[0])) * 65 + (parseInt(e.time_to.split(':')[1]) - parseInt(e.time_from.split(':')[1])) / 60 * 65}
            time_from={e.time_from}
            time_to={e.time_to}
            notes={e.notes}
            ev_name={e.event}
            category={e.selectedCategory}
            id={e.event_id}
            editStatus={(a) =>props.editStatus(a)}
            delStatus={(a) =>props.delStatus(a)}
            currEvent={props.currEvent}
            setCurrEvent={props.setCurrEvent}
            dateOfClickedEvent={dateOfClickedEvent}
            />
            
        ))}
       
      </div>



      <h1 class='columnTitle' onClick={handleClick}>
        {props.weekday}
        <p>
          {props.daynum}
        </p>
      </h1>
    </div>
  )
}


export default СalendarColumn;