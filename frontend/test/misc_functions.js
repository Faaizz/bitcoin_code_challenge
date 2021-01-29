// Imports
const assert = require('chai').assert;

// User-defined imports
const misc_functions= require("../assets/js/misc_functions.js");


describe("datepicker", ()=>{

    describe("getIsoDate()", ()=>{

        it("Should return the correct short ISO date string", ()=>{
            assert.equal(
                "1975-08-19",
                misc_functions.getIsoDate(new Date('August 19, 1975 23:15:30'))
            );
        });

    });

    describe("get10AgoDate()", ()=>{

        it("Should return correct date", ()=>{
            assert.equal(
                (new Date("August 9, 1975 23:15:30")).toString(),
                (misc_functions.get10AgoDate(new Date("August 19, 1975 23:15:30"))).toString()
            );
        });

        it("Should return correct date, even when crossing month boundaries", ()=>{
            assert.equal(
                (new Date("July 30, 1975 23:15:30")).toString(),
                (misc_functions.get10AgoDate(new Date("August 9, 1975 23:15:30"))).toString()
            );
        });

    });

});