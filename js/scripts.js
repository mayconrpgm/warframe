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

    duplicateEnergy = 2 * rarity * 2;
    samePolarityEnergy = 2 * rarity * 2;
    rareFusionCoreEnergy = 62;
    
    $("#content").empty();

    for (rank = currentLevel + 1; rank <= 10; rank++) {
        var energyNeeded = Math.max((4 * rarity * Math.pow(2, rank)) - (4 * rarity * Math.pow(2, currentLevel)), 0);
        
        /*
        console.log(energyNeeded);
        console.log(Math.ceil(energyNeeded / duplicateEnergy));
        console.log(Math.ceil(energyNeeded / (samePolarityEnergy / 2)));
        console.log(Math.ceil(energyNeeded / (rareFusionCoreEnergy / 2)));
        */

        var tableHtml =   '<div class="col-md-12">' +
          '<table> ' +
            '<tr>' +
              '<th colspan="2">Rank ' + rank + '</th>' +
            '</tr>' +
            '<tr>' +
              '<th>Mod Type</th>' +
              '<th>Amount</th>' +
            '</tr>' +
            '<tr>' +
              '<td>Duplicates</td>' +
              '<td>' + Math.ceil(energyNeeded / duplicateEnergy) + '</td>' +
            '</tr>' +
            '<tr>' +
              '<td>Same Polarity and Rarity</td>' +
              '<td>' + Math.ceil(energyNeeded / (samePolarityEnergy / 2)) + '</td>' +
            '</tr>' +
            '<tr>' +
              '<td>Fusion Cores (R5)</td>' +
              '<td>' + Math.ceil(energyNeeded / (rareFusionCoreEnergy / 2)) + '</td>' +
            '</tr>' +
          '</table>' +
        '</div>';

        $("#content").append(tableHtml);
    }
}
