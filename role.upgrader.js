var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
	  
	    if(creep.memory.upgrade && creep.carry.energy == 0) {
            creep.memory.upgrade = false;
	    }
	    if(!creep.memory.upgrade && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrade = true;
	    }

	    if(creep.memory.upgrade) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
	    }
	}
};

module.exports = roleUpgrader;