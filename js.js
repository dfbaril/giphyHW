$(document).ready(function() {
  var APIkey = "vw4loxV4tgBnuMTh4cJ7C9CCpHZLSkeO";
  var topics = ["cars", "Formula 1", "chess", "cats", "billiards", "computers", "technology"];


  $(document).on("click", "#cars-button", function() {
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topics[0]
    + "&api_key=" + APIkey + "&limit=5";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var giphyResults = response.data;
      var carsDiv = $('#cars');
      for (var i = 0; i < giphyResults.length; i++) {
        var resultImg = $('<img>');
        var animated = response.data[i].images.original.url;
        var still = response.data[i].images.fixed_height_still.url;
        resultImg.attr("src", still);
        resultImg.attr("data-animate", animated);
        resultImg.attr("data-still", still);
        resultImg.attr("data-state", "still");

        $(resultImg).on("click", function() {
          var state = $(this).attr("data-state");
          if(state === "still") {
            $(this).attr("data-state", "animate");
            $(this).attr("src", $(this).attr("data-animate"));
          } else {
            $(this).attr("data-state", "still");
            $(this).attr("src", $(this).attr("data-still"));
          }

        });

        carsDiv.prepend(resultImg);
      }

    });



  });
});
