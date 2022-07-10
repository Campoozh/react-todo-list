import React, { Component, createRef } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css'

class App extends Component {
    constructor(props) {
      super(props)
      this.todoText = createRef()

      const SAVED_ITEMS = localStorage.getItem('items')
      this.state = {
          items: SAVED_ITEMS ? JSON.parse(SAVED_ITEMS) : []
      }
    }

    addItem = (event) => {
      event.preventDefault()
      const NEW_LIST = [...this.state.items, this.todoText.current.value]
      this.todoText.current.value = ""
      localStorage.setItem('items', JSON.stringify(NEW_LIST))
      this.setState({
          items: NEW_LIST
      })
    }

    removeItem = (id) => {
      let h3 = document.querySelector(`#${id}`)
      const ID_NUMBER = h3.id.split('-')[1]
      const CURRENT_ITEMS = this.state.items
      CURRENT_ITEMS.splice(ID_NUMBER, 1)
      this.setState({
        items: CURRENT_ITEMS
      })
      localStorage.setItem('items', JSON.stringify(CURRENT_ITEMS))
    }

  render() {
    return (
        <div className='todolist'>      
        <ul>
          {/* Map all items inside the To Do to create their <li> */}
          {this.state.items.map((item, id) => (
            <li key={id}>
              <h3 id={`item-${id}`}>{item}</h3>
              <div className='buttons-div'>
                <button onClick={() => {this.removeItem(`item-${id}`)}}><i className='bi bi-trash3-fill'></i></button>
              </div>
            </li>
          ))}
        </ul>

        <form action="" onSubmit={this.addItem}>
          {/* Using ref to get the input value */}
          <input type="text" ref={this.todoText} placeholder="Add item to the list..." />
          <input type="submit" value={"Add item"}/>
        </form>
      </div>
    )
  }
}

export default App