// thanks to http://seekingmichigan.org 

jq191(document).ready(function() {
	
	jq191("#search_content_adv_link").click(function () {	
	
		if (jq191(this).text() == 'Advanced Search'){
			jq191('body').css('backgroundPosition', '0 740px');
			//jq191('#header_wrapper').height(180);
			jq191(this).text('Close Advanced');
		
		}else{
			jq191('body').css('backgroundPosition', '0 181px');
			//jq191('#header_wrapper').height(420);
			jq191(this).text('Advanced Search');
			
		}
		jq191("#adv_search").slideToggle();
		get_collections_js();
	
	});
	
	jq191("#simple_search_button").click(function(){
		window.location= "http://content.wwu.edu/cdm/search/searchterm/" + jq191("#search_content_box").val() + "/order/nosort";
	});
	
	jq191('#search_content_box').keypress(function (e) {
	  if (e.which == 13) {
	    window.location= "http://content.wwu.edu/cdm/search/searchterm/" + jq191("#search_content_box").val() + "/order/nosort";
	  }
	});
	
	/*jq191('#advanced_max_collections_link').click(function(){
		get_collections_js();
	});*/
	
	jq191(".remove_adv_search_row_link").click(function(){
		var toToss = jq191(this).attr('rid');
		jq191("#"+toToss).remove();
		jq191("#adv_search_add_field_link").css('display','block');
	});
	
	jq191("#adv_search_add_field_link").click(function(){
		var newFieldNum = jq191('.adv_search_row').length;
		var newAdv = getAdvMore(newFieldNum);
		jq191('#adv_search_query_builder_list').append(newAdv);
		jq191(".remove_adv_search_row_link").click(function(){
			var toToss = jq191(this).attr('rid');
			jq191("#"+toToss).remove();
			jq191("#adv_search_add_field_link").css('display','block');
		});
		if (newFieldNum == 3){
			jq191("#adv_search_add_field_link").css('display','none');
		}
		deathBoxes();
	});
	
	
	jq191("#adv_search_by_date_link").click(function () {
		jq191("#adv_search_by_date_container").slideToggle('slow');
	});
	
	jq191('#adv_search_date_range').change(function(){
		if (jq191('#adv_search_date_range').val() != 'from'){
			jq191('#datepicker2').css('display','none');
			jq191('#datepickerTo').css('display','none');
			jq191('#datepicker2').val('');
		}else{
			jq191('#datepicker2').css('display','block');
			jq191('#datepickerTo').css('display','block');
		}
	});
	
	jq191("#advanced_search_button").click(function(){
		var term = '/searchterm/';
		var field = '/field/';
		var mode = '/mode/';
		var conn = '/conn/';
		var collection = '';
		
		var colString = [];
		jq191('.collBoxes:checked').each(function() {
			colString.push(jq191(this).val());
		});
		var cleanCol = colString.join(",");
		cleanCol = cleanCol.replace(/\//g,"");
		cleanCol = cleanCol.replace(/,/g,"!");
		collection = '/collection/' + cleanCol;
		
		for (i=0; i< jq191('.adv_search_row').length; i++){
			if (i > 0){
				term = term + '!' + jq191('#rid'+i+'_term').val();
				field = field + '!' + jq191('#rid'+i+'_field').val();
				mode = mode + '!' + jq191('#rid'+i+'_mode').val();
				conn = conn + '!' + jq191('#rid'+i+'_connector').val();
			}else{
				term = term + jq191('#rid'+i+'_term').val();
				field = field + jq191('#rid'+i+'_field').val();
				mode = mode + jq191('#rid'+i+'_mode').val();
				conn = conn + jq191('#rid'+i+'_connector').val();
			}
		}
		if( jq191('#datepicker1').val() && jq191.isNumeric(jq191('#datepicker1').val())) {
			var date1string=jq191('#datepicker1').val();
			var cleandate1=date1string.replace(/\//g,"");
			if( jq191('#datepicker2').val() ){
				var date2string=jq191('#datepicker2').val();
				var cleandate2=date2string.replace(/\//g,"");
				term = term + '!' + cleandate1 + '-' + cleandate2;
			}else{
				term = term + '!' + cleandate1 + '-' + '99999999';
			}
			field = field + '!' + 'date';
			conn = conn + '!' + 'and';
			mode = mode + '!' + 'exact';
		}
		window.location= "http://content.wwu.edu/cdm/search" + collection + term + field + mode + conn + "/order/nosort";
	});
	
	function getAdvMore(n){
		var advMore = '<li id="rid'+n+'" class="adv_search_row "><ul class="adv_search_ul_row"><li class="leftside"><select id="rid'+n+'_mode" class="adv_search_type_dd" ><option selected="selected" value="all">All of the words</option><option value="any">Any of the words</option><option value="exact">The exact phrase</option><option value="none">None of the words</option></select></li><li class="leftside spaceMar5L"><input id="rid'+n+'_term" class="adv_search_str" type="text" value=""></li><li class="leftside spaceMar5L spacePad5">in</li><li class="leftside spaceMar5L"><select id="rid'+n+'_field" class="adv_search_domain_dd"><option selected="selected" value="all">All fields</option><option value="title">Title</option><option value="subjec">Subject</option><option value="descri">Description</option><option value="date">Date</option></select></li><li class="leftside spaceMar5L"><select id="rid'+n+'_connector" class="adv_search_and_or_dd"><option selected="selected" value="and">and</option><option value="or">or</option></select></li><li class="adv_search_option_remove_link_box leftside spaceMar10L spacePad5"><a class="remove_adv_search_row_link action_link_10" href="javascript://" rid="rid'+n+'">remove</a></li></ul><span class="clear"></span></li>';
		return advMore;
	}

	
});


