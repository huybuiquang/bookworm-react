import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Dropdown } from 'semantic-ui-react';

class SearchBookForm extends Component {
    state={
        query:'',
        loading: false,
        options:[],
        books:{}
    }

    onSearchChange = (e,data)=>{
        clearTimeout(this.timer);
        this.setState({
            query:data.searchQuery
        });
        this.timer = setTimeout(this.fetchOptions, 1000);
    }

    onChange = (e, data) => {
        this.setState({ query: data.value });
        this.props.onBookSelect(this.state.books[data.value]);
    }

    fetchOptions = () => {
        if(!this.state.query) return;
        this.setState({loading:true});
        axios.get(`/api/books/search?q=${this.state.query}`)
            .then(res=> res.data.books)
            .then(books=>{
                const options = [];
                const booksHash = {};
                books.forEach(book=>{
                    booksHash[book.goodreadsId] = book;
                    options.push({
                        key: book.goodreadsId,
                        value: book.goodreadsId,
                        text: book.title
                    });
                });
                this.setState({
                    loading: false,
                    options,
                    books: booksHash
                });
            });
    }
    
    render() {
        const {loading,query,options} = this.state;
        return (
            <Form>
                <Dropdown search fluid placeholder="Search for a book by title"
                    onSearchChange = {this.onSearchChange}
                    options={options}
                    // searchQuery={query}
                    value={query}
                    onChange={this.onChange}
                    loading={loading}
                />
            </Form>
        );
    }
}

SearchBookForm.propTypes = {
    onBookSelect: PropTypes.func.isRequired,
};
export default SearchBookForm;