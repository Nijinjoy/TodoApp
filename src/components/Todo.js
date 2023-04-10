import React from "react";
import "./Todo.css";
import { FaCheck, FaTrash, FaPen } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

function Todo() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [editId, setEditId] = useState(0);

    const addtodo = () => {
        if (todo !== "") {
            // enter chyunna data ye update chyan ahnu ee fn .annit display chynm
            setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
            console.log(todos);
            setTodo(""); //input box become empty when clcik add btn
        }
        if (editId) {
            const editTodo = todos.find((todo) => todo.id === editId);
            const updateTodo = todos.map((to) => to.id === editTodo.id
            ? (to = {id: to.id , list : todo})
            : (to = {id : to.id , list: to.list}))
            setTodos(updateTodo)
            setEditId(0)
            setTodo('')
        }
    };
    const handlesSubmit = (e) => {
        e.preventDefault();
    };

    const inputRef = useRef("null");

    useEffect(() => {
        inputRef.current.focus();
    });

    const Delete = (id) => {
        setTodos(todos.filter((to) => to.id !== id));
    };

    const Complete = (id) => {
        let complete = todos.map((list) => {
            if (list.id === id) {
                return { ...list, status: !list.status };
            }
            return list;
        });
        setTodos(complete);
    };

    const Edit = (id) => {
        const editTodo = todos.find((to) => to.id === id);
        console.log(editTodo.list);
        setTodo(editTodo.list);
        setEditId(editTodo.id);
        console.log(editTodo);
    };

    return (
        <div className="container">
            <h2>TODO APP</h2>
            <form className="form-group" onSubmit={handlesSubmit}>
                <input
                    type="text"
                    value={todo}
                    ref={inputRef}
                    placeholder="Enter your task"
                    className="form-control"
                    onChange={(event) => setTodo(event.target.value)}
                />
                <button onClick={addtodo}>{editId ? "EDIT" : "ADD"}</button>
            </form>
            <div className="list">
                <ul>
                    {todos.map((to) => (
                        <li className="list-items">
                            <div className="list-item-list" id={to.status ? "list-item" : ""}>
                                {" "}
                                {to.list}
                            </div>
                            <span>
                                <FaCheck
                                    className="list-item-icons"
                                    id="complete"
                                    title="Complete"
                                    onClick={() => Complete(to.id)}
                                />
                                <FaPen
                                    className="list-item-icons"
                                    id="edit"
                                    title="Edit"
                                    onClick={() => Edit(to.id)}
                                />
                                <FaTrash
                                    className="list-item-icons"
                                    id="delete"
                                    title="Delete"
                                    onClick={() => Delete(to.id)}
                                />
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Todo;
