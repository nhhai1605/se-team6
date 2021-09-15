import { Link } from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState, Component} from 'react';
import styles from './BookGrid.module.css';

import BookItem from './BookItem';


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books : [],
      searchString: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() 
  {
    axios.get("http://localhost:8080/api/books/all")
      .then(res => {
        const books = res.data;
        this.setState({books : books});
      })
  }
  
  onSubmit(e) 
  {
    e.preventDefault();
    axios.get("http://localhost:8080/api/books/search", {params : {searchString : this.state.searchString}})
      .then(res => {
        const books = res.data;
        this.setState({books : books});
    })
  }

  render() 
  {
    const books = this.state.books;
    return (
      <div>
        <div className={styles.searchDiv}>
        <form onSubmit={this.onSubmit} class="form-inline">
        <input
            type="text"
            className="form-control m-3"
            style={{width:500}}
            id="header-search"
            placeholder="Search"
            name="searchString" 
            value={this.state.searchString}
            onChange={this.onChange}
        />
        <button className="btn btn-primary" type="submit">Search</button>
        </form>
        </div>
        <div className={styles.p__grid}>
            {
              books.map(book => (
                  <BookItem key={book.id} book={book}/>
              ))
            }
        </div>
      </div>
    )
  }
}
export default Homepage;