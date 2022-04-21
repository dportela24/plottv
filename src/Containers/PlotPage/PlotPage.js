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
        ratingCount: 100
    }

    componentDidMount = () =>  {
        console.log("componenet did mount")
        this.makeRequest("tt6468322");
    }

    makeRequest = (query) => {
        var url = utils.isImdbIdFormat(query) ? utils.generateRequestByIdURL(query) : utils.generateRequestByNameURL(query)
        console.log("making request")
        axios.get(url)
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

                // Discard episodes without rating
                if (episode.ratingCount == null) {
                    continue;
                }

                plot_points.push({
                    "x": current_episode,
                    "y": rating,
                    "number": episode.number,
                    "title": episode.name,
                    "imdbId": episode.imdbId,
                    "ratingValue": episode.ratingValue,
                    "ratingCount": episode.ratingCount,
                    "airdate": this.parseAirdate(episode.airdate)
                });

                current_episode++;
                if (rating > newMaxRating) {
                    newMaxRating = rating;
                }
                if (rating < newMinRating) {
                    newMinRating = rating;
                }
            }

            // If season has episodes
            if (plot_points.length > 0) {
                newSeasonsData.push({
                    "id": season.number,
                    "data": plot_points
                })
            }
        }

        var name = response.originalName != null ? response.originalName : response.name
        var translatedName = response.originalName != null ? response.name : null
        var runtime = this.parseRuntime(response.startYear, response.endYear)

        this.setState({
            name: name,
            translatedName: translatedName,
            seasonsData : newSeasonsData,
            showPlot: newSeasonsData.length > 0,
            maxRating: newMaxRating,
            minRating: newMinRating,
            poster: response.posterURL,
            runtime: runtime,
            ratingCount: response.ratingCount,
            ratingValue: response.ratingValue,
            summary: response.summary
        })

        console.log(this.state);
    }

    parseAirdate = (airdateArray) => {
        var airdate = airdateArray[0]

        for (var i=1; i<airdateArray.length; i++) {
            airdate = airdate + `-${airdateArray[i]}`
        }

        return airdate;
    }

    parseRuntime = (startYear, endYear) => {
        var runtime
        if (endYear == null) {
            runtime = `${startYear}-`
        } else if (startYear != endYear) {
            runtime = `${startYear}-${endYear}`
        } else {
            runtime = startYear
        }

        return runtime
    }

    generateSeriesRatingText = () => {
        const ratingCount = this.state.ratingCount
        const ratingValue = this.state.ratingValue
        var ratingText;

        if (ratingCount) {
            ratingText = `${ratingValue} out of 10 from ${utils.numberWithCommas(ratingCount)} ratings`
        } else {
            ratingText = "No series rating yet"
        }
        return ratingText
    }

    onClickPoint = (node) => {
        const imdbId = node.data.imdbId
        window.open(IMDB_TITLE_URL + imdbId, "_blank");
    }

    renderPlot = () => {
        if (this.state.showPlot) {
            return (
                <Plot 
                    name={this.state.name}
                    seasonsData={this.state.seasonsData}
                    minRating={this.state.minRating}
                    maxRating={this.state.maxRating}
                    onClick={this.onClickPoint}/>
            )
        } else return null
    }

    render() {
        console.log(this.state)
        return (
            <Fragment>
                <Header onSubmit={this.makeRequest}/>
                {this.renderPlot()}
                <SeriesOverview
                    poster={this.state.poster}
                    name={this.state.name}
                    translatedName={this.state.translatedName}
                    runtime={this.state.runtime}
                    rating={this.generateSeriesRatingText(this.state.ratingValue, this.state.ratingCount)}
                    summary={this.state.summary}/>

            </Fragment>
        )
    }
}

export default PlotPage;