// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
let dataReturned
//get refrences
let container = document.getElementById("container")
let menuButton = document.getElementById("menu_button")//initialize a conection to database
let db = firebase.firestore();
let truck1Map = false

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

    
    
    function initMap(){
        //Abisheks website https://abhishekasc4.github.io/DemoDay/
        // google.maps.Map() returns a map object that we can manipulate.
        // Takes two arguments, the element to put the map onto, and an object containing some initialization parameters
        let map = new google.maps.Map(document.getElementById("map"),{
            zoom: 18,
        center:  new google.maps.LatLng(40.727835, -74.006774) // google.maps.LatLng() creates an object containing the latitude and longitude provided, Lat is first, Lng is second
    })

    let userPosition = new google.maps.Marker({
        position: new google.maps.LatLng(40.727835, -74.006774), 
        map: map,
        title: "idk"
    })
    
    let foodTruckOne = new google.maps.Marker({
        position: new google.maps.LatLng(40.727323, -74.007096), 
        map: map,
        title: "idk"
    })


    
    //something happens when you click on the point
    foodTruckOne.addListener('click', function () {
        if(truck1Map == false){
            console.log("working")
            queryDatabase("food trucks","AaxZ10EyYSc1u4daxN8k",truckInfo)
            truck1Map = true
        }
        else{}
    });
}
function truckInfo(response){
    let dataReturned = response.data()
    console.log(dataReturned.name)
    container.innerHTML += 
    `
        <div class= "food_truck">
        title: ${dataReturned.name} <br>
        ${dataReturned.image}<br>
        <button id="menu_button" onclick="htmlChange()">Menu</button>
        Description: ${dataReturned.about}
        </div>
        `
        let truckRefs = document.getElementsByClassName("food_truck")
        console.log(truckRefs)
        
    
    }


function htmlChange(divRef){
    console.log('shabbat shalom');
    divRef.innerHTML = ""
    
}