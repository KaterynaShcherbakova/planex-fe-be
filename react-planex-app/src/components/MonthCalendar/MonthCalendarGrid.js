import React from 'react'
import styled from 'styled-components';
import moment from "moment";
import { MonthEvent } from '../Event/MonthEvent';


const GridWrapper = styled.div`

    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: repeat(6, 1fr);
    padding: 1px;
    column-gap: 1.75%;  
    row-gap: 2%;
`;
const CellWrapper = styled.div`
    min-width: 20px;
    min-height: ${props => props.isWeeklyHeader ? '25px' : '90px'};
    background-color: ${props => props.isWeeklyHeader ?
        'rgba(145,171,165, 0 )' : 'rgba(145,171,165, 0.5 )'};
    border-radius: 15px;
    color: #171717;
    &:hover {
        background-color: ${props => props.isWeeklyHeader ?
        'rgba(145,171,165, 0 )' : 'rgba(145,171,165, 0.75 )'};
    }
    opacity: ${props => props.isVisible ? '1' : '0.2'};
    
`;
const RowInCell = styled.div`
user-select:none;
    display: flex;
    justify-content: ${props => props.isWeeklyHeader ? 'center' : 'flex-start'};
    font-weight: ${props => props.isWeeklyHeader ? 'bold' : 'normal'};
    font-size: ${props => props.isWeeklyHeader ? '120%' : '100%'};;
    font-family: 'Quicksand', sans-serif;
    color: #171717;
`;
const DayWrapper = styled.div`
user-select:none;
    cursor: pointer; 
    padding:10px 0px 10px 15px;
    font-size: 100%;
    font-family: Quicksand-Light, sans-serif, helvetica;
    &:hover {
        transition: all 0.7s;
        transform: scale(1.3);
        font-weight:300;
    }
`;
const CurrentDay = styled.div`
   
    width: 30px;
    height: 30px;
    padding-top: 1.5px;
    padding-left:  ${props => props.isOneDigit ? '30%' : '15%'};
    background-color: rgba(145,171,165, 1);
    border-radius: 50%;
    border: 1px #171717;
    border-style: double;
`;
const MonthCalendarGrid = ({
    today, startDay, showToDoList, clickedToDoList, events, editStatus, delStatus, currEvent, setCurrEvent, setCurrEvDate, setClickedDay, }) => {

    const totalDays = 42;
    const day = startDay.clone().subtract(1, 'day');
    const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone());
    const isCurrentDay = (day) => moment().isSame(day, 'day');

    function getEvents(dayItem) {
        return dayItem.format('DDMMYYYY') in events() ? events()[dayItem.format('DDMMYYYY')] : [];
    }



    function handleClick() {
        if (clickedToDoList) {
            showToDoList();
        }
        else {
            console.log('uio')
        }
    }


    return (
        <GridWrapper>
            {
                [...Array(7)].map((_, i) => (
                    <CellWrapper isWeeklyHeader isVisible
                        key={moment().day(i + 1).format('dd')} >
                        <RowInCell isWeeklyHeader>
                            {moment().day(i + 1).format('dd')}
                        </RowInCell>
                    </CellWrapper>
                ))
            }
            {
                daysArray.map((dayItem) => (
                    < CellWrapper

                        key={dayItem.format('DDMMYYYY')}
                        isVisible={dayItem.clone().format('MM') === today.clone().format('MM')} >
                        <RowInCell >

                            <DayWrapper onClick={() => showToDoList(dayItem)}>

                                {!isCurrentDay(dayItem) && dayItem.format('D')}
                                {isCurrentDay(dayItem) && <CurrentDay isOneDigit={dayItem.clone().format('D') in [1, 2, 3, 4, 5, 6, 7, 8, 9]}>
                                    {dayItem.format('D')}</CurrentDay>}

                            </DayWrapper>
                            <div className="mcp_events">
                                {getEvents(dayItem).map((e) => (
                                    <MonthEvent
                                        top={(parseInt(e.time_from.split(':')[0]) - 5) * 5}
                                        height={(parseInt(e.time_to.split(':')[0]) - parseInt(e.time_from.split(':')[0])) * 5.4}
                                        time_from={e.time_from}
                                        time_to={e.time_to}
                                        notes={e.notes}
                                        ev_name={e.event}
                                        category={e.selectedCategory}
                                        id={e.event_id}
                                        editStatus={(a) => editStatus(a)}
                                        delStatus={(a) => delStatus(a)}
                                        currEvent={currEvent}
                                        setCurrEvent={setCurrEvent}
                                        dateOfClickedEvent={() => setCurrEvDate(dayItem.format('DDMMYYYY'))}
                                    />

                                ))}

                            </div>
                        </RowInCell>


                    </CellWrapper>
                ))
            }
        </GridWrapper >
    );
};
export { MonthCalendarGrid };