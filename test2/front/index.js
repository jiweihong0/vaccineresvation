import insert from'./insert.js';
import update from './update.js';
import dodelete from './delete.js';
import Select from './select.js';
import aaa from './aaa.js';
import{startPage}from'./startpage.js'
$(document).ready(function () {
    $("#root").html(startPage);
    $("#insert").click(function () { 
        insert();
    });
    $("#update").click(function (e) { 
        update();
        
    });
    $("#dodelete").click(function (e) { 
        dodelete();
    });
    $("#select").click(function (e) {
        Select();
    });
    $("#aaa").click(function () {       
        aaa(); 
    });
});