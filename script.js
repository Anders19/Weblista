// 1. DOM - komma åt element ?
const sectionList = document.getElementById('sectionList')
const sectionNew = document.getElementById('sectionNew')
const sectionEdit = document.getElementById('sectionEdit')
const productTableBody = document.getElementById('productTableBody')
const submitNewButton = document.getElementById('submitNewButton')

const listLink = document.getElementById('listLink')
const newLink = document.getElementById('newLink')

const newName = document.getElementById('newName')
const newAge = document.getElementById('newAge')
const newNumber = document.getElementById('newNumber')
const newCity = document.getElementById('newCity')

const editName = document.getElementById('editName')
const editAge = document.getElementById('editAge')
const editNumber = document.getElementById('editNumber')
const editCity = document.getElementById('editCity')

const submitEditButton = document.getElementById('submitEditButton')

//Ändra stefan till en useremail
const baseApi = 'https://hockeyplayers.systementor.se/anders/player'

class hockeyspelare{
    constructor (id, name, age, number, city){
        this.id = id;
        this.name = name;
        this.age = age;
        this.number = number;
        this.city = city;

    }
}

function showSection(sectionsId){
    if(sectionsId == 'sectionList'){
        sectionList.style.display = "block";
        sectionNew.style.display = "none";
        sectionEdit.style.display = "none";
    }
    else if(sectionsId == 'sectionNew'){
        sectionList.style.display = "none";
        sectionNew.style.display = "block";
        sectionEdit.style.display = "none";
    }
    else if(sectionsId == 'sectionEdit'){
        sectionList.style.display = "none";
        sectionNew.style.display = "none";
        sectionEdit.style.display = "block";
    }
}

newLink.addEventListener("click",()=>{ 
        showSection('sectionNew');    
  });

  listLink.addEventListener("click",()=>{ 
    showSection('sectionList');    
});


submitNewButton.addEventListener("click",()=>{ 
    
    const newSpelare = {
        namn: newName.value,
        jersey: newNumber.value,
        age: newAge.value,
        born: newCity.value
    };

    const reqParams = {
        headers:{
            'Content-Type': 'application/json'
        },
        method:"POST",
        body:JSON.stringify(newSpelare)
    };
    fetch(baseApi,reqParams)
    .then(res=>res.json())
    .then(json=>{
        const spelare = new hockeyspelare(
            json.id,
            newName.value,
            newAge.value,
            newNumber.value,
            newCity.value)

            items.push(spelare);
            renderTr(spelare);
            showSection('sectionList');        
    })
       
});

submitEditButton.addEventListener("click",()=>{

    const changedPlayerValues = {
        namn: editName.value,
        jersey: editNumber.value,
        age: editAge.value,
        born: editCity.value
    };
    const reqParams = {
        headers:{
            'Content-Type': 'application/json'
        },
        method:"PUT",
        body:JSON.stringify(changedPlayerValues)
    };

    fetch(baseApi + '/' + editinghockeyspelare.id,reqParams)
        .then(response=>{
            refreshItems();
            showSection('sectionList');
        });
});

let editinghockeyspelare = null;

function editPlayer(id){
    editinghockeyspelare = items.find((item)=>item.id == id)
    editName.value = editinghockeyspelare.name;
    editAge.value = editinghockeyspelare.age;
    editNumber.value = editinghockeyspelare.number;
    editCity.value = editinghockeyspelare.city;
    showSection('sectionEdit');
}


function renderTr(hockeyspelare){
    let jsCall = `editPlayer(${hockeyspelare.id})`;
    let template = `<tr>
        <td>${hockeyspelare.name}</td>
        <td>${hockeyspelare.age}</td>
        <td>${hockeyspelare.number}</td>
        <td>${hockeyspelare.city}</td>
    <td><a href="#" onclick="${jsCall}">EDIT</td>
    </tr>`
    productTableBody.innerHTML = productTableBody.innerHTML + template;
} 
// 
//items = [new hockeyspelare(1, "Hans", 26, 8, "Malmö"), new hockeyspelare(2, "Filip", 32, 5, "Göteborg") ] ;

function refreshItems(){

    items = [];
    productTableBody.innerHTML = '';

    

    fetch(baseApi)
        .then(response=>response.json())
        .then(array=>{
            console.log(array)
            array.forEach(spelare=>{
                p = new hockeyspelare(spelare.id,
                    spelare.namn,
                    spelare.age,
                    spelare.jersey,
                    spelare.born)
                items.push(p)
        });
        items.forEach( (item) => {
            renderTr(item);
        });
    })
}

let items = [];
refreshItems();


//Loopa den
// för varje skapa tr, för varje skapa td:s 
//lägga in den nya tr:n som ett barn till  productTableBody

  

showSection('sectionList');

// 2. funktion showSection
// 3. events = händelsestyrd programmering
//      vid klick på länk -> showSection
// 4. arrayer med strängar
// 5. foreach!
// 6. classes - Product 
//      samt new:a in i array
// 7. 