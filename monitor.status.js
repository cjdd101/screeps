var monitorStatus = {

    /** @param {Creep} creep **/
    run: function() {
        var harvesters = _.filter(Game.creeps,(creep)=>creep.memory.role == 'harvester');
        console.log("Harvesters:" + harvesters.length);
	}
};

module.exports = monitorStatus;