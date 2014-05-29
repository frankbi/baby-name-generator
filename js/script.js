var generator = {

	init: function() {
		generator.getNames();
		generator.getSuffix();
	},

	getNames: function() {
		$.getJSON("names.json", function(data) {
			generator.getRandomName(data);
		})
	},

	getSuffix: function() {
		$.getJSON("suffix.json", function(data) {
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

		generator.geName = name.firstName + suffix;

		data = {
			"fullName": name.fullName,
			"genName": generator.genName
		}

		$(".container").html(template(data));

	},

	submitPoll: function(status) {

		$.ajax({
			type: "POST",
			url: "store.php",
			data: {
				"genName": generator.genName,
				"fullName": generator.name,
				"status": status 
			}
		})

	}

}

generator.init();