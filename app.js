//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.querySelector(".todo-app__task-lists");//ul of #incompleteTasks
var completedTasksHolder=document.querySelector(".todo-app__task-lists--complite");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.classList.add("todo-app__task-list")

    var article = document.createElement("article")
    article.classList.add("todo-app__item")

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    checkBox.classList.add("input","todo-app__checkbox-input")
    var label=document.createElement("label");//label
    //input (text)
    label.classList.add("todo-app__task-label")
    var editInput=document.createElement("input");//text
    //button.edit
    editInput.classList.add("input", "todo-app__task-input", "todo-app__task-input--saved")
    var editButton=document.createElement("button");//edit button
    editButton.classList.add("button", "todo-app__btn")
    //button.delete
    var deleteButton=document.createElement("button");//delete button
    deleteButton.classList.add("button", "todo-app__btn-delete")
    var deleteButtonImg=document.createElement("img");//delete button image
    deleteButtonImg.classList.add("todo-app__delete-image")
    label.innerText=taskString;
    // label.className='task';

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    // editInput.className="task";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    // editButton.className="edit";

    // deleteButton.className="delete";
    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    article.appendChild(checkBox);
    article.appendChild(label);
    article.appendChild(editInput);
    article.appendChild(editButton);
    article.appendChild(deleteButton);
    listItem.appendChild(article)
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    var list=this.parentNode;
    var listItem = list.parentNode
console.log(listItem,"listItem");
    var editInput=listItem.querySelector('input[type=text]');
    var label=listItem.querySelector("label");
    var editBtn=listItem.querySelector(".todo-app__btn");
    var containsClass=listItem.classList.contains("todo-app__task-list--edit");
    //If class of the parent is .editmode
    if(containsClass){

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    editInput.classList.toggle("todo-app__task-input--edit")
    editInput.classList.toggle("todo-app__task-input--saved")
    label.classList.toggle("todo-app__task-label--edit")
    listItem.classList.toggle("todo-app__task-list--edit");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var li = listItem.parentNode;
    var ul=li.parentNode;
    //  console.log(ul,"ul");
    //Remove the parent list item from the ul.
    ul.removeChild(li);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var list = this.parentNode
    var listItem=list.parentNode;
    var label = listItem.querySelector(".todo-app__task-label");
    if (label) label.classList.add("todo-app__task-label--complited");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var list = this.parentNode; 
    var listItem = list.parentNode;
    var label = listItem.querySelector(".todo-app__task-label");
    if (label) label.classList.remove("todo-app__task-label--complited");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector(".todo-app__btn");
    var deleteButton=taskListItem.querySelector(".todo-app__btn-delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.