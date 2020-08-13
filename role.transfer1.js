var roleTransfer = {

    /** @param {Creep} creep **/
    run: function (creep, num) {
        if (creep.memory.unloading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.unloading = false;
            creep.say('🔄 loading');
        }
        if (!creep.memory.unloading && creep.store.getFreeCapacity() == 0) {
            creep.memory.unloading = true;
            creep.say('⚡ unloading');
        }

        if (creep.memory.unloading) {
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                }
            });
            if (target == null || target == undefined) {
                target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.id == '5f2f62f8bb51f43324bcbb70'||
                        structure.id == '5f2ec6146927b2c2d326683c') &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                    }
                });
            }
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        else {
            creep.memory.target = undefined;
            if (creep.store.getFreeCapacity() > 0) {
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER &&
                            structure.id != '5f2f62f8bb51f43324bcbb70' && 
                            structure.id != '5f2ec6146927b2c2d326683c') &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 500
                    }
                });
                if (containers.length > 0) {
                    if (creep.withdraw(containers[num], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers[num]);
                    }
                }
            }
        }
    }
};

module.exports = roleTransfer;