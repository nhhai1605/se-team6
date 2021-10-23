import axios from "axios";
import React, {Component} from 'react';
import styles from '../styles/BookGrid.module.css';

import BookItem from './BookItem';


class Popular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books : [],
      errors: {},
    };
  }


  componentDidMount() 
  {
    axios.get(`${process.env.REACT_APP_BOOKS_ENDPOINT}/api/books/getPopularBooks`)
      .then(res => {
        const books = res.data;
        this.setState({books : books});
      }).catch(err=>console.log(err))
  }

  render() 
  {
    const books = this.state.books;
    return (
        <div>
        <h1 className="display-4 text-center">Popular Books</h1>
        <a className="btn btn-secondary" style={{marginLeft:20}} href="/Homepage">Homepage</a>
        <div className={styles.bookGrid}>
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
export default Popular;