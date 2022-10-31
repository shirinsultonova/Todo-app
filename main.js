const elForm = document.querySelector(".form")
const elInput = document.querySelector(".task-input")
const elList = document.querySelector(".form-list")
const countAll = document.querySelector(".all");
const complete = document.querySelector(".complete");
const uncomplete = document.querySelector(".uncomplete")



// localStorage
const arr = JSON.parse(window.localStorage.getItem("data")) || [];

// Form
elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    let elInputValue = elInput.value;
    
    var obj = {
        id: arr.length,
        user_name: elInputValue,
        isComplete: false
    }
    
    if(elInputValue !== ""){
        arr.push(obj)
        elInput.value = "";
    }

    window.localStorage.setItem("data", JSON.stringify(arr))
    
    renderTodo(arr, elList)
    counterCompletance()
})



// Render
function renderTodo(array, ullist){
    ullist.innerHTML = "";
    
    array.forEach(obj =>{
        let elItem = document.createElement("li")
        elItem.classList.add("form-item")
        let elDesc = document.createElement("p")
        elDesc.textContent = obj.user_name;
        elDesc.classList.add("fw-bold", "ms-3")
        let deleteButton = document.createElement("button")
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.dataset.id = obj.id;        
        let elCheckboxInput = document.createElement("input")
        elCheckboxInput.type = "checkbox";
        elCheckboxInput.classList.add("form-check-input")
        elCheckboxInput.dataset.id = obj.id
        let elEdit = document.createElement("button")
        elEdit.dataset.id = obj.id
        elEdit.classList.add("btn", "btn-success", "text")
        elEdit.textContent = "Edit"
        if(obj.isComplete == true){
            elCheckboxInput.checked = true;
            elDesc.style.textDecoration = "line-through"
        }
        let wrapperDiv = document.createElement("div")
        wrapperDiv.classList.add("d-flex", "pt-3")

        wrapperDiv.appendChild(elCheckboxInput)
        wrapperDiv.appendChild(elDesc)
        wrapperDiv.appendChild(elEdit)
        elItem.appendChild(wrapperDiv)
        elItem.appendChild(deleteButton);
        ullist.appendChild(elItem);
    })
    
}
renderTodo(arr, elList)


elList.addEventListener("click", function(evt){
    // Delete 
    if(evt.target.matches(".btn-danger")){
        let btnId = Number(evt.target.dataset.id);
        let itemFind = arr.findIndex(obj => obj.id == btnId);
        arr.splice(itemFind, 1)
        window.localStorage.setItem("data", JSON.stringify(arr))
        renderTodo(arr, elList)
        counterCompletance()
    }

    // Checkbox 
    if(evt.target.matches(".form-check-input")){
        let InputId = Number(evt.target.dataset.id);
        let itemFind = arr.find(obj => obj.id === InputId)
        itemFind.isComplete = !itemFind.isComplete
        window.localStorage.setItem("data", JSON.stringify(arr))
        renderTodo(arr, elList)
        counterCompletance()
    }
})

function counterCompletance(){
    countAll.textContent = arr.length

    let completeArr = arr.filter(obj => obj.isComplete == true)
    complete.textContent = completeArr.length;

    let unCompletArr = arr.filter(obj => obj.isComplete !== true)
    uncomplete.textContent = unCompletArr.length;

    countAll.addEventListener("click", function(){
        renderTodo(arr, elList)
    })

    complete.addEventListener("click", function(){
        renderTodo(completeArr, elList)
    })

    uncomplete.addEventListener("click", function(){
        renderTodo(unCompletArr, elList)
    })
}
counterCompletance()


elList.addEventListener("click", function(evt){
    if(evt.target.matches(".text")){
        let firstValue = evt.target.textContent;
        let elPrompt = prompt("enter your todo", firstValue);
        let textId = Number(evt.target.dataset.id);
        let itemFind = arr.find(obj => obj.id === textId);
        if(elPrompt !== ""){
            itemFind.user_name = elPrompt
            window.localStorage.setItem("data", JSON.stringify(arr));
            renderTodo(arr, elList)
        }
    }
})


formSearch.addEventListener("keyup", function(evt){
    let searchInput = inputSearch.value;
    let searchItem = arr.filter(obj => {
        return obj.user_name.includes(searchInput)
    })
    renderTodo(searchItem, elList)
})