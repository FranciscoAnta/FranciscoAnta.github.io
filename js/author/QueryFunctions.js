class QueryFunctions {

  // Consultas de objetos más cercanos / Closest objects functions

  static getClosestObjectFunctions() {
    let array = [];
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_ZOOM_TO_CLOSEST_QUAKES_ITEM'), callback: this.zoomToClosestQuake});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_ZOOM_TO_CLOSEST_FAULTS_ITEM'), callback: this.zoomToClosestFault});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_ZOOM_TO_CLOSEST_POPULATIONS_ITEM'), callback: this.zoomToClosestPopulation});
    return array;
  }

  static zoomToLayer(geojsonLayer, layer) {
    if (layer) {
      const popup = layer.getPopup();
      const latlng = MiscFunctions.getLatLngByLayerType(layer);
      LayerFunctions.showLayer(geojsonLayer);
      popup.setLatLng(latlng)
      map.flyTo(latlng, 10);
      map.openPopup(popup);
    } else {
      WindowFunctions.showAlertWindow(map, LangageFunctions.getText('QUERY_NO_OBJECT_FOUND_TEXT'));
    }
  }

  static zoomToClosestQuake(ev) {
    const geojsonLayer = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const layers = geojsonLayer.getLayers();
    const layer = GeometryFunctions.getClosestObject(layers, ev.latlng);
    if (layer) {
      LayerFunctions.unmarkLayers(layers, StyleFunctions.getValue('quakeBorderColor'));
      LayerFunctions.markLayer(layer);
    }
    QueryFunctions.zoomToLayer(geojsonLayer, layer);
  }

  static zoomToClosestFault(ev) {
    const geojsonLayer = duplicatedFaultsLayer ? duplicatedFaultsLayer : faultsLayer;
    const layers = geojsonLayer.getLayers();
    const layer = GeometryFunctions.getClosestObject(layers, ev.latlng);
    if (layer) {
      LayerFunctions.unmarkLayers(layers, StyleFunctions.getValue('faultBorderColor'));
      LayerFunctions.markLayer(layer);
    }
    QueryFunctions.zoomToLayer(geojsonLayer, layer);
  }

  static zoomToClosestPopulation(ev) {
    const geojsonLayer = duplicatedPopulationsLayer ? duplicatedPopulationsLayer : populationsLayer;
    const layers = geojsonLayer.getLayers();
    const layer = GeometryFunctions.getClosestObject(geojsonLayer.getLayers(), ev.latlng);
    if (layer) {
      LayerFunctions.unmarkLayers(layers, StyleFunctions.getValue('populationBorderColor'));
      LayerFunctions.markLayer(layer);
    }
    QueryFunctions.zoomToLayer(geojsonLayer, layer);
  }

  // Funciones de objeto mayor en radio / Biggest object in radius functions

  static getBiggestObjectFunctions() {
    let array = [];
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_ZOOM_TO_BIGGEST_MAGNITUDE_QUAKE_IN_RADIUS_TEXT'), callback: this.startBiggestMagnitudeQuakeInRadius});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_ZOOM_TO_BIGGEST_INTENSITY_QUAKE_IN_RADIUS_TEXT'), callback: this.startBiggestIntensityQuakeInRaduis});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_PAN_TO_MAX_INTENSITY_IN_RADIUS'), callback: this.startBiggestIntensityInRadius});
    return array;
  }

  static startBiggestMagnitudeQuakeInRadius(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.BIGGEST_MAG_QUAKE);
  }

  static startBiggestIntensityQuakeInRaduis(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.BIGGEST_INT_QUAKE);
  }

  
  static startBiggestIntensityInRadius(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.BIGGEST_INTENSITY);
  }

  static zoomToBiggestMagnitudeQuakeInRadius() {
    const geojsonLayer = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const layers = geojsonLayer.getLayers();
    const lat = SidePanelFunctions.getSpatialLatitudeFilter();
    const lng = SidePanelFunctions.getSpatialLongitudeFilter();
    const r  = SidePanelFunctions.getSpatialRadiusFilter() * 1000;
    const layer = this.getBiggestValueInRadius(geojsonLayer.getLayers(), AttributesConfig.QUAKE_MAGNITUDE, lat, lng, r);
    if (layer) {
      LayerFunctions.unmarkLayers(layers, StyleFunctions.getValue('quakeBorderColor'));
      LayerFunctions.markLayer(layer);
    }
    this.zoomToLayer(geojsonLayer, layer);
  }

  static zoomToBiggestIntensityQuakeInRadius() {
    const geojsonLayer = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const layers = geojsonLayer.getLayers();
    const lat = SidePanelFunctions.getSpatialLatitudeFilter();
    const lng = SidePanelFunctions.getSpatialLongitudeFilter();
    const r  = SidePanelFunctions.getSpatialRadiusFilter() * 1000;
    const layer = this.getBiggestIntensityInRadius(geojsonLayer.getLayers(), AttributesConfig.QUAKE_INTENSITY, lat, lng, r);
    if (layer) {
      LayerFunctions.unmarkLayers(layers, StyleFunctions.getValue('quakeBorderColor'));
      LayerFunctions.markLayer(layer);
    }
    this.zoomToLayer(geojsonLayer, layer);
  }

  static panToBiggestIntensityInRadius() {
    const lat = SidePanelFunctions.getSpatialLatitudeFilter();
    const lng = SidePanelFunctions.getSpatialLongitudeFilter();
    const r = SidePanelFunctions.getSpatialRadiusFilter() * 1000;
    const layer = this.getBiggestIntensityPolygonInRadius(intensitiesLayer.getLayers(), AttributesConfig.INTENSITY_VALUE, lat, lng, r);
    const pLatLngs = layer.getLatLngs()[0][0];
    const cLatLng = L.PolyUtil.polygonCenter(pLatLngs, map.options.crs);
    if (layer) {
      const popup = layer.getPopup();
      LayerFunctions.showLayer(intensitiesLayer);
      popup.setLatLng(cLatLng)
      map.flyTo(cLatLng, 5);
      map.openPopup(popup);
    } else {
      WindowFunctions.showAlertWindow(map, LangageFunctions.getText('QUERY_NO_OBJECT_FOUND_TEXT'));
    }
  }

  static getBiggestValueInRadius(layers, attribute, cLat, cLng, r) {
    let i, layer, value, feature;
    let maxValue = 0;
    let targetLayer = null;
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      feature = layer.feature;
      value = feature.properties[attribute];
      if (value > maxValue && GeometryFunctions.isFeatureInsideCircle(feature, cLat, cLng, r)) {
        maxValue = value;
        targetLayer = layer;
      }
    }
    return targetLayer;
  }

  static getBiggestIntensityInRadius(layers, attribute, cLat, cLng, r) {
    let i, layer, value, feature;
    let maxValue = 0;
    let targetLayer = null;
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      feature = layer.feature;
      value = MiscFunctions.getIntensityValue(feature.properties[attribute]);
      if (value === -1) value = 0;
      if (value > maxValue && GeometryFunctions.isFeatureInsideCircle(feature, cLat, cLng, r)) {
        maxValue = value;
        targetLayer = layer;
      }
    }
    return targetLayer;
  }

  static getBiggestIntensityPolygonInRadius(layers, attribute, lat, lng, r) {
    let i, layer, value;
    let maxValue = 0;
    let finalLayer = null;
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      value = layer.feature.properties[attribute];
      if (value > maxValue && GeometryFunctions.isPolygonObjectInsideRadius(layer, lat, lng, r)) {
        maxValue = value;
        finalLayer = layer;
      }
    }
    return finalLayer;
  }

  // Funciones de número de objetos / Object number functions

  static getObjectNumberFunctions() {
    let array = [];
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_QUAKES_NUMBER_IN_RADIUS_TEXT'), callback: this.startQuakesNumberInRadius});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_FAULTS_NUMBER_IN_RADIUS_TEXT'), callback: this.startFaultsNumberInRadius});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_POPULATIONS_NUMBER_IN_RADIUS_TEXT'), callback: this.startPopulationsNumberInRadius});
    return array;
  }

  static startQuakesNumberInRadius(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.QUAKES_NUMBER);
  }

  static startFaultsNumberInRadius(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.FAULTS_NUMBER);
  }

  static startPopulationsNumberInRadius(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.POPULATIONS_NUMBER);
  }

  static getQuakesNumberInRadius() {
    const lat = SidePanelFunctions.getSpatialLatitudeFilter();
    const lng = SidePanelFunctions.getSpatialLongitudeFilter();
    const r = SidePanelFunctions.getSpatialRadiusFilter();
    const geojsonLayer = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const layers = GeometryFunctions.getLayersInRadius(geojsonLayer.getLayers(), lat, lng, r * 1000);
    const name = duplicatedQuakesLayer ? LangageFunctions.getText('DUPLICATED_QUAKES_LAYER') : LangageFunctions.getText('QUAKES_LAYER');
    LayerFunctions.unmarkLayers(geojsonLayer.getLayers(), StyleFunctions.getValue('quakeBorderColor'));
    LayerFunctions.showLayer(geojsonLayer);
    WindowFunctions.showQuakesNumberQuery(name, layers, lat, lng, r);
  }

  static getFaultsNumberInRadius() {
    const lat = SidePanelFunctions.getSpatialLatitudeFilter();
    const lng = SidePanelFunctions.getSpatialLongitudeFilter();
    const r = SidePanelFunctions.getSpatialRadiusFilter();
    const geojsonLayer = duplicatedFaultsLayer ? duplicatedFaultsLayer : faultsLayer;
    const layers = GeometryFunctions.getLayersInRadius(geojsonLayer.getLayers(), lat, lng, r * 1000);
    const name = duplicatedFaultsLayer ? LangageFunctions.getText('DUPLICATED_FAULTS_LAYER') : LangageFunctions.getText('FAULTS_LAYER');
    LayerFunctions.unmarkLayers(geojsonLayer.getLayers(), StyleFunctions.getValue('faultColor'));
    LayerFunctions.showLayer(geojsonLayer);
    WindowFunctions.showFaultsNumberQuery(name, layers, lat, lng, r);
  }

  static getPopulationsNumberInRadius() {
    const lat = SidePanelFunctions.getSpatialLatitudeFilter();
    const lng = SidePanelFunctions.getSpatialLongitudeFilter();
    const r = SidePanelFunctions.getSpatialRadiusFilter();
    const geojsonLayer = duplicatedPopulationsLayer ? duplicatedPopulationsLayer : populationsLayer;
    const layers = GeometryFunctions.getLayersInRadius(geojsonLayer.getLayers(), lat, lng, r * 1000);
    const name = duplicatedPopulationsLayer ? LangageFunctions.getText('DUPLICATED_POPULATIONS_LAYER') : LangageFunctions.getText('POPULATIONS_LAYER');
    LayerFunctions.unmarkLayers(geojsonLayer.getLayers(), StyleFunctions.getValue('populationBorderColor'));
    LayerFunctions.showLayer(geojsonLayer);
    WindowFunctions.showPopulationsNumberQuery(name, layers, lat, lng, r);
  }

  // Consultas avanzadas / Advanced queries

  static getAdvancedQueries() {
    let array = [];
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_LAST_QUAKE_BY_MAGNITUDE_IN_RADIUS_TEXT'), callback: this.startLastQuakeByMagnitude});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_LAST_QUAKE_BY_INTENSITY_IN_RADIUS_TEXT'), callback: this.startLastQuakeByIntensity});
    return array;
  }

  static startLastQuakeByMagnitude(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.LAST_MAG_QUAKE);
  }

  static startLastQuakeByIntensity(ev) {
    GeneralFunctions.startDraw(ev, VisorMode.LAST_INT_QUAKE);
  }

  static getLastQuakeByMagnitudeInRadius(value, lat, lng, r) {
    let i, layer, feature, properties, date;
    let targetLayer = null;
    let maxDate = 0;
    const geojsonLayer = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const layers = geojsonLayer.getLayers();
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      feature = layer.feature;
      properties = feature.properties;
      date = MiscFunctions.getDate(properties[AttributesConfig.QUAKE_DATE]);
      if (date > maxDate && properties[AttributesConfig.QUAKE_MAGNITUDE] >= value
        && GeometryFunctions.isFeatureInsideCircle(feature, lat, lng, r)) {
        maxDate = date;
        targetLayer = layer;
      }
    }
    return targetLayer;
  }

  static getLastQuakeByIntensityInRadius(value, lat, lng, r) {
    let i, layer, feature, properties, date, intensityValue;
    let targetLayer = null;
    let maxDate = 0;
    const geojsonLayer = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const layers = geojsonLayer.getLayers();
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      feature = layer.feature;
      properties = feature.properties;
      date = MiscFunctions.getDate(properties[AttributesConfig.QUAKE_DATE]);
      intensityValue = MiscFunctions.getIntensityValue(properties[AttributesConfig.QUAKE_INTENSITY])
      if (date > maxDate && properties[AttributesConfig.QUAKE_INTENSITY] >= intensityValue
        && GeometryFunctions.isFeatureInsideCircle(feature, lat, lng, r)) {
        maxDate = date;
        targetLayer = layer;
      }
    }
    return targetLayer;
  }

  // Consultas de falla / Fault queries

  static getFaultsContextMenuItems() {
    let array = ["-"];
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_POPULATIONS_DISTANCE_TO_FAULT'), callback: WindowFunctions.showPopulationsDistanceInputQuery});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_BIGGEST_QUAKE_DISTANCE_TO_FAULT'), callback: WindowFunctions.showBiggestQuakeDistanceInputQuery});
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_POPULATION_NUMBER_DISTANCE_TO_FAULT'), callback: WindowFunctions.showPopulationNumberAndDistanceInputQuery});
    return array;
  }

  static zoomToBiggestQuakeDistanceToFault(distance) {
    const geojsonLayer = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const layers = geojsonLayer.getLayers();
    const layer = this.getBiggestQuakeToFault(distance);
    if (layer) {
      LayerFunctions.unmarkLayers(layers, StyleFunctions.getValue('quakeBorderColor'));
      LayerFunctions.markLayer(layer);
    }
    this.zoomToLayer(geojsonLayer, layer);
  }

  static getPopulationsDistanceToFault(distance) {
    let i, layer;
    let finalLayers = [];
    const faultLayer = GeneralFunctions.getSelectedObject().target;
    const geojsonLayer = duplicatedPopulationsLayer ? duplicatedPopulationsLayer : populationsLayer;
    const layers = geojsonLayer.getLayers();
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      if (GeometryFunctions.isPointInsideBuffer(layer, faultLayer, distance)) {
        finalLayers.push(layer);
      }
    }
    return finalLayers;
  }

  static getBiggestQuakeToFault(distance) {
    let i, layer, value;
    let maxValue = 0;
    let targetLayer = null;
    const faultLayer = GeneralFunctions.getSelectedObject().target;
    const geojsonLayer = duplicatedQuakesLayer ? duplicatedQuakesLayer : quakesLayer;
    const layers = geojsonLayer.getLayers();
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      value = layer.feature.properties[AttributesConfig.QUAKE_MAGNITUDE];
      if (value > maxValue && GeometryFunctions.isPointInsideBuffer(layer, faultLayer, distance)) {
        maxValue = value;
        targetLayer = layer;
      }
    }
    return targetLayer;
  }

  static getPopulationsByNumberDistanceToFault(distance, populationNumber) {
    let i, layer;
    let finalLayers = [];
    const faultLayer = GeneralFunctions.getSelectedObject().target;
    const geojsonLayer = duplicatedPopulationsLayer ? duplicatedPopulationsLayer : populationsLayer;
    const layers = geojsonLayer.getLayers();
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      if (layer.feature.properties[AttributesConfig.POPULATION_NUMBER] >= populationNumber && GeometryFunctions.isPointInsideBuffer(layer, faultLayer, distance)) {
        finalLayers.push(layer);
      }
    }
    return finalLayers;
  }

  // Consultas de población / Populations queries

  static getPopulationsContextMenuItems() {
    let array = ["-"];
    array.push({text: LangageFunctions.getText('CONTEXT_MENU_POPULATION_MAX_INTENSITY_TEXT'), callback: this.getPopulationMaxIntensity})
    return array;
  }

  static getPopulationMaxIntensity() {
    const pointLayer = GeneralFunctions.getSelectedObject().target;
    const lat = pointLayer.getLatLng().lat;
    const lng = pointLayer.getLatLng().lng;
    const layers = intensitiesLayer.getLayers();
    const maxIntensityLayer = QueryFunctions.getMaxIntensityLayer(layers, pointLayer);
    const populationName = pointLayer.feature.properties[AttributesConfig.POPULATION_NAME];
    const intenistyValue = maxIntensityLayer.feature.properties[AttributesConfig.INTENSITY_VALUE];
    const intensityString = MiscFunctions.getIntensityString(intenistyValue);
    WindowFunctions.showPopulationMaxIntensity(intensityString, populationName, lat, lng);
  }

  static getMaxIntensityLayer(intensitiesLayer, pointLayer) {
    let i, layer;
    for (i = 0; i < intensitiesLayer.length; i++) {
      layer = intensitiesLayer[i];
      if (GeometryFunctions.isObjectInsidePolygon(pointLayer, layer)) {
        return layer;
      }
    }
    return null;
  }
}