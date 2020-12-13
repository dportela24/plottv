import { Component, Fragment } from "react";
import Header from '../../Components/Header/Header'
import Plot from "../../Components/Plot/Plot";
import classes from './PlotPage.module.css';
import axios from 'axios';


class PlotPage extends Component {
    state = {
        seasonsData : [],
        showPlot: false,
    }

    componentDidMount = () =>  {
        axios.get('http://localhost:8080/tvseries?q=tt10048342')
        .then( response => {
            this.processResponse(response.data);
        })
        // .catch (error => {
        //     alert(error);
        // })
    }

    processResponse = (response) => {
        const seasons = response.seasons;
        var current_episode = 1;
        var newSeasonsData = [];

        for (var i=0; i<seasons.length; i++){
            var plot_points = [];
            const season = seasons[i];
            const episodes = season.episodes;

            for (var j=0; j<episodes.length; j++) {
                plot_points.push({
                    "x": current_episode,
                    "y": episodes[j].ratingValue
                });

                current_episode++;
            }

            newSeasonsData.push({
                "id": season.number,
                "data": plot_points
            })
        }

        this.setState({
            seasonsData : newSeasonsData,
            showPlot: true
        })

        console.log(newSeasonsData);
    }


    render() {
        var plot = null;

        if (this.state.showPlot) {
            plot =  (
                <div className={classes.Plot}>
                    <Plot seasonsData={this.state.seasonsData}/>
                </div>
            )
        }

        return (
            <Fragment>
                <Header/>
                {plot}
            </Fragment>
        )
    }
}

export default PlotPage;