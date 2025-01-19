import React from "react";

export default function TaskList({task,taskUpdate,taskDelete}) {
  return <>
    <li
                key={task.id}
                className="bg-white border-[#0e0e0e] border-2 rounded-md p-3 flex justify-between items-center"
              >
                <div>
        <h5 className="font-medium text-[#0e0e0e]">{task.title}</h5>
        <span onClick={() => taskUpdate(task)} ><ion-icon name="cloud-upload-outline"></ion-icon></span>
        <span onClick={() => { taskDelete(task.id) }} > <ion-icon name="trash-outline"></ion-icon></span>
                  <p className="text-sm text-[#0e0e0e]">{task.description}</p>
                </div>
                <span className="text-[#0e0e0e]">{task.status}</span>
              </li>
  </>
}