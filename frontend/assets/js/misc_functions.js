/* HELPER FUNCTIONS */

// const raw_data_stub= {
//     "bpi": {
//             "2013-09-01":128.2597,"2013-09-02":127.3648,"2013-09-03":127.5915,"2013-09-04":120.5738,"2013-09-05":120.5333
//         },
//     "disclaimer":"This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD.",
//     "time":{"updated":"Sep 6, 2013 00:03:00 UTC","updatedISO":"2013-09-06T00:03:00+00:00"}
// };

// Fetch 

// const dates= Object.getOwnPropertyNames(raw_data_stub.bpi);
// const data_stub= {
//     dates,
//     "bpi": dates.map( date=> raw_data_stub.bpi[date])
// };

/**
 * Get ISO date only
 * @param {Date} date
 */
const getIsoDate= (date)=>{
    // Evaluate Month
    const month= date.getMonth()+1;
    let month_string= "";
    if (month < 10){
        month_string= "0" + month.toString();
    }
    else{
        month_string= month_string + month.toString();
    }
    return(date.getFullYear() + "-" + month_string + "-" + date.getDate());
}

/**
 * Compute date 10 days ago
 * @param {Date} date
 */
const get10AgoDate= (date)=>{
    date_10ago=  new Date(date);
    // Go back 10 days
    date_10ago.setDate(date_10ago.getDate() - 10);
    return date_10ago;

}


/**
 * Make plot
 * @param {Element} chart 
 * @param {Date} from_date
 * @param {Date} to_date
 */
const makePlot= (chart_canvas, from_date, to_date) => {

    // Fetch data
    axios.post("http://localhost/api/bitcoin", {
        "from": from_date,
        "to": to_date
    })
    .then( response => {
        const raw_data= response.data.data;
        const dates= Object.getOwnPropertyNames(raw_data);
        const data= {
            dates,
            "bpi": dates.map( date=> raw_data[date])
        };

        const chart= chart_canvas.getContext('2d');

        new Chart(chart, {
            type: 'line',
            data: {
                labels: data.dates,
                datasets: [{
                    label: "Bitcoin Price Indices from CoinDesk",
                    data: data.bpi
                }]
            },
            options: {}
        });
    })
    .catch( (err) => {
        console.log(err);
        window.alert("Sorry, could not load data.");
    });
}

/** EXPORT */
module.exports= {
    getIsoDate,
    get10AgoDate
}