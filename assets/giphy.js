$(document).on("ready",function(){
	var topics = [{topic:"NFL",limit:"10",rating:"all"},
				{topic:"NBA",limit:"10",rating:"all"},
				{topic:"Football",limit:"10",rating:"all"}];
	topics.forEach(function(t){
		var div = $("<div class='topics'><p><span>Limit:</span> "+t.limit+"</p><p><span>Rating:</span> "+t.rating+"</p><button class='btn' data-topic='"+t.topic+"' data-limit='"+t.limit+"' data-rating='"+t.rating+"'>"+t.topic+"</button></div>");
		$("body #divTopic").append(div);
	});

	$("#add").on("click", function(ev){
		ev.preventDefault();
		var topic = $("#topic").val();
		if( topic.trim() !== "")
		{
			var limit = $("#limit").val();
			var rating = $("#rating").val();

			var div = $("<div class='topics'><p><span>Limit:</span> "+limit+"</p><p><span>Rating:</span> "+rating+"</p><button class='btn' data-topic='"+topic+"' data-limit='"+limit+"' data-rating='"+rating+"'>"+topic+"</button></div>");
			$("body #divTopic").append(div);
		}
	});

	$("#divTopic").on("click", "button", function(ev){
		ev.preventDefault();
		var baseUrl = "http://api.giphy.com/v1/gifs/search";

		var parameterApiKey = "api_key";
		var parameterTopic = "q";
		var parameterLimit = "limit";
		var parameterRating = "rating";
	
		var apiKey = "dc6zaTOxFJmzC";
		var topic = encodeURIComponent($(this).data("topic").trim());
		var limit = $(this).data("limit");
		var rating = $(this).data("rating");

		var giphyData = {};
		giphyData[parameterApiKey] = apiKey;
		giphyData[parameterTopic] = topic;
		giphyData[parameterLimit] = limit;
		
		if( rating !== "all")
			giphyData[parameterRating] = rating;

		$.ajax({
			url: baseUrl,
			method: "GET",
			data: giphyData
		}).done(function(res){
			var result = [];
			res.data.forEach(function(d){
				if( d.rating === rating || rating === "all")
				{
					result.push(d);
				}
			});
			
			result.forEach(function(d){
				var img = $("<figure><figcaption><span>Rating:</span> "+d.rating+"</figcaption><img src='"+d.images.fixed_height_still.url+"' data-still='"+d.images.fixed_height_still.url+"' data-animate='"+d.images.fixed_height.url+"' data-status='still'></img></figure>");
				$("#result").prepend(img);
			});
		}).fail(function(err){
			console.log(err);
		});				
	});

	$("#result").on("click", "figure img", function(ev){
		ev.preventDefault();
		var state = $(this).attr("data-status");
	    
	    if(state === "still")
		{
			$(this).attr("src",$(this).attr("data-animate"));
			$(this).attr("data-status","animate");
		}
		else
		{
			$(this).attr("src",$(this).attr("data-still"));
			$(this).attr("data-status","still");
		}
	});
});