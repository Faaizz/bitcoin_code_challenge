/**
 * DOM INTERACTOR 
 * 
 * Some functions used in this script are defined in 'misc_functions.js',
 * thus 'misc_functions.js' must be imported before this script
 * */

$(function(){
    /** 
     * DOM ELEMENTS
     * Get DOM elements
     */
    const from_date_input = document.getElementById('from_date');
    const to_date_input = document.getElementById('to_date');
    const chart_canvas = document.getElementById('myChart');
    const render_btn= document.getElementById('render_btn');

    /**
     * DATES
     * Get current date and compute the date 10 days ago
     */
    // Get current date
    const date_today= new Date();
    // Set to-date to current date
    to_date_input.value = date_today;
    // Compute date 10 days ago
    const date_10ago= get10AgoDate(date_today);
    // Set from-date to date 10 days ago
    from_date_input.value = date_10ago;


    /**
     * PLOT PRICES
     * Make inital plot with from-date set to 10 days ago, and to-date set to 
     * current date
     */
    makePlot(chart_canvas, getIsoDate(date_10ago), getIsoDate(date_today)); 


    /**
     * FROM-DATE
     * Create Litepicker for from_date input and specify selection callback
     */
    let from_date_picker_options= {
        element: from_date_input,
        minDate: date_10ago,
        maxDate: date_today,
        onSelect: function(date){
            from_date_input.value = date;
            // Set minimum date on "to-date" to selected "from-date" and clear selection on "to-date"
            to_date_picker.setOptions({...to_date_picker_options, minDate: date});
            to_date_picker.clearSelection();
            
        }
    };
    const from_date_picker = new Litepicker(from_date_picker_options);

    /**
     * TO-DATE 
     * Create Litepicker for to_date input and specify selection callback
     */
    to_date_picker_options= {
        element: to_date_input,
        minDate: date_10ago,
        maxDate: date_today,
        onSelect: function(date){
            to_date_input.value = date;
            // Set maximum date on "from-date" to selected "to-date"
            from_date_picker.setOptions({...from_date_picker_options, maxDate: date});
        }
    };
    const to_date_picker = new Litepicker(to_date_picker_options);


    /**
     * RENDER BUTTON
     * Set onclick action for render button
     */
    $(render_btn).on("click", ()=>{
        // Collect new dates and Update plot
        makePlot(
            chart_canvas,
            getIsoDate(from_date_picker.getDate()), 
            getIsoDate(to_date_picker.getDate())
        );  
    });
    
});