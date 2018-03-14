//I still need to take the .val() of the submit input form to create a new button

$(document).ready(function() {
    // if I set url to ".../vi/gifs/RANDOM/search?q=", then it breaks saying that I don't have permissions.
    // IDK why. The documentation seems to indicate that this is what I should put to return random gifs
    var url = "http://api.giphy.com/v1/gifs/search?q="
    var APIkey = "&api_key=vw4loxV4tgBnuMTh4cJ7C9CCpHZLSkeO";
    var ten = "&limit=10"
    var topics = ["Cars", "F1", "Chess", "Cats", "Science Fiction", "Computers", "Technology"];
    var rating = "&rating=pg-13";


//begin for loop that adds buttons with text
    for(i = 0; i < topics.length; i++){
        var newButton = $('<button>');
        var div = $('#imageButtons');
        // I will need to add an onclick event listener to this that will add topical images for each time it increments the var topics
        // newButton.attr();
        newButton.text(topics[i]);
        newButton.addClass("query-button btn btn-default btn-lg");
        $(div).append(newButton);

        //okay above this line works
    }

//end for loop





  $(document).on("click", ".query-button", function(query) {
    var queryTerm = $(this).text();
    console.log(queryTerm);
    var queryURL = url + queryTerm + APIkey + ten + rating;
    var imageDiv = $('#images');
    imageDiv.empty();
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var giphyResults = response.data;
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
        imageDiv.prepend(resultImg);
      }
    });
  });
});
