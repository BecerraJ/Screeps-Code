// import modules
require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleSoldier = require('role.soldier');


module.exports.loop = function () {
//debugging checks
    //console.log(room.energyCapacityAvailable);
var energyAvailable = 0;
energyAvailable += Game.spawns.Hive.energy;
_.filter(Game.structures, function(structure)
{
    if (structure.structureType == STRUCTURE_EXTENSION)
    {
        energyAvailable += structure.energy;
        console.log('Available energy:', energyAvailable);
    }
});
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    // for every creep name in Game.creeps
    for (let name in Game.creeps) 
    {
        // get the creep object
        var creep = Game.creeps[name];

        // if creep is harvester, call harvester script
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        // if creep is upgrader, call upgrader script
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        // if creep is builder, call builder script
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        // if creep is repairer, call repairer script
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        // if creep is wallRepairer, call wallRepairer script
        else if (creep.memory.role == 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
        else if (creep.memory.role == 'soldier') {
            roleSoldier.run(creep);
        }
        //Game.creeps['IwillTakeIt'].moveTo(Game.flags.Room2);
        else if (creep.memory.role == 'claimer') {
        
            //creep.moveTo(Game.flags.Room2)
            
        if(creep.room.controller) 
        {
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(creep.room.controller);
            }
     
        }
        
}
    }

    var towers = Game.rooms.W6N29.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for (let tower of towers) {
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }
    }
    for (var tower in Game.towers) 
    {
    var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, { filter : (cr) => cr.owner != "Songotony"});
    if  (target)
        tower.attack(target);
            else (structure != undefined) 
            {
                // try to repair it, if it is out of range
                if (tower.repair(structure) == ERR_NOT_IN_RANGE) 
                {
                        
                }
            }
    }

    // setup some minimum numbers for different roles
    var minimumNumberOfHarvesters = 2;
    var minimumNumberOfUpgraders = 1;
    var minimumNumberOfBuilders = 1;
    var minimumNumberOfRepairers = 1;
    var minimumNumberOfWallRepairers = 1;
    var minimumNumberOfSoldiers = 1;

    // count the number of creeps alive for each role
    // _.sum will count the number of properties in Game.creeps filtered by the
    //  arrow function, which checks for the creep being a harvester
    var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');
    var numberOfSoldiers = _.sum(Game.creeps, (c) => c.memory.role == 'soldier');
    var numberOfclaimers = _.sum(Game.creeps, (c) => c.memory.role == 'claimer');

    var energy = Game.spawns.Hive.room.energyCapacityAvailable;
    var name = undefined;

    // if not enough harvesters
    if (numberOfHarvesters < minimumNumberOfHarvesters) {
        // try to spawn one
        name = Game.spawns.Hive.createCustomCreep(energy, 'harvester');

        // if spawning failed and we have no harvesters left
        if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
            // spawn one with what is available
            name = Game.spawns.Hive.createCustomCreep(
                Game.spawns.Hive.room.energyAvailable, 'harvester');
        }
    }
    // if not enough upgraders
    else if (numberOfUpgraders < minimumNumberOfUpgraders) {
        // try to spawn one
        name = Game.spawns.Hive.createCustomCreep(energy, 'upgrader');
    }
    // if not enough repairers
    else if (numberOfRepairers < minimumNumberOfRepairers) {
        // try to spawn one
        name = Game.spawns.Hive.createCustomCreep(energy, 'repairer');
    }
    // if not enough builders
    else if (numberOfBuilders < minimumNumberOfBuilders) {
        // try to spawn one
        name = Game.spawns.Hive.createCustomCreep(energy, 'builder');
    }
    // if not enough wallRepairers
    else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
        // try to spawn one
        name = Game.spawns.Hive.createCustomCreep(energy, 'wallRepairer');
    }
    else if(numberOfSoldiers < minimumNumberOfSoldiers){
        name = Game.spawns.Hive.createCustomCreep(energy,'soldier')
    }
    else {
        // else try to spawn a builder
        name = Game.spawns.Hive.createCustomCreep(energy, 'builder');
    }

    // print name to console if spawning was a success
    // name > 0 would not work since string > 0 returns false
    if (!(name < 0)) {
        console.log("Spawned new creep: " + name);
    }
};