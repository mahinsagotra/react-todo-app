import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "./Todo";
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  //when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //this code fires when the app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
    })
  }, []);

  const addTodo = (event) => {
    //this will fire off when we click the button
    event.stopPropagation();
    event.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    //Event.stopPropagation(); //It will stop Refreshing
    setInput('') //clear up the Input Field
  }

  return (
    < div className="App" >
      <h1 >Todo App</h1>
      <form>
        <FormControl>
          <InputLabel>✅Write a Todo</InputLabel>
          <Input value={input} onChange={Event => setInput(Event.target.value)} />
        </FormControl>
        <Button type="butoon" disabled={!input} onClick={addTodo} variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
      <div id="todoLists">
        <ul>
          {todos.map(todo => (
            <Todo todo={todo} />
          ))}
        </ul>
      </div>
      <footer>© Mahin<span>❤️</span></footer>
    </ div>
  );
}

export default App;
