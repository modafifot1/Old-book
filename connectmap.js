const googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyDxXsSWNquWZi78Atj2JUj8kSlJuCTGUaU'
});

// Geocode an address.

 function codeAddress(){
  const address = document.getElementById("address").value;
  document.getElementById('f').submit();
    googleMapsClient.geocode({
      address: address
    }, function(err, response) {
      if (!err) {
        document.getElementById("lat").value = response.json.results[0].geometry.location.lat;
        document.getElementById("lng").value = response.json.results[0].geometry.location.lng;
        
      }else{
        alert(err);
      }
    });

    function initialize(){
      alert("123");
    }
    
 }