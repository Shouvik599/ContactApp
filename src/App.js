import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import { uuid } from "uuidv4";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactDetail from "./components/ContactDetail";
import DeleteWindow from "./components/DeleteWindow";
import api from "./api/contacts";
import EditContact from "./components/EditContact";
function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults,setSearchResults]= useState([]);
  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", request);
    console.log(contact);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = response.data;
    console.log(contact);
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm!=="")
    {
    const newContactList= contacts.filter((contact)=>{
      return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(newContactList);
  }
  else{
    setSearchResults(contacts);
  }
  };

  //retrieve contacts using axios
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };
  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length <1? contacts: searchResults}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route path="/contact/:id" component={ContactDetail} />
          <Route
            path="/delete"
            render={(props) => (
              <DeleteWindow
                {...props}
                removeContactHandler={removeContactHandler}
              />
            )}
          />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
