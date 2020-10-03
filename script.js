//UI variables

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

//load items
loadItems();

//call event liseners
eventListeners();
function eventListeners() {
    //submit event
    form.addEventListener('submit', addNewItem);

    //delete an item
    taskList.addEventListener('click', deleteItem);

    //delete all item
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

//load items

function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    })
}

//get items from Local Storage
function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;


}

//set item to Local Storage
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

//delete item from Local Storage
function deleteAllItemFromLS(text) {
    items = getItemsFromLS();//elemanları aldık
    items.forEach(function (item, index) {
        if (item === text) {//o anki item
            items.splice(index, 1);//index bilgisinde itibaren 1 eleman silcez.
        }
    });
    localStorage.setItem('items',JSON.stringify(items));//yeni oluşan itemı locale  kayıt eder.
}

function createItem(text) {
    //create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));//inputun textini li içine eklemek için text elementi yaratıp appendChild ile li ye bağladık.

    //create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    //add a to li
    li.appendChild(a);

    //add li to ul
    taskList.appendChild(li);
}


//add new item
function addNewItem(e) {

    //console.log(input.value);inputa gelen değeri alma 
    if (input.value === '') {
        alert('add new  item');
    }

    //create item
    createItem(input.value);

    //save to Local Store
    setItemToLS(input.value);

    //clear input
    input.value = '';

    //console.log(li);


    e.preventDefault();
}


//delete an item
function deleteItem(e) {

    //console.log(e.target);//tıklanan eleman
    if (e.target.className === 'fas fa-times') {
        //2 parent yukarı cıkmalıyız li silmek için yani tıklanan çarpının li'si silinmesi için 
        if (confirm('are you sure ?')) {
            e.target.parentElement.parentElement.remove();

            //delete item from Local Storage
            deleteAllItemFromLS(e.target.parentElement.parentElement.textContent);

            //console.log(e.target.parentElement.parentElement.textContent); 
        }
    }
    e.preventDefault();//scroll bar aşağı yukarı oynamasın refresh etmesin

}

//delete all items
function deleteAllItems(e) {
    if (confirm('are you sure ?')) {//aler ile soru sorar seçim.iptal mi okmu?

        //taskList.innerHTML=' ';  //--birinci alternatif
        //console.log(taskList.childNodes);
        /*
        taskList.childNodes.forEach(function(item) {
            if (item.nodeType === 1) {//textnodeları ayıkladık
                item.remove();
            }
            
        });*/

        while(taskList.firstChild){//taskListin elemanı olduğu sürece döner
            taskList.removeChild(taskList.firstChild);
        }

        localStorage.clear();

    }
    e.preventDefault();
}



