var structuresTower = {
    
    run: function (tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        let structureHitsLevel = 60 * 1000;
        if (closestHostile) {
            tower.attack(closestHostile);
        }
        
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => ((structure.structureType != STRUCTURE_WALL && structure.structureType != STRUCTURE_RAMPART) && structure.hits < structure.hitsMax) ||
            ((structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && structure.hits < structureHitsLevel)
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }


    }
}

module.exports = structuresTower;