import React from 'react'
import './App.css'
import { useReducer } from 'react';
const localKey = 'search';
const apiLink = "https://hn.algolia.com/api/v1/search?query=";
const ACTIONS = {
  IS_LOADING: 'Loading stories',
  IS_LOADED: 'Stories are loaded',
  IS_ERROR: 'An error has occured !',
  IS_DELETEING: 'Deleting a story'
};
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.IS_LOADING: {
      return { ...state, isLoading: true, isError: false };
    }
    case ACTIONS.IS_LOADED: {
      return { ...state, data: action.data, isLoading: false, isError: false };
    }
    case ACTIONS.IS_ERROR: {
      return { ...state, isLoading: false, isError: true };
    }
    case ACTIONS.IS_DELETEING: {
      return { ...state, data: action.data, isLoading: false, isError: false };
    }
    default:
      return { ...state };
  }
}
function App() {
  // Variables
  const [state, dispatch] = useReducer(reducer, { isLoading: false, isError: false, data: [] });
  const [searchWord, setSearchWord] = React.useState(localStorage.getItem(localKey) || "");
  const [url, setUrl] = React.useState(``);
  // Use effects
  React.useEffect(() => {
    if (searchWord != '') {
      setUrl(`${apiLink}${searchWord}`);
    }
  }, [searchWord]);
  React.useEffect(() => {
    if (url != '') {
      dispatch({ type: ACTIONS.IS_LOADING });
      fetch(`${url}`)
        .then((response) => response.json())
        .then((result) => {
          dispatch({ type: ACTIONS.IS_LOADED, data: result.hits });
        })
        .catch(() => {
          dispatch({ type: ACTIONS.IS_ERROR });
        });
    }
  }, [url]);
  function handleRemoveItem(item) {
    //let newStories = stories.filter((i) => i.objectID != item.objectID);
    //setStories(newStories);
    let newStories = state.data.filter((i) => i.objectID != item.objectID);
    dispatch({ type: ACTIONS.IS_DELETEING, data: newStories });
  }
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search searchWord={searchWord} setSearchWord={setSearchWord} />
      <List state={state} handleRemoveItem={handleRemoveItem} />
    </div>
  )
}

function Search({ searchWord, setSearchWord }) {

  function handleInput(e) {
    setSearchWord(e.currentTarget.value);
    //localStorage.setItem(localKey,e.currentTarget.value);
  }
  return (
    <div>
      <label htmlFor='search'>Search : </label>
      <input id='search' type='text' onChange={handleInput} value={searchWord} />
      <div>
        <p>You are searching for <strong>{searchWord}</strong></p>
      </div>
      <hr />
    </div>
  );
}
function List({ state, handleRemoveItem }) {
  return (
    <>
      {state.isError ? (<p>Something went wrong !</p>) : (<p></p>)}
      {state.isLoading ? (<p>Is Loading...</p>) : (
        <ul key={state.data.lenght * 3}>
          {state.data.map((item) => {
            return (
              <Item key={item.objectID} item={item} handleRemoveItem={handleRemoveItem} />
            );
          })}
        </ul>
      )}
    </>
  );
}
function Item({ item, handleRemoveItem }) {
  return (
    <li >
      <a href={item.url}>{item.title}</a>
      <span> {item.author}</span>
      <span> {item.num_comments}</span>
      <span> {item.points}</span>
      <span>
        <button className='btn' onClick={() => {
          handleRemoveItem(item);
        }}>Dismess</button>
      </span>
    </li>
  );
}
export default App;
