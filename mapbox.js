var startPoint = [14.07857, 100.6021323];
var map = L.map('map', {
    trackResize: true,
    zoomControl: false
}).setView(startPoint, 8);

var Google = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    attribution: '&copy; google',
    minZoom: 2,
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(map);

var LatStart = null;
var LngStart = null;
var LatEnd = null;
var LngEnd = null;

var control = L.Routing.control({
	waypoints: [L.latLng(LatStart, LngStart), L.latLng(LatEnd, LngEnd)],
    geocoder: L.Control.Geocoder.nominatim(),
    routeWhileDragging: true,
    reverseWaypoints: true,
    showAlternatives: true,
    altLineOptions: {
        styles: [
            { color: 'black', opacity: 0.15, weight: 9 },
            { color: 'white', opacity: 0.8, weight: 6 },
            { color: 'blue', opacity: 0.5, weight: 2 }
        ]
    },
	router: L.Routing.mapbox('pk.eyJ1IjoicGh1c2l0ciIsImEiOiJjazY3YzFxaXMwMTNjM21vdWlkbGJ6a2h5In0.JdD-PSvcCikzesyDNAlGlA')
}).addTo(map);

L.Routing.errorControl(control).addTo(map);

control.on('routeselected', function(e) {
    var coord = e.route.coordinates;
    var distance = e.route.summary.totalDistance;
    let totalSeconds = e.route.summary.totalTime;

    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.round(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    console.log(String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0"));

    if (distance >= 1000) {
        console.log('Total distance is ' + distance / 1000 + ' km ');
    } else {
        console.log(distance + ' m');
    }

    var Start = e.route.waypoints[0].name;
    var Destination = e.route.waypoints[e.route.waypoints.length - 1];

    console.log("Start => " + Start);
    console.log("Destination => " + Destination.name);

    var coordinates = [];
    for (var i = 0; i < coord.length; i++) {
        coordinates.push([coord[i].lat, coord[i].lng]);
    }
    console.log(polyline.encode(coordinates))


});

//            ..,:;i;:::,,,..
//       ,:;ii11111111i11111ii;,                       ..,,::;:,,,...
//    :11t11iii;;;;;;;;;;;;;;iiii:                 ,;1111111111iiiiiii;:.
//  ,tt1i;;;;;;;;;;;;;;;;;iii;::;i;..           .;1t1ii;;;;;;;;;;;;;;;;ii;,
// i1i::::;;:::::::::::;1tffft1i:,:::;         it1i::;;;;:::::;;;;i1t1i:::;;,
// i::::::::::::::::::;1ttttttfft1i;i:        :1;:::::::::::::::i1ffffft1;::i,
// ,:::::,,,:,,,,,,::ittttttttttttt1;,        :::::::::::::::::itttttttttt1i;.
// ,::::,,,,,,,,,,,:;1ttttttttttttt1i.       ,:::::,,,,,,,,,,:;tttttttttttt1:
// ,:::,,,,,,,,,,,,,;tttttttftttttttLf;     .:::::,,,,,,,,,,,:1tttttt111ttt1i.
// ,:,,,,,.,,,,,,,,,,iffttt11G00GffLiL8,   .::::::,,,,,,,,,,,,ittttttLCCLttLGL.
// ,,,,........,,,.,.,;1ttt, G@0Gttf;1L.  .:::::,,...,,,,,,,,,:1ttttG801;tfC8i
// ,,..................,i11;;11iifftf;    .::,,,,.......,,,....,:1t1tti.:tft1,
// ,,,,................,:i111ii1ffffLt:.  .,,,.,,................:11i;;1tffft:
// .,;;................:ii1ttffffttttti:  .,...,;;,.............,;i1ttffffffft:
//  .,................,ii1tttttttt1:...,.  .,...::,............,;11ttttttt1;:,,
//   .................:;;:;;;iiiii:,..      .,.................,i;;iiii111;. .
//    ..  ......  ....,:;iiiiiiiii;;.        .,.. .........  ..,:;;;;;;;;;:::.
//     ...          ...,,,,,,,:::;:.          .:;,        ......,::;;:;;;i;:.
//      .1ft1i;,...     .........,.           .:1tii;:,,...      .......,,:
//       iftfttt1tttt11i;::,...  ..             1tfftttffftt1iii;:,,..   ..
//     :tLLft111ii;;iii1111111i;;;:           .tCLLf111iiiiii111ttt111i;::
// ::;L0GfLLCCCCCCLt1i;;;;;ittft111;:,,..,::;1G0LfLCCCCLLLft1ii;;;;iii1111;::::::::