/**
 * Create an entity list given metadata about this list. See ViewMetadata for all of the entity specific metadata.
 * The reason that we do it this way is because so far all of the entites behave the same exact way with slight differences.
 * Icons, Services that they call on toggle, etc...
 */
var ViewManager = (function() {
	
	// Item template
	var TEMPLATE = [
		'<li class="entity-list-item li-has-toggle %1" data-entity-id="%2">',
			'<label>',
		 			'<div class="name-container ui-marquee ui-marquee-gradient">',
						"%3",
					'</div>',
				'<div class="icon-container %4-icon-container">',
					'<div class="mdi mdi-48px %5"></div>',
				'</div>',
			'</label>',
		'</li>'].join('\n');
	
	/**
	 * Constructor
	 * @param entity The json object with all of the entity information
	 */
	function ViewManager(entities) {
		this.entities = entities;
		this.currentPage = "";
	}
	
	/**
	 * Create an entity list and register the click handlers for each entity in the list
	 * @param metadata View metadata
	 */
	ViewManager.prototype.create = function(room) {
		createDom(this.entities, room);
		registerEventHandlers();
		this.currentPage = room;
	};
	
	/**
	 * Update the current page with new entities
	 * @param entities All of the entities in HomeAssistant
	 */
	ViewManager.prototype.update = function(entities) {
		this.entities = entities;
		if (this.currentPage) {
			this.create(this.currentPage);
			
			// This is necessary since we blow the dom away. It makes the snaplist work again
			// The snaplist meaning, it selects an item as you scroll. Also handles marquee scrolling
			var list = document.getElementById('entity-list');
			snapList = tau.widget.SnapListview(list);
			snapList.refresh();
		}
	}
	
	//Helper to find index of element
	function findWithAttr(array, attr, value) {
	    for(var i = 0; i < array.length; i += 1) {
	        if(array[i][attr] === value) {
	            return i;
	        }
	    }
	    return -1;
	}

	// Helper method to create the list dom from the entities
	function createDom(entities, room) {
		var roomEntities;
		switch (room) {
		    case "living_room":
		    	roomEntities = living_roomEntities;
		        break; 
		    case "dinning_room":
		    	roomEntities = dinning_roomEntities;
		        break; 
		    case "terrace":
		    	roomEntities = terraceEntities;
		        break; 
		    case "heaters":
		    	roomEntities = heatersEntities;
		        break;
		}
		
		var domString = "";
		for (var i=0;i<roomEntities.length;i++) {
			var element = roomEntities[i];
			var a = findWithAttr(entities, "entity_id", element);
			
			if (a != -1) {
				domString = domString + createListItem(entities[a], ViewMetadata[element]);
			}
		}
		
		$('#entity-list').html(domString);
		$('#entity-list-title').html(TIZEN_L10N[room]);
	}
	
	// Helper to register click handlers for the list items
	registerEventHandlers = function() {
		$('.entity-list-item').click(function(e) {
			var li = e.currentTarget;
			var entity_id = li.dataset.entityId;
			var select = ViewMetadata[entity_id].select;
			var deselect = ViewMetadata[entity_id].deselect;
			// We have to flip the value since the input has changed when we get the event
			var selected = li.classList.contains("selected");
			if (selected) {
				// TODO FIX makes assumptions that deselect is a function that needs to be invoked in the context of the services class
				deselect.call(HAServices, entity_id);
				li.classList.remove("selected");
			} else {
				// TODO FIX makes assumptions that deselect is a function that needs to be invoked in the context of the services class
				select.call(HAServices, entity_id);
				li.classList.add("selected");
			}

			needRefresh = true;
			
			//Entities refreshing. NOT WORKING - LOOP
			/*if (ViewMetadata[entity_id].refresh == "yes") {
				// show loading indicator
				//$('#entity-spinner').removeClass('hidden');
				
				HAServices.getEntities(function(data){
					if (data){
						this.update(data);
					}
					//this.update(data);
					
					// Hide loading indicator
					//$('#entity-spinner').addClass('hidden');
				});
			}*/
		});
	}
		
	// Create a dom string representing an entity in the list
	 function createListItem (entity, metadata) {
		 var selected = entity.state === metadata.selectedState ? "selected" : "";
		 var icon = (entity.attributes.icon && entity.attributes.icon.replace(":", "-")) || 
		 	metadata.defaultIcon;
		 return TEMPLATE.replace(/%1/g, selected)
		 				.replace(/%2/g, entity.entity_id)
		 				.replace(/%3/g, entity.attributes.friendly_name)
		 				.replace(/%4/g, metadata.iconType)
		 				.replace(/%5/g, icon);
	}
	
	return ViewManager;
})();