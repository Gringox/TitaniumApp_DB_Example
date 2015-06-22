
// Opens the window
$.index.open();

// Create
$.btnInsert.addEventListener('click', function(e) {
	// Hides the keyboard in iOS
	$.tfInsert.blur();
	
	// If there is something in the textbox
	if ($.tfInsert.value != "") {
		// This how we are creating an instance of a model
		var listModel = Alloy.createModel("toDoList", {
			// With user inserted value
			value: $.tfInsert.value,
			hasCheck: false
		});
		
		// Save the model
		listModel.save();
		
		// Resets the model's state from the database
		Alloy.Collections.toDoList.fetch();
	}else{
		alert("Please fill out the text field above.");
	}
});

// Update (check/uncheck)
$.tbToDoList.addEventListener('click', function(e) {
	// Factory method for instantiating a Backbone collection of model objects
	var recoverDatabase = Alloy.createCollection("toDoList");
	
	// Make the query for the fetch
	recoverDatabase.fetch({query: "SELECT * FROM toDoList"});
	
	for (var i = 0; i < recoverDatabase.length; i++) {
		
		// Get the value of the id
		if (recoverDatabase.at(i).get("id_toDoList") == e.row.rowId) {
			var table = Alloy.createCollection("toDoList");
			
			table.fetch({query: "SELECT * FROM toDoList where id_ToDoList = " + e.row.rowId});
			
			// If the query returned with more than 0 rows
			if (table.length > 0) {
				// If the record("hasCheck") of the column is false
				if (table.at(0).get("hasCheck") == false) {
					e.row.hasCheck = true;
					
					// Set the value in the database
					table.at(0).set({
						id_toDoList: e.row.rowId,
						hasCheck: true
					});
					
					// Save it
					table.at(0).save();
				}else{
					e.row.hasCheck = false;
					
					// Set the value in the database
					table.at(0).set({
						id_toDoList: e.row.rowId,
						hasCheck: false
					});
					
					// Save it
					table.at(0).save();
				}
				
				// Get the latest database state
				Alloy.Collections.toDoList.fetch();
			}
		}
	}
});

// Alert to DELETE event
$.tbToDoList.addEventListener('longpress', function(e) {
	var tableViewEvent = e.row;
	var alertDialog = Ti.UI.createAlertDialog({
		title: 'Remove',
		message: 'Do you want to remove this ToDo?',
		buttonNames: ['Yes', 'No'],
		cancel: 1
	});
	alertDialog.show();
	
	alertDialog.addEventListener('click', function(e) {
		if (e.index == 0) { // clicked "Yes"
			removeRow(tableViewEvent);
		}
	});
});

// DELETE
function removeRow(_row) {
	var recoverDatabase = Alloy.createCollection("toDoList");
	
	recoverDatabase.fetch({query: "SELECT * FROM toDoList"});
	
	for (var i = 0; i < recoverDatabase.length; i++) {
		if (recoverDatabase.at(i).get("id_toDoList") == _row.rowId) {
			var table = Alloy.createCollection("toDoList");
			
			table.fetch({query: "SELECT * FROM toDoList where id_toDoList = " + _row.rowId});
			
			if (table.length > 0) {
				// Remove the row/ToDo
				table.at(0).destroy();
				Alloy.Collections.toDoList.fetch();
			}
		}
	}
}

Alloy.Collections.toDoList.fetch();
