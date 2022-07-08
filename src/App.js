import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import "bootstrap-icons/font/bootstrap-icons.css";
const App = () => {

    // Using useState to create de list of To Do items
    const [items, setItems] = useState([])
  
    // Getting all of the items saved in the localStorage
    useEffect(() => {
      let savedItems = localStorage.getItem('items')
      // Getting the items if they exist
      setItems(savedItems ? JSON.parse(savedItems) : [])
    }, [])

    const todoText = useRef()

    // Adding item sent by the from to the To Do list and saving it to localStorage
    let addItem = (event) => {
      event.preventDefault()
      const newList = [...items, todoText.current.value]
      todoText.current.value = ""
      setItems(newList)
      localStorage.setItem('items', JSON.stringify(newList))
    }

    let liItem = useRef({})

    // Removing an item use its ref
    let removeItem = () => {
      let newList = items.filter(item => item !== liItem.current['item'].innerText)
      setItems(newList)
      localStorage.setItem('items', JSON.stringify(newList))
    }

    return (
      <div className='todolist'>      
        <ul>
          {/* Map all items inside the To Do to create their <li> */}
          {items.map(item => (
            <li key={items.indexOf(item)}>
              <h3 ref={item => liItem.current['item'] = item}>{item}</h3>
              <div className='buttons-div'>
                <button onClick={removeItem}><i className='bi bi-trash3-fill'></i></button>
              </div>
            </li>
          ))}
        </ul>

        <form action="" onSubmit={addItem}>
          {/* Using ref to get the input value */}
          <input type="text" ref={todoText} placeholder="Add item to the list..." />
          <input type="submit" value={"Add item"}/>
        </form>
      </div>

    );
  }
  

export default App;
