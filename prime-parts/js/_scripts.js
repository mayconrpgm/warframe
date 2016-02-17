var partsByMission = null;
var partsByName = {};
var seachString = " ";
var searchByMission = false;
var params = [], hash;
var q = document.URL.split('?')[1];
if(q != undefined){
    q = q.split('&');
    for(var i = 0; i < q.length; i++){
        hash = q[i].split('=');
        params.push(hash[1]);
        params[hash[0]] = hash[1];
    }
}

$(function() {
  $("#searchBox").focus();

  jsonName = "parts." + params['lang'] + ".json";

  $.getJSON(jsonName, function(data) {
    partsByMission = data; 

    $.each(partsByMission, function( k, v ) {
      for (var i = 0; i < v.length; i++) {
        if (!(v[i] in partsByName)) {
          partsByName[v[i]] = new Array(k);
        }
        else {
          partsByName[v[i]].push(k);
        }
      };
    });

    partsByMission = sortOnKeys(partsByMission);
    partsByName = sortOnKeys(partsByName);

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
    searchByMission = !searchByMission;
    updateTable();

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

  partsObject = searchByMission ? partsByMission : partsByName;

  $.each( partsObject, function( key, val ) {
    header = "";
    
    if(key.indexOf(seachString.toUpperCase()) > -1) {
      header = "<tr><th>" + key.toUpperCase() + "</th></tr>";
    }
    
    if (header !== "") {
      lines = "";

      for (var i = 0; i < val.length; i++) {
          lines += "<tr><td>" + val[i].toUpperCase() + "</td></tr>";
      };
      if(lines !== "") {
        $("#partsTable").append(header + lines);
      }
    }
  });
}

function sortOnKeys(dict) {

    var sorted = [];
    for(var key in dict) {
        sorted[sorted.length] = key;
    }
    sorted.sort();

    var tempDict = {};
    for(var i = 0; i < sorted.length; i++) {
        tempDict[sorted[i]] = dict[sorted[i]];
    }

    return tempDict;
}