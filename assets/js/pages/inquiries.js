/**
 * Created by SEIIS on 28/4/2017.
 */
$(document).ready(function () {

    $('body').append('Templates/inquire.html')
        var inquiries =
            [
            {title: "Yehuda", description: "Katz"},
            {title: "Carl", description: "Lerche"},
            {title: "Alan", description: "Johnson"}
        ]

   var template = Handlebars.compile($('#inquireCard').html())

    $('.mn-inner').append(template(inquiries));







})