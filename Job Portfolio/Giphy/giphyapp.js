$(document).ready(function () {

    var topics = [];


    function displayStarWarsCharacter() {

        var x = $(this).data("search");
        console.log(x);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=D9HWI563b6zt9mfClTMPjuj6yYBGBiMH&limit=10";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

                var vDiv = $("<div class='col-md-4'>");

                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var Image = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                Image.attr("src", staticSrc);
                Image.addClass("StarWarsGiphy");
                Image.attr("data-state", "still");
                Image.attr("data-still", staticSrc);
                Image.attr("data-animate", defaultAnimatedSrc);
                vDiv.append(p);
                vDiv.append(Image);
                $("#gifArea").prepend(vDiv);

            }
        });
    }


    $("#addCharacter").on("click", function (event) {
        event.preventDefault();
        var newCharacter = $("#StarWarsInput").val().trim();
        topics.push(newCharacter);
        console.log(topics);
        $("#StarWarsInput").val('');
        displayButtons();
    });


    function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-primary">');
            a.attr("id", "Character");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        }
    }


    displayButtons();


    $(document).on("click", "#Character", displayStarWarsCharacter);


    $(document).on("click", ".StarWarsGiphy", pausePlayGifs);


    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});
