
import {normalize} from 'normalizr'
import api from "../api";
import * as types from './../types';
import {bookSchema} from '../schemas';

const booksFetched = (data)=>({
    type: types.BOOKS_FETCHED,
    data
})

const bookCreated = (data)=>({
    type: types.BOOKS_CREATED,
    data
})

export const fetchBooks=()=>(dispatch)=>
    api.books.fetchAll().then(books=> dispatch(booksFetched( normalize(books,[bookSchema]) )))

export const createBook = (data) => ( dispatch ) =>
    api.books.create(data).then(book=> dispatch(bookCreated( normalize( book, bookSchema) )))