
function get_collections_js(){
	jq191.ajax({
		url: 'http://content.wwu.edu/dc-custom-search/getCollections.php',
	}).done(function(html) {
		jq191("#advanced_max_collections_link").parent().append(html);
		jq191("#advanced_max_collections_link").remove();

		/*
		jQuery('.collBoxes').click(function(){
			deathBoxes();
		});
		deathBoxes();//call now on preselected
		*/
	});

}
