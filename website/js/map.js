// Sync data between pages
syncData();

// Initialize the map centered on a specific location and set the zoom level
let map = L.map('map').setView([40.62840934394173, -8.648807713234888], 17  );

// Set up the OSM layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 19,
}).addTo(map);

// Add markers to the map
let marker1 = L.marker([40.627392048523724, -8.644731685282883]).addTo(map);
marker1.bindPopup(`
    <b>Lockers position A</b>
    <br/>
    <button class="button-16" onclick="option1('position A')">Small locker</button>
    <button class="button-16" onclick="option2('position A')">Medium locker</button>
    <button class="button-16" onclick="option3('position A')">Large locker</button>
`);

let marker2 = L.marker([40.627965334301955, -8.652392186832065]).addTo(map);
marker2.bindPopup(`
    <b>Lockers position B</b>
    <br/>
    <button class="button-16" onclick="option1('position B')">Small locker</button>
    <button class="button-16" onclick="option2('position B')">Medium locker</button>
    <button class="button-16" onclick="option3('position B')">Large locker</button>
`);

let marker3 = L.marker([40.63005849675103, -8.652503621232997]).addTo(map);
marker3.bindPopup(`
    <b>Lockers position C</b>
    <br/>
    <button class="button-16" onclick="option1('position C')">Small locker</button>
    <button class="button-16" onclick="option2('position C')">Medium locker</button>
    <button class="button-16" onclick="option3('position C')">Large locker</button>
`);

function option1(pos) {
    // Store data between pages
    sessionStorage.setItem('lockerPosition', pos);
    window.location.href = "smallLocker.html";
}

function option2(pos) {
     // Store data between pages
    sessionStorage.setItem('lockerPosition', pos);
    window.location.href = "mediumLocker.html";
}

function option3(pos) {
    // Store data between pages
    sessionStorage.setItem('lockerPosition', pos);
    window.location.href = "largeLocker.html";
}
