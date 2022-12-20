import { React, useEffect, useState } from 'react'
import "./HeaderChoice.css"
import { EventCreator } from '../Event/EventCreator'
import '../Event/EventCreator.css';
import { TaskCreator } from '../DailyToDoList/TaskCreator';

export const AddHeaderChoice = (props) => {

  const [clickedNewEvent, setClickedNewEvent] = useState(false);
  const [clickedNewTask, setClickedNewTask] = useState(false);

  useEffect(() => {
    if (props.showEventCreator || props.showTaskCreator) {
      setClickedNewEvent(false);
      setClickedNewTask(false);
    }
  }, [props.showEventCreator, props.showTaskCreator])


  return (
    <>
      <div className={`pseudo_hd_choice ${!props.pseudoState ? 'pseudo_hd_choice_disabled' : ''}`}

        onMouseEnter={() => { props.setShowAdd(true); props.handleAdding(); }}
        onMouseLeave={() => { props.setShowAdd(false); props.handleAdding(); props.setShowPseudoChoice(false) }}
        onClick={() => { props.setShowAddChoice(!props.state); }}
      >

        <div className={props.state ? "hd_choice" : "hd_choice_disabled"}>
          <div
            className="hd_choice_text"
            onClick={() => {
              props.setShowEventCreator(false);
              props.setShowTaskCreator(false);
              setClickedNewEvent(true);
              setClickedNewTask(false);
              props.setShowPseudoChoice(false)
            }}
          >
            Event
          </div>

          <div
            className="hd_choice_text"
            onClick={() => {
              props.setShowEventCreator(false);
              props.setShowTaskCreator(false);
              setClickedNewTask(true);
              setClickedNewEvent(false);
              props.setShowPseudoChoice(false)
            }}

          >Task</div>

        </div>
      </div>
      <EventCreator events={props.events} createNew={true} addEvent={props.addEvent} changeState={() => { setClickedNewEvent(false) }} clickedEvent={clickedNewEvent} />
      <TaskCreator setShowAllocationMessage={props.setShowAllocationMessage} createNew={true} addTask={props.addTask} changeState={() => { setClickedNewTask(false) }} clickedTask={clickedNewTask} />
    </>
  )
}

