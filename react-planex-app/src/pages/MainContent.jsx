import React, { useState, useEffect } from 'react'
import { Home } from '../pages/Home';
import { MonthCalendar } from '../pages/MonthCalendar';
import { WeeklyCalendar } from '../pages/WeeklyCalendar';
import { Settings } from './Settings'
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Sidebar } from '../components/Sidemenu/Sidebar';
import { Header } from '../components/Header/Header';
import { WeeklyToDoList } from './WeeklyToDoList';
import AxiosClient from '../utilities/AxiosClient';
import '../components/Header/Logo.css';
import '../components/Header/Header.css';
import '../components/Header/UserBlock.css';
import '../components/Sidemenu/Sidebar.css';
import { RedirectToHome } from './RedirectToHome';
import moment from "moment";
import { apiAddEvent, apiGetAllEvents, apiDeleteEvent, apiUpdateEvent, apiGetAllEventsPeriod } from '../api/event_api';
import { RepeatMessage } from '../components/Event/RepeatMessage';
import { AllocationMessage } from '../components/DailyToDoList/AllocationMessage';

export const MainContent = (props) => {

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => async () => {
        let response = await AxiosClient.get("/user", {});
        if (response.status === 200) {
            console.log(response);
            setUserInfo(response.data);
        }
        else {
            console.log(response);
        }
    }, []);

    const [clickedSidebar, setClickSidebar] = useState(false);
    const [clickedExit, setClickedExit] = useState(false);

    const showSidebar = () => {
        setClickSidebar(!clickedSidebar);

    }
    const exit = async () => {
        await AxiosClient.get("/logout", {});
        setUserInfo({});
        setClickedExit(!clickedExit);
    }


    function getUserName() {
        return userInfo['username'];
    }
    function getLogin() {
        return userInfo['login'];
    }
    function getEmail() {
        return userInfo['email'];
    }






    const [showRepeatMessage, setShowRepeatMessage] = useState(false);
    const [showAllocationMessage, setShowAllocationMessage] = useState(false);
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


    const [today, setToday] = useState(moment());
    const [events, setEvents] = useState({});
    async function myGetEvents(curr_date) {
       
            let moment_str = curr_date.clone().subtract(1, 'month').startOf('month');
            let moment_end = curr_date.clone().add(1, 'month').endOf('month');
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

    function getEvents() {
        return events;
    }


    async function addEvent(e) {

        await apiAddEvent(e);

        await myGetEvents(today);

        const event_list = moment(e.dateOfEvent).format('DDMMYYYY') in events ? events[moment(e.dateOfEvent).format('DDMMYYYY')] : [];
        event_list.push(e);
        setEvents({
            ...events,
            [moment(e.dateOfEvent).format('DDMMYYYY')]: event_list
        });
        console.log(events);
        if (e.hasOwnProperty('selectedRepeat') && e.selectedRepeat !== '' && e.selectedRepeat !== 'None') {
            setShowRepeatMessage(true);
        }
    }



    async function deleteEvent(id, date) {

        const ev_list = events[date];

        let i = ev_list.findIndex(ev => ev.event_id === id);

        await apiDeleteEvent(ev_list[i].orig_event_id);

        ev_list.splice(i, 1);
    }

    async function editEvent(id, date, newEvent) {
        newEvent.event_id = id;
        await apiUpdateEvent(newEvent);

        const ev_list = events[date];
        let i = ev_list.findIndex(ev => ev.event_id === id);

        const ev_date = moment(newEvent.dateOfEvent).format('DDMMYYYY');
        if (date != ev_date) {
            ev_list.splice(i, 1);
            const event_list = ev_date in events ? events[ev_date] : [];
            event_list.push(newEvent);
            setEvents({
                ...events,
                [ev_date]: event_list
            });
        } else {
            Object.assign(ev_list[i], newEvent);
        }


    }


    useEffect(() => async () => {

        console.log("useEffect");
        await myGetEvents(today);

    }, []);


    return (

        <>
            <BrowserRouter >

                {!window.location.pathname.includes('/home') ?

                    <Header
                        userName={getUserName()}
                        className={clickedExit ? "hidden_Header" : "Header"}
                        exit={exit}
                        showSidebar={showSidebar} />
                    : null}
                <Sidebar
                    login={getLogin()}
                    email={getEmail()}
                    exit={exit} clickedSidebar={clickedSidebar} showSidebar={showSidebar} />
                <Routes >

                    <Route path='/monthcalendar' element={<MonthCalendar 
                        showAllocationMessage={showAllocationMessage}
                        setShowAllocationMessage={setShowAllocationMessage}
                        showRepeatMessage={showRepeatMessage}
                        setShowRepeatMessage={setShowRepeatMessage} 
                        getEvents={getEvents} 
                        addEvent={addEvent}
                        deleteEvent={deleteEvent}
                        editEvent={editEvent}
                        />} />
                    <Route path="/weekcalendar" element={<WeeklyCalendar
                        showAllocationMessage={showAllocationMessage}
                        setShowAllocationMessage={setShowAllocationMessage}
                        showRepeatMessage={showRepeatMessage}
                        setShowRepeatMessage={setShowRepeatMessage} 
                        getEvents={getEvents} 
                        addEvent={addEvent}
                        deleteEvent={deleteEvent}
                        editEvent={editEvent}
                        />} />

                    <Route path='/tasks' element={<WeeklyToDoList 
                        showAllocationMessage={showAllocationMessage}
                        setShowAllocationMessage={setShowAllocationMessage}
                        showRepeatMessage={showRepeatMessage}
                        setShowRepeatMessage={setShowRepeatMessage} 
                        getEvents={getEvents} 
                        addEvent={addEvent} 
                        deleteEvent={deleteEvent}
                        editEvent={editEvent}
                        />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/' element={<RedirectToHome />} />
                </Routes>
            </BrowserRouter>

        </>
    )


}




