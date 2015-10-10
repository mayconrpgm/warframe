var partsJson = null;
var seachString = " ";

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

});

function updateTable(){
  $("#partsTable").empty();

  $.each( partsJson, function( key, val ) {
    header = "<tr><th>" + key.toUpperCase() + "</th></tr>";
    lines = "";

    for (var i = 0; i < val.length; i++) {
      if (val[i].indexOf(seachString.toUpperCase()) > -1) {
        lines += "<tr><td>" + val[i].toUpperCase() + "</td></tr>";
      }
    };
    if(lines !== "") {
      $("#partsTable").append(header + lines);
    }
  });
}
