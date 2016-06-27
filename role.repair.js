var roleRepair = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.repair && creep.carry.energy == 0) {
            creep.memory.repair = false;
	    }
	    if(!creep.memory.repair && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repair = true;
	    }

	    if(creep.memory.repair) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.hits < structure.hitsMax && structure.hits < 30000)
                    }
            });
            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
	    }
        else{
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.source]);
            }
        }
	}
};

module.exports = roleRepair;