var generator = {

	init: function() {
		generator.getNames();
		generator.getSuffix();
	},

	getNames: function() {
		$.getJSON("data/names.json", function(data) {
			generator.getRandomName(data);
		})
	},

	getSuffix: function() {
		$.getJSON("data/suffix.json", function(data) {
			generator.getRandomSuffix(data);
		})
	},

	getRandomSuffix: function(data) {
		var totalSuffix = data.suffix.length;
		var randomNum = Math.floor(Math.random() * totalSuffix);
		generator.suffix = data.suffix[randomNum].s;
	},

	getRandomName: function(data) {
		var totalNames = data.names.length;
		var randomNum = Math.floor(Math.random() * totalNames);
		generator.name = {
			"firstName": data.names[randomNum].firstName,
			"fullName": data.names[randomNum].fullName
		}
	},

	submit: function() {
		var suffix = generator.suffix;
		var name = generator.name;

		var source = $("#result").html();
		var template = Handlebars.compile(source);

		generator.genName = name.firstName + suffix;

		data = {
			"fullName": name.fullName,
			"genName": generator.genName
		}

		$(".container").html(template(data));

	},

	submitPoll: function(status) {

		$(".likes").html(function() {
			var text1 = "<h2>Loading...</h2>";
			var image = "<img class='loading' src='img/loading.gif'>";
			return text1 + image;
		});

		$.ajax({
			type: "POST",
			url: "store.php",
			data: {
				"genName": generator.genName,
				"fullName": generator.name.fullName,
				"status": status 
			},
			success: function() {
				$(".likes").html(function() {
					var text1 = "<h2>Your Response Has Been Recorded!</h2>";
					var text2 = "<a target='_blank' href='http://bit.ly/1kkWPt9'><h2>View Responses</h2></a>"
					return text1 + text2;
				});
			}
		})

	}

}

generator.init();