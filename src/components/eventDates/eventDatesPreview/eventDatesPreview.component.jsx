import "./eventDatesPreview.styles.scss";

import EventDateImg from "../../../assets/images/8fb40972faa9001657e77d29a417c808-large.jpg";

const EventDatesPreview = ({dates}) => {
    return(
        <div id="eventDatesPreviewComponent">
            <div id="dates">
                {/* <h2>Save Our Dates</h2> */}
                <div id="datesData">
                    {dates.map((date) => (
                        <div className="eventDetails">
                            <h3>{date.name}</h3>
                            <p className="p1">{date.date}</p>
                            <p className="details">{date.details}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div class="svg-mask-container">
                <svg version="1.1" id="p.svg" xmlns="http://www.w3.org/2000/svg"
                    x="0px" y="0px" viewBox="0 0 980.2914 884.5557">
                    <defs>
                    <mask id="mask">
                        <path fill="#ffffff" d="M528.4855,192.3897C454.034,67.0629,292.3375,24.9363,166.115,98.3971
                        C38.8029,172.4928-3.0277,336.7236,71.1027,463.9358L286.945,834.3341c28.1165,48.2495,90.0233,64.5706,138.2729,36.4541
                        l368.4115-214.6845c127.2958-74.1792,172.7084-240.1479,98.7059-367.5465C818.4728,161.3996,655.4992,118.375,528.4855,192.3897z"/>
                    </mask>
                    </defs>

                    <image 
                    mask="url(#mask)" 
                    href={EventDateImg}
                    x="10" y="0"
                    width="981" 
                    height="885"
                    preserveAspectRatio="xMidYMid slice"
                    transform="translate(0, 0) scale(1)"
                    />
                </svg>
            </div>
        </div>
    )
};
export default EventDatesPreview;