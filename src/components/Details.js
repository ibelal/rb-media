import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Header from './Header'
import Footer from './Footer'
import { getDetails, getCredits } from './getData'
import noimage from './no-image.png'

class Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      credits: "",
      type: "",
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
    this.setState({ type: type })

    const response = getDetails(type, id)
    const credits = getCredits(type, id)

    response.then(data => this.setState({
      data: data,
      loading: false
    }))
    credits.then(data => this.setState({ credits: data }))
  }

  render() {
    let loading, renderDetails, VoteBar, renderCredits, img, renderGenres, backdropImg;
    const data = this.state.data;
    const credits = this.state.credits;
    const img_path = "https://image.tmdb.org/t/p/w300_and_h450_face";
    const backdropPath = "https://image.tmdb.org/t/p/w1000_and_h563_face";

    if (data) {
      backdropImg = {
        backgroundImage: 'url(' + backdropPath + data.backdrop_path + ' )',
        backgroundPositionX: '0',
        backgroundPositionY: '0%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }
    }

    if (data && data.vote_average) {
      const rating = data.vote_average * 10;
      VoteBar = <div className="progress" style={{ height: ".2rem" }}>
        <div className="progress-bar" role="progressbar" style={{ width: rating + "%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    }

    let hrs, mins, runtime;
    if (data.runtime) {
      hrs = Math.floor(data.runtime / 60);
      mins = data.runtime % 60
    }
    if (hrs && mins) {
      runtime = " | " + hrs + " hr " + mins + " mins";
    }

    if (data.genres) {
      renderGenres = <div className="overview">
        {data.genres.map((g, i) => {
          return (
            <span key={i} className="badge badge-light">{g.name}</span>
          );
        })
        }
      </div>
    }

    if (credits) {
      renderCredits = <div className="grid">
        {credits.cast.slice(0, 20).map((c, i) => {
          const img_cast = "https://image.tmdb.org/t/p/w138_and_h175_face"
          if (c.profile_path) {
            img = <img className="responsive-img" src={img_cast + c.profile_path} alt={c.name} />
          } else {
            img = <img className="no-image" src={noimage} alt={c.name} />
          }
          return (
            <div className="card" key={i} >
            <Link to={"/person/" + c.id}  >{img}</Link>
              <div className="card-body">
                <h6><Link to={"/person/" + c.id} className="text-decoration-none text-dark" >{c.name}</Link></h6>
                <p>{c.character}</p>
              </div>
            </div>
          )
        })}
      </div>
    }

    renderDetails = <div className="details">
      <div className="backdrops" style={backdropImg} >
        <div className="custom_bg">
          <div className="container">
            <div className="card-headers">
              <div className="card-poster">
                {data.poster_path ? <img className="img-fluid" src={img_path + data.poster_path} alt={data.original_title} /> : <img src={noimage} alt={data.title ? data.title : data.name} />}
              </div>
              <div className="card-content">
                <h4>{(data.title) ? data.title : data.name}</h4>
                <p className="release">{moment((data.release_date) ? data.release_date : data.first_air_date).format('MMM DD, YYYY')} {runtime ? runtime : ''} </p>
                <div>{VoteBar}</div>
                <div className="card-overview mt-3">
                  <h5>Overview</h5>
                  <p className="overview" >{data.overview ? data.overview : "Not Available"}</p>
                </div>
                <div className="card-overview mt-3 mb-3">
                  <h5>Genre</h5>
                  {renderGenres}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="container cast-details">
        <h5>Top Billed Cast</h5>
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
        <Header active={this.state.type} />
        <div className="jumbotron jumbotron-fluid py-0 mt-0 mb-0">
          <div>{this.state.loading ? loading : renderDetails}</div>
        </div>
        <Footer />
      </div>
    )
  }
}
export default Details