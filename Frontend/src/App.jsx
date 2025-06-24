import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [query, setQuery] = useState("SELECT * FROM employees;");
  const [results, setResults] = useState([]);
  const [dbName, setDbName] = useState("employee");
  const [showPreview, setShowPreview] = useState(false);

  const runQuery = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/query', {
        query,
        dbName
      });
      setResults(res.data.results);
    } catch (err) {
      setResults([{ error: err.response?.data?.error || "Error running query" }]);
    }
  };

  return (
    <div className="app">
      <h1>CodeBook SQL Practice</h1>

      <select onChange={(e) => setDbName(e.target.value)} value={dbName} className="options">
        <option value="employee">Employee DB</option>
        <option value="sales">Sales DB</option>
      </select>

      <textarea value={query} onChange={(e) => setQuery(e.target.value)} />
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={runQuery} className="run">Run</button>
        <button onClick={() => setShowPreview(true)} className="run">Preview</button>
      </div>

      <pre>{JSON.stringify(results, null, 2)}</pre>

      {showPreview && (
        <div className="preview-popup">
          <div className="preview-header">
            <span>Preview</span>
            <button className="close-btn" onClick={() => setShowPreview(false)}>X</button>
          </div>
          <div className="preview-body">
            {results.length > 0 && !results[0]?.error ? (
              <table className="result-table">
                <thead>
                  <tr>
                    {Object.keys(results[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((val, i) => (
                        <td key={i}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="error">{results[0]?.error || "No data to preview"}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
