import "./storyPreview.styles.scss"
import ImageCurve from "../../../assets/images/heroCurve.svg"

const StoryPreview = () => {
    return(
        <div id="storyPreviewComponent">
            <div id="imageCurve" src={ImageCurve} alt="">
                <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 2560 168.6227" enable-background="new 0 0 2560 168.6227">
                    <g>
                    <path d="M2560,0c0,0-219.6543,165.951-730.788,124.0771c-383.3156-31.4028-827.2138-96.9514-1244.7139-96.9514
                    c-212.5106,0-439,3.5-584.4982,1.5844l0,139.9126h2560V0z"></path>
                    </g>
                </svg>
            </div>
            <div id="storyText">
                <h3>Our Story</h3>
                <p className="p2">
                    At the end of 2021, Eric was the developer, Faith was the wordsmith, and what was supposed to be just another project turned into 
                    the beginning of our greatest one yet. What began with work messages and late-night brainstorming has now led us here, to the joy 
                    of preparing to share our vows.
                </p>
                <p className="p2">
                    We like to joke about who caught the love bug first (the debate is still very much alive), but it didn’t take long for work messages 
                    to turn into real conversations. Once the website wrapped up, all it took was a celebratory trip to a bookstore and some unforgettable 
                    Thai food on our very first date to realize: yes, this was something worth building.
                </p>
                <p className="p2">
                    Over the last four years, we’ve spent time getting to know each other deeply and cheering on each other’s growth -A task we are eager 
                    to continue in our new chapter as husband and wife.
                </p>
                <p className="p2">
                    Our “proposal” wasn’t a scripted moment with rose petals or hidden photographers. Instead, it was an honest, heart-to-heart conversation 
                    where we finally said out loud what we had both quietly known for a while —that we were choosing each other for life.
                </p>
                <p className="p2">
                    Our story hasn’t been perfect, but it has been real. And one of our greatest strengths has always been this: no matter what, we find our way back to each other. 
                    Now, as we prepare to say “I do,” we’re excited to keep building a marriage anchored in Christ, our unbreakable threefold cord.
                </p>
            </div>
            <div id="imageCurve2" src={ImageCurve} alt="">
                <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 2560 168.6227" enable-background="new 0 0 2560 168.6227">
                    <g>
                    <path d="M2560,0c0,0-219.6543,165.951-730.788,124.0771c-383.3156-31.4028-827.2138-96.9514-1244.7139-96.9514
                    c-212.5106,0-439,3.5-584.4982,1.5844l0,139.9126h2560V0z"></path>
                    </g>
                </svg>
            </div>
        </div>
    )
};
export default StoryPreview;