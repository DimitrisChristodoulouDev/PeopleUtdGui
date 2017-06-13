/*
 $( document ).ready(function() {
 createBreadcumbs()


 });


 function createBreadcumbs() {

 // var previousUrl = document.referrer.attr('href')
 $('.card').each(function () {
 $(this).addClass('hoverable')
 })

 }
 */

$(function () {
    altair_dashboard.init()
}), altair_dashboard = {
    init: function () {
        "use strict";
        altair_dashboard.peity_charts(), altair_dashboard.metrics_charts(), altair_dashboard.chartist_charts(), altair_dashboard.video_player(), altair_dashboard.clndr_calendar(), altair_dashboard.maplace_maps(), $window.on("load", function () {
            altair_dashboard.circular_statistics(), altair_dashboard.count_animated()
        })
    }, metrics_charts: function () {
        function e() {
            if (0 == e)var e = $(t).height();
            var a = $(t).width();
            d3.json("data/mg_dashboard_chart.min.json", function (i) {
                i = [i];
                for (var n = 0; n < i.length; n++)i[n] = MG.convert.date(i[n], "date");
                var r = [{
                    date: new Date("2016-02-26T00:00:00.000Z"),
                    label: "Winter Sale"
                }, {date: new Date("2016-06-02T00:00:00.000Z"), label: "Spring Sale"}];
                MG.data_graphic({
                    data: i,
                    y_scale_type: "log",
                    width: a,
                    height: e,
                    right: 20,
                    target: t,
                    markers: r,
                    x_accessor: "date",
                    y_accessor: "value"
                })
            })
        }

        var t = "#mGraph_sale";
        if ($(t).length) {
            e(), $window.on("debouncedresize", function () {
                e()
            }), $("#mGraph_sale").on("display.uk.check", function () {
                e()
            })
        }
    }, chartist_charts: function () {
        new Chartist.Bar("#ct-chart", {
            labels: ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"],
            series: [[5, 4, 3, 7], [3, 2, 9, 5], [1, 5, 8, 4], [2, 3, 4, 6], [4, 1, 2, 1]]
        }, {
            stackBars: !0, axisX: {
                labelInterpolationFnc: function (e) {
                    return e.split(/\s+/).map(function (e) {
                        return e[0]
                    }).join("")
                }
            }, axisY: {offset: 20}
        }, [["screen and (min-width: 400px)", {
            reverseData: !0,
            horizontalBars: !0,
            axisX: {labelInterpolationFnc: Chartist.noop},
            axisY: {offset: 60}
        }], ["screen and (min-width: 800px)", {
            stackBars: !1,
            seriesBarDistance: 10
        }], ["screen and (min-width: 1000px)", {reverseData: !1, horizontalBars: !1, seriesBarDistance: 15}]])
    }, circular_statistics: function () {
        $(".epc_chart").easyPieChart({
            scaleColor: !1,
            trackColor: "#f5f5f5",
            lineWidth: 5,
            size: 110,
            easing: bez_easing_swiftOut
        })
    }, maplace_maps: function () {
        if ($("#map_users").length) {
            var e = $("#map_users_list").children("li"), t = {
                    "Blue water": [{
                        featureType: "water",
                        stylers: [{color: "#46bcec"}, {visibility: "on"}]
                    }, {featureType: "landscape", stylers: [{color: "#f2f2f2"}]}, {
                        featureType: "road",
                        stylers: [{saturation: -100}, {lightness: 45}]
                    }, {featureType: "road.highway", stylers: [{visibility: "simplified"}]}, {
                        featureType: "road.arterial",
                        elementType: "labels.icon",
                        stylers: [{visibility: "off"}]
                    }, {
                        featureType: "administrative",
                        elementType: "labels.text.fill",
                        stylers: [{color: "#444444"}]
                    }, {featureType: "transit", stylers: [{visibility: "off"}]}, {
                        featureType: "poi",
                        stylers: [{visibility: "off"}]
                    }]
                },
                a = isHighDensity() ? "assets/img/md-images/ic_location_history_black_48dp.png" : "assets/img/md-images/ic_location_history_black_24dp.png",
                i = isHighDensity() ? new google.maps.Size(48, 48) : new google.maps.Size(24, 24),
                n = new google.maps.Size(24, 24), r = [];
            e.each(function () {
                var e = $(this), t = {
                    lat: e.attr("data-gmap-lat"),
                    lon: e.attr("data-gmap-lon"),
                    title: e.attr("data-gmap-user"),
                    html: '<div class="gmap-info-window"><h3 class="uk-text-nowrap">' + e.attr("data-gmap-user") + "</h3><p>" + e.attr("data-gmap-user-company") + "</p></div>",
                    zoom: 14,
                    icon: {url: a, size: i, scaledSize: n}
                };
                r.push(t)
            });
            var s = new Maplace({
                map_div: "#map_users",
                locations: r,
                controls_on_map: !1,
                map_options: {set_center: [37.390267, -122.076417], zoom: 12, streetViewControl: !1},
                styles: t
            }).Load();
            e.on("click", function (e) {
                e.preventDefault();
                var t = $(this), a = t.index();
                t.addClass("md-list-item-active").siblings().removeClass("md-list-item-active"), google.maps.event.trigger(s.markers[a], "click")
            }), $(window).on("debouncedresize", function () {
                var e = s.oMap;
                google.maps.event.trigger(e, "resize"), e.fitBounds(s.oBounds)
            })
        }
    }, peity_charts: function () {
        function e(e, t) {
            return Math.floor(Math.random() * (t - e + 1)) + e
        }

        $(".peity_orders").peity("donut", {
            height: 24,
            width: 24,
            fill: ["#8bc34a", "#eee"]
        }), $(".peity_visitors").peity("bar", {
            height: 28,
            width: 48,
            fill: ["#d84315"],
            padding: .2
        }), $(".peity_sale").peity("line", {
            height: 28,
            width: 64,
            fill: "#d1e4f6",
            stroke: "#0288d1"
        }), $(".peity_conversions_large").peity("bar", {height: 64, width: 96, fill: ["#d84315"], padding: .2});
        var t = $(".peity_live");
        if (t.length) {
            var a = t.peity("line", {height: 28, width: 64, fill: "#efebe9", stroke: "#5d4037"});
            $("#peity_live_text").text("0"), setInterval(function () {
                var t = Math.round(10 * Math.random()), i = a.text().split(",");
                i.shift(), i.push(t), a.text(i.join(",")).change();
                var n = parseInt($("#peity_live_text").text()), r = e(20, 100);
                if (n == r)var r = e(20, 120);
                new CountUp("peity_live_text", n, r, 0, 1.2).start()
            }, 2e3)
        }
    }, count_animated: function () {
        $(".countUpMe").each(function () {
            var e = this, t = $(e).text();
            theAnimation = new CountUp(e, 0, t, 0, 2), theAnimation.start()
        })
    }, clndr_calendar: function () {
        function e() {
            t.width() < d ? t.addClass("events_over") : t.removeClass("events_over")
        }

        var t = $("#clndr_events");
        if (t.length) {
            for (var a = $("#clndr_events_template"), i = a.html(), n = Handlebars.compile(i), r = [], s = 0; s < 7; s++)r.push(moment().weekday(s).format("dd"));
            theCalendar = t.clndr({
                weekOffset: 1, daysOfTheWeek: r, events: clndrEvents, render: function (e) {
                    return n(e)
                }, clickEvents: {
                    click: function (a) {
                        if (a.events.length) {
                            var i = $(".clndr_events"), n = a.date._i;
                            $(a.element).siblings(".day").removeClass("day-active").end().addClass("day-active"), i.children("[data-clndr-event=" + n + "]").length ? (i.children(".clndr_event").hide(), t.hasClass("events_visible") ? i.children("[data-clndr-event=" + n + "]").velocity("transition.slideUpIn", {
                                stagger: 100,
                                drag: !0
                            }) : (e(), t.addClass("events_visible"), i.children("[data-clndr-event=" + n + "]").velocity("transition.slideUpIn", {
                                stagger: 100,
                                drag: !0,
                                delay: 280
                            }))) : $(a.element).hasClass("last-month") ? (setTimeout(function () {
                                t.find(".calendar-day-" + a.date._i).click()
                            }, 380), t.find(".clndr_previous").click()) : $(a.element).hasClass("next-month") && (setTimeout(function () {
                                    t.find(".calendar-day-" + a.date._i).click()
                                }, 380), t.find(".clndr_next").click())
                        }
                    }
                }
            });
            var l = function () {
                t.addClass("animated_change").removeClass("events_visible"), setTimeout(function () {
                    t.removeClass("animated_change")
                }, 380)
            };
            t.on("click", ".clndr_next", function (e) {
                e.preventDefault(), l(), setTimeout(function () {
                    theCalendar.forward()
                }, 280)
            }), t.on("click", ".clndr_previous", function (e) {
                e.preventDefault(), l(), setTimeout(function () {
                    theCalendar.back()
                }, 280)
            }), t.on("click", ".clndr_today", function (e) {
                e.preventDefault(), l(), setTimeout(function () {
                    theCalendar.setYear(moment().format("YYYY")).setMonth(moment().format("M") - 1)
                }, 280)
            }), t.on("click", ".clndr_events_close_button", function () {
                t.removeClass("events_visible events_over")
            }), event_modal = UIkit.modal("#modal_clndr_new_event"), t.on("click", ".clndr_add_event", function () {
                event_modal.isActive() ? event_modal.hide() : (event_modal.show(), t.removeClass("events_visible"), setTimeout(function () {
                    $window.resize()
                }, 280))
            }), $("#clndr_new_event_submit").on("click", function () {
                var e = "#clndr_event_title_control", t = "#clndr_event_link_control", a = "#clndr_event_date_control",
                    i = "#clndr_event_start_control", n = "#clndr_event_end_control";
                if ("" == $(e).val())return $(e).addClass("md-input-danger").focus(), altair_md.update_input($(e)), !1;
                if ("" == $(a).val())return $(a).addClass("md-input-danger").focus(), altair_md.update_input($(a)), !1;
                var r = [{
                    date: $(a).val(),
                    title: $(e).val(),
                    url: $(t).val() ? $(t).val() : "javascript:void(0)",
                    timeStart: $(i).val(),
                    timeEnd: $(n).val()
                }];
                theCalendar.addEvents(r), theCalendar.setMonth(moment($(a).val()).format("M") - 1), event_modal.hide(), $(e + "," + t + "," + a + "," + i + "," + n).removeClass("md-input-danger").val(""), altair_md.update_input($(e + "," + t + "," + a + "," + i + "," + n))
            });
            var o = t.find(".day > span").outerWidth(), d = 7 * o + 240 + 32 + 14;
            e(), $(window).on("debouncedresize", function () {
                e()
            })
        }
    }, video_player: function () {
        var e = $("#video_player"), t = $("#video_player_playlist");
        e.length && (t.on("click", "li", function (a) {
            a.stopPropagation();
            var i = $(this);
            if (!i.hasClass("md-list-item-active")) {
                var n = i.attr("data-video-src"), r = "https://www.youtube.com/embed/" + n + "?rel=0";
                t.children("li").removeClass("md-list-item-active"), i.addClass("md-list-item-active"), e.velocity({
                    translateZ: 0,
                    scale: 0,
                    opacity: 0
                }, {
                    duration: 280, easing: easing_swiftOut, complete: function () {
                        e.children("iframe").attr("src", r), setTimeout(function () {
                            e.velocity("reverse")
                        }, 280)
                    }
                })
            }
        }), t.children("li:first").trigger("click"))
    }
};