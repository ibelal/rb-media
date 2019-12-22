import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
    active = (menu) => {
        if (this.props.active === menu) {
            return "active";
        }
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <Link exact="true" to="/" className="navbar-brand logo-icon" >
                            <i className="fas fa-film"></i> &nbsp; R&B Media
                        </Link>
                        <form className="from-inline my-2 my-lg-0 home-searchbar">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <select className="custom-select" id="inputGroupSelect01">
                                        <option defaultValue value="movie">Movie</option>
                                        <option value="tv">TV</option>
                                        <option value="people">People</option>
                                    </select>
                                </div>
                                <input className="form-control" type="search" placeholder="Search movies, tv series, people" aria-describedby="search-button" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" id="search-button"><i className="fas fa-search"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </nav>

                <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-menu-container">
                    <div className="container">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav mr-auto">
                                <li className={"nav-item " + this.active('home')}>
                                    <Link exact="true" className="nav-link" to="/"><i className="fas fa-home"></i> Home </Link>
                                </li>
                                <li className={"nav-item " + this.active('movie')}>
                                    <Link exact="true" className="nav-link" to="/movie/"><i className="fas fa-video"></i> Movies</Link>
                                </li>
                                <li className={"nav-item " + this.active('tv')}>
                                    <Link exact="true" className="nav-link" to="/tv/"><i className="fas fa-tv"></i> TV</Link>
                                </li>
                                <li className={"nav-item " + this.active('people')}>
                                    <Link exact="true" className="nav-link" to="/person/"><i className="fas fa-user"></i> People</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
export default Header