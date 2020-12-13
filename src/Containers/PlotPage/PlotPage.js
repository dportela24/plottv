import { Component, Fragment } from "react";
import Header from '../../Components/Header/Header'
import Plot from "../../Components/Plot/Plot";
import classes from './PlotPage.module.css';
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
                const title = episode.name;
                const number = episode.number;

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
                } else if (rating < newMinRating) {
                    newMinRating = rating;
                }
            }

            newSeasonsData.push({
                "id": season.number,
                "data": plot_points
            })
        }

        this.setState({
            seasonsData : newSeasonsData,
            showPlot: true,
            maxRating: newMaxRating,
            minRating: newMinRating
        })

        console.log(newSeasonsData);
        console.log(newMaxRating)
    }

    onClickPoint = (node) => {
        const imdbId = node.data.imdbId;
        window.open(IMDB_TITLE_URL + imdbId, "_blank");
    }


    render() {
        var plot = null;

        if (this.state.showPlot) {
            plot =  (
                <div className={classes.Plot}>
                    <Plot 
                        seasonsData={this.state.seasonsData}
                        minRating={this.state.minRating}
                        maxRating={this.state.maxRating}
                        onClick={this.onClickPoint}/>
                </div>
            )
        }

        return (
            <Fragment>
                <Header onSubmit={this.makeRequest}/>
                {plot}
            </Fragment>
        )
    }
}

export default PlotPage;