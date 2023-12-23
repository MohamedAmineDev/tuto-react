import { describe, it, expect } from "vitest";
import { App, Search, List, Item, reducer } from "../App";
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
const ACTIONS = {
    IS_LOADING: 'Loading stories',
    IS_LOADED: 'Stories are loaded',
    IS_ERROR: 'An error has occured !',
    IS_DELETEING: 'Deleting a story'
};
describe('Testing the reducer', () => {
    it('Start loading the data', () => {
        const action = { type: ACTIONS.IS_LOADING };
        const state = {};
        const newState = reducer(state, action);
        const expectedState = {
            data: [],
            isLoading: true,
            isError: false
        };
        expect(newState).toStrictEqual(expectedState);
    });
});