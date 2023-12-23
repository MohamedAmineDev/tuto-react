import React, { useReducer, useEffect, useState } from 'react';
import './App.css';

const localKey = 'search';
const apiLink = "https://hn.algolia.com/api/v1/search?query=";

const ACTIONS = {
  IS_LOADING: 'is loading',
  IS_LOADED: 'is loaded',
  IS_ERROR: 'is error'
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.IS_LOADED:
      return { ...state, data: action.payload, isLoading: false, isError: false };
    case ACTIONS.IS_LOADING:
      return { ...state, data: [], isLoading: true, isError: false };
    case ACTIONS.IS_ERROR:
      return { ...state, data: [], isLoading: false, isError: true };
    default:
      return state;
  }
}

function App2() {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isError: false,
    data: []
  });

  const [searchWord, setSearchWord] = useState(localStorage.getItem(localKey) || '');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (searchWord !== '') {
      setUrl(`${apiLink}${searchWord}`);
      dispatch({ type: ACTIONS.IS_LOADING });
    }
  }, [searchWord]);

  useEffect(() => {
    const fetchData = async () => {
      if (url !== '') {
        try {
          const response = await fetch(url);
          const result = await response.json();
          dispatch({ type: ACTIONS.IS_LOADED, payload: result.hits });
        } catch (error) {
          dispatch({ type: ACTIONS.IS_ERROR });
        }
      }
    };

    fetchData();
  }, [url]);

  function handleSearch(e) {
    setSearchWord(e.target.value);
  }

  return (
    <div>
      <h1>My Hacker News Search</h1>
      <input
        type="text"
        value={searchWord}
        onChange={handleSearch}
        placeholder="Search Hacker News..."
      />
      {state.isError && <p>Something went wrong!</p>}
      {state.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {state.data.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
              <p>{item.author}</p>
              <p>Comments: {item.num_comments}</p>
              <p>Points: {item.points}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App2;
