import React, { Component } from 'react'
import ReactDom from 'react-dom'
import ReactPaginate from 'react-paginate'
import Header from './Header'
import {getData} from './getData';
import Movie from './listItems';
import Footer from './Footer';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      offset: 1,
      search: "movie",
      isSearch: 0,
      loding: false
    }
  }
  componentDidMount() {
    this.setState({ loading: true })
    this.getMovie("movie", "popular", 1)
  }
  componentDidUpdate = () => { ReactDom.findDOMNode(this).scrollIntoView({ block: 'start',  behavior: 'smooth' }); }

  getMovie = (get, type, offset, isSearch, keyword) => {
    let search;
    if(isSearch === 1){
      search = "search"
    }
    const response = getData(get, type, offset, search, keyword)

    response.then(data => {
      this.setState({
        movies:data.results,
        pageCount: data.total_pages > 1000 ? 1000 : data.total_pages,
        loading:false
      })
    })
  }

  handlePageClick = (data) => {
    const selected = data.selected;
    let offset = Math.ceil(selected + 1);

    if(offset > 1000){
      offset = 1000
    }

    this.setState({offset:offset}, () => {
      this.getMovie("movie","popular", offset, this.state.isSearch, this.state.keyword)
    })   
  }

  render() {
    let renderMovie, loading;
    const movies = this.state.movies;

    if (movies) {
      renderMovie = <Movie.ListItemsData items={movies} type="movie" />
    }

    loading = <div className="fa-3x text-center">
            <i className="fas fa-circle-notch fa-spin"></i>
        </div>

    return (
      <div>
        <Header active="movie" />
        <div className="container body-content py-4">
          <h4>Popular Movies</h4>
          <div className="grid-container mt-3">
            {this.state.loading ? loading : renderMovie}
            <div className="mt-3">
              <nav aria-label="navigation">
                {this.state.loading ? "" : <ReactPaginate
                  previousLabel={<span aria-hidden="true">&laquo;</span>}
                  nextLabel={<span aria-hidden="true">&raquo;</span>}
                  breakLabel={<span>...</span>}
                  pageClassName={"page-item"}
                  breakClassName={"break-me"}
                  breakLinkClassName={"page-link"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={3}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination justify-content-center"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"} />}
              </nav>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Movies