import CountDownPreview from "./countdownPreview/countdownPreview.component";


const demoForce = { days: 70, hours: 16, minutes: 0, seconds: 12 };

const CountDown = () => {
    return(
        <CountDownPreview force={demoForce}></CountDownPreview>
    )
};
export default CountDown;