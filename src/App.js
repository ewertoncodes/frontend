import React, { useState, useEffect } from 'react';
import api from './services/api'

import './App.css';

import Header from './components/Header';

function App(){
  const [projects, setProject] = useState([]);

 useEffect(()=>{
   api.get('projects').then(response => {
     setProject(response.data);
   });
 },[])

  async function handleAddProject(){
    //setProject([...projects, `Novo projeto ${Date.now()}`]);
    const response = await api.post('projects',  {
      title: `Novo projeto ${Date.now()}`,
      owner: "Ewerton"
    });

    const project = response.data;
    setProject([...projects, project])

  };

  return(
    <>
      <Header title='Projects'/>
      <ul>
        { projects.map(project => <li key = {project.id}> {project.title} </li>) }
      </ul>

      <button type="button"onClick={handleAddProject}>
        Adicionar projeto
      </button>
    </>
  );
}

export default App;