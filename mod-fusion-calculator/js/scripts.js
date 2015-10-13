$(function() {
    updateTables();
    $("#rarity").change(function() {
        updateTables();
    });
    $("#currentLevel").change(function() {
        updateTables();
    });
});

function updateTables() {
    var rarity = parseInt($("#rarity option:selected").val(), 10);
    var currentLevel = parseInt($("#currentLevel option:selected").val(), 10);

    var duplicateEnergy = 0;
    var samePolarityEnergy = 0;
    var rareFusionCoreEnergy = 0;

    modTypes = {
      "Duplicates" : (2 * rarity * 2),
      "Unranked Common Same Polarity Mod" : 2,
      "Unranked Uncommon Same Polarity Mod" : 4,
      "Unranked Rare Same Polarity Mod" : 6,
      "Common Fusion Cores (R3)" : (11.8 / 2),
      "Uncommon Fusion Cores (R5)" : (38 / 2),
      "Rare Fusion Cores (R5)" : (62 / 2)
    };
    
    $("#content").empty();

    for (rank = currentLevel + 1; rank <= 10; rank++) {
        var energyNeeded = Math.max((4 * rarity * Math.pow(2, rank)) - (4 * rarity * Math.pow(2, currentLevel)), 0);

        var tableHtml =   '<div class="col-md-12">' +
          '<table> ' +
            '<tr>' +
              '<th colspan="2">Rank ' + rank + '</th>' +
            '</tr>' +
            '<tr>' +
              '<th>Mod Type</th>' +
              '<th>Amount</th>' +
            '</tr>';

        $.each(modTypes, function( k, v ) {
          tableHtml += '<tr>' +
            '<td>'+ k +'</td>' +
            '<td>' + Math.ceil(energyNeeded / v) + '</td>' +
          '</tr>';
        });

        tableHtml += '</table>' +
        '</div>';

        $("#content").append(tableHtml);
    }
}
