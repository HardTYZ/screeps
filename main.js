var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleUpgrader = require('role.upgrader');
var roleRepair = require('role.repair');
var roleReloader = require('role.reloader');
var roleFastHarvester = require('role.fastharvester');
var roleClaimer = require('role.claimer');

module.exports.loop = function () {

     
      

     var tower = Game.getObjectById('576cdba3c5bced7514ecec03');
     if(tower) {
        
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
        
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.hits < 30000
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

       
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');
    var reloaders = _.filter(Game.creeps, (creep) => creep.memory.role == 'reloader');
    
    if(harvesters.length < 5 && Game.spawns.Spawn.energy > 299) {
        var newName = Game.spawns.Spawn.createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester', source:0});
        console.log('Spawning new harvester: ' + newName);
    }
    else if(builders.length < 3 && Game.spawns.Spawn.energy > 250) {
        var newName = Game.spawns.Spawn.createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'builder', source:1});
        console.log('Spawning new builder: ' + newName);
    }
    else if(upraders.length < 1 && Game.spawns.Spawn.energy > 250) {
        var newName = Game.spawns.Spawn.createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'upgrader', source:1});
        console.log('Spawning new upgrader: ' + newName);
    }
    else if(repairs.length < 3 && Game.spawns.Spawn.energy > 250) {
        var newName = Game.spawns.Spawn.createCreep([WORK,CARRY,CARRY,MOVE], undefined, {role: 'repair', source:1});
        console.log('Spawning new repair: ' + newName);
    }
    else if(reloaders.length < 1 && Game.spawns.Spawn.energy > 299) {
        var newName = Game.spawns.Spawn.createCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'reloader', source:1});
        console.log('Spawning new reloader: ' + newName);
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            
             var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            
            if (targets.length == 0 ){
                roleUpgrader.run(creep);
            }
            else{
               roleHarvester.run(creep);
            }
        }
        else if(creep.memory.role == 'builder') {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length == 0){
                roleUpgrader.run(creep);
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
            if(tower.energy > tower.energyCapacity/2){
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
        
    }
    
//     for(var i in Memory.creeps) {
//     if(!Game.creeps[i]) {
//         delete Memory.creeps[i];
//     }
// }
}