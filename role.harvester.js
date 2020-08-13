var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep, num) {
            var sources = creep.room.find(FIND_SOURCES);
            if(num==1 && (creep.pos.x!=21 || creep.pos.y!=30)) {
                    creep.moveTo(21,30);
                }
            if (creep.harvest(sources[num]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[num], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
    }
};

module.exports = roleHarvester;