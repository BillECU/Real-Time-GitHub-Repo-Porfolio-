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
  
  const [userid, setUserid] = useState('BillECU');
  
  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = (userid ==="")? `https://api.github.com/users/BillECU/repos`:`https://api.github.com/users/${userid}/repos`;
    
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        setAppState({ loading: false, repos: repos });
      });
  }, [userid]);

  return (
    <div className='App'>
      <form>
        <input placeholder="GitHub id" onChange={e => setUserid(e.target.value)} />
        {/* <input type="submit" /> */}
      </form>
      
      <div className='container'>
        <h1>My Repositories</h1>
      </div>
      <div className='repo-container'>
        <ListLoading isLoading={appState.loading} repos={appState.repos} />
      </div>
      <footer>
        <div className='footer'>
          Built by <a href="https://github.com/${userid}">{userid}</a>
        </div>
      </footer>
    </div>
  );
}
export default App;