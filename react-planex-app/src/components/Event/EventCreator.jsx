import React, { useEffect, useState, setState } from 'react'
import DatePicker from "react-datepicker"
import { TimePicker } from 'antd';
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import "react-datepicker/dist/react-datepicker.css";
import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";

const EVENT_REGEX = /^[A-Za-z0-9_ ,.'`"()-;]{2,45}$/u;
// /^[A-z][A-z0-9-_]{2,45}$/;
// /^[A-Za-z0-9_ ,.'`"()-;]+$/u
// /^[\p{L}\p{N} ,.'-()]+$/u
export const EventCreator = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const category = ['Birthday', 'Beauty', 'Deadline', 'Sport', 'Work', 'Other'];
    const repeat = ['None', 'Daily', 'Weekly', 'Monthly'];
    const [inpEvent, setInpEvent] = useState(false);
    const [inpTimeFrom, setInpTimeFrom] = useState(false);
    const [inpTimeTo, setInpTimeTo] = useState(false);

    const [inpDate, setInpDate] = useState(false);

    const [eventError, setEventError] = useState('Event can not be empty!');
    const [timeToError, setTimeToError] = useState(false);
    const [timeFromError, setTimeFromError] = useState(false);

    const [formValid, setFormValid] = useState(false);
    const [newEvent, setState] = useState({
        event: '',
        notes: '',
        dateOfEvent: startDate,
        time_from: '',
        time_to: '',
        selectedCategory: '',
        selectedRepeat: '',
        event_id: 0,

    });


    useEffect(() => {
        if (newEvent.selectedCategory !== 'Deadline') {
            if (eventError || timeToError || timeFromError || !newEvent.time_from || !newEvent.time_to || !newEvent.event || !newEvent.selectedCategory || !newEvent.selectedRepeat) {
                setFormValid(false)
            }
            else {
                setFormValid(true)
            }
        }
        else {
            if (eventError || timeFromError || !newEvent.time_from || !newEvent.event || !newEvent.selectedCategory || !newEvent.selectedRepeat) {
                setFormValid(false)
            }
            else {
                setFormValid(true)
            }
        }


    }, [newEvent, eventError, timeToError, timeFromError])

    useEffect(() => {

        if (!props.createNew && props.showEventCreator) {
            setFormValid(true);
            setTimeToError(false);
            setTimeFromError(false);
            setEventError(false);
            setInpEvent(true);
            setInpTimeTo(true);
            setInpTimeFrom(true);
            setInpDate(true);
            let ev;
            const ev_list = props.events()[props.currEvDate];
            if (ev_list === undefined) return;

            for (let i = 0; i < ev_list.length; i++) {
                if (props.currEvent === ev_list[i].event_id) {
                    ev = ev_list[i];
                    break;
                }
            }
            console.log(ev);
            if (!ev.hasOwnProperty('selectedRepeat')) {
                ev.selectedRepeat = 'None'
            }
            setStartDate(ev.dateOfEvent);

            setState({ ...ev });
        }
    }, [props.showEventCreator])



    const blurHandle = (e) => {
        switch (e.target.name) {
            case 'event':
                setInpEvent(true)
                break
            case 'time_from':
                setInpTimeFrom(true)
                break
            case 'time_to':
                setInpTimeTo(true)
                break
            case 'dateOfEvent':
                setInpDate(true)
                break

        }
    }


    const handleChange = (e) => {
        const value = e.target.value;
        if (e.target.name === 'event') {
            if (!EVENT_REGEX.test(e.target.value)) {
                setEventError('Event is not valid!');
                if (!e.target.value) {
                    setEventError('Event can not be empty!');
                }
            } else {
                setEventError('');
            }
        }
        if (e.target.name === 'dateOfEvent') {
            setStartDate(e);
        }



        if (e.target.name === 'time_from') {
            if (!e.target.value) {
                setTimeFromError(true);
            }
            else {
                const hours = parseInt(value.split(':')[0]);
                const mins = parseInt(value.split(':')[1]) + hours * 60;
                const hoursT = parseInt(new Date().toLocaleTimeString('en-GB').split(':')[0]);
                const minsT = parseInt(new Date().toLocaleTimeString('en-GB').split(':')[1]) + hoursT * 60;

                if (minsT > mins && new Date().toDateString() === newEvent.dateOfEvent.toDateString()) {
                    setTimeFromError(true);
                }

                else if (hours < 7 || hours > 22) {
                    setTimeFromError(true);
                }
                else {
                    setTimeFromError(false);
                }
            }
        }
        if (e.target.name === 'time_to') {
            if (!e.target.value) {
                setTimeToError(true);
            }
            else {
                const hours = parseInt(value.split(':')[0]);
                const mins = parseInt(value.split(':')[1]) + hours * 60;
                const hoursF = parseInt(newEvent.time_from.split(':')[0]);
                const minsF = parseInt(newEvent.time_from.split(':')[1]) + hoursF * 60;
                if (minsF >= mins) {
                    setTimeToError(true);
                }
                else if (hours < 7 || hours > 22) {
                    setTimeToError(true);
                }
                else {
                    setTimeToError(false);
                }
            }
        }

        setState({
            ...newEvent,
            [e.target.name]: value
        });

    }

    const [toSave, setToSave] = useState(false);
    function handleForm(e) {
        e.preventDefault();
        if (formValid) {
            if (props.createNew) {
                let random = Math.floor(Math.random() * 50);
                setToSave(true);
                setState({
                    ...newEvent,
                    event_id: random
                });
            } else {
                props.editEvent(props.currEvent, props.currEvDate, newEvent);
                props.setCurrEvent(null);
                handleCancel();

            }


        }

    }

    useEffect(() => {
        if (toSave) {
            props.addEvent(newEvent);
            console.log(newEvent);
            handleCancel();
            setToSave(false);
        }
    }, [newEvent]);


    const handleCancel = () => {
        if (props.createNew) {
            props.changeState();
        }
        else {

            props.setShowEventCreator(false);
        }

        setStartDate(new Date());

        setState({
            event: '',
            notes: '',
            dateOfEvent: startDate,
            time_from: '',
            time_to: '',
            selectedCategory: '',
            selectedRepeat: '',
            event_id: 0,
        });

        setTimeToError(false);
        setTimeFromError(false);
        setEventError(false);
        setInpEvent(false);
        setInpTimeTo(false);
        setInpTimeFrom(false);
        setInpDate(false);
    }


    return (
        <div className="EventCreator">
            <div className={props.clickedEvent === false ? "hidden_box" : "ev_creator_box"}>
                <p className="ev_creator_text">Event:</p>
                <div form="form_input">

                    <input
                        name="event"
                        type="text"
                        className={(inpEvent && eventError) ? "ev_creator_input_error" : "ev_creator_input_success"}
                        value={newEvent.event}
                        onChange={handleChange}
                        onBlur={blurHandle}

                    />
                    {(inpEvent && eventError) && <div className="ev_creator_message ev_input_error">{eventError}<BsFillXCircleFill className="ev_creator_error_icon" /></div>}
                </div>

                <p className="ev_creator_text">Notes:</p>
                <input
                    name="notes"
                    type="text"
                    className="ev_creator_input notes"
                    value={newEvent.notes}
                    onChange={handleChange}


                />

                <p className="ev_creator_text">Category:</p>
                <select
                    defaultValue=""
                    name="selectedCategory"
                    required className="ev_creator_category"
                    onChange={handleChange}
                    value={newEvent.selectedCategory}
                >

                    <option value="" disabled selected hidden>Select</option>
                    {category.map((opt) =>
                        (<option value={opt}>{opt}</option>)

                    )}

                </select>

                <p className="ev_creator_text" >Date:</p>
                <DatePicker
                    name="dateOfEvent"
                    value={newEvent.dateOfEvent}
                    className="ev_creator_date"
                    minDate={new Date()}
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date);
                        newEvent.dateOfEvent = date;
                        if (date.toDateString() === new Date().toDateString()) {
                            const hours = parseInt(newEvent.time_from.split(':')[0]);
                            const mins = parseInt(newEvent.time_from.split(':')[1]) + hours * 60;
                            const hoursT = parseInt(new Date().toLocaleTimeString('en-GB').split(':')[0]);
                            const minsT = parseInt(new Date().toLocaleTimeString('en-GB').split(':')[1]) + hoursT * 60;
                            if (minsT > mins) {
                                setTimeFromError(true);
                            }

                        }

                        else {
                            setTimeFromError(false);
                        }
                    }}
                    onBlur={blurHandle}


                />
                <p className="ev_creator_text">Time:</p>

                {newEvent.selectedCategory !== "Deadline" ?
                    <>


                        <div className="div_from_to">
                            <div className="div_time">
                                <p className="ev_creator_text">From:</p>
                                <p className="ev_creator_text">To:</p>

                            </div>

                            <div className="div_time">
                                <input
                                    name="time_from"
                                    value={newEvent.time_from}
                                    className={!timeFromError ? "ev_creator_time_success" : "ev_creator_time_error"}
                                    type="time"
                                    onChange={handleChange}
                                    onBlur={blurHandle}


                                />
                                <input
                                    name="time_to"
                                    value={newEvent.time_to}
                                    className={!timeToError ? "ev_creator_time_success" : "ev_creator_time_error"}
                                    type="time"
                                    onChange={handleChange}
                                    onBlur={blurHandle}


                                />
                            </div>
                        </div>



                    </> :
                    <input
                        name="time_from"
                        value={newEvent.time_from}
                        className={!timeFromError ? "ev_creator_time_success" : "ev_creator_time_error"}
                        type="time"
                        onChange={handleChange}
                        onBlur={blurHandle}


                    />

                }

                <p className="ev_creator_text">Repeat:</p>
                <select
                    defaultValue=""
                    name="selectedRepeat"
                    required className="ev_creator_repeat"
                    onChange={handleChange}
                    value={newEvent.selectedRepeat}
                >

                    <option value="" disabled selected hidden>Select</option>
                    {repeat.map((opt) =>
                        (<option value={opt}>{opt}</option>)

                    )}


                </select>

                <div className="div_option">
                    <p
                        className="ev_creator_text text_option"
                        onClick={handleCancel}
                    >Cancel</p>

                    <p
                        className={formValid ? "ev_creator_text text_option" : "ev_creator_text"}
                        onClick={handleForm}
                    >OK</p>
                </div>


            </div>
        </div >
    )
}

