import { motionDefaultProps } from "@nivo/core";
import classes from "./SeriesOverview.module.css";



const SeriesOverview = (props) => {
    return (
        <div className={classes.SeriesOverviewContainer}>
            <img className={classes.Poster} src={props.poster}></img>
            <div className={classes.SeriesOverview}>
                <div className={classes.Title}>
                    <h1>{props.name}</h1>
                    <span className={classes.Runtime}>{props.runtime}</span>
                </div>

                <span className={classes.Rating}>
                    {props.rating}
                </span>
            </div>
        </div>
    );
}

export default SeriesOverview;