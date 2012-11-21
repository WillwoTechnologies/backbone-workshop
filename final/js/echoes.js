/* Author: Oren Farhi, http://twitter.com/orizens */
var Echoes = {
	Models: {},
	Views: {},
	Collections: {},
	Templates: {
		load: function(templatesUrl, callback){
			//- load templates and then start player
			templatesUrl = templatesUrl ? templatesUrl : 'templates/templates.html';
			$.get(templatesUrl, function(templates){
				$('body').append(templates);
				if (callback) {
					callback();
				}
			});
		}
	},
	Utils: {
		formatNumberWithComma: function(num) {
			return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	},

	initialize: function() {
		var appModel = new Echoes.Models.YoutubeMediaProvider();
		var appView =  new Echoes.Views.App({ model: appModel });
		var appRouter = new Echoes.Player({ model: appModel });
	}
};