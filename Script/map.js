// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
let dataReturned;
let menuOn = false
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
let foodTruckFour;
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
        title: "User Location",
    })
    
    // let foodTruckOne = new google.maps.Marker({
    //     position: new google.maps.LatLng(40.727323, -74.007096), 
    //     map: map,
    //     title: "idk"
    // })
    //Makes new food truck
    foodTruckOne = new Truck(40.727756, -74.007297, "Yankee Doodle Dandy's", "AaxZ10EyYSc1u4daxN8k","foodTruckOne",25)
    foodTruckTwo = new Truck(40.728022, -74.007018,"salsa unity","0SClKwobUAnBcNV8cq0N","foodTruckTwo",625)
    foodTruckThree = new Truck(40.727382, -74.007676,"Los Pollos Hermano's","LWM3o7Ei2cNJPBuRtRQK","foodTruckThree",1125)
    foodTruckFour = new Truck(40.727335, -74.007174,"Rafiqi's", "wW6gBGdwj4iyVUbjFCfl","foodTruckFour",1625)
    foodTruckArray = [foodTruckOne,foodTruckTwo,foodTruckThree,foodTruckFour]
    // foodTruckOne.addInfo();
        
}



class Truck {
    //htmlId must be the id used in the same as the variable name (referd on line 49)
    constructor(lat,lng, title, id,htmlId,scrollPosition){
        this.marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat,lng),
            map: map,
            title: title,
        });

        //dat big letter/num
        this.id = id;
        //Firebase stuff
        this.data = this.getData();
        this.htmlId = htmlId;
        this.marker.addListener('click',function(){
            if(menuOn == true){
                goBack();
                container.scrollTop = scrollPosition;
            }
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
        <div id="truck_name">${this.data.name} <br></div>
        <img src="${this.data.image}"><br>
        <br>
        ${this.data.location}
        <br><br>
        Description: ${this.data.about}<br>
        <button id="menu_button" onclick="${this.htmlId}.menuChange()">Menu</button>
        </div>
        `
        
    }
    menuChange(){
        let info = this.data
        menuOn = true
        let tempHTML = `
        <div id="menu">
        <img onclick= 'goBack()' id=back_arrow src="https://i.imgur.com/eC5QsFF.png"></img>
        <h2>${this.data.name}</h2>
        <ul>`;
        console.log('before')
        for(let i =0;i< info.MenuItem.length;i++){
            console.log('during')
            tempHTML += `<li id="list">${info.MenuCost[i]} ${info.MenuItem[i]}</li><br>`
        }
        console.log('after')
        tempHTML += `</ul></div>`
        container.innerHTML = tempHTML;
        
        
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

