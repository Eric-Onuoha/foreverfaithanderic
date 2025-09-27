import EventDatesPreview from "./eventDatesPreview/eventDatesPreview.component"

const EventDates = () => {
    const dates = [
        {name:"Traditional Wedding", date:"Tuesday December 9th, 2025 - Minna, Niger State", details: "Come and be a part of this unique celebration of the marrying of multiple cultures as we celebrate our wedding and acknowledge our heritage and families"},
        {name:"Church Solemnization", date:"Saturday December 13th, 2025 - Abuja", details:"Join us in our wedding solemnization which will hold at The Lighthouse Church located at Utako, Abuja from 9:00am" }
    ]
    return(
        <EventDatesPreview dates = {dates}></EventDatesPreview>
    )
};
export default EventDates;