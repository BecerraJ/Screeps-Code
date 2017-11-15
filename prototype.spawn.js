module.exports = function() {
    // create a new function for StructureSpawn
    StructureSpawn.prototype.createCustomCreep =
        function(energy, roleName) {
            //console.log('Role thats being made ' + roleName);
            if (roleName != 'soldier')
            {
                
                // create a balanced body as big as possible with the given energy
                var numberOfParts = Math.floor(energy / 200);
                var body = [];
                for (let i = 0; i < numberOfParts; i++) {
                    body.push(WORK);
                }
                for (let i = 0; i < numberOfParts; i++) {
                    body.push(CARRY);
                }
                for (let i = 0; i < numberOfParts; i++) {
                    body.push(MOVE);
                }

                // create creep with the created body and the given role
                return this.createCreep(body, undefined, { role: roleName, working: false });
            }
            //put soldier prototype here
            else{
                // create a balanced body as big as possible with the given energy
                var numberOfParts = Math.floor(energy / 300);
                var body = [];
                for (let i = 0; i < numberOfParts; i++) {
                    body.push(TOUGH);
                }
                for (let i = 0; i < numberOfParts; i++) {
                    body.push(MOVE);
                }
                for (let i = 0; i < numberOfParts; i++) {
                    body.push(ATTACK);
                }

                // create creep with the created body and the given role
                return this.createCreep(body, undefined, { role: roleName, squad: 1 });
            }
        console.log('end');

        };
};