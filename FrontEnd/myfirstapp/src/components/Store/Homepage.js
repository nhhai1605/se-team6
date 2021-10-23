import axios from "axios";
import React, {Component} from 'react';
import styles from '../styles/BookGrid.module.css';

import BookItem from './BookItem';


class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books : [],
      searchString: '',
      searchType: 'Title',
      searchCategory : '',
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
    axios.get(`${process.env.REACT_APP_BOOKS_ENDPOINT}/api/books/all`)
      .then(res => {
        const books = res.data;
        this.setState({books : books});
      }).catch(err=>console.log(err))
  }
  
  onSubmit(e) 
  {
    e.preventDefault();
    axios.get(`${process.env.REACT_APP_BOOKS_ENDPOINT}/api/books/search`, {params : {searchString : this.state.searchString, searchType: this.state.searchType, searchCategory: this.state.searchCategory}})
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
        <div className={styles.searchDiv}>
        <a className="btn btn-secondary" style={{marginRight:20}} href="/popular">Popular Books</a>
        <form onSubmit={this.onSubmit} className="form-inline">
        <select className="btn btn-outline-secondary dropdown-toggle"  name="searchType" title="Filter Search" onChange={this.onChange}>
          <option value="Title">Title</option>
            <option value="Author">Author</option>
            <option value="ID">ID</option>
          <option value="ISBN">ISBN</option>
        </select>
        
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
            <button className="btn btn-primary" type="submit" title="Filter Search" style={ {marginRight: 20}} >
            <i className="fas fa-search"></i>
            </button>
            <select className="btn btn-outline-secondary dropdown-toggle" defaultValue={'All'} name="searchCategory" title="Filter Category" onChange={this.onChange}>
          <option value="">All</option>
          <option value="Action and Adventure">Action and Adventure</option>
          <option value="Horror">Horror</option>
          <option value="Detective and Mystery">Detective and Mystery</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Comic Book or Graphic Novel">Comic Book or Graphic Novel</option>
          <option value="Historical Fiction">Historical Fiction</option>
          <option value="Science Fiction">Science Fiction</option>
        </select>
        </form>
        </div>
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
export default Homepage;