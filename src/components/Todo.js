import React from 'react'
import './Todo.css'
import { useState } from 'react'


function Todo() {
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])

    const addtodo = () => {
        //enter chyunna data ye update chyan ahnu ee fn .annit display chynm
        setTodos([...todos, todo])
        console.log(todos);
    }
    const handlesSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='container'>
            <h2>TODO APP</h2>
            <form className='form-group' onSubmit={handlesSubmit}>
                <input type="text" value={todo} placeholder='Enter your task' className='form-control' onChange={(event) => setTodo(event.target.value)} />
                <button onClick={addtodo}>ADD</button>
            </form>
            <div className='list' >
                <ul>
                  {
                    todos.map((to)=>(
                        <li>{to}</li>
                    ))
                  }
                </ul>
            </div>
        </div>
    )
}

export default Todo
