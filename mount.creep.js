module.exports = function () {
    _.assign(Creep.prototype, creepExtension)
}

const creepExtension = {
    withdrawFromContainer(creep) {
        let target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER && 
                    structure.id == '5f2fa64f6119c86fd9c224c0') &&
                    structure.store.getUsedCapacity(RESOURCE_ENERGY) > 600
            }
        });
        if(target == null) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getUsedCapacity(RESOURCE_ENERGY) > 600
                }
            });
        }        
        if (target) {
            if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    }
}