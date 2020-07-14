import React, {useState, useEffect} from 'react';

import api from './services/api';

import "./styles.css";

function App() {
  // States
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  // Methods
  async function handleAddRepository() {
    const response = await api.post('repositories');
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`repositories/${id}`);
    
    if (status === 204) {
      const repoIndex = repositories.findIndex(repo => repo.id === id);

      const updatedRepos = [...repositories];
      updatedRepos.splice(repoIndex, 1);

      setRepositories(updatedRepos);
    }

    // const repoIndex = repositories.findIndex(repo => repo.id === id);
    
    // console.log(repoIndex);
    // console.log(repositories.splice(repoIndex, 1));
    
    // setRepositories(update);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => <li key={repo.id}>{repo.title}
        
          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>

        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
