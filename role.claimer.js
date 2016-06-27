var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {

            
            if (creep.room != Game.rooms['W29S33']) {
                
                var exitDir = Game.map.findExit(creep.room, 'W29S33');
                var exit = creep.pos.findClosestByRange(exitDir);
                creep.moveTo(exit);
            } else {
                console.log(creep.claimController(creep.room.controller));
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
            }

        
    }
    }
};

module.exports = roleClaimer;