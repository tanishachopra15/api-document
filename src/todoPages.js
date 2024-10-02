import * as React from 'react'
import { useState, useEffect } from 'react'

const TodoPages = () => {

    const [todos, setTodos] = useState([])
    const [currTodo, setCurrTodo] = useState({ todo: "" })
    const url = "http://localhost:3200"

    const init = async () => {
        fetch(url, {
            method: "GET"
        }).then(async (val) => {
            const data = await val.json()
            setTodos(data)
        })
    }
    useEffect(() => {


        init()
    }, [currTodo])

    const deleteItem = (id) => {
        fetch(url + `?id=${id}`, {
            method: "DELETE",
        }).then(() => {
            init()
        })
    }
    const addItem = () => {
        fetch(url, {
            method: "POST",
            body: JSON.stringify(currTodo),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((val) => {
            init() 
            setCurrTodo({todo: ''

            })
        })
    }
    const onChangehandler = (e) => setCurrTodo({ todo: e.target.value })

    return (
        <div style={{
            background: "white",
            height: "100vh",
            width: "100vh",
            display: "grid",
            placeItems: "center"
        }}>
            <div className="todo-header">
                <div className="todo-content">
                    <input type="text" placeholder="Add your todo " value={currTodo.todo} onChange={onChangehandler}></input>
                    <button onClick={addItem}>Add</button>
                </div>
                <div className='todos-list'>
                    {todos.map((todoItem, index) => (
                        <div key={index} className='todo-details'>
                            <div>{todoItem.title}</div>
                            <button className='delete-button' onClick={() => deleteItem(todoItem.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TodoPages