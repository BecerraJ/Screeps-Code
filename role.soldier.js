module.exports = 
{
    
    run: function(creep) 
    {
       var targets = creep.room.find(FIND_HOSTILE_CREEPS, { filter : (cr) => cr.owner != "Songotony"});
        
            var rangedTargets = creep.pos.findInRange(FIND_HOSTILE_SPAWNS, 3);
            if(rangedTargets.length > 0) 
            {
                creep.rangedAttack(rangedTargets[0]);
            }
            else
            {
                creep.moveTo(Game.flags.Rally);
            }

        creep.moveTo(targets[0]);
        creep.attack(targets[0]);
        
       // Game.creeps.moveTo(Game.flags.Rally);
        
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target) 
        {
            if(creep.attack(target) == ERR_NOT_IN_RANGE) 
            {
                creep.moveTo(target);
            }
        }
        
    } 
};