import { describe, it, expect, vi } from "vitest";
import { App, Search, List, Item, reducer, ACTIONS } from "../src/App";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// Unit Tests for funtions
describe("Something truthy and falsy", () => {
    it("True to be true", () => {
        expect(true).toBe(true);
    });
    it("True to be true", () => {
        expect(true).toBeTruthy();
    });
    it("False to be false", () => {
        expect(false).toBe(false);
    });
    it("False to be false", () => {
        expect(false).toBeFalsy();
    });
});

const storyOne = {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
};
const storyTwo = {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
};
const stories = [storyOne, storyTwo];
describe('Testing the reducer', () => {
    it(`${ACTIONS.IS_LOADING}`, () => {
        const action = { type: ACTIONS.IS_LOADING, isLoading: true, isError: false, data: [] };
        const state = { isLoading: true, isError: false, data: [] };
        const newState = reducer(state, action);
        const expectedState = {
            data: [],
            isLoading: true,
            isError: false
        };
        expect(newState).toStrictEqual(expectedState);
    });
    it(`${ACTIONS.IS_LOADED}`, () => {
        const action = { type: ACTIONS.IS_LOADED, isLoading: false, isError: false, data: stories };
        const state = { isLoading: false, isError: false, data: stories };
        const newState = reducer(state, action);
        const expectedState = {
            data: stories,
            isLoading: false,
            isError: false
        };
        expect(newState).toStrictEqual(expectedState);
    });
    it(`${ACTIONS.IS_ERROR}`, () => {
        const action = { type: ACTIONS.IS_ERROR, isLoading: false, isError: true, data: [] };
        const state = { isLoading: false, isError: true, data: [] };
        const newState = reducer(state, action);
        const expectedState = {
            data: [],
            isLoading: false,
            isError: true
        };
        expect(newState).toStrictEqual(expectedState);
    });
    it(`${ACTIONS.IS_DELETEING}`, () => {
        const filtredStories = stories.filter((i) => i.objectID != 0);
        const action = { type: ACTIONS.IS_DELETEING, isLoading: false, isError: false, data: filtredStories };
        const state = { isLoading: false, isError: false, data: filtredStories };
        const newState = reducer(state, action);
        const expectedState = {
            data: [storyTwo],
            isLoading: false,
            isError: false
        };
        expect(newState).toStrictEqual(expectedState);
    });
});
// Unit tests for components
describe('Item Component tests', () => {
    it('Display story one', () => {
        const currentStory = storyOne;
        render(<Item item={currentStory} />);
        expect(screen.getByText(`${currentStory.author}`)).toBeInTheDocument();
        expect(screen.getByText(`${currentStory.title}`)).toHaveAttribute('href', `${currentStory.url}`);
        //screen.debug();
    });
    it('Display story two', () => {
        const currentStory = storyTwo;
        render(<Item item={currentStory} />);
        expect(screen.getByText(`${currentStory.author}`)).toBeInTheDocument();
        expect(screen.getByText(`${currentStory.title}`)).toHaveAttribute('href', `${currentStory.url}`);
        //screen.debug();
    });
    it('Check clikable button', () => {
        const currentStory = storyOne;
        render(<Item item={currentStory} />);
        expect(screen.getByRole('button')).toBeInTheDocument();
        //screen.debug();
    });
    it('Test the handleRemoveItem by clicking in the button', () => {
        const currentStory = storyOne;
        const handleRemoveItem = vi.fn();
        render(<Item item={currentStory} handleRemoveItem={handleRemoveItem} />);
        fireEvent.click(screen.getByRole('button'));
        expect(handleRemoveItem).toHaveBeenCalledTimes(1);
        //screen.debug();
    });
});
describe('Search component tests',()=>{
    it('Display search word',()=>{
        const searchWord='React';
        const setSearchWord=vi.fn();
        render(<Search searchWord={searchWord} setSearchWord={setSearchWord} />);
        expect(screen.getByDisplayValue(searchWord)).toBeInTheDocument();
    });
    it('Display search label',()=>{
        const searchLabel='Search :';
        const searchWord='React';
        const handleInput=vi.fn();
        render(<Search searchWord={searchWord} handleInput={handleInput} />);
        expect(screen.getByLabelText(searchLabel)).toBeInTheDocument();
    });
    it('Check on change search',()=>{
        const searchTarget='Redux';
        const searchWord='React';
        const handleInput=vi.fn();
        render(<Search searchWord={searchWord} handleInput={handleInput} />);
        fireEvent.change(screen.getByDisplayValue(searchWord),{target:{value:searchTarget}});
        expect(handleInput).toHaveBeenCalledTimes(1);
    });
});
