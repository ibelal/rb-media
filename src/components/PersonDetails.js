import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Header from './Header'
import Footer from './Footer'
import { getDetails } from './getData'
import noimage from './no-image.png'

class PersonDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            credits: "",
            loading: false,
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        this.getDetails()
    }

    getDetails = () => {
        const id = this.props.match.params.id;
        const type = this.props.match.path.split('/')[1];

        const response = getDetails(type, id)
        const credits = getDetails(type, id + "/combined_credits")

        response.then(data => this.setState({
            data: data,
            loading: false
        }))
        credits.then(data => this.setState({ credits: data }))
    }

    render() {
        let loading, renderDetails, renderCredits, img;
        const data = this.state.data;
        const credits = this.state.credits;
        const img_path = "https://image.tmdb.org/t/p/w300_and_h450_face";

        if (credits) {
            renderCredits = <div className="grid">
                {credits.cast.slice(0, 54).map((c, i) => {
                    const img_cast = "https://image.tmdb.org/t/p/w138_and_h175_face"
                    if (c.poster_path) {
                        img = <img className="responsive-img" src={img_cast + c.poster_path} alt={c.title ? c.title : c.name} />
                    } else {
                        img = <img className="no-image" src={noimage} alt={c.title ? c.title : c.name} />
                    }
                    return (
                        <div key={i} className="card" >
                            <Link to={"/" + c.media_type + "/" + c.id}  >{img} </Link>
                            <div className="card-body">
                                <h6><Link to={"/" + c.media_type + "/" + c.id} className="text-decoration-none text-dark" >{c.title ? c.title : c.name}</Link></h6>
                                <p>{c.character}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        }

        renderDetails = <div className="person-details">
            <div className="container">
                <div className="card-headers">
                    <div className="card-poster">
                        {data.profile_path ? <img className="img-fluid" src={img_path + data.profile_path} alt={data.original_title} /> : <div className="no_image_cast"><i className="material-icons left">burst_mode</i>  </div>}
                    </div>
                    <div className="card-content">
                        <h4>{(data.title) ? data.title : data.name}</h4>
                        <p className="release"> <i className="fas fa-birthday-cake"></i> {moment((data.birthday) ? data.birthday : "").format('MMM DD, YYYY')} </p>

                        <div className="card-overview mt-3">
                            <h5>Occupation</h5>
                            <p className="overview" >{data.known_for_department ? data.known_for_department : "Not Available"}</p>
                        </div>
                        <div className="card-overview mt-3">
                            <h5>Biography</h5>
                            <p className="overview" >{data.biography ? data.biography : "Not Available"}</p>
                        </div>
                    </div>
                </div>
                <hr className="mb-0" />
            </div>
            <div className="container cast-details">
                <h5>Known For</h5>
                <div className="grid-container mt-3">
                    {renderCredits}
                </div>
            </div>
        </div>

        loading = <div className="fa-3x text-center">
            <i className="fas fa-circle-notch fa-spin"></i>
        </div>

        return (
            <div>
                <Header active="people" />
                <div className="jumbotron jumbotron-fluid py-0 mt-0 mb-0">
                    <div>{this.state.loading ? loading : renderDetails}</div>
                </div>
                <Footer />
            </div>
        )
    }
}
export default PersonDetails