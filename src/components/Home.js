import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import List from './listItems';
import Footer from './Footer';
import {getData} from './getData';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nowPlaying: [],
            popularMovie: [],
            popularTV: [],
            popularPerson: [],
            loading: false,
        }        
    }
    componentDidMount() {
        this.setState({loading: true});
        
        getData("movie", "now_playing").then(data => {
            this.setState({
                nowPlaying: data.results,
                loading: false
            })
        })
        
        getData("movie", "popular").then(data => {
            this.setState({
                popularMovie: data.results,
                loading: false
            })
        })
        
        getData("tv", "popular").then(data => {
            this.setState({
                popularTV: data.results,
                loading: false
            })
        })
        
        getData("person", "popular").then(data => {
            this.setState({
                popularPerson: data.results,
                loading: false
            })
        })
    }
    render() {
        let renderNowPlayingMovie, renderPopularMovie, renderPopularTV, renderPerson, loading;
        const nowPlaying = this.state.nowPlaying;
        const popularMovie = this.state.popularMovie;
        const popularTV = this.state.popularTV;
        const popularPerson = this.state.popularPerson;

        if (nowPlaying) {
            renderNowPlayingMovie = <List.ListItems items={nowPlaying} type="movie" />
        }
        if (popularMovie) {
            renderPopularMovie = <List.ListItems items={popularMovie} type="movie" /> 
        }
        if (popularTV) {
            renderPopularTV = <List.ListItems items={popularTV} type="tv" />
        }
        if (popularTV) {
            renderPerson = <List.Person items={popularPerson} type="person" />
        }

        loading = <div className="fa-3x text-center">
            <i className="fas fa-circle-notch fa-spin"></i>
        </div>

        return (
            <div>
                <Header active="home" />
                <div className="container body-content py-4">
                    <h4>Now Playing</h4>
                    <div className="grid-container mt-3">
                        { this.state.loading ? loading : renderNowPlayingMovie}
                    </div>
                    <hr />
                    <h4>Popular Movies <Link to="/movie/"><small>View All</small></Link> </h4>
                    <div className="grid-container mt-3">
                        { this.state.loading ? loading : renderPopularMovie}
                    </div>
                    <hr />
                    <h4>Popular TV Shows <Link to="/tv/"><small>View All</small></Link></h4>
                    <div className="grid-container mt-3 mb-2">
                        { this.state.loading ? loading : renderPopularTV}
                    </div>
                    <hr />
                    <h4>Popular People <Link to="/person/"><small>View All</small></Link></h4>
                    <div className="grid-container mt-3 mb-2">
                        { this.state.loading ? loading : renderPerson}
                    </div>
                </div>
                <Footer />
            </div>

        )
    }
}
export default Home