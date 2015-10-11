var partsJson = null;
var seachString = " ";
var searchByMission = false;

$(function() {
  $("#searchBox").focus();

  $.getJSON( "parts.json", function(data) {
     partsJson = data; 
     updateTable();
  });

  $("#searchBox").keyup(function() {
    seachString = $("#searchBox").val();

    updateTable();
  });

  $("#toggleSearchType").click(function() {
    $("#searchBox").val("");
    $("#searchBox").focus();
    seachString = " ";
    updateTable();

    searchByMission = !searchByMission;

    if(searchByMission === true){
      $("#searchHeader").text("Type the name of the mission you want:");
      $("#toggleSearchType").text("Search by Part Name");
    }
    else {
      $("#searchHeader").text("Type the name of the part you want:");
      $("#toggleSearchType").text("Search by Mission Name"); 
    }
  });

});

function updateTable(){
  $("#partsTable").empty();

  $.each( partsJson, function( key, val ) {
    header = "";
    
    if(key.indexOf(seachString.toUpperCase()) > -1 || searchByMission === false) {
      header = "<tr><th>" + key.toUpperCase() + "</th></tr>";
    }
    
    

    if (header !== "") {
      lines = "";

      for (var i = 0; i < val.length; i++) {
        if (val[i].indexOf(seachString.toUpperCase()) > -1 || searchByMission === true) {
          lines += "<tr><td>" + val[i].toUpperCase() + "</td></tr>";
        }
      };
      if(lines !== "") {
        $("#partsTable").append(header + lines);
      }
    }
  });
}
