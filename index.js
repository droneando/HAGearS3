// TODO Use some type of requireJs or custom stuff like settingsUI
// require ViewNetadata from /js/view/ViewMetadata.js 
$(function () {
	var viewManager;
	
	function attachButtonListeners() {
		
		// Settings button listener
		$('#setup-button').click(function(){
			showSetup();
		});
		
		// Settings save button listener
		$('#setup-save-button').click(function() {
			var url = $('#setup-url').val();
			var password = $('#setup-password').val();
			
			HAServices.updateCredentials(url, password);
			history.back();
			initialFetch();
		});
		
		// All navigation links
		$('#main-nav').on('click', '.nav-link', function(e) {
			var a = e.currentTarget;
			var view = a.dataset.id;
			
			if (viewManager && view) {
				viewManager.create(view);
				tau.changePage('entities');
			}
			
		});
		
		// refresh button on entities page
		$('#refresh-button').click(function(){
			refresh();
		});
		
		// Back button
		document.addEventListener('tizenhwkey', function onTizenhwkey(e) {
	        if (e.keyName === 'back') {
	            if (document.getElementsByClassName('ui-page-active')[0]
	                    .id === 'main' && !tau.activePage
	                    .querySelector('.ui-popup-active')) {
	            	tizen.application.getCurrentApplication().exit();
	            } else {
	            	if (needRefresh){
	            		refresh();
	            		needRefresh = false;
	            	}
	                history.back();
	            }
	        }
	    });
	}
	
	//Refresh function
	function refresh() {
		// Show loading indicator
		$('#entity-spinner').removeClass('hidden');
		HAServices.getEntities(function(data){
			viewManager.update(data);
			// Hide loading indicator
			$('#entity-spinner').addClass('hidden');
		});
	}
	
	//Show Setup
	function showSetup() {
		tau.changePage('setup');
		var creds = HAServices.getCredentials();
		var url = creds.url;
		if (url) {
			$('#setup-url').val(url);
		} else {
			//Set default value for url
			$('#setup-url').val("http://192.168.1.165:8123");
		}
	}
	
	// Initial load
	function initialFetch() {
		// Show spinner initially
		$('#main-spinner').removeClass('hidden');
		HAServices.getEntities(function(data){
			viewManager = new ViewManager(data);
			// Hide the spinner again after loading
			$('#main-spinner').addClass('hidden');
		}, function(xhr, status, message) {	
			// TODO more status to message conversions?
			if (!message) {
				if (xhr.status === 0) {
					message = TIZEN_L10N['check_network'];
				} else {
					message = TIZEN_L10N['unknow_error'];
				}
			}
			
			// Show error popup
			$('#main-spinner').addClass('hidden');
			$('#error-popup-contents').text(TIZEN_L10N['error'] + TIZEN_L10N['status_code'] + xhr.status + "\n" + TIZEN_L10N['message'] + message);
			tau.changePage('error-popup');
		});
	}
	
	function main() {
		attachButtonListeners();
		var runBefore = localStorage.getItem('ha-run-before');

		if (runBefore) {
			initialFetch();
		} else {
			$('#error-popup-contents').text(TIZEN_L10N['first_time']);
			tau.changePage('error-popup');
			localStorage.setItem('ha-run-before', true);
			showSetup();
		}
	}
	
	main();
});