$(document).ready(function() {
  $("#submitButton").on("click", function (e) {
    e.preventDefault();

    var userAddress = $("#enterAddress").val();
    var googleApiUrl = "https://maps.googleapis.com/maps/api/geocode/json?";
    var apiKey = "AIzaSyAbGfA36DC0Yp6RXDLuR-lInAIKfgquxy0"
    googleApiUrl += "address=" + userAddress;
    googleApiUrl += "&key=" + apiKey;

    $.ajax({
      type: "GET",
      url: googleApiUrl,
      success: function (response) {
        var geoLocation = response.results[0].geometry.location;
        var geoLat = geoLocation.lat
        var geoLon = geoLocation.lng

        var issUrl = "http://api.open-notify.org/iss-pass.json?";
        issUrl += "lat=" + geoLat;
        issUrl += "&lon=" + geoLon;
        issUrl += "&callback=CALLBACK";

        $.ajax({
          type: "GET",
          url: issUrl,
          success: function (data) {
            console.log(data.response);
          }
        });
      }
    });

  });
});