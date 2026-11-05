var wms_layers = [];

var format_world_1500_0 = new ol.format.GeoJSON();
var features_world_1500_0 = format_world_1500_0.readFeatures(json_world_1500_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_world_1500_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_world_1500_0.addFeatures(features_world_1500_0);
var lyr_world_1500_0 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_world_1500_0, 
                style: style_world_1500_0,
                popuplayertitle: 'world_1500',
                interactive: true,
                title: '<img src="styles/legend/world_1500_0.png" /> world_1500'
            });
var format__1 = new ol.format.GeoJSON();
var features__1 = format__1.readFeatures(json__1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource__1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource__1.addFeatures(features__1);
var lyr__1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource__1, 
                style: style__1,
                popuplayertitle: 'Столици',
                interactive: true,
                title: '<img src="styles/legend/_1.png" /> Столици'
            });
var format_E_2 = new ol.format.GeoJSON();
var features_E_2 = format_E_2.readFeatures(json_E_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_E_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_E_2.addFeatures(features_E_2);
var lyr_E_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_E_2, 
                style: style_E_2,
                popuplayertitle: 'Eкспедиции на Португалия',
                interactive: true,
                title: '<img src="styles/legend/E_2.png" /> Eкспедиции на Португалия'
            });
var format__3 = new ol.format.GeoJSON();
var features__3 = format__3.readFeatures(json__3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource__3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource__3.addFeatures(features__3);
var lyr__3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource__3, 
                style: style__3,
                popuplayertitle: 'Екпедиции на Франция',
                interactive: true,
                title: '<img src="styles/legend/_3.png" /> Екпедиции на Франция'
            });
var format__4 = new ol.format.GeoJSON();
var features__4 = format__4.readFeatures(json__4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource__4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource__4.addFeatures(features__4);
var lyr__4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource__4, 
                style: style__4,
                popuplayertitle: 'Експедиции на Нидерландия',
                interactive: true,
                title: '<img src="styles/legend/_4.png" /> Експедиции на Нидерландия'
            });
var format__5 = new ol.format.GeoJSON();
var features__5 = format__5.readFeatures(json__5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource__5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource__5.addFeatures(features__5);
var lyr__5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource__5, 
                style: style__5,
                popuplayertitle: 'Експедиции на Испания',
                interactive: true,
                title: '<img src="styles/legend/_5.png" /> Експедиции на Испания'
            });
var format__6 = new ol.format.GeoJSON();
var features__6 = format__6.readFeatures(json__6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource__6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource__6.addFeatures(features__6);
var lyr__6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource__6, 
                style: style__6,
                popuplayertitle: 'Екпедиции на Англия',
                interactive: true,
                title: '<img src="styles/legend/_6.png" /> Екпедиции на Англия'
            });

lyr_world_1500_0.setVisible(true);lyr__1.setVisible(false);lyr_E_2.setVisible(true);lyr__3.setVisible(true);lyr__4.setVisible(true);lyr__5.setVisible(true);lyr__6.setVisible(true);
var layersList = [lyr_world_1500_0,lyr__1,lyr_E_2,lyr__3,lyr__4,lyr__5,lyr__6];
lyr_world_1500_0.set('fieldAliases', {'NAME': 'NAME', 'ABBREVN': 'ABBREVN', 'SUBJECTO': 'SUBJECTO', 'BORDERPRECISION': 'BORDERPRECISION', 'PARTOF': 'PARTOF', 'wikipedia': 'wikipedia', });
lyr__1.set('fieldAliases', {'id': 'id', 'Име': 'Име', });
lyr_E_2.set('fieldAliases', {'id': 'id', 'Годин': 'Годин', 'Стран': 'Стран', 'Изсле': 'Изсле', });
lyr__3.set('fieldAliases', {'id': 'id', 'Годин': 'Годин', 'Стран': 'Стран', 'Изсле': 'Изсле', });
lyr__4.set('fieldAliases', {'id': 'id', 'Годин': 'Годин', 'Стран': 'Стран', 'Изсле': 'Изсле', });
lyr__5.set('fieldAliases', {'id': 'id', 'Годин': 'Годин', 'Стран': 'Стран', 'Изсле': 'Изсле', });
lyr__6.set('fieldAliases', {'id': 'id', 'Годин': 'Годин', 'Стран': 'Стран', 'Изсле': 'Изсле', });
lyr_world_1500_0.set('fieldImages', {'NAME': '', 'ABBREVN': '', 'SUBJECTO': '', 'BORDERPRECISION': '', 'PARTOF': '', 'wikipedia': '', });
lyr__1.set('fieldImages', {'id': 'TextEdit', 'Име': 'TextEdit', });
lyr_E_2.set('fieldImages', {'id': 'TextEdit', 'Годин': 'TextEdit', 'Стран': 'TextEdit', 'Изсле': 'TextEdit', });
lyr__3.set('fieldImages', {'id': 'TextEdit', 'Годин': 'TextEdit', 'Стран': 'TextEdit', 'Изсле': 'TextEdit', });
lyr__4.set('fieldImages', {'id': 'TextEdit', 'Годин': 'TextEdit', 'Стран': 'TextEdit', 'Изсле': 'TextEdit', });
lyr__5.set('fieldImages', {'id': 'TextEdit', 'Годин': 'TextEdit', 'Стран': '', 'Изсле': '', });
lyr__6.set('fieldImages', {'id': 'TextEdit', 'Годин': 'TextEdit', 'Стран': 'TextEdit', 'Изсле': 'TextEdit', });
lyr_world_1500_0.set('fieldLabels', {'NAME': 'no label', 'ABBREVN': 'no label', 'SUBJECTO': 'no label', 'BORDERPRECISION': 'no label', 'PARTOF': 'no label', 'wikipedia': 'no label', });
lyr__1.set('fieldLabels', {'id': 'no label', 'Име': 'no label', });
lyr_E_2.set('fieldLabels', {'id': 'no label', 'Годин': 'no label', 'Стран': 'header label - always visible', 'Изсле': 'no label', });
lyr__3.set('fieldLabels', {'id': 'no label', 'Годин': 'inline label - always visible', 'Стран': 'no label', 'Изсле': 'no label', });
lyr__4.set('fieldLabels', {'id': 'no label', 'Годин': 'no label', 'Стран': 'no label', 'Изсле': 'no label', });
lyr__5.set('fieldLabels', {'id': 'no label', 'Годин': 'no label', 'Стран': 'no label', 'Изсле': 'no label', });
lyr__6.set('fieldLabels', {'id': 'no label', 'Годин': 'no label', 'Стран': 'no label', 'Изсле': 'no label', });
lyr__6.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});