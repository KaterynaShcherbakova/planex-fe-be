import { config } from '@fortawesome/fontawesome-svg-core';
import React, { useEffect, useState } from 'react'
import { BsCheckCircleFill, BsFillXCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import AxiosClient from '../utilities/AxiosClient';

// ********************* task crud *****************************************************
/*
const mockTaskInfo = {
        id: 34,
        task: 'mock',
        dateOfTask: new Date(),
        time_hours: '10',
        time_mins: '10',
        checked: false,
        selectedCategory: 'High',
        // allocate
    };
*/


function convertTaskGet(taskInfo) {
    let t = new Date(taskInfo.time_to_do);

    return {

        checked: taskInfo.done,
        dateOfTask: new Date(taskInfo.time_to_do),
        id: taskInfo.id,
        selectedCategory: taskInfo.priority,
        task: taskInfo.title,

        time_hours: t.getHours().toString(),

        time_mins: t.getMinutes().toString(),
        //deadline : taskInfo.deadline
    }
}
function convertTaskPost(taskInfo) {
    const dateTimeToDo = combineDateTime(taskInfo.dateOfTask, taskInfo.time_hours, taskInfo.time_mins);

    return {
        title: taskInfo.task, // 20 symb 
        deadline: /*deadline*/ taskInfo.dateOfTask,
        time_to_do: dateTimeToDo,
        priority: taskInfo.selectedCategory,
        done: taskInfo.checked
    }
}



function combineDateTime(date, timeH, timeM) {
    let d = date;

    let h= timeH ? timeH : 0;
    let m= timeM ? timeM : 0;

    let fullDate = d.getFullYear().toString() + '-' + (d.getMonth() + 1).toString() + '-' + d.getDate().toString();
    let res = fullDate + 'T' + h.toString() + ":" + m.toString() + ":00";
    return res
}

export function apiAddTask(taskInfo) {

    // taskInfo=mockTaskInfo;

    //'2022-11-23T18:00:00'
    console.log("task 1 info", taskInfo);

  //  const dateTimeToDo = combineDateTime(taskInfo.dateOfTask, taskInfo.time_hours, taskInfo.time_mins);

    AxiosClient.post('/task', 
        convertTaskPost(taskInfo)
    ).then((response) => {
        console.log(response);
        return 1;
    }).catch((error) => {
        console.log(error);
        return 0;
    });
}


export function apiDeleteTask(taskInfo) {

    AxiosClient.delete('/task/' + taskInfo.id, convertTaskPost(taskInfo)
    ).then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error);
    });

}


export async function apiGetAllTasks() {

    let alltasks = [];

    let response = await AxiosClient.get('/all_tasks');

    if (response.status === 200) {
        alltasks = response.data;
    } else {
        console.log(response);
    }
    let allConvtasks = [];
    alltasks.forEach(element => {
        allConvtasks.push(convertTaskGet(element));
    });
    console.log("all tasks", allConvtasks);
    return allConvtasks;
}

export function apiEditTask(taskInfo) {

    // taskInfo=mockTaskInfo;

    const converted_task= convertTaskPost(taskInfo);
    converted_task.deadline=converted_task.time_to_do

    AxiosClient.put('/task/' + taskInfo.id, 
    converted_task
    ).then((response) => {
        console.log(response);
        return 1;
    }).catch((error) => {
        console.log(error);
        return 0;
    });

}