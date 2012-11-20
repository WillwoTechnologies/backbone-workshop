Echoes.Views.Playlist = Backbone.View.extend({
	el: '#now-playlist',

	initialize: function() {
		this.views = [];
		this.$list = this.$('.now-playlist-list');
	},

	render: function(collection, selectedMedia) {
		this.selectedMediaId = selectedMedia.id;
		this.cleanViews();
		this.$list.empty();

		_.each(collection, function(model) {
			var index = this.views.length;
			this.views.push( new Echoes.Views.PlaylistItem({ model: model, selectedId: selectedMedia.id }) );
			this.views[index].on('selected', this.updateSelected, this);
			this.$list.append( this.views[index].render().el );
		}, this);

		this.scrollToItem();
	},

	cleanViews: function() {
		_.invoke(this.views, 'destroy');
		this.views = [];
	},

	getSelected: function() {
		return this.$el.find("a[href*='"+ this.selectedMediaId + "']");
	},
	removeSelected: function() {
		this.getSelected().parent().removeClass('active');
	},

	updateSelected: function(mediaId) {
		this.removeSelected();
		this.selectedMediaId = mediaId;
	},

	scrollToItem: function() {
		this.$list.get(0).scrollTop = this.getSelected().offset().top;
	}
});