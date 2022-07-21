import './App.css';
import React, { useEffect, useState } from 'react';
import List from './components/List';
import List_Loading from './components/ListLoading';

function App() {
  const ListLoading = List_Loading(List);
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  });
  
  const [userid, setUserid] = useState("BillECU");
  
  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `https://api.github.com/users/${userid}/repos`;
    
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: false, repos: repos });
      });
  }, [userid]);
  
  const specialChars = /[` !@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/;
  
  function handleChange(e) {
    
    if(e.target.value ==="")
      setUserid("BillECU")
    else if (specialChars.test(e.target.value)){
      alert('Enter invalid symbol\nPlease remove the symbol and re-enter')
      setUserid("BillECU")
    }
    else
      setUserid(e.target.value);
  }

  //Exit message 
  window.addEventListener('beforeunload', (event) => {
    event.returnValue = 'Are you sure you want to leave?';
  });

  return (
    <div className='App'>
      <form>
        <input placeholder="GitHub id" onChange={handleChange} />
        {/* <input type="submit" /> */}
      </form>
      
      <div className='container'>
        <h1>{userid}'s Repositories</h1>
      </div>
      <div className='repo-container'>
        <ListLoading isLoading={appState.loading} repos={appState.repos} />
      </div>
      <footer>
        <div className='footer'>
          Built by <a href="https://github.com/BillECU">BillECU</a>
        </div>
      </footer>
    </div>
  );
}
export default App;