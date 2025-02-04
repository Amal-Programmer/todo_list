import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  
  const [todos, setTodos] = useState([]);//todos is an array of objects, each object has 2 keys: heading and lists
  const [headingInput, setHeadingInput] = useState('');
  const [listInputs, setListInputs] = useState({});
  
  const handleAddTodo = ()=>{
    if(headingInput.trim()!==''){ //after trimming any whitespace characters from the beginning and end
      //this line updates the state variable todos. It spreads the existing todos array (todos) into a new array using the spread syntax (…todos) and appends a new object to it. The new object contains a heading property set to the value of headingInput and a lists property initialized as an empty array.
      setTodos([...todos, { heading: headingInput, lists: [] }]) //todos is an array of objects, each object has 2 keys: heading and lists 
      setHeadingInput('');
    }
  };

  const handleAddList = (index) => {
    if (listInputs[index] && listInputs[index].trim() !== '') {
        console.log(listInputs);
        const newTodos = [...todos];
        newTodos[index].lists.push(listInputs[index]); // push the value listInputs[index] to the end of the lists array in the newTodos[index] object in the newTodos array
        setTodos(newTodos);
        setListInputs({ ...listInputs, [index]: '' });
    }
};
const handleListInputChange = (index, value) => {
    setListInputs({ ...listInputs, [index]: value });
};

const handleDeleteTodo = (index) =>{
   const newTodos = [...todos];
   newTodos.splice(index,1);
   setTodos(newTodos);
}



  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput}
            onChange={(e)=>{setHeadingInput(e.target.value);}}//// Add onChange event handler to update headingInput state
            
          />
          <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
        </div>
      </div>
      <div className="todo_main">
  {todos.map((todo, index) => (
        
    <div key={index} className="todo-card">

      <div className="heading_todo">
        <h3>{todo.heading}</h3> {/* Display the heading here */}
        <button className="delete-button-heading" onClick={() => handleDeleteTodo(index)}>Delete Heading </button>
      </div>

      <ul>
             {todo.lists.map((list, listIndex) => (
               <li key={listIndex} className='todo_inside_list'>
                <p>{list}</p>
               </li>
             ))}
      </ul>

      <div className='add_list'>
          <input
            type="text"
            className="list-input"
            placeholder="Add List"
            value={listInputs[index] || ''}
            onChange={(e) => handleListInputChange(index, e.target.value)}/>
          <button className="add-list-button" onClick={() => handleAddList(index)}>Add List</button>
        </div>
    </div>
  ))}
      </div>
    </>
  );
};

export default TodoList;
