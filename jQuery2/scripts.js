$(document).ready(function() {

	var listo = []; // this is the array where we store our task objects
 	$('#newTaskForm').hide(); //new task form will stay hidden until the new button is clicked
 	//this needs to be at the top so that our page loads with it hiding      

 	var Task = function(task) { //this is the constructor function
	this.task = task;
	this.id = 'new';
    }
//   This is our addTask function
    var addTask = function(task) { //function addTask(task)
	if(task) { //if there is input in the field then task is true
		task = new Task(task); //create a new task object with task property with constructor
		listo.push(task); //push said task function into "listo" array

		$('#newItemInput').val('');// value of the input field *** isn't assigned to var?

		$('#newList').append('<a href="finish" class="" id="item"><li class="list-group-item">' + task.task + 
		'</li></a>');//grabs newList div, adds task.task as li *****link has to be finish?
	}
	$('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
}; //fade toggle will fade in the hidden input/buttons and fade out the create new list button


	var advanceTask = function(task) {
		var modified = task.innerText.trim()
		for (var i = 0; i < listo.length; i++) {
			if (listo[i].task === modified) {
				if(listo[i].id === "new") {
					listo[i].id = "inProgress";
				} else if (listo[i].id === "inProgress") {
					listo[i].id = "archived";
				} else {
					listo.splice(i, 1);
				}
				break;
			}
		}
		task.remove();
	};
 
	$("#saveNewItem").on("click", function (e) { //*****what is being passed in as e?****
		e.preventDefault(); // what exactly is prevenDefault doing?
		var task = $("#newItemInput").val().trim(); //var task is assigned the input
		addTask(task); //task/userinput is passed into the addTask function. see line 12 
	});
	//opens form w/ click on button, function 
	$("#newListItem").on("click", function() {
		$("#newTaskForm, #newListItem").fadeToggle("fast", "linear");
	});
	//closes form
	$("#cancel").on("click", function(e) { //grabs cancel button, when clicked fadetoggle
		e.preventDefault();
		$("#newTaskForm, #newListItem").fadeToggle("fast", "linear");
	});

$(document).on("click", "#item", function(e) {
	e.preventDefault();
	var task = this;
	advanceTask(task);
	this.id = "inProgress";
	$("#currentList").append(this.outerHTML);
});

$(document).on("click", "#inProgress", function(e) {
	e.preventDefault();
	var task = this;
	task.id = "archived";
	var changeIcon = task.outerHTML.replace("glyphicon-arrow-right", "glyphicon-remove");
	advanceTask(task);
	$("#archivedList").append(changeIcon);
});

$(document).on("click", "#archived", function (e) {
	e.preventDefault();
	var task = this;
	advanceTask(task);
})

 console.log("still working");











});