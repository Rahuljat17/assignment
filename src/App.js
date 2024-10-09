import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [manhwaList, setManhwaList] = useState([]);

  useEffect(() => {
    fetch('/manhwa.json')
      .then(response => response.json())
      .then(data => setManhwaList(data));
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Best Fantasy Manhwa</h1>
      <div className="row">
        {manhwaList.map((manhwa, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{manhwa.title}</h5>
                <p className="card-text"><strong>Genre:</strong> {manhwa.genre}</p>
                <p className="card-text">{manhwa.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

