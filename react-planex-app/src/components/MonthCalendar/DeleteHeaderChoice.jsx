import { React, useState } from 'react'
import "./HeaderChoice.css"


export const DeleteHeaderChoice = (props) => {

    return (
        <>
            <div className={`pseudo_hd_choice ${!props.pseudoState ? 'pseudo_hd_choice_disabled' : ''}`}

                onMouseEnter={() => { props.setShowDelete(true); props.handleDelete(); }}
                onMouseLeave={() => { props.setShowDelete(false); props.handleDelete(); props.setShowPseudoChoice(false) }}
                onClick={() => { props.setShowDeleteChoice(!props.state); props.setShowDelete(false); }}
            >

                <div className={props.state ? "hd_choice" : "hd_choice_disabled"}>
                    <div className="hd_choice_text"
                        onClick={() => {if(props.currEvent!=null){props.deleteEvent(props.currEvent, props.currEvDate); props.setCurrEvent(null);} else if (props.currTask != null){props.deleteTask(props.currTask, props.currTaskDate);props.setCurrTask(null) }}}>Confirm</div>

                    <div className="hd_choice_text"
                        onClick={() => { props.setShowDeleteChoice(!props.state); }}
                    >Cancel</div>
                </div>
            </div>
        </>
    )
}

