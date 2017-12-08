/*var ViewMetadata = {
	'switch': {
		name: 'switch',
		title: 'Switches',
		selectedState: 'on',
		select: HAServices.switchOn,
		deselect: HAServices.switchOff,
		defaultIcon: 'mdi-flash'
	},
	'light': {
		name: 'light',
		title: 'Lights',
		selectedState: 'on',
		select: HAServices.lightOn,
		deselect: HAServices.lightOff,
		defaultIcon: 'mdi-lightbulb'
	},
	'script': {
		name: 'script',
		title: 'Scripts',
		selectedState: 'on',
		select: HAServices.scriptOn,
		deselect: HAServices.scriptOff,
		defaultIcon: 'mdi-file-document'
	},
	'cover': {
		name: 'cover',
		title: 'Covers',
		selectedState: 'closed',
		select: HAServices.coverClose,
		deselect: HAServices.coverOpen,
		defaultIcon: 'mdi-blinds'
	},
	'group': {
		name: 'group',
		title: 'Groups',
		selectedState: 'on',
		select: HAServices.groupOn,
		deselect: HAServices.groupOff,
		defaultIcon: 'mdi-account-multiple'
	}
};*/

var needRefresh = false;

var ViewMetadata = {
	'group.luces_salon': {
		name: 'living_room',
		title: 'Living Room Lights',
		selectedState: 'on',
		select: HAServices.groupOn,
		deselect: HAServices.groupOff,
		defaultIcon: 'mdi-lightbulb',
		iconType: 'light'
	},
	'group.focos_salon_comedor': {
		name: 'living_room',
		title: 'Living-Dinning Room Lights',
		selectedState: 'on',
		select: HAServices.groupOn,
		deselect: HAServices.groupOff,
		defaultIcon: 'mdi-lightbulb',
		iconType: 'light'
	},
	'group.focos_salon_tele': {
		name: 'living_room',
		title: 'Living Room-TV Lights',
		selectedState: 'on',
		select: HAServices.groupOn,
		deselect: HAServices.groupOff,
		defaultIcon: 'mdi-lightbulb',
		iconType: 'light'
	},
	'group.luces_chimenea': {
		name: 'dinning_room',
		title: 'Chimney Lights',
		selectedState: 'on',
		select: HAServices.groupOn,
		deselect: HAServices.groupOff,
		defaultIcon: 'mdi-lightbulb',
		iconType: 'light'
	},
	'switch.focos_comedor': {
		name: 'dinning_room',
		title: 'Dinning Room Lights',
		selectedState: 'on',
		select: HAServices.switchOn,
		deselect: HAServices.switchOff,
		defaultIcon: 'mdi-lightbulb',
		iconType: 'light'
	},
	'group.lamparas_terraza': {
		name: 'terrace',
		title: 'Terrace Lights',
		selectedState: 'on',
		select: HAServices.groupOn,
		deselect: HAServices.groupOff,
		defaultIcon: 'mdi-lightbulb',
		iconType: 'light'
	},
	'switch.guirnaldas': {
		name: 'terrace',
		title: 'Garlands',
		selectedState: 'on',
		select: HAServices.switchOn,
		deselect: HAServices.switchOff,
		defaultIcon: 'mdi-lightbulb',
		iconType: 'light'
	},
	'switch.termo_pasillo': {
		name: 'heaters',
		title: 'Water Heaters',
		selectedState: 'on',
		select: HAServices.switchOn,
		deselect: HAServices.switchOff,
		defaultIcon: 'mdi-flash',
		iconType: 'switch'
	},
	'switch.termo_dormitorio': {
		name: 'heaters',
		title: 'Water Heaters',
		selectedState: 'on',
		select: HAServices.switchOn,
		deselect: HAServices.switchOff,
		defaultIcon: 'mdi-flash',
		iconType: 'switch'
	}
};

var AllowedEntities = [
            "group.focos_salon_comedor",
            "group.focos_salon_tele",
            "group.luces_salon",
            "group.luces_chimenea",
            "group.lamparas_terraza",
            "switch.focos_comedor",
            "switch.guirnaldas",
            "switch.termo_dormitorio",
            "switch.termo_pasillo"
    ];

var AllowedRooms = [
           "living_room",
           "dinning_room",
           "terrace",
           "heaters"
   ];

var living_roomEntities = [
	        "group.luces_salon",
	        "group.focos_salon_comedor",
	        "group.focos_salon_tele"
	];

var dinning_roomEntities = [
	        "switch.focos_comedor",
	        "group.luces_chimenea",
	];

var terraceEntities = [
            "group.lamparas_terraza",
   	        "switch.guirnaldas"
   	];

var heatersEntities = [
           "switch.termo_dormitorio",
           "switch.termo_pasillo"
  	];
