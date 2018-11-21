const input=document.querySelector('.inputTxt');

loadAllTodos();


// ========Load todos from localStoarge function=========== //
function loadAllTodos(){
	// Checking if todos key exist in local storage, if not then create one with empty object. 
	if(localStorage.getItem('todos')===null){
		localStorage.setItem('todos',JSON.stringify([]));
	}
    const todos=JSON.parse(localStorage.getItem('todos'));
    	console.log("Loading todos from localStorage....")
        todos.forEach((item)=>{
        //Calling addLi function to add all todos from localStorage.
        $("#todoUl").append(`<li><span class='fa fa-trash'></span>${item}</li>`);
        });
}


// ========Creation of new todos=========== //
$(input).on("keypress",function(event){
	if(event.which===13){
		
	let todoText=this.value;
	//Calling saveTodoLocally function to save todo list in localStorage
	console.log('inserting...',todoText);
	saveTodoLocalStorage(todoText);

	/*Create an new li and add to ul */
	$("#todoUl").append(`<li><span class='fa fa-trash'></span>${todoText}</li>`);
	//Erasing input value after enter button.
	this.value="";
	}
});

// ========saveTodoLocally function=========== //
function saveTodoLocalStorage(val){
let tasksArr;
 if(JSON.parse(localStorage.getItem("todos")) === null){
     tasksArr=[];
 }
 else{
     tasksArr=JSON.parse(localStorage.getItem("todos"));
 }
 tasksArr.push(val);
 localStorage.setItem("todos",JSON.stringify(tasksArr));
}


/*Clicking plus button to focus to input type text*/
$(".fa-plus").on("click",function(){
	$("input[type='text']").fadeToggle();
});


/*Mark todos done by clicking them, Li is clicked inside the Ul */
	$("ul").on("click","li",function(){
		$(this).toggleClass("checked");
	})

/*Click on X span or trash icon to delete the todo*/
$("ul").on("click",".fa-trash",function(event){
	$(this).parent("li").fadeOut(function(){
		$(this).remove();
	});
	console.log("Deleting...",event.target.parentElement.innerText);
	deleteTodoLocalStorage(event.target.parentElement.textContent);
	event.stopPropagation();
});


// Delete todos from local Storage.
function deleteTodoLocalStorage(deleteTodo){
	let todos;
    if(localStorage.getItem('todos') ===null ){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }

	// Finding todo value to be deleted inisde by searching inside todosArray var using splice method.

	// Using For in loop
	// for(var prop in todos){
	//   console.log("Before",todosArray);
	//   if(todos[prop]===deleteTodo){
	//     todos.splice(prop,1)
	//     console.log("After",todosArray);
	//   	localStorage.setItem('todos',JSON.stringify(todos));
	//     break;
	//   }
	// }

	// Using For loop
	for(var i=0;i<=todos.length;i++){
    	if(deleteTodo===todos[i]){
        todos.splice(i,1);
        localStorage.setItem('todos',JSON.stringify(todos));
        break;
        }
    }
}

/* Delete all todos */
$('#deleteAllTodo').on('click',()=>{
	$('#todoUl li').fadeOut(function () {
		$(this).remove();
	});
	 localStorage.removeItem("todos");
})