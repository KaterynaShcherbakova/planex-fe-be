import React, { Component, useState } from 'react'
import styled from 'styled-components';
import { Navigate, useNavigate } from 'react-router-dom';
import './HeaderButton.css'
import { AiFillPlusCircle } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { AddHeaderChoice } from './AddHeaderChoice';
import { DeleteHeaderChoice } from './DeleteHeaderChoice';
import { EventCreator } from '../Event/EventCreator';
import { TaskCreator } from '../DailyToDoList/TaskCreator';


const MonthHeader = styled('div')`
    display: flex;
    font-size: 200%;
    font-weight: bold;
    font-family: 'Quicksand', sans-serif;
    color: rgba(145,171,165, 1);
    margin: 2%;
    user-select:none;
    justify-content: space-between;
`;
const ButtonWrapper = styled('button')`
    border: none;
    outline: none;
    background-color: white;
    color: rgba(145,171,165, 1);
    cursor: pointer;
    margin-left: 5px;
    font-weight: 600;
    font-family: 'Quicksand', sans-serif;
    font-size: 100%;
`;
/*const ButtonWrapperEvent = styled('button')`
    border: none;
    outline: none;
    background-color: white;
    border-radius: 50%;
`;*/
const MonthCalendarHeader = ({ today, prevHandler, nextHandler, setShowAllocationMessage, currCalendar, setCurrEvent, addEvent, addTask, deleteEvent, deleteTask, activateDel, activateEdit, currEvent, events, currEvDate, editEvent, currTask, currTaskDate, setCurrTask, tasks, editTask }) => {

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAddChoice, setShowAddChoice] = useState(false);
    const [showDeleteChoice, setShowDeleteChoice] = useState(false);
    const [showEventCreator, setShowEventCreator] = useState(false);
    const [showTaskCreator, setShowTaskCreator] = useState(false);
    const [showPseudoChoice, setShowPseudoChoice] = useState(false);

    const [clickedAdd, setClickedAdd] = useState(false);
    const [clickedDelete, setClickedDelete] = useState(false);

    let navigate = useNavigate();

    const toggleCalendar = () => {

        if (currCalendar === 'week') {
            navigate("/monthcalendar");
        }
        else if (currCalendar === 'month') {
            navigate("/weekcalendar");
        }

    }

    const handleAdding = () => {
        setClickedAdd(!clickedAdd);
    }

    const handleDelete = () => {
        setClickedDelete(!clickedDelete);
    }
    return (
        <MonthHeader >
            <div className="main_cal_header_div">
                <div className="cal_header_nvg">
                    <ButtonWrapper onClick={prevHandler}>{" < "}</ButtonWrapper>
                    <ButtonWrapper onClick={nextHandler}>{" > "}</ButtonWrapper>
                    <span style={{ 'cursor': 'pointer' }} onClick={toggleCalendar}>  {today.format('MMMM')}</span>
                    <span>  {today.format('YYYY')}</span>
                </div>
                <div className="div_header_button">

                    <div className="full_event_delete_button"
                        onMouseLeave={() => setShowDeleteChoice(false)}
                    >

                        <div className={`event_delete_button_hover ${((currEvent != null || currTask != null) && showDelete && activateDel) ? "event_delete_button_hover_active" : "event_delete_button_hover_closed"}`}
                            onMouseEnter={() => { setShowDelete(true); handleDelete(); }}
                            onMouseLeave={() => { setShowDelete(false); handleDelete(); }}
                            onClick={() => { setShowDeleteChoice(!showDeleteChoice); setShowPseudoChoice(true) }}
                        >

                            {showDelete && <div style={{ 'padding-left': '20px' }} className="event_button_text"
                                onMouseEnter={() => { setShowDelete(true); handleDelete(); }}
                                onMouseLeave={() => { setShowDelete(false); handleDelete(); }}
                                onClick={() => { setShowDeleteChoice(!showDeleteChoice); setShowPseudoChoice(true) }}
                            >Delete</div>}</div>


                        <RiDeleteBin5Line style={{ 'z-index': '10', 'cursor': `${(currEvent != null || currTask != null) && activateDel ? "pointer" : "default"}` }} size={40} color={(currEvent != null || currTask != null) && activateDel ? '#C6AC8D' : '#D3D3D3'} id="event_delete_button"
                            onMouseEnter={() => { setShowDelete(true); handleDelete(); }}
                            onMouseLeave={() => { setShowDelete(false); handleDelete(); }}
                            onClick={() => { setShowDeleteChoice(!showDeleteChoice); setShowPseudoChoice(true) }}
                        />
                        {(currEvent != null || currTask != null) ? <DeleteHeaderChoice
                            deleteEvent={deleteEvent}
                            deleteTask={deleteTask}
                            currTask={currTask}
                            setCurrTask={setCurrTask}
                            currTaskDate={currTaskDate}
                            currEvent={currEvent}
                            setCurrEvent={setCurrEvent}
                            currEvDate={currEvDate}
                            state={showDeleteChoice}
                            pseudoState={showPseudoChoice}
                            handleDelete={handleDelete}
                            setShowDelete={setShowDelete}
                            setShowPseudoChoice={setShowPseudoChoice}
                            setShowDeleteChoice={setShowDeleteChoice}
                        /> : null}


                    </div>



                    <div className="full_event_edit_button"
                        onMouseEnter={() => setShowEdit(true)}
                        onMouseLeave={() => setShowEdit(false)}
                        onClick={() => {if(currEvent!=null) 
                            {setShowEventCreator(true); setShowTaskCreator(false);} 
                            else { setShowTaskCreator(true);setShowEventCreator(false)}}}
                    >

                        <div className={`event_edit_button_hover ${((currEvent != null || currTask != null) && showEdit && activateEdit) ? "event_edit_button_hover_active" : "event_edit_button_hover_closed"}`}>{
                            showEdit && <div className="event_button_text">Edit</div>}</div>

                        <FiEdit style={{ 'z-index': '10', 'cursor': `${(currEvent != null || currTask != null) && activateEdit ? "pointer" : "default"}` }} size={40} color={(currEvent != null || currTask != null) && activateEdit ? '#C6AC8D' : '#D3D3D3'} id="event_change_button" />
                    </div>
                    {((currEvent != null) && showEventCreator) ? <EventCreator
                        setCurrEvent={setCurrEvent}
                        editEvent={editEvent}
                        currEvDate={currEvDate}
                        createNew={false}
                        showEventCreator={showEventCreator}
                        setShowEventCreator={setShowEventCreator}
                        currEvent={currEvent}
                        events={events} /> : null}

                    {((currTask != null) && showTaskCreator) ? <TaskCreator
                        setCurrTask={setCurrTask}
                        editTask={editTask}
                        currTaskDate={currTaskDate}
                        createNew={false}
                        showTaskCreator={showTaskCreator}
                        setShowTaskCreator={setShowTaskCreator}
                        currTask={currTask}
                        setShowAllocationMessage={setShowAllocationMessage}
                        tasks={tasks} /> : null}




                    <div className="full_event_add_button"
                        onMouseLeave={() => { setShowAddChoice(false); }}

                    >

                        <div className={`event_add_button_hover ${showAdd ? "event_add_button_hover_active" : "event_add_button_hover_closed"}`}
                            onMouseEnter={() => { setShowAdd(true); handleAdding(); }}
                            onMouseLeave={() => { setShowAdd(false); handleAdding(); }}
                            onClick={() => { setShowAddChoice(!showAddChoice); setShowPseudoChoice(true) }}
                        >
                            {showAdd && <div className="event_button_text"
                                onMouseEnter={() => { setShowAdd(true); handleAdding(); }}
                                onMouseLeave={() => { setShowAdd(false); handleAdding(); }}
                                onClick={() => { setShowAddChoice(!showAddChoice); setShowPseudoChoice(true) }}>Add</div>}</div>

                        <AiFillPlusCircle style={{ 'z-index': '10' }} size={45} color={'#C6AC8D'} id="event_add_button"
                            onMouseEnter={() => { setShowAdd(true); handleAdding(); }}
                            onMouseLeave={() => { setShowAdd(false); handleAdding(); }}
                            onClick={() => { setShowAddChoice(!showAddChoice); setShowPseudoChoice(true) }}
                        />
                        <AddHeaderChoice
                            events={events}
                            addEvent={addEvent}
                            addTask={addTask}
                            state={showAddChoice}
                            pseudoState={showPseudoChoice}
                            handleAdding={handleAdding}
                            setShowAdd={setShowAdd}
                            setShowPseudoChoice={setShowPseudoChoice}
                            setShowAddChoice={setShowAddChoice}
                            showEventCreator={showEventCreator}
                            showTaskCreator={showTaskCreator}
                            setShowEventCreator={setShowEventCreator}
                            setShowTaskCreator={setShowTaskCreator}
                            setShowAllocationMessage={setShowAllocationMessage}

                        />


                    </div>


                </div>
            </div>

        </MonthHeader >
    );
};
export { MonthCalendarHeader };