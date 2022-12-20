import React from 'react'
import './Event.css'
import { useState, useEffect } from 'react';
import { FaRunning } from 'react-icons/fa'
import { RiCake2Fill } from 'react-icons/ri'
import { GiLipstick } from 'react-icons/gi'
import { AiOutlineLaptop } from 'react-icons/ai'


export const WeekEvent = (props) => {
    const [showFullEvent, setShowFullEvent] = useState(false);
    const [showEventName, setShowEventName] = useState(false);
    const [showEvent, setShowEvent] = useState(true);
    const [category, setCategory] = useState('')
    // const [iconSize, setIconSize] = useState(null);
    function checkDeadline(str) {
        if (str === "Deadline") {
            return true;
        }
        else {
            return false;
        }
    }


    function ellipsify(str) {
        if (str.length > 9) {
            return (str.substring(0, 9) + "...");
        }
        else {
            return str;
        }
    }

    useEffect(() => {
        if (props.category === 'Beauty') {
            setCategory('Beauty')
        }
        else if (props.category === 'Birthday') {

        }
    }, [props.category])

    useEffect(() => {
        if (props.id === props.currEvent) {
            setShowFullEvent(true);
            setShowEventName(false);
            setShowEvent(false);
            props.editStatus(true);
            props.delStatus(true);
        }
        else {
            setShowFullEvent(false);
            setShowEvent(true);

        }
        if (props.currEvent === null) {
            props.editStatus(false);
            props.delStatus(false);
        }
    }, [props.currEvent])


    return (<>
        <div className={`WeekEvent ${showEvent ? "" : "WeekEvent_hidden"}`}

            style={checkDeadline(props.category) ? { 'height': "8px", 'top': `${props.top - 4}px`, 'background-color': 'rgba(139, 0, 0, 0.75)' } :
                {
                    'height': `${(props.height < 8) ? 8 : props.height}px`,
                    'top': `${props.top}px`,
                    'background-color':
                        `${props.category === 'Beauty' ? 'rgba(227, 45, 45, 0.25)' :
                            props.category === 'Birthday' ? 'rgba(219, 181, 123, 0.6)' :
                                props.category === 'Sport' ? 'rgba(145, 171, 165, 0.7)' :
                                    props.category === 'Work' ? 'rgba(45, 140, 227, 0.4)' :
                                        props.category === 'Deadline' ? 'rgba(139, 0, 0, 0.6)' : 'rgba(170, 170, 170, 0.6)'}`
                }
            }

            onMouseEnter={!checkDeadline(props.category) ? () => setShowEventName(true) : () => setShowEventName(false)}
            onMouseLeave={() => setShowEventName(false)}
            onClick={() => {
                props.setCurrEvent(props.id);
                props.dateOfClickedEvent();
            }}

        >

            {(props.height <= 12) ? null :
                (props.height > 13 && props.height < 22) ?
                    (props.category === 'Beauty' ? <GiLipstick size={14} className='weekevent_icon' /> :
                        props.category === 'Birthday' ? <RiCake2Fill size={14} className='weekevent_icon' /> :
                            props.category === 'Work' ? <AiOutlineLaptop size={14} className='weekevent_icon' /> :
                                props.category === 'Sport' ? <FaRunning size={14} className='weekevent_icon' /> : null) :
                    (props.category === 'Beauty' ? <GiLipstick size={25} className='weekevent_icon' /> :
                        props.category === 'Birthday' ? <RiCake2Fill size={25} className='weekevent_icon' /> :
                            props.category === 'Work' ? <AiOutlineLaptop size={25} className='weekevent_icon' /> :
                                props.category === 'Sport' ? <FaRunning size={25} className='weekevent_icon' /> : null)

            }

            {checkDeadline(props.category) ? '' : ((props.height < 20) ? null :
                <div className="show_name_weekevent name_weekevent_transition">
                    {ellipsify(props.ev_name)}
                </div>)}
        </div>
        <div
            className={`full_info_wc_event wc_event_transition ${checkDeadline(props.category) ? "wc_event_deadline" : "wc_event_basic"} ${showFullEvent ? "" : "full_info_wc_event_hidden"}`}
            style={checkDeadline(props.category) ? { 'top': `${props.top}px`, 'background-color': 'rgba(190, 73, 73, 1)' } :
                {
                    'top': `${props.top + props.height / 2}px`,
                    'background-color':
                        `${props.category === 'Beauty' ? 'rgba(215, 151, 151, 1)' :
                            props.category === 'Birthday' ? 'rgba(219, 181, 123, 1)' :
                                props.category === 'Sport' ? 'rgba(145, 171, 165, 1)' :
                                    props.category === 'Work' ? 'rgba(80, 170, 227, 1)' :
                                        props.category === 'Deadline' ? 'rgb(215, 151, 151)' : 'rgba(160, 160, 160, 1)'}`

                }}
            onClick={() => {
                props.setCurrEvent(null);
            }}
        >
            <div className="full_info_weekevent_text">
                <div className="full_info_weekevent_evname">{props.ev_name}</div>
                {!checkDeadline(props.category) && <div className="full_info_weekevent_notes">{props.notes}</div>}
                {!checkDeadline(props.category) && <div className="full_info_weekevent_time">{props.time_from} - {props.time_to}</div>}
            </div>
        </div>
    </>
    )
}

