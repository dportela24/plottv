import { Component, Fragment } from "react";
import Header from '../../Components/Header/Header'
import Plot from "../../Components/Plot/Plot";
import SeriesOverview from '../../Components/SeriesOverview/SeriesOverview';
import * as utils from '../../utils'
import axios from 'axios';

const IMDB_TITLE_URL = "https://www.imdb.com/title/";

class PlotPage extends Component {
    state = {
        seasonsData : [],
        showPlot: false,
        maxRating: 10,
    }

    componentDidMount = () =>  {
        this.makeRequest("how i met your mother");
    }

    makeRequest = (query) => {
        axios.get('http://localhost:8080/tvseries', { params : {
            q : query
        }})
        .then( response => {
            this.processResponse(response.data);
        })
        .catch (error => {
            alert(error);
        })
    } 

    processResponse = (response) => {
        const seasons = response.seasons;
        var current_episode = 1;
        var newSeasonsData = [];
        var newMaxRating = 0;
        var newMinRating = 10;

        for (var i=0; i<seasons.length; i++){
            var plot_points = [];
            const season = seasons[i];
            const episodes = season.episodes;

            for (var j=0; j<episodes.length; j++) {
                const episode = episodes[j];
                const rating = episode.ratingValue;

                plot_points.push({
                    "x": current_episode,
                    "y": rating,
                    "number": episode.number,
                    "title": episode.name,
                    "imdbId": episode.imdbID,
                    "ratingValue": episode.ratingValue,
                    "ratingCount": episode.ratingCount,
                    "airdate": episode.airdate
                });

                current_episode++;
                if (rating > newMaxRating) {
                    newMaxRating = rating;
                }
                if (rating < newMinRating) {
                    newMinRating = rating;
                }
            }

            newSeasonsData.push({
                "id": season.number,
                "data": plot_points
            })
        }

        this.setState({
            name: response.name,
            seasonsData : newSeasonsData,
            showPlot: true,
            maxRating: newMaxRating,
            minRating: newMinRating,
            poster: response.poster,
            runtime: response.runtime,
            ratingCount: response.ratingCount,
            ratingValue: response.ratingValue
        })

        console.log(this.state);
    }

    onClickPoint = (node) => {
        const imdbId = node.data.imdbId;
        window.open(IMDB_TITLE_URL + imdbId, "_blank");
    }


    render() {
        return (
            <Fragment>
                <Header onSubmit={this.makeRequest}/>
                <Plot 
                    name={this.state.name}
                    seasonsData={this.state.seasonsData}
                    minRating={this.state.minRating}
                    maxRating={this.state.maxRating}
                    onClick={this.onClickPoint}/>
                <SeriesOverview
                    poster={this.state.poster}
                    name={this.state.name}
                    runtime={this.state.runtime}
                    rating={`${this.state.ratingValue}/10 from ${utils.numberWithCommas(this.state.ratingCount)}`}/>

            </Fragment>
        )
    }
}

export default PlotPage;