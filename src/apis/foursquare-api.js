export function searchPlaces(lat, long, query = "") {
    lat = 40.7243;
    long = -74.0018;
    const baseUrl = "https://api.foursquare.com/v2/venues/explore?client_id=ODZW5JKF2DDGFLXRTR1R4XQ5MODMUB0BQBMI3DJZXLAUVLAB&client_secret=QBI4ZTWXEO4ZGNAU4GTGLOJGETJMUSQBESUKXJCG04IUOP4A&v=20180323&limit=10";
    let url = `${baseUrl}&ll=${lat},${long}`
    if(query) {
        url += "&query=" + query;
    }

    return fetch(url)
    .then(function(response) {
        return response.json();
    });
    
}