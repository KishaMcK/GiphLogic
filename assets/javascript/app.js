$(document).ready(function () {

    var logics = ["You're the best", "not this again", "I can't", "not again", "I love you", "yum", "crazy", "yes", "na", "another time", "I don't think so"];

    //logic data
    function renderButtons() {

        $("#logicView").empty();

        // Loops through array
        for (var i = 0; i < logics.length; i++) {

            var a = $("<button>");
            a.addClass("logics"); 
            a.attr("data-name", logics[i]);
            a.text(logics[i]);
            $("#logicView").prepend(a);
        }
    }
    $("#addLogic").on("click", function () {
        event.preventDefault();

        var logicInput = $("#logicInput").val().trim();
        logics.push(logicInput);
        renderButtons();
        $("#logicInput").val("");
    });


    // Display Gifs //
    function showGifs() {
        var logicData = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + logicData + "&api_key=GlS46RxnXv9OrKm4aT0Y04198vPJ5GTX";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='gif'>");
                var showGifs = $("<img>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                showGifs.attr("src", results[i].images.fixed_height_still.url);
                //show rating on hover//
                showGifs.attr("title", "Rating: " + results[i].rating);
                showGifs.attr("data-still", results[i].images.fixed_height_still.url);
                showGifs.attr("data-state", "still");
                showGifs.addClass("gif");
                showGifs.attr('data-animate', results[i].images.fixed_height.url);
                gifDiv.append(p);
                gifDiv.append(showGifs);
                $("#logicGifs").prepend(gifDiv);
            }
        });
    }

    // Animate/Pause Gifs
    $("#logicGifs").on("click", ".gif", function (event) {
	event.preventDefault();

	// gets the current state of the clicked gif 
	var state = $(this).attr("data-state");

	// according to the current state gifs toggle between animate and still 
	if (state === "still") {
	    $(this).attr("src", $(this).attr("data-animate"));
	    $(this).attr("data-state", "animate");
	} else {
	    $(this).attr("src", $(this).attr("data-still"));
	    $(this).attr("data-state", "still");
	}

});

    $(document).on("click", ".logics", showGifs);

    renderButtons();

});