/**
 * Created by Mitsaras on 5/17/2017.
 */
$(function () {

   $('#datetime').text(function () {
       var dt = new Date();
       return dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
   })


});