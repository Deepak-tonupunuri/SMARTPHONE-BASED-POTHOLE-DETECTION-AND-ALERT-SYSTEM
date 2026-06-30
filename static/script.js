const firebaseConfig = {
  apiKey: "AIzaSyCOP3d6zwgkrvQuyD5jqHSJ92_AM89nevQ",
  databaseURL: "https://pothole-1812e-default-rtdb.asia-southeast1.firebasedatabase.app"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let map, userMarker, routeLine;

// THEME
function toggleTheme(){
  document.body.classList.toggle("dark");
}

// MAP
function initMap(lat, lon){
  map = L.map('map').setView([lat, lon], 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    .addTo(map);

  userMarker = L.circleMarker([lat, lon], {
    radius:8,
    color:"blue"
  }).addTo(map);
}

// MOVE USER
function moveMarker(lat, lon){
  userMarker.setLatLng([lat, lon]);
  map.panTo([lat, lon]);
}

// ALERT
function showAlert(){
  let box = document.getElementById("alertBox");
  box.style.display="block";
  setTimeout(()=> box.style.display="none",3000);
}

// 🔥 SMOOTHING
let buffer = [];
function smooth(val){
  buffer.push(val);
  if(buffer.length > 5) buffer.shift();
  return buffer.reduce((a,b)=>a+b)/buffer.length;
}

// 🔥 REAL SENSOR + ML
function startDetection(){

  if (typeof DeviceMotionEvent === "undefined") {
    alert("Sensor not supported");
    return;
  }

  window.addEventListener("devicemotion", async function(event){

    let acc = event.accelerationIncludingGravity;
    if(!acc.x || !acc.y || !acc.z) return;

    let features = [
      smooth(acc.x),
      smooth(acc.y),
      smooth(acc.z)
    ];

    try{
      let res = await fetch("http://192.168.29.51:5000/predict", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ features: features })
      });

      let data = await res.json();

      db.ref("prediction").set({
        result: data.prediction
      });

    }catch(err){
      console.log(err);
    }

  });

}

// FIREBASE LISTENER
db.ref("prediction").on("value", snapshot => {

  let data = snapshot.val();
  if(!data) return;

  if(data.result === 1){
    document.getElementById("status").innerText="🔴 Danger Pothole Ahead";
    showAlert();

    db.ref("potholes").push({
      latitude: userMarker.getLatLng().lat,
      longitude: userMarker.getLatLng().lng
    });

  } else {
    document.getElementById("status").innerText="🟢 Safe Drive";
  }

});

// ROUTE + GPS
async function getCoordinates(place){
  let res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`);
  let data = await res.json();
  return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
}

async function drawRoute(start,end){
  let res = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjY2Y2UyMDE0NjY5YTRlODNiZWQ4YzkwZDIzMjM1NDJlIiwiaCI6Im11cm11cjY0In0=&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`);
  let data = await res.json();

  let coords = data.features[0].geometry.coordinates.map(c=>[c[1],c[0]]);

  if(routeLine) map.removeLayer(routeLine);

  routeLine = L.polyline(coords,{color:"cyan"}).addTo(map);
  map.fitBounds(routeLine.getBounds());

  let summary = data.features[0].properties.summary;

  document.getElementById("distance").innerText=`Distance: ${(summary.distance/1000).toFixed(2)} km`;
  document.getElementById("duration").innerText=`Duration: ${(summary.duration/60).toFixed(1)} min`;
}

async function startJourney(){

  let s = document.getElementById("start").value;
  let d = document.getElementById("destination").value;

  let start = await getCoordinates(s);
  let end = await getCoordinates(d);

  if(!map) initMap(start[0], start[1]);

  drawRoute(start,end);

  navigator.geolocation.watchPosition(pos=>{
    let lat = pos.coords.latitude;
    let lon = pos.coords.longitude;

    document.getElementById("gps").innerText=`Lat:${lat.toFixed(5)} Lon:${lon.toFixed(5)}`;

    moveMarker(lat, lon);

  },()=>alert("Enable location"),{enableHighAccuracy:true});
}