import './App.css';
import UserCard from './UserCard';
import React,{ useState, useEffect } from 'react';

function App() {
  const [error,setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users,setUsers] = useState([])

  const getUsers = async () => {
    fetch("http://inout.fcsa-water.local:5000/users")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          var userResults = JSON.stringify(result.recordsets[0]);
          var u = JSON.parse(userResults)
          setUsers(u);

          
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }

  useEffect(() => {
    
    getUsers();

    const interval = setInterval(() => {
      getUsers();
      window.location.reload();
    }, 20000)

    return() => clearInterval(interval);
  }, [])

  const refreshPage = () => {
    window.location.reload();
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-title">Frederick Water In/Out Board</h1>
      </header>
      <p>When you arrive or leave, select the In or Out Radio Buttons to let others know your are either In or Out. 
        If you are in but do not wish to be disturbed, please select Do Not Disturb (DND).</p>
      <button type="submit" onClick={() => refreshPage()}>Refresh Page</button>
      <h2 className='department'>Engineering</h2>
      {users.map(user => {
        if (user.department === "Engineering") {
          return(
          <UserCard key={user.id} name={user.user_name} checkd={user.status} />
          )
        }
      })}
      <h2 className='department'>Customer Service</h2>
      {users.map(user => {
        if (user.department === "Customer Service") {
          return(
          <UserCard key={user.id} name={user.user_name} checkd={user.status} />
          )
        }
      })}
      <h2 className='department'>Administration</h2>
      {users.map(user => {
        if (user.department === "Administration") {
          return(
          <UserCard key={user.id} name={user.user_name} checkd={user.status} />
          )
        }
      })}
      <h2 className='department'>Finance</h2>
      {users.map(user => {
        if (user.department === "Accounting") {
          return(
          <UserCard key={user.id} name={user.user_name} checkd={user.status} />
          )
        }
      })}
      <h2 className='department'>Maintenance</h2>
      {users.map(user => {
        if (user.department === "Maintenance") {
          return(
          <UserCard key={user.id} name={user.user_name} checkd={user.status} />
          )
        }
      })}
      <h2 className='department'>IT</h2>
      {users.map(user => {
        if (user.department === "IT") {
          return(
          <UserCard key={user.id} name={user.user_name} checkd={user.status} />
          )
        }
      })}

    </div>
  );
}

export default App;
