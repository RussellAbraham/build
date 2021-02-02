function App(){

};

App.prototype.getOptions = function () {

    return {
        initialTemperature:  parseFloat(document.getElementById('initial_temperature').value),
        initialStabilizer:   parseFloat(document.getElementById('initial_stabilizer').value),
        coolingFactor:       parseFloat(document.getElementById('cooling_factor').value),
        stabilizingFactor:   parseFloat(document.getElementById('stabilizing_factor').value),
        freezingTemperature: parseFloat(document.getElementById('freezing_temperature').value)
    
    };

}