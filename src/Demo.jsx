import React from 'react'
import './App.css'
import { useReducer } from 'react';
const ACTIONS = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement'
};
function reducer(state, action) {
    const { type } = action;
    const { counter } = state;
    const minimum = -10;
    const maximum = 10;
    switch (type) {
        case ACTIONS.INCREMENT: {
            const result = counter + 1;
            const error = result > maximum || result < minimum;
            return { ...state, counter: error ? counter : result, error: error };
        }

        case ACTIONS.DECREMENT: {
            const result = counter - 1;
            const error = result > maximum || result < minimum;
            return { ...state, counter: error ? counter : result, error: error };
        }
        default:
            return state;
    }
}
function Demo() {
    const [state, dispatch] = useReducer(reducer, { counter: 0, error: null });
    return (
        <>

            <div>
                <p>Counter : {state.counter}</p>
            </div>
            <div>
                <h1>Demo</h1>
                <button onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: ACTIONS.INCREMENT });
                }}>+</button>

                <button onClick={(e) => {
                    e.preventDefault();
                    dispatch({ type: ACTIONS.DECREMENT });
                }}>-</button>
            </div>
            {state.error && <div className='red'><strong>An error has accured</strong></div>}
        </>
    )
}




export default Demo;
