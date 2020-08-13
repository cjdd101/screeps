var roleTowerfiller = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.filling && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.filling = false;
            creep.say('🔄 loading');
        }
        if (!creep.memory.filling && creep.store.getFreeCapacity() == 0) {
            creep.memory.filling = true;
            creep.say('🚧 filling');
        }

        if (creep.memory.filling) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 550
                }
            });
            if (targets.length) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }

            }
            else {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        else {
            creep.withdrawFromContainer(creep);
        }
    }
};

module.exports = roleTowerfiller;