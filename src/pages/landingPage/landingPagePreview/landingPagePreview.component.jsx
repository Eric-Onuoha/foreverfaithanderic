import { Fragment } from "react/jsx-runtime";
import "./landingPagePreview.styles.scss";

import Hero from "../../../components/hero/hero.component";
import EventDates from "../../../components/eventDates/eventDates.component";
import CountDown from "../../../components/countdown/countdown.component";

const LandingPagePreview = () =>{
    return(
        <Fragment>
            <Hero></Hero>
            {/* <CountDown></CountDown> */}
            <EventDates></EventDates>
        </Fragment>

    )
};
export default LandingPagePreview;