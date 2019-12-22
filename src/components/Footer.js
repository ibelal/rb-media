import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends Component {
    render() {
        return (
            <footer className="text-muted bg-dark">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container footer">
                        <Link to="/" className="navbar-brand" >
                            <i className="fas fa-film"></i> &nbsp; R&B Media
                        </Link>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/movie/">Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tv/">Tv</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/person/">People</Link>
                            </li>
                        </ul>
                        <span className="navbar-text"><small>
                            Data porvided by <a href="https://www.themoviedb.org/">TMDb.</a> </small>
                        </span>
                    </div>
                </nav>
            </footer>
        )
    }
}
export default Footer