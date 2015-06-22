exports.definition = {
	
	config: {
		
		columns: {
			"id_toDoList": "INTEGER PRIMARY KEY AUTOINCREMENT",
			"value": "TEXT",
			"hasCheck": "BOOLEAN"
		},

		adapter: {
			type: "sql",
			collection_name: "toDoList",
			idAttribute: "id_toDoList"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};