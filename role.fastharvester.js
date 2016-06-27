var roleFastHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.carry.energy < creep.carryCapacity) {
            
            if (creep.room != Game.rooms['W29S33']) {
                var exitDir = Game.map.findExit(creep.room, 'W29S33');
                var exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit);
            } else {
                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }

        } else {
            if (creep.room != Game.rooms['W29S32']) {
                var exitDir = Game.map.findExit(creep.room, Game.rooms['W29S32']);
                var exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit);
            } else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                            structure.structureType == STRUCTURE_SPAWN //|| structure.structureType == STRUCTURE_TOWER
                            ) && structure.energy < structure.energyCapacity;
                    }
                });
                if (targets.length > 0) {
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                }
            }
        }
    }
};

module.exports = roleFastHarvester;