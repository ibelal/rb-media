import React from 'react';
import { Link } from 'react-router-dom'
import noimage from './no-image.png'

const ListItems = (props) => {
    let img
    const img_path = "https://image.tmdb.org/t/p/w200";
    const items = props.items
    const type = props.type
    return (
        <div className="grid">
            {items.slice(0, 6).map((movie) => {
                if (movie.poster_path) {
                    img = <img className="img-responsive" src={img_path + movie.poster_path} alt={movie.title ? movie.title : movie.name} />
                } else {
                    img = <img className="no-image" src={noimage} alt={movie.title ? movie.title : movie.name} />
                }
                return (
                    <div className="card" key={movie.id} >
                        <Link exact="true" to={"/" + type + "/" + movie.id + "/"}> {img} </Link>
                        <div className="card-body">
                            <h6> <Link exact="true" to={"/" + type + "/" + movie.id + "/"} className="text-decoration-none text-dark">{movie.title ? movie.title : movie.name} </Link></h6>
                        </div>
                    </div>)
            })}
        </div>
    );
}

const ListItemsData = (props) => {
    let img;
    const img_path = "https://image.tmdb.org/t/p/w200";
    const items = props.items
    const type = props.type

    const truncate = (str) => {
        var len = 100;
        if (str) {
            if (str.length >= 100) {
                return str.substring(0, len) + "...";
            }
            return str;
        }
    }

    return (
        <div className="grid-inside">
            {items.map((movie) => {
                if (movie.poster_path) {
                    img = <img className="img-responsive" src={img_path + movie.poster_path} alt={movie.title ? movie.title : movie.name} />
                } else {
                    img = <img className="no-image" src={noimage} alt={movie.title ? movie.title : movie.name} />
                }
                return (
                    <div className="card" key={movie.id} >
                        <Link exact="true" to={"/" + type + "/" + movie.id + "/"}> {img} </Link>
                        <div className="card-body">
                            <h6> <Link exact="true" to={"/" + type + "/" + movie.id + "/"} className="text-decoration-none text-dark">{movie.title ? movie.title : movie.name} </Link></h6>
                            <p className="card-text">{truncate(movie.overview)}</p>
                        </div>
                    </div>)
            })}
        </div>
    );
}

const Person = (props) => {
    let img
    const img_path = "https://image.tmdb.org/t/p/w200";
    const persons = props.items
    const type = props.type
    return (
        <div className="grid">
            {persons.slice(0, 6).map((person) => {
                if (person.profile_path) {
                    img = <img className="img-responsive" src={img_path + person.profile_path} alt={person.name} />
                } else {
                    img = <img className="no-image" src={noimage} alt={person.name} />
                }
                return (
                    <div className="card" key={person.id} >
                        <Link exact="true" to={"/" + type + "/" + person.id + "/"}> {img} </Link>
                        <div className="card-body">
                            <h6> <Link exact="true" to={"/" + type + "/" + person.id + "/"} className="text-decoration-none text-dark">{person.name} </Link></h6>
                        </div>
                    </div>)
            })}
        </div>
    );
}

const PersonList = (props) => {
    let img
    const img_path = "https://image.tmdb.org/t/p/w200";
    const persons = props.items
    const type = props.type
    return (
        <div className="grid-inside">
            {persons.slice(0, 20).map((person) => {
                if (person.profile_path) {
                    img = <img className="img-responsive" src={img_path + person.profile_path} alt={person.name} />
                } else {
                    img = <img className="no-image-person" src={noimage} alt={person.name} />
                }
                return (
                    <div className="card" key={person.id} >
                        <Link exact="true" to={"/" + type + "/" + person.id + "/"}> {img} </Link>
                        <div className="card-body">
                            <h6> <Link exact="true" to={"/" + type + "/" + person.id + "/"} className="text-decoration-none text-dark">{person.name} </Link></h6>
                        </div>
                    </div>)
            })}
        </div>
    );
}

export default { ListItems, ListItemsData, Person, PersonList }