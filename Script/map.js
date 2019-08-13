// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
let dataReturned;
//get refrences
let container = document.getElementById("container")
let menuButton = document.getElementById("menu_button")//initialize a conection to database
let db = firebase.firestore();
// queryDatabase("food trucks","AaxZ10EyYSc1u4daxN8k",truckInfo);

function logData(response){
    dataReturned = response.data();
    console.log(dataReturned)
}


/*
    Asks for three parameters:
    1) Name of the collection in the firestore to look into eg. "food trucks"
    2) Id of the specific object in the firestore to look into eg. "AaxZ10EyYSc1u4daxN8k"
    3) Name of function to execute on what we get back eg. logData    (referenced above)
    */
   function queryDatabase(collectionName,refId, code){ 
       db.collection(collectionName).doc(refId).get().then(code);
    }
    
let map;
let foodTruckOne;
let foodTruckTwo;
let foodTruckThree;
let foodTruckArray;

    function initMap(){
        //Abhisheks website https://abhishekasc4.github.io/DemoDay/
        // google.maps.Map() returns a map object that we can manipulate.
        // Takes two arguments, the element to put the map onto, and an object containing some initialization parameters
        map = new google.maps.Map(document.getElementById("map"),{
            zoom: 18,
            center:  new google.maps.LatLng(40.727835, -74.006774) // google.maps.LatLng() creates an object containing the latitude and longitude provided, Lat is first, Lng is second
        })
        
        let userPosition = new google.maps.Marker({
        position: new google.maps.LatLng(40.727835, -74.006774), 
        map: map,
        title: "idk"
    })
    
    // let foodTruckOne = new google.maps.Marker({
    //     position: new google.maps.LatLng(40.727323, -74.007096), 
    //     map: map,
    //     title: "idk"
    // })
    //Makes new food truck
    foodTruckOne = new Truck(40.727323, -74.007096, "Yankee Doodle Dandy's", "AaxZ10EyYSc1u4daxN8k","foodTruckOne")
    foodTruckTwo = new Truck(40.728022, -74.007018,"salsa unity","0SClKwobUAnBcNV8cq0N","foodTruckTwo")
    foodTruckThree = new Truck(40.727382, -74.007676,"Los Pollos Hermano's","LWM3o7Ei2cNJPBuRtRQK","foodTruckThree")
    foodTruckArray = [foodTruckOne,foodTruckTwo,foodTruckThree]
    // foodTruckOne.addInfo();
        
}

class Truck {
    //htmlId must be the id used in the same as the variable name (referd on line 49)
    constructor(lat,lng, title, id,htmlId,scrollPosition){
        this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat,lng),
            map: map,
            title: title
        });
        //dat big letter/num
        this.id = id;
        //Firebase stuff
        this.data = this.getData();
        this.htmlId = htmlId;
        this.marker.addListener('click',function(){
            // console.log(container.scrollTop, scrollPosition)
            container.scrollTop = scrollPosition;
            // console.log(container.scrollTop, scrollPosition)
            
        })
    }
    getData(){
        let me = this;
        queryDatabase("food trucks", this.id, function(response){
            console.log('hello')
            me.data = response.data();
            me.addInfo();
        })
    }
    addInfo(){
        // console.log('test')
        container.innerHTML += 
    `
        <div class= "food_truck" id="${this.htmlId}">
        ${this.data.name} <br>
        <img src="${this.data.image}"><br>
        Description: ${this.data.about}br
        <button id="menu_button" onclick="${this.htmlId}.menuChange()">Menu</button>
        </div>
        `
        
    }
    menuChange(){
        let info = this.data
        container.innerHTML = `<ul>`;
        for(let i =0;i< info.MenuItem.length;i++){
            container.innerHTML += `<li>${info.MenuCost[i]} ${info.MenuItem[i]}</li>`
        }
        container.innerHTML += `</ul>`
        container.innerHTML += `<br> <br> <br> <button onclick = "goBack()">Go Back</button>`
        
        
        
    }
}


function goBack(){
    container.innerHTML = ""
   for(let i=0;i<foodTruckArray.length; i++){
       foodTruckArray[i].addInfo();
   }

    
}


function loadDatabase(){
    
        console.log("working")
        queryDatabase("food trucks","AaxZ10EyYSc1u4daxN8k",truckInfo)
     

   
}

