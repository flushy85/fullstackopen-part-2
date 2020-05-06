import React, { useState, useEffect } from 'react'
import Contact from './components/Contact'
import Form from './components/Form'
import contactService from './services/conctacts'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [noteMsg, setNoteMsg] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  },[])
   
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addContact = (event) =>  {
    event.preventDefault()
    
    let confirm = false
    let value = -1
    
    
    persons.forEach(person => {
      if(person.name === newName)
        value = person.id
    })
    
    if(value !== -1) {
      confirm = window.confirm(` ${newName} already exists in phonebook, replace old number with new one?`)

    } else {
      const nameObj = {
        name: newName,
        number: newNumber
      }
      contactService
        .create(nameObj)
        .then(createdPerson => {
          console.log(`${nameObj.name} added`)
        })
        .catch(error => {
          console.log(error.response.data)
          return setErrorMsg(error.response.data.error)
          
        })
      setNoteMsg(`Added ${newName} to phonebook`)
      setNewName('')
      setNewNumber('')
       
    }
    confirm ? updateContact(value, newNumber)
    : console.log('do nothing')
          
  }

  const updateContact = (id, number) => {
    let contact = persons.find(c => c.id === id)
    let newContact = {...contact, number: number }
    
    contactService
      .update(id, newContact)
      .then(returnedContact => {
        setPersons(persons.map(contact => contact.id !== id ? contact : returnedContact))
        setNoteMsg(`${contact.name} updated in phonebook`)
      })
      .catch(error => {setErrorMsg(
        `Note '${contact.name}' was already removed from the database` 
      )
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
    })
  }


  const deleteName = (id, name) => {
    contactService
      .remove(id, name)
      .catch(error => {setErrorMsg(
          `Note '${name}' was already removed from the database` 
      )
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)
      })
      .then(returnedContact => setNoteMsg(`${name} deleted from phonebook`))
      
  }

  const fieldEntry = () => 
      <Form 
        newName={newName} 
        newNumber={newNumber} 
        nameChange={handleNameChange} 
        numberChange={handleNumberChange}
        addContact={addContact}
      />

  const regex = new RegExp(`${newFilter}`, 'i')  
  const people = persons.filter((obj) => obj.name.match(regex))
   
  
  const contactList = () => people.map(contact =>
    < Contact 
        name={contact.name} 
        key={contact.id} 
        number={contact.number}
        remove={() => deleteName(contact.id, contact.name)}
    />)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Notification error={errorMsg} notice={noteMsg} />
      </div>
      <div>
        filter results: <input value={newFilter} onChange={handleFilterChange}/>
      </div>
      <br/>
      {fieldEntry()}
      <h2>Numbers</h2>
      <table>
            <tbody>
                {contactList()}
            </tbody>    
        </table>
    </div>
  )
}

export default App