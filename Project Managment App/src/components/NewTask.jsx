import Button from "./Button"
import { useState } from "react"
export default function NewTask({onAdd}){
    const [enteredTask,setEnteredTask]= useState();
    function handleChange(event){
        setEnteredTask(event.target.value);
    }
    function handleClick(){
        onAdd(enteredTask);
        setEnteredTask('');

    }
    return <div className="felx items-center gap-4">
        <input type="text" className="w-64 px-1 py-1 rounded-sm bg-stone-200" 
        onChange={handleChange}
        value={enteredTask}
        />
        <Button onClick={handleClick}>Add Task</Button>
    </div>
}