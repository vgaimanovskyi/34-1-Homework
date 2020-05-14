const citiesList = [{
    city: 'Винница',
    code: "AB",
    lat: 49.2347128,
    lng: 28.3995942,
}, {
    city: 'Луцк',
    code: "AC",
    lat: 50.73977,
    lng: 25.2639652,
}, {
    city: 'Днепр',
    code: "AE",
    lat: 48.4619585,
    lng: 34.7201766,
}, {
    city: 'Донецк',
    code: "AH",
    lat: 47.9900323,
    lng: 37.6214374,
}, {
    city: 'Житомир',
    code: "AM",
    lat: 50.2678654,
    lng: 28.603678,
}, {
    city: 'Ужгород',
    code: "AO",
    lat: 50.2584281,
    lng: 28.6160376,
}, {
    city: 'Запорожье',
    code: "AP",
    lat: 47.8561438,
    lng: 35.0352704,
}, {
    city: 'Ивано-Франковск',
    code: "AT",
    lat: 48.9117518,
    lng: 24.6470893,
}, {
    city: 'Киев',
    code: "AI",
    lat: 50.401699,
    lng: 30.2525114,
}, {
    city: 'Кропивницкий',
    code: "BA",
    lat: 48.5187443,
    lng: 32.1456233,
}, {
    city: 'Луганск',
    code: "BB",
    lat: 48.5799791,
    lng: 39.2168845,
}, {
    city: 'Львов',
    code: "BC",
    lat: 49.8326679,
    lng: 23.9421959,
}, {
    city: 'Николаев',
    code: "BE",
    lat: 46.9329791,
    lng: 31.8679137,
}, {
    city: 'Одесса',
    code: "BH",
    lat: 46.4598865,
    lng: 30.5717042,
}, {
    city: 'Ровно',
    code: "BK",
    lat: 50.6110475,
    lng: 26.1745436,
}, {
    city: 'Сумы',
    code: "BM",
    lat: 50.9006445,
    lng: 34.7441744,
}, {
    city: 'Тернополь',
    code: "BO",
    lat: 49.5483334,
    lng: 25.5276293,
}, {
    city: 'Харьков',
    code: "AX",
    lat: 49.994507,
    lng: 36.1457419,
}, {
    city: 'Херсон',
    code: "BT",
    lat: 46.6495511,
    lng: 32.5377418,
}, {
    city: 'Хмельницкий',
    code: "BX",
    lat: 49.4105308,
    lng: 26.9252189,
}, {
    city: 'Черкассы',
    code: "CA",
    lat: 49.4311119,
    lng: 31.9791903,
}, {
    city: 'Чернигов',
    code: "CB",
    lat: 51.4957591,
    lng: 31.2204989,
}, {
    city: 'Черновцы',
    code: "CE",
    lat: 48.3213267,
    lng: 25.8638788,
}];

$(document).ready(function () {
    const sortCitiesList = citiesList.sort(function (a, b) {
        return a.city > b.city ? 1 : -1;
    });
    for (let city of sortCitiesList) {
        let option = document.createElement("option");
        option.value = city.code;
        option.text = city.city;
        document.getElementById("start").appendChild(option);
    }
    for (let city of sortCitiesList) {
        let option = document.createElement("option");
        option.value = city.code;
        option.text = city.city;
        document.getElementById("finish").appendChild(option);
    }
})
let roadList = [];
function getRoute() {
    const a = document.getElementById("start").value;
    const b = document.getElementById("finish").value;
    for (let city of citiesList) {
        if (a === city.code) {
            roadList.push(city);
        }
        if (b === city.code) {
            roadList.push(city);
        }
    }
    initMap()
    roadList = [];
}
// Initialize and add the map
function initMap() {
    class Map {
        constructor(_lat, _lng, _zoom) {
            this.lat = _lat;
            this.lng = _lng;
            this.zoom = _zoom;
        }

        buildMap(id) {
            const map = new google.maps.Map(document.getElementById(id), {
                zoom: this.zoom,
                center: { lat: this.lat, lng: this.lng }
            });
            for (let city of roadList) {
                const ourMarker = new Marker(city);
                ourMarker.buildMarker(map)
            }
            const directionsService = new google.maps.DirectionsService();
            const directionsRenderer = new google.maps.DirectionsRenderer();
            directionsRenderer.setMap(map);
            const request = {
                origin: new google.maps.LatLng(roadList[0].lat, roadList[0].lng), //точка старта
                destination: new google.maps.LatLng(roadList[1].lat, roadList[1].lng), //точка финиша
                travelMode: "DRIVING" //режим прокладки маршрута
            };

            directionsService.route(request, function (result, status) {
                if (status == "OK") {
                    directionsRenderer.setDirections(result);
                }
            });

        }
    }
    class Marker {
        constructor(city) {
            this.city = city.city;
            this.lat = city.lat;
            this.lng = city.lng;
        }
        buildMarker(map) {
            const marker = new google.maps.Marker({ position: { lat: this.lat, lng: this.lng }, map: map });

        }
    }
    const ourMap = new Map(50.4256543, 30.4499014, 6);
    ourMap.buildMap('map');

}