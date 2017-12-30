var gifRetriever = {
	topics: [["actions", "adjectives", "animals", "anime", "art & design", "cartoons & comics", "celebrities", "decades", "emotions", "fashion & beauty", "food & drink", "gaming", "holidays", "interests", "memes", "movies", "music", "nature", "news & politics", "reactions", "science", "sports", "stickers", "transportation", "tv"],["cool math", "fibonacci", "fractal", "golden ratio", "hypercube", "math art", "pi day", "sierpinski", "tesselation"],["baby alligator", "capybara", "cute cub", "cute kitten", "fennec fox", "floof", "kitten cute", "puppy hug", "sand cat", "snake", "snow leopard tail in mouth"],["dragon", "drow", "eldritch", "fairy", "gelatinous cube", "lich", "sphinx", "unicorn", "vampire", "zombie"],["minecraft", "chrono trigger", "portal", "civ", "magic the gathering", "pokemon", "incredible machine", "final fantasy tactics advanced", "myst", "super smash bros"]],
	topicCategories: ["giphy default topics", "math", "animals", "mythological creatures", "games"],
	curCategory: "",
	buttonCreator: function(topic, area) {
		//create a button and puts it in correct area (either 'my topics' or under the category header)
		//checks if it already exists as a topic. If so, does not create it, just opens up the category ...maybe highlights the topic?

		//gives class based on what category it is
		//opens category area for which it is created

		//Topics should have uniform capitalization - all lower or proper.
		//does not allow spaces
		if((topic).trim() != "") {
			$("#"+area).append('<button type = "button" class="btn btn-default topic">'+gifRetriever.toTitleCase(topic).trim()+'</button>');
		}
		
	},
	createGif: function(topic) {
		// Creates a gif based on which button was pressed
    	queryURL = "https://api.giphy.com/v1/gifs/search?q="+topic+"&api_key=dc6zaTOxFJmzC";

    	//random does only 1 gif at a time, so ajax needs to be inside of the for loop if doing random - unfotunately, that does not give rating. A next step for this would be reverse searching to find the rating based on the gif, so both could be done.

    	$.ajax({
	      url: queryURL,
	      method: 'GET'
	    }).done(function(response) {
	      // console.log(response);

	      //3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

	      	// console.log(response.data);

	      for (var i = 0; i < 10; i++) {
	      	$("#images").prepend('<div class="thumbnail grid-item"><img src="'+response.data[i].images.fixed_height_still.url+'" data-still = "'+response.data[i].images.fixed_height_still.url+'" data-animate = "'+response.data[i].images.fixed_height.url+'" data-state = "still" class="gif caption"><p>Rated '+response.data[i].rating+'</p></div></div>');
	      }
	      //<div class="col-md-2">
	      // response.data[i].rating
	      //     5. Under every gif, display its rating (PG, G, so on).
	      // response.data[i].rating
	      // * This data is provided by the GIPHY API.
	      // * Only once you get images displaying with button presses should you move on to the next step.
	      //Fixed still: fixed_height_still
	      //fixed_height
	    });

	 //    $('.grid').masonry({
		//   // options
		//   itemSelector: '.grid-item',
		//   columnWidth: 200
		// });
	},
	getCategory: function() {
		//
		$("#categoryTopics").empty();
		for (var i = 0; i < gifRetriever.topics[gifRetriever.topicCategories.indexOf((gifRetriever.curCategory).toLowerCase())].length; i++) {
			$("#categoryTopics").append(gifRetriever.buttonCreator(gifRetriever.topics[gifRetriever.topicCategories.indexOf((gifRetriever.curCategory).toLowerCase())][i], "categoryTopics"));
		}
		$("#categoryName").text(gifRetriever.toTitleCase(gifRetriever.curCategory));

		$("#panel-element-850776").collapse("show");
		$("#panel-element-265940").collapse("hide");
	},
	animate: function(image) {
		//Animates or stills gif
		var state = $(image).attr("data-state");

        if (state == "still") {
          $(image).attr("src", $(image).attr("data-animate"));
          $(image).attr("data-state","animate");
        } else {
          $(image).attr("src", $(image).attr("data-still"));
          $(image).attr("data-state","still");
        }
	},
	toTitleCase: function(str) {
	    return str.replace(/(?:^|\s)\w/g, function(match) {
	        return match.toUpperCase();
	    });
	},
	startUp: function() {
		//starts program up
		//Creates dropdown list of categories
		$("#categories ul").empty();
		for (var i = 0; i < gifRetriever.topicCategories.length; i++) {
			$("#categories ul").append('<li><a href="#">'+gifRetriever.toTitleCase(gifRetriever.topicCategories[i])+'</a></li>');
		}

		//chooses random default category
		gifRetriever.curCategory = gifRetriever.topicCategories[Math.floor(Math.random()*gifRetriever.topicCategories.length)];
		gifRetriever.getCategory();
		//Clears area for buttons

		//Creates buttons for category chosen

		//brings up category

		
	}
}

gifRetriever.startUp();


$("body").on("click", "#categories ul li", function(){
    //if I want to add the category chosen as the dropdown text
	// $("#categories .btn:first-child").text($(this).text());
 //    $("#categories .btn:first-child").val($(this).text());
	console.log("test");
	gifRetriever.curCategory = $(this).text();
	gifRetriever.getCategory();
});

$("body").on("click", "#addTopic", function() {
	event.preventDefault();
	if(($("#newTopic").val()).trim() != "") {
        gifRetriever.buttonCreator($("#newTopic").val(), "myTopics");
		$("#panel-element-265940").collapse("show");
		$("#panel-element-850776").collapse("hide");
	}
	$("#newTopic").val("");
});



$("body").on("click", "#clearTopics", function() {
	if (confirm("Are you sure you want to clear all your topics?") == true) {
		$("#myTopics").empty();
	}
});
$("body").on("click", "#clearGifs", function() {
	if (confirm("Are you sure you want to clear all your gifs?") == true) {
		$("#images").empty();
	}
});

$("body").on("click", ".topic", function() {
    	gifRetriever.createGif($(this).text());

});
$("body").on("click", "img", function() {
    	gifRetriever.animate(this);
    	console.log("hi");

});

	 //    $('.grid').masonry({
		//   // options
		//   itemSelector: '.grid-item',
		//   columnWidth: 200
		// });

$(document).keypress(function(e) {
    if(e.which == 13) {
    	event.preventDefault();
	    if(($("#newTopic").val()).trim() != "") {
	        gifRetriever.buttonCreator($("#newTopic").val(), "myTopics");
			$("#panel-element-265940").collapse("show");
			$("#panel-element-850776").collapse("hide");
		}
		$("#newTopic").val("");
    }
});

// $(function() {
//     $("form").submit(function() { return false; });
// });