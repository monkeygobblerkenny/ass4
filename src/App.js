/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
import AccountBalance from './components/AccountBalance';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  addCredit = (creditForm) => {
    let newCredit = this.state.creditList;
    newCredit.push(creditForm);
    // this.setState({accountBalance: this.state.accountBalance + creditForm.amount, creditList: newCredit});
    let newBalance = 0;
    newBalance = Math.round((this.state.accountBalance + parseFloat(creditForm.amount))* 100) / 100;
    console.log(this.state.accountBalance)
    console.log(creditForm.amount)
    this.setState({accountBalance: newBalance, creditList: newCredit});
    }
  addDebit = (debitForm) => {
    let newDebit = this.state.debitList;
    newDebit.push(debitForm);
    let newBalance = 0;
    newBalance = Math.round((this.state.accountBalance - debitForm.amount)* 100) / 100;
    this.setState({accountBalance: newBalance, debitList: newDebit});
  }

  async componentDidMount() {
    let creditAPI = 'https://johnnylaicode.github.io/api/credits.json';  // Link to remote website API endpoint
    let debitAPI = 'https://johnnylaicode.github.io/api/debits.json'

    // Await for promise (completion) returned from API call
    try {  // Accept success response as array of JSON objects (users)
      let credit = await axios.get(creditAPI);
      let debit = await axios.get(debitAPI);
      //console.log(response);  // Print out response
      // To get data object in the response, need to use "response.data"
      console.log(credit.data)
      console.log(debit.data)

      credit = credit.data;
      debit = debit.data;

      let creditAmount = 0
      let debitAmount = 0;
      for(let i = 0; i < credit.length; i++){
        creditAmount += credit[i].amount;
      }
      for(let i = 0; i < debit.length; i++){
        debitAmount += debit[i].amount;
      }
      let balance = 0;
      balance = Math.round((creditAmount - debitAmount) * 100) / 100;
      balance = balance.toFixed(2);
      this.setState({accountBalance: balance, creditList: credit, debitList: debit});  // Store received data in state's "users" object
    } 
    catch (error) {  // Print out errors at console when there is an error response
      if (error.response) {
        // The request was made, and the server responded with error message and status code.
        console.log(error.response.data);  // Print out error message (e.g., Not Found)
        console.log(error.response.status);  // Print out error status code (e.g., 404)
      }    
    }
  }  

  // Create Routes and React elements to be rendered using React components
  render() {  


    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits addCredit={this.addCredit} credits={this.state.creditList} accountBalance={this.state.accountBalance}/>) 
    const DebitsComponent = () => (<Debits debits={this.state.debitList} addDebit={this.addDebit} accountBalance={this.state.accountBalance}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/ass4">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;