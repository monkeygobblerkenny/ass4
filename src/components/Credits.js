/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { useState } from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
const Credits = (props) => {


  const [newCredit, setNewCredit] = useState({
    id: 0,
    description: "",
    amount: 0,
    date: (new Date).toISOString()
  })


  let creditsView = () => {
    const { credits } = props;
    console.log(props)
    console.log(credits)
    return credits.map((credit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = credit.date.slice(0,10);
      return <li key={credit.id}>{credit.amount} {credit.description} {date}</li>
    });
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    setNewCredit((prevState) => ({
      ...prevState,
      id: props.credits.length + 1,
      date: (new Date()).toISOString(),
    }));
    props.addCredit(newCredit);
  }

  let handleChange = (e) => {
    setNewCredit((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div>
      <h1>Credits</h1>
      <br/>
      {creditsView()}

        <form onSubmit={handleSubmit}>
          <div>
            <label>Description</label>
            <input type="text" placeholder="Description" name = "description"
            onChange={handleChange}
            />
          </div>

          <div>
            <label>Amount</label>
            <input type="number" pleaceholder="Enter Amount" name = "amount" step='.01'

            onChange={handleChange}
            />
          </div>
          <button type='submit'>Add</button>
        </form>  
        <AccountBalance accountBalance={props.accountBalance}/>

      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;