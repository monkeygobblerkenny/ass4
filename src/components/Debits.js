/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React, { useState } from "react";
import AccountBalance from './AccountBalance';

const Debits = (props) => {

  const [newDebit, setNewDebit] = useState({
    id: 0,
    description: "",
    amount: 0,
    date: (new Date).toISOString()
  })
  

  // Create the list of Debit items
  
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.toString().slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
  }

  let handleChange = (e) => {
    setNewDebit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }


  let handleSubmit = (e) => {
    e.preventDefault();
    setNewDebit((prevState) => ({
      ...prevState,
      id: props.debits.length + 1,
      date: (new Date()).toISOString(),
    }));
    props.addDebit(newDebit);
  }
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      {debitsView()}

      <form onSubmit={handleSubmit}>
        <input type="text" name="description" onChange={handleChange}/>
        <input type="number" name="amount" onChange={handleChange} step='.01'/>
        <button type="submit">Add Debit</button>
      </form>
      <AccountBalance accountBalance={props.accountBalance}/>
      <br/>

      <Link to="/">Return to Home</Link>
      
    </div>
  );
}

export default Debits;