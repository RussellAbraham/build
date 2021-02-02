function Simulate() {
    this.coolingFactor            = 0.0;
    this.stabilizingFactor        = 0.0;
    this.freezingTemperature      = 0.0;
    this.currentSystemEnergy      = 0.0;
    this.currentSystemTemperature = 0.0;
    this.currentStabilizer        = 0.0;
    this.generateNewSolution      = null;
    this.generateNeighbor         = null;
    this.acceptNeighbor           = null;    
    this.initialize.apply(this, arguments);
};
Simulate.prototype.initialize = function (options) {
    
    //options = (options || {});
    
    this.coolingFactor            = options.coolingFactor;
    this.stabilizingFactor        = options.stabilizingFactor;
    this.freezingTemperature      = options.freezingTemperature;
    this.generateNewSolution      = options.generateNewSolution;
    this.generateNeighbor         = options.generateNeighbor;
    this.acceptNeighbor           = options.acceptNeighbor;

    this.currentSystemEnergy      = this.generateNewSolution();
    this.currentSystemTemperature = options.initialTemperature;
    this.currentStabilizer        = options.initialStabilizer;    
}

Simulate.probability = function(temperature, delta){
    if (delta < 0) {
        return true;
    }

    var C = Math.exp(-delta / temperature);
    var R = Math.random();

    if (R < C) {
        return true;
    }

    return false;
}

Simulate.prototype.simulate = function(){
    if (this.currentSystemTemperature > freezingTemperature) {
        for (var i = 0; i < currentStabilizer; i++) {
            var newEnergy = generateNeighbor(),
                energyDelta = newEnergy - currentSystemEnergy;

            if (this.probability(currentSystemTemperature, energyDelta)) {
                acceptNeighbor();
                currentSystemEnergy = newEnergy;
            }
        }
        currentSystemTemperature = currentSystemTemperature - coolingFactor;
        currentStabilizer = currentStabilizer * stabilizingFactor;
        return false;
    }
    currentSystemTemperature = freezingTemperature;
    return true;
}