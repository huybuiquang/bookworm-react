import {createSelector} from 'reselect'
import * as types from '../types';

export default (state = {}, action={}) => {
    switch (action.type) {
        case types.BOOKS_FETCHED:
        case types.BOOKS_CREATED:
            return {...state, ...action.data.entities.books};
        default:
            return state;
    }
};

// SELECTORS

export const booksSelector = state => state.books;

export const allBooksSelector = createSelector(
    booksSelector,
    booksHask=> Object.values(booksHask)
);