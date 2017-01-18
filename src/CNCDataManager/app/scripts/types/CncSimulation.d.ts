import * as angular from 'angular';

interface ISimulationScope extends angular.IScope {
    data: {
        motor: {
            rotorMomentInertia: number;   
            polePairs: number;
            statorResistance: number;
            statorStrayInductance: number;
            mainFieldInductanceDaxis: number;
            mainFieldInductanceQaxis: number;
            opposingElectromotiveForce: number;
        };
        driver: {
            nominalVoltage: number;
            PWMCircle: number;
            KS: number;
            KV: number;
            polePairs: number;
            cellVoltage: number;
            KD: number;
            TD: number;
            TV: number;
        };
        ballScrew: {
            diameter: number;
            modulusofElasticty: number;
            shaftDistance: number;
            pitch: number;
            length: number;
            density: number;
            shearModulusofElasticty: number;
            campingCoefficient: number;
        };
        guide: {
            frictionFactor: number;
		    viscosityFriction: number;
        };
        bearings: {
            axisalStiffness: number;
		    startingMoment: number;
        };
        coupling: {
            stiffness: number;
		    momentInertia: number;
        };
        workTable: {
            mass: number;
            tighteningEfficiency: number;
            contactStiffness: number;
            dynamicLoadRating: number;
        };
        settings: {
            signal: string,
            startTime: number;
            endTime: number;
            stepSize: number;
            stepNum: number;
            algorithm: string;
            precision: number;
        };
    };
}

export { ISimulationScope };