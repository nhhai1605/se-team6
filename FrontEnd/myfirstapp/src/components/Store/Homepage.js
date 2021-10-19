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
    axios.get("http://localhost:8081/api/books/all")
      .then(res => {
        const books = res.data;
        this.setState({books : books});
      }).catch(err=>console.log(err))
  }
  
  onSubmit(e) 
  {
    e.preventDefault();
    if(this.state.searchType === "Title")
    {
      axios.get("http://localhost:8081/api/books/search", {params : {searchString : this.state.searchString}})
        .then(res => {
          const books = res.data;
          this.setState({books : books});
      }).catch(err=>console.log(err))
    }
    else if(this.state.searchType === "Author")
    {
      axios.get("http://localhost:8081/api/books/searchByAuthor", {params : {searchString : this.state.searchString}})
      .then(res => {
        const books = res.data;
        this.setState({books : books});
      }).catch(err=>console.log(err))
    }
  }

  render() 
  {
    const books = this.state.books;
    return (
      <div>
        <div className={styles.searchDiv}>
        <form onSubmit={this.onSubmit} className="form-inline">
        <select className="btn btn-outline-secondary dropdown-toggle"  name="searchType" title="Filter Search" onChange={this.onChange}>
          <option value="Title">Title</option>
          <option value="Author">Author</option>
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
          <button className="btn btn-primary"  type="submit"  title="Filter Search" >
            <i className="fas fa-search"></i>
          </button>
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