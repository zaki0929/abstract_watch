var AW = AW || {};

window.addEventListener("load", function(){

    AW.width  = window.innerWidth;
    AW.height = window.innerHeight;

    AW.offColor = '#333';

    AW.stage = new Konva.Stage({
        container: 'container',
        width:  AW.width,
        height: AW.height
    });

    AW.unitLayer = new Konva.Layer();
    AW.stage.add(AW.unitLayer);

    AW.monthGroup = new Konva.Group();
    AW.dateGroup  = new Konva.Group();
    AW.dayGroup   = new Konva.Group();
    AW.hourGroup  = new Konva.Group();
    AW.minGroup   = new Konva.Group();
    AW.secGroup   = new Konva.Group();

    AW.unitLayer.add(AW.monthGroup);
    AW.unitLayer.add(AW.dateGroup);
    AW.unitLayer.add(AW.dayGroup);
    AW.unitLayer.add(AW.hourGroup);
    AW.unitLayer.add(AW.minGroup);
    AW.unitLayer.add(AW.secGroup);

    AW.monthArray = [];
    AW.dateArray  = [];
    AW.dayArray   = [];
    AW.hourArray  = [];
    AW.minArray   = [];
    AW.secArray   = [];

    AW.buildUnit = function(x, y, r, color) {
        var onColor  = color;
        var offColor = AW.offColor;

        var unit = new Konva.Circle({
            x: x,
            y: y,
            radius: r,
            fill: offColor,
            stroke: offColor,
            strokeWidth: r*0.8 
        });

        unit.turnON = function () {
            this.setFill(onColor);
        }

        unit.turnOFF = function () {
            this.setFill(offColor);
        }

        return unit;
    }

    AW.buildUnitsBar = function (group, array, num, x, y, r, d, color) {
        for (var i=0; i<num; i++) {
            var unit = AW.buildUnit(x+(d*i), y, r, color);
            if (typeof group != 'undefined') {
                group.add(unit);
            }
            if (typeof array != 'undefined') {
                array.push(unit);
            }
        }
    }

    AW.buildUnitsBar(AW.monthGroup, AW.monthArray, 12, AW.width/(59+3)*2, 100, AW.width/(59+3)*0.3, AW.width/(59+3), '#F0BC08');
    AW.buildUnitsBar(AW.dateGroup,  AW.dateArray,  31, AW.width/(59+3)*2, 150, AW.width/(59+3)*0.3, AW.width/(59+3), '#F0BC08');
    AW.buildUnitsBar(AW.dayGroup,   AW.dayArray,   7,  AW.width/(59+3)*2, 200, AW.width/(59+3)*0.3, AW.width/(59+3), '#F0BC08');
    AW.buildUnitsBar(AW.hourGroup,  AW.hourArray,  23, AW.width/(59+3)*2, 250, AW.width/(59+3)*0.3, AW.width/(59+3), '#F0BC08');
    AW.buildUnitsBar(AW.minGroup,   AW.minArray,   59, AW.width/(59+3)*2, 300, AW.width/(59+3)*0.3, AW.width/(59+3), '#F0BC08');
    AW.buildUnitsBar(AW.secGroup,   AW.secArray,   59, AW.width/(59+3)*2, 350, AW.width/(59+3)*0.3, AW.width/(59+3), '#F0BC08');

    AW.update = function() {
        var now  = new Date()
        AW.updateUnits(now.getMonth(),   AW.monthArray, false);
        AW.updateUnits(now.getDate()-1,  AW.dateArray,  false);
        AW.updateUnits(now.getDay(),     AW.dayArray,   false);
        AW.updateUnits(now.getHours(),   AW.hourArray,  true);
        AW.updateUnits(now.getMinutes(), AW.minArray,   true);
        AW.updateUnits(now.getSeconds(), AW.secArray,   true);
        AW.unitLayer.draw();
    }

    AW.updateUnits = function(state, array, isZeroStart) {
        for (var i=0; i<array.length; i++) {
            if ((i < state && isZeroStart) || (i <= state && !isZeroStart)) {
                array[i].turnON();
            } else {
                array[i].turnOFF();
            }
        }
    }

    setInterval(AW.update, 1000);
});
