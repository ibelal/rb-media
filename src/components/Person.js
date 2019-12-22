import React, { Component } from 'react'
import ReactDom from 'react-dom'
import ReactPaginate from 'react-paginate'
import Header from './Header'
import {getData} from './getData';
import List from './listItems';
import Footer from './Footer';

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      offset: 1,
      search: "person",
      isSearch: 0,
      loding: false
    }
  }
  componentDidMount() {
    this.setState({ loading: true })
    this.getMovie("person", "popular", 1)
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
        persons:data.results,
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
      this.getMovie("person","popular", offset, this.state.isSearch, this.state.keyword)
    })   
  }

  render() {
    let renderperson, loading;
    const persons = this.state.persons;

    if (persons) {
      renderperson = <List.PersonList items={persons} type="person" />
    }

    loading = <div className="fa-3x text-center">
            <i className="fas fa-circle-notch fa-spin"></i>
        </div>

    return (
      <div>
        <Header active="people" />
        <div className="container body-content py-4">
          <h4>Popular People</h4>
          <div className="grid-container mt-3">
            {this.state.loading ? loading : renderperson}
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
export default Person