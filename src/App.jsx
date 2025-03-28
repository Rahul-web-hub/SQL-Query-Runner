// App.jsx
import React, { useState, useEffect, useCallback } from 'react';
import QuerySelector from './components/QuerySelector';
import CodeEditor from './components/codeEditor';
import ResultsTable from './components/ResultsTable';
import QueryMetrics from './components/QueryMetrics';
import { sampleQueries } from './data/sampleData';
import { exportToCSV, exportToJSON } from './utils/exportUtils';
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts';
import './App.css';

function App() {
  // State management
  //I have used useState to manage the state of the application.
  const [selectedQuery, setSelectedQuery] = useState(sampleQueries[0]);
  const [editorValue, setEditorValue] = useState(sampleQueries[0].sql);
  const [results, setResults] = useState(sampleQueries[0].result);
  const [isLoading, setIsLoading] = useState(false);
  const [execTime, setExecTime] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [queryHistory, setQueryHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Define all handler functions first
  const toggleTheme = useCallback(() => {
    setDarkMode(prevMode => !prevMode);
  }, []);
  
  // This function will handle the query change
  const handleQueryChange = useCallback((query) => {
    setSelectedQuery(query);
    setEditorValue(query.sql);
    setResults(query.result);
  }, []);

  const toggleFavorite = useCallback((queryId) => {
    setFavorites(prev => 
      prev.includes(queryId) 
        ? prev.filter(id => id !== queryId) 
        : [...prev, queryId]
    );
  }, []);

  const handleRunQuery = useCallback(() => {
    const startTime = Date.now();
    setIsLoading(true);

    setTimeout(() => {
      setResults(selectedQuery.result);
      setExecTime(Date.now() - startTime); // Mock execution time
      setIsLoading(false);
      
      setQueryHistory(prev => [
        ...prev.slice(-9), // Keep only the last 10 queries
        {
          id: Date.now(),
          sql: editorValue,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    }, 300 + Math.random() * 700);
  }, [selectedQuery, editorValue]);

  const handleExport = useCallback((format) => {
    const data = format === 'csv'
      ? exportToCSV(results.columns, results.rows)
      : exportToJSON(results.columns, results.rows);
    
    const blob = new Blob([data], { type: `text/${format}` });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `query_result.${format}`;
    link.click();
  }, [results]);

  // Initialize dark mode and keyboard shortcuts
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useKeyboardShortcuts(handleRunQuery);

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <div className="header-controls">
        <h1>SQL Query Runner</h1>
        
        <div className="utility-buttons">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          
          <div className="export-buttons">
            <button onClick={() => handleExport('csv')}>Export CSV</button>
            <button onClick={() => handleExport('json')}>Export JSON</button>
          </div>
        </div>
      </div>

      <div className="query-selector-container">
        <QuerySelector 
          queries={sampleQueries}
          selectedQuery={selectedQuery}
          onQueryChange={handleQueryChange}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      </div>

      <div className="editor-container">
        <CodeEditor 
          value={editorValue}
          onValueChange={setEditorValue}
          darkMode={darkMode}
        />
        
        <button 
          className={`run-button ${isLoading ? 'loading' : ''}`}
          onClick={handleRunQuery}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="spinner">⏳ Processing...</span>
          ) : (
            '▶ Run Query (Ctrl+Enter)'
          )}
        </button>
      </div>

      <QueryMetrics 
        execTime={execTime}
        rowCount={results.rows.length}
        complexity={calculateComplexity(editorValue)}
      />

      <div className="results-container">
        <ResultsTable 
          columns={results.columns}
          rows={results.rows}
          darkMode={darkMode}
        />
      </div>

      {queryHistory.length > 0 && (
        <div className="history-section">
          <h3>Query History</h3>
          <ul>
            {queryHistory.map((query, index) => (
              <li key={index}>
                <span className="time">{query.timestamp}</span>
                <span className="query">{query.sql.substring(0, 50)}...</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Helper function to mock query complexity
const calculateComplexity = (query) => {
  const keywords = ['SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP BY', 'HAVING', 'ORDER BY'];
  const foundKeywords = keywords.filter(kw => query.includes(kw)).length;
  return Math.min(Math.floor(foundKeywords / 2) + 1, 5); // Scale 1-5
};

export default App;