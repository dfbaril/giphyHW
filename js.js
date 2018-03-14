// ~~DONE SO FAR: I have created a for loop that adds buttons to the HTML that read topics[i]
// ~~NEXT STEPS: 
//1.I want the buttons to generate an ajax call for images of topics[i]
//2. I want to use a for loop to have the resultimages append to the HTML with certain attributes
//3. poops


$(document).ready(function() {
    var url = "http://api.giphy.com/v1/gifs/search?q="
    var APIkey = "&api_key=vw4loxV4tgBnuMTh4cJ7C9CCpHZLSkeO";
    var ten = "&limit=10"
    var topics = ["cars", "F1", "chess", "cats", "billiards", "computers", "technology"];
    // var queryURL = url + topics[0] + APIkey + ten;

//OMG syntax errors :gun::head:
    //ok its fixed

//begin for loop that adds buttons with text
    for(i = 0; i < topics.length; i++){
        var newButton = $('<button>');
        var div = $('#imageButtons');
        // I will need to add an onclick event listener to this that will add topical images for each time it increments the var topics
        // newButton.attr();
        newButton.text(topics[i]);
        newButton.addClass("query-button");
        $(div).append(newButton);

        //okay above this line works
    }

//end for loop

// THIS IS UNNECESSARY
    // $(newButton).on("click", function() {
    //     var queryURL = url + topics[i] + APIkey + "&limit=1";

    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function(response) {
    //         console.log(response);
    //     })
    // }
// )})





  $(document).on("click", ".query-button", function() {
    var queryTerm = $(this).text();
    console.log(queryTerm);
    var queryURL = url + queryTerm + APIkey + ten;
    var carsDiv = $('#cars');
    carsDiv.empty();
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
        carsDiv.prepend(resultImg);
      }
    });
  });
});
