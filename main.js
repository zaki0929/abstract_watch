var AW = AW || {};

window.addEventListener("load", function() {

    AW.width  = window.innerWidth;
    AW.height = window.innerHeight;

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

    AW.buildUnit = function(array, layer, x, y, r, baseColor, lightColor) {
        var unit = {};

        unit.base = new Konva.Circle({
            x: x,
            y: y,
            radius: r,
            fill: baseColor,
            strokeWidth: 0 
        });
        layer.add(unit.base);

        unit.light = new Konva.Circle({
            x: x,
            y: y,
            radius: 0,
            fill: lightColor,
            strokeWidth: 0 
        });
        layer.add(unit.light);

        unit.tween = new Konva.Tween({
            node: unit.light,
            duration: 0.5,
            radius: r*0.5 
        });

        unit.turnON = function() {
            this.tween.play();
        }

        unit.turnOFF = function() {
            this.tween.reset();
        }

        array.push(unit);
    }

    AW.buildUnitsBar = function(array, layer, num, x, y, r, d, baseColor, lightColor) {
        for (var i=0; i<num; i++) {
            AW.buildUnit(array, layer, x+(d*i), y, r, baseColor, lightColor);
        }
    }

    AW.getLastDay = function() {
        var now     = new Date();
        var lastDay = new Date(now.getYear(), now.getMonth()+1, 0);
        return lastDay.getDate();
    }

    AW.update = function() {
        var now  = new Date();

        AW.updateUnits(now.getMonth(),   AW.monthArray, false);
        AW.updateUnits(now.getDate(),    AW.dateArray,  true);
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

    AW.opt = {
        x:  AW.width/(59+3)*2,
        r:  AW.width/(59+3)*0.4,
        d:  AW.width/(59+3),
        ld: AW.getLastDay()
    }

    AW.buildUnitsBar(AW.monthArray, AW.unitLayer, 12,        AW.opt.x, 100, AW.opt.r, AW.opt.d, '#333', '#F0BC08');
    AW.buildUnitsBar(AW.dateArray,  AW.unitLayer, AW.opt.ld, AW.opt.x, 150, AW.opt.r, AW.opt.d, '#333', '#F0BC08');
    AW.buildUnitsBar(AW.dayArray,   AW.unitLayer, 7,         AW.opt.x, 200, AW.opt.r, AW.opt.d, '#333', '#F0BC08');
    AW.buildUnitsBar(AW.hourArray,  AW.unitLayer, 23,        AW.opt.x, 250, AW.opt.r, AW.opt.d, '#333', '#F0BC08');
    AW.buildUnitsBar(AW.minArray,   AW.unitLayer, 59,        AW.opt.x, 300, AW.opt.r, AW.opt.d, '#333', '#F0BC08');
    AW.buildUnitsBar(AW.secArray,   AW.unitLayer, 59,        AW.opt.x, 350, AW.opt.r, AW.opt.d, '#333', '#F0BC08');

    setInterval(AW.update, 1000);
});
