import moment from "moment";

export const dateHandler=(date)=>{
    let now=moment();
    let momentDate=moment(date);
    let time=momentDate.fromNow(true);
    let dateByHour=momentDate.format("HH:mm")
    const getDay=()=>{
        let days=time.split(" ")[0];
        if(Number(days)<8)
        {
            return now.subtract(Number(days),"days").format("dddd"); //FUNCTION OF MOMENT SUBTRACT THE DAY FROM THE DAY RIGHT NOW
        }
        else{
            return momentDate.format("DD/MM/YYYY")
        }
    }
    if(time==="a few seconds")
    {
        return "Now";
    }
    if(time.search("minute")!==-1)
    {
        let mins=time.split(" ")[0];
        if(mins==="a")
        {
            return "1 min";
        }
        else{
            return `${mins} mins`
        }
    }
    if(time.search("hour")!==-1)
    {
        return dateByHour;
    }
    if(time==="a day")
    {
        return "Yesterday";
    }
    if(time.search("days")!==-1)
    {
        return getDay();
    }
    return time;
};