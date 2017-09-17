      
      // Array of initial topic buttons
      var topics = ["Jordan", "Lebron", "Curry", "Durant"];
      var apiKey = "3cbc853746a84c4eb5ba3f3314c16438";

      // displayTopicInfo function will re-render and display the appropritate HTML
      function displayTopicInfo() {

        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apiKey + "&limit=10&rating=g&rating=g";
        console.log(queryURL)
        $('#topic-view').empty();

        // Creating an AJAX call for the specific topic button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          var topicDiv = $("<div class='still'>")

          // Looping through each result item
          for (var i = 0; i < response.data.length; i++) {
            // Creating and storing a div tag
            topicDiv = $("<div class='still'>")
            var stillURL = response.data[i].images.fixed_height_still.url;
            var topicURL = response.data[i].images.fixed_height.url;
            var rating = response.data[i].rating;

            // Make an element that will hold the image
            var image = $("<img class='image'>").attr("src", stillURL);
            image.attr("topicURL", topicURL)
            image.attr("stillURL", stillURL)
            image.attr("rating", rating)
            var p = $("<p>").text("Rating: " + rating);

            // Appending the paragraph and personImage we created to the "topicDiv" div we created
            topicDiv.append(p);
            topicDiv.append(image)

            // Putting the entire movie above the previous movies
            $("#topic-view").prepend(topicDiv);
          }
        });

      }

      // Function for displaying topic catagory buttons.
      function renderButtons() {

        // Deleting the topic buttons prior to adding new topic buttons
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of topic catagories
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each catagory in the array
          var a = $("<button>");
          // Adding a class of topic to our button
          a.addClass("topic");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      function animateTopic() {
        // First we take an attribute from the image clicked with 
        // which we can compare the other images.
        var still = $(this).attr('stillURL')

        // Then we cycle through all of the images on the page
        $(".image").each(function(){

          // If the attribute matches that of the image clicked...
          if ($(this).attr('stillURL') == still) {

            // Set the source of that image to the moving topic URL
            $(this).attr('src', $(this).attr('topicURL'))
          } else {

            // If the attribute does not match that of the image clicked
            // set the src of the image to that of the still URL.
            $(this).attr('src', $(this).attr('stillURL'))
          }
        });
        
      }

      // This function handles events where a new topic button is added
      $("#add-topic").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#topic-input").val().trim();

        // Adding topic from the textbox to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our topic button array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "topic"
      $(document).on("click", ".topic", displayTopicInfo);

      // Adding a click event listener to all elements with a class of "image"
      $(document).on("click", ".image", animateTopic);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();