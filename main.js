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

    AW.monthArray = [];
    AW.dateArray  = [];
    AW.dayArray   = [];
    AW.hourArray  = [];
    AW.minArray   = [];
    AW.secArray   = [];

    AW.buildUnit = function(array, layer, x, y, r, color) {
        var onColor  = color;
        var offColor = AW.offColor;

        var base = new Konva.Circle({
            x: x,
            y: y,
            radius: r,
            fill: offColor,
            strokeWidth: 0 
        });
	layer.add(base);

        var unit = new Konva.Circle({
            x: x,
            y: y,
            radius: 0,
            fill: onColor,
            strokeWidth: 0 
        });
	layer.add(unit);

        var tween = new Konva.Tween({
            node: unit,
            duration: 0.5,
            fill : onColor,
            radius: r*0.5 
        });

	unit.turnON = function () {
	    tween.play();
	}

	unit.turnOFF = function () {
	    tween.reset();
	}
	array.push(unit);
    }

    AW.buildUnitsBar = function (array, layer, num, x, y, r, d, color) {
        for (var i=0; i<num; i++) {
            AW.buildUnit(array, layer, x+(d*i), y, r, color);
        }
    }

    AW.buildUnitsBar(AW.monthArray, AW.unitLayer, 12, AW.width/(59+3)*2, 100, AW.width/(59+3)*0.4, AW.width/(59+3), '#F0BC08');
    AW.buildUnitsBar(AW.dateArray,  AW.unitLayer, 31, AW.width/(59+3)*2, 150, AW.width/(59+3)*0.4, AW.width/(59+3), '#F0BC08');
    AW.buildUnitsBar(AW.dayArray,   AW.unitLayer, 7,  AW.width/(59+3)*2, 200, AW.width/(59+3)*0.4, AW.width/(59+3), '#F0BC08');
    AW.buildUnitsBar(AW.hourArray,  AW.unitLayer, 23, AW.width/(59+3)*2, 250, AW.width/(59+3)*0.4, AW.width/(59+3), '#F0BC08');
    AW.buildUnitsBar(AW.minArray,   AW.unitLayer, 59, AW.width/(59+3)*2, 300, AW.width/(59+3)*0.4, AW.width/(59+3), '#F0BC08');
    AW.buildUnitsBar(AW.secArray,   AW.unitLayer, 59, AW.width/(59+3)*2, 350, AW.width/(59+3)*0.4, AW.width/(59+3), '#F0BC08');

    AW.update = function() {
        var now  = new Date()

	AW.updateUnits(now.getMonth(),   AW.monthArray, false);
	AW.updateUnits(now.getDate(),    AW.dateArray, true);
	AW.updateUnits(now.getDay(),     AW.dayArray, false);
	AW.updateUnits(now.getHours(),   AW.hourArray, true);
	AW.updateUnits(now.getMinutes(), AW.minArray, true);
	AW.updateUnits(now.getSeconds(), AW.secArray, true);
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
