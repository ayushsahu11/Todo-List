import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './Todo.css';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';


export default function Todo() {
    let [Todos, setTodos] = useState([{ task: "sample task", id: uuidv4(), isDone: false }]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTask = () => {
        // setTodos([...Todos,{task:newTodo,id: uuidv4()}]);
        setTodos((prevTodos) => {
            return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
        })

        setNewTodo("");
    }

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    }

    let deleteTodo = (id) => {
        setTodos((prevTodos) => Todos.filter((prevTodos) => prevTodos.id != id));
    }


    let markAllDone = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                return {
                    ...todo,
                    isDone: true
                }
            })
        )
    }

    let markAsDone = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        isDone: true
                    }
                } else {
                    return todo;
                }
            })
        )
    }
    return (
        <div>
            <div className="header"><h2>Todo</h2></div>
            <div className="container">
                <div className="addtask" >
                    <input placeholder="Add task" value={newTodo} onChange={updateTodoValue} /> <br /><br />
                </div>
                <br />
                <button className="addbtn" onClick={addNewTask}>Add Task</button>
                <hr />
                <h3>Tasks Todo</h3>
                <ul>
                    {
                        Todos.map((todo) => (
                            <li key={todo.id}>
                                <span style={todo.isDone ? { textDecorationLine: "line-through" } : {}}>{todo.task}</span>&nbsp;&nbsp;
                                <div><button onClick={() => deleteTodo(todo.id)}>{<DeleteIcon />}</button>
                                <button onClick={() => markAsDone(todo.id)}><DoneIcon/></button></div>    
                            </li>
                        ))
                    }
                </ul>
                <br />
                <button className="alldone" onClick={markAllDone} >Mark all done</button>
            </div>
        </div>
    )
}