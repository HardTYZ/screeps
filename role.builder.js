var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }
        
	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
            
	    }
	    else if(creep.carry.energy==creep.energyCapacity){
	        
	        if(creep.transfer(Game.spawns.Spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns.Spawn);
            }
	    }
	   // else if(Game.spawns.Spawn.energy>200){
    //         if(0>(Game.spawns.Spawn.transferEnergy(creep,50))) {
    //             creep.moveTo(Game.spawns.Spawn);
    //         }
    //     }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.source]);
            }
	    }
	}
};

module.exports = roleBuilder;