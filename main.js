var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleTransfer = require('role.transfer1');
var roleUpgrader = require('role.upgrader');
var roleTowerfiller = require('role.towerfiller');
var structureTower = require('structers.tower');
const mount = require('./mount')
var mySpawn = 'Home';

module.exports.loop = function () {
    mount();
    var harvesters = _.filter(Game.creeps,(creep)=>creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps,(creep)=>creep.memory.role == 'builders');
    var transfers = _.filter(Game.creeps,(creep)=>creep.memory.role == 'transfer');
    var upgraders = _.filter(Game.creeps,(creep)=>creep.memory.role == 'upgrader');
    var towerfillers = _.filter(Game.creeps,(creep)=>creep.memory.role == 'towerfiller');
    console.log("Harvesters:" + harvesters.length);
    console.log("Builders:" + builders.length);
    console.log("Transfers:" + transfers.length);
    console.log("Upgraders:" + upgraders.length);
    console.log("towerfiller:" + towerfillers.length)
        
    
    for(let name in Memory.creeps) {
        if(Game.creeps[name] == null || Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    if(harvesters.length<2) {
        let newName = 'Harvester' + Game.time;
        if(Game.creeps["Harvester1"] == null) {
            newName = 'Harvester1';
        }
        console.log("Spawning new harvester:" + newName);
        Game.spawns[mySpawn].spawnCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE],newName,{memory:{role:'harvester'}});
    }
    
    if(builders.length<1) {
        let newName = 'builders' + Game.time;
        if(Game.creeps["builders1"] == null) {
            newName = 'builders1';
        }
        console.log("Spawning new builders:" + newName);
        Game.spawns[mySpawn].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],newName,{memory:{role:'builders'}});
    }
    
    if(transfers.length<2) {
        let newName = 'transfers' + Game.time;
        if(Game.creeps["transfers1"] == null) {
            newName = 'transfers1';
            Game.spawns[mySpawn].spawnCreep([CARRY,CARRY,CARRY,CARRY,MOVE,MOVE],newName,{memory:{role:'transfer'}});
        }
        else {
            console.log("Spawning new transfer:" + newName);
            Game.spawns[mySpawn].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],newName,{memory:{role:'transfer'}});
        }
    }

    if(upgraders.length<1) {
        let newName = 'upgraders' + Game.time;
        console.log("Spawning new transfer:" + newName);
        Game.spawns[mySpawn].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],newName,{memory:{role:'upgrader'}});
    }

    if(towerfillers.length<1) {
        var newName = 'towerfiller' + Game.time;
        console.log("Spawning new builders:" + newName);
        Game.spawns[mySpawn].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE],newName,{memory:{role:'towerfiller'}});
    }
    
    if(Game.spawns[mySpawn].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns[mySpawn].spawning.name];
        Game.spawns[mySpawn].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns[mySpawn].pos.x + 1, 
            Game.spawns[mySpawn].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    
    let towerIds = ['5f32fc49d082bf4cd4fe0bce','5f2fc8125fc68c21cc65249e'];
    
    towerIds.forEach((towerId) => {
        structureTower.run(Game.getObjectById(towerId));
    })
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            if(name == 'Harvester1') {
                roleHarvester.run(creep,0);
            }
            else {
            roleHarvester.run(creep,1);
            }
        }
        if(creep.memory.role == 'builders') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'transfer') {
            roleTransfer.run(creep,0);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'towerfiller') {
            roleTowerfiller.run(creep);
        }
    }
}