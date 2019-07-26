var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleRepair = require('role.repair');
var roleReloader = require('role.reloader');
var roleFastHarvester = require('role.fastharvester');
var roleClaimer = require('role.claimer');
var roleGuard = require('role.guard');

module.exports.loop = function () {

//      var sources = Game.rooms["W38N39"].find(FIND_SOURCES);

// 		for(var i in sources)
// 		{
// 		    var path = Game.rooms["W38N39"].findPath(sources[i].pos, Game.spawns.Spawn.pos, { ignoreCreeps: true });
// 		    for(var j in path)
// 	    	{
// 	    		var result = Game.rooms["W38N39"].createConstructionSite(path[j].x, path[j].y, STRUCTURE_ROAD);
// 	    	}
// 		}
      

    //  var tower = Game.getObjectById('59a3291426543b35450a58cd');
     
    //  if(tower) {
        
    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    //     // var building = tower.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    //     // if(building) {
    //     //     tower.repair(building);
    //     // }
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax && structure.hits < 40000
    //     });
    //     if(closestDamagedStructure && tower.energyCapacity/1.5 < tower.energy) {
    //         tower.repair(closestDamagedStructure);
    //     }

       
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
    var reloaders = _.filter(Game.creeps, (creep) => creep.memory.role == 'reloader');
    var guards = _.filter(Game.creeps, (creep) => creep.memory.role == 'guard');
    var fastharvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'fastharvester');
    var energyInRoom = Game.rooms["W35N39"].energyAvailable;
    
    // if (guards.length < 3  && energyInRoom > 250){
    //     var newName = Game.spawns.Spawn.createCreep([TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'guard', source:0});
    //     console.log('Spawning new guard: ' + newName);
    // }
    if(harvesters.length < 5 && energyInRoom > 500) {
        var newName = Game.spawns.Spawn.createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'harvester', source:0});
        console.log('Spawning new harvester: ' + newName);
    }
    else if(builders.length < 3 && Game.spawns.Spawn.energy > 250) {
        var newName = Game.spawns.Spawn.createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'builder', source:1});
        console.log('Spawning new builder: ' + newName);
    }
    else if(upraders.length < 1 && Game.spawns.Spawn.energy > 250) {
        var newName = Game.spawns.Spawn.createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'upgrader', source:0});
        console.log('Spawning new upgrader: ' + newName);
    }
    else if(repairs.length < 3 && Game.spawns.Spawn.energy > 250) {
        var newName = Game.spawns.Spawn.createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'repair', source:0});
        console.log('Spawning new repair: ' + newName);
    }
    else if (guards.length < 3  && energyInRoom > 500){
        var newName = Game.spawns.Spawn.createCreep([TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE], undefined, {role: 'guard', source:0});
        console.log('Spawning new guard: ' + newName);
    }
    else if(reloaders.length < 1 && Game.spawns.Spawn.energy > 250) {
        var newName = Game.spawns.Spawn.createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'reloader', source:0});
        console.log('Spawning new reloader: ' + newName);
    }
    else if(fastharvesters.length < 3 && Game.spawns.Spawn.energy > 250) {
        var newName = Game.spawns.Spawn.createCreep([WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'fastharvester', source:0});
        console.log('Spawning new fastharvester: ' + newName);
    }
    


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            
             var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN //|| structure.structureType == STRUCTURE_TOWER
                                )
                                && structure.energy < structure.energyCapacity;
                    }
            });
            
            // if (targets.length == 0 ){
            //     roleUpgrader.run(creep);
            // }
            // else{
               roleHarvester.run(creep);
            // }
        }
        else if(creep.memory.role == 'builder') {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length == 0){
                roleReloader.run(creep);
            }
            else{
                roleBuilder.run(creep);
            }
                
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'repair') {
            //roleRepair.run(creep);
            if(true){//tower.energy > tower.energyCapacity/1.5){
              roleUpgrader.run(creep);
            }
            else{
              roleReloader.run(creep);
            }
        }
        else if(creep.memory.role == 'reloader') {
            if(tower.energy == tower.energyCapacity){
                roleBuilder.run(creep);
            }
            else{
                roleReloader.run(creep);
            }
        }
        else if(creep.memory.role == 'fastharvester') {
            roleFastHarvester.run(creep);
        }
        else if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        else if(creep.memory.role == 'guard') {
            roleGuard.run(creep);
        }
        
    }
    
//     for(var i in Memory.creeps) {
//     if(!Game.creeps[i]) {
//         delete Memory.creeps[i];
//     }
// }
//}
