$(document).ready(function () {
    //create an array of logics
    var logics = ["yes", "never", "yum", "omg", "again?", "not cool", "i got this", "you're not alone", "i love you", "merry christmas", "yea buddy", "i cant"];
    //function for displaying data//
    function renderButtons() {
        $("#logicView").empty();

        for (var i = 0; i < logics.length; i++) {
            var a = $("button");
            a.addClass("logic");
            a.attr("data-name", logics[i]);
            a.text(logics[i]);
            $("logicView").prepend(a);
        }
    }

    //function button event//
    $("addLogic").on("click", function () {
        event.preventDefault();

        var logicInput = $("#logicInput").val().trim();
        logics.push(logicInput);
        renderButtons();
        $("#logicInput").val("");
    });

    //giph display//
    function showGiphs() {
        var logicData = (this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + logicData + "&api_key=GlS46RxnXv9OrKm4aT0Y04198vPJ5GTX";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var giphDiv = $("<div class='giph'>");
                var showGiphs = $("<img>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                showGiphs.attr("src", results[i].images.fixed_height_still.url);

                showGiphs.attr("title", "Rating:" + results[i].rating);
                showGiphs.attr("datta-still", results[i].images.fixed_height_still.url);
                showGiphs.attr("data-state", "still");
                showGiphs.addClass("giph");
                showGiphs.attr("data-animate", results[i].images.fixed_height.url);
                giphDiv.append(p);
                giphDiv.append(showGiphs);
                $("#logicGiphs").prepend(giphDiv);
            }
        });
    }

    //animate + paus giphs//
    $("#logicGiphs").on("click", ".giph", function (event) {
        event.preventDefault();

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });

    //show giphs//
    $(document).on("click", ".logic", showGiphs);

    renderButtons();
});