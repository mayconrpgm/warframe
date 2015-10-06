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

    var energyNeededNextLevel = Math.max((4 * rarity * Math.pow(2, currentLevel + 1)) - (4 * rarity * Math.pow(2, currentLevel)), 0);
    var energyNeededLevelFive = Math.max((4 * rarity * Math.pow(2, 5)) - (4 * rarity * Math.pow(2, currentLevel)), 0);
    var energyNeededLevelTen = Math.max((4 * rarity * Math.pow(2, 10)) - (4 * rarity * Math.pow(2, currentLevel)), 0);

    /*
    console.log(rarity);
    console.log(currentLevel);
    console.log(energyNeededNextLevel);
    console.log(energyNeededLevelFive);
    console.log(energyNeededLevelTen);
    */
    $("#nextLevelLabel").text("Next Level (Level " + (currentLevel + 1) +")")

    $("#nextLevelDuplicates").text(Math.ceil(energyNeededNextLevel / duplicateEnergy));
    $("#nextLevelSamePolarity").text(Math.ceil(energyNeededNextLevel / (samePolarityEnergy / 2)));
    $("#nextLevelFusionCores").text(Math.ceil(energyNeededNextLevel / (rareFusionCoreEnergy / 2)));

    $("#levelFiveDuplicates").text(Math.ceil(energyNeededLevelFive / duplicateEnergy));
    $("#levelFiveSamePolarity").text(Math.ceil(energyNeededLevelFive / (samePolarityEnergy / 2)));
    $("#levelFiveFusionCores").text(Math.ceil(energyNeededLevelFive / (rareFusionCoreEnergy / 2)));

    $("#levelTenDuplicates").text(Math.ceil(energyNeededLevelTen / duplicateEnergy));
    $("#levelTenSamePolarity").text(Math.ceil(energyNeededLevelTen / (samePolarityEnergy / 2)));
    $("#levelTenFusionCores").text(Math.ceil(energyNeededLevelTen / (rareFusionCoreEnergy / 2)));
}