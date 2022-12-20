import React, { useState } from 'react'
import { useEffect } from 'react'
import { SlClose } from 'react-icons/sl'

export const RepeatMessage = (props) => {

 
    return (
        <div className={`RepeatMessage ${!props.showMessage ? 'RepeatMessage_hidden' : ''}`}>
            <SlClose
                className='repeat_message_icon'
                color={'black'}
                size={22}
                onClick={() => props.setShowMessage(false)} />
            <div className='repeat_message_text'>{props.text}</div>
        </div>
    )
}

