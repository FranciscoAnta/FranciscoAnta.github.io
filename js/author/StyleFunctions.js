LayerStyles = {
  // Comunidad Autónoma / Region
  regionBorderColor: '#000000',
  regionWeight: 2,

  // Provincia / Province
  provinceBorderColor: '#000000',
  provinceWeight: 1,

  // Límite territorial / Territorial limit
  territorialLimitBorderColor: '#800080',
  territorialLimitWeight: 1,

  // Sismo / Quake
  quakeFillColor: '#ff7800',
  quakeBorderColor: '#000000',
  quakeWeight: 2,
  quakeFillOpacity: 0.8,

  // Falla / Fault
  faultColor: '#ff0000',
  faultWeight: 3,

  // Población / Population
  populationBorderColor: '#000000',
  populationFillColor: '#ffffff',
  populationFillOpacity: 1,
  populationWeight: 1.5,


  // Intensidad / Intensity
  intensityBorderColor: '#808080',
  intensityFillOpacity: 0.5,
  intensityWeight: 1,

  // Círculo de búsqueda / Filter Circle
  filterCircleBorderColor: '#3388ff',
  filterCircleFillColor: '#3388ff',
  filterCircleFillOpacity: 0.1,

  // Buffer de filtrado / Filter buffer
  filterBufferOpacity: 0.5,

  // Capa importada / Imported layer
  importedLayerBorderColor: '#3388ff',
  importedLayerFillColor: '#3388ff',

  // Sistema / System
  markedColor: '#008000',
  markedWeightGain: 2,
  highlighWeightGain: 2
}

class StyleFunctions {
  static getValue(key) {
    return LayerStyles[key];
  }

  static setValue(key, value) {
    LayerStyles[key] = value;
  }

  static getRegionsStyle() {
    return {
      color: LayerStyles.regionBorderColor,
      weight: LayerStyles.regionWeight,
      fillOpacity: 0
    }
  }

  static getProvincesStyle() {
    return {
      color: LayerStyles.provinceBorderColor,
      weight: LayerStyles.provinceWeight,
      fillOpacity: 0
    }
  }

  static getTerritorialLimitStyle() {
    return {
      color: LayerStyles.territorialLimitBorderColor,
      weight: LayerStyles.territorialLimitWeight,
      fillOpacity: 0
    }
  }

  static getQuakesStyle(feature) {
    const magnitudeAttribute = AttributesConfig.QUAKE_MAGNITUDE;
    const value = feature.properties[magnitudeAttribute];
    return {
      radius: 2 * Math.pow(value, 2),
      color: LayerStyles.quakeBorderColor,
      fillColor: LayerStyles.quakeFillColor,
      weight: LayerStyles.quakeWeight,
      fillOpacity: LayerStyles.quakeFillOpacity
    }
  }

  static getFaultsStyle() {
    return {
      color: LayerStyles.faultColor,
      weight: LayerStyles.faultWeight
    }
  }

  static getPopulationsStyle(feature, pane) {
    const valueAttribute = AttributesConfig.POPULATION_NUMBER;
    const shape = this.getPopulationShape(feature.properties[valueAttribute]);
    const radius = this.getPopulationRadius(shape);
    return {
      pane: pane,
      color: LayerStyles.populationBorderColor,
      fillColor: LayerStyles.populationFillColor,
      fillOpacity: LayerStyles.populationFillOpacity,
      weight: LayerStyles.populationWeight,
      radius: radius,
      shape: shape
    }
  }

  static getIntensitiesStyle(feature) {
    const valueAttribute = AttributesConfig.INTENSITY_VALUE;
    const value = feature.properties[valueAttribute];
    return {
      color: LayerStyles.intensityBorderColor,
      weight: LayerStyles.intensityWeight,
      fillOpacity: LayerStyles.intensityFillOpacity,
      fillColor: this.getIntensityColor(value)
    }
  }

  static getImportedLayerStyle() {
    return {
      color: LayerStyles.importedLayerBorderColor,
      fillColor: LayerStyles.importedLayerFillColor
    }
  }

  static getFilterCircleOptions(isInteractive) {
    if (isInteractive === undefined) isInteractive = false;
    return {
      interactive: isInteractive,
      pane: PaneSymbol.FILTER_CIRCLE,
      color: LayerStyles.filterCircleBorderColor,
      fillColor: LayerStyles.filterCircleFillColor,
      fillOpacity: LayerStyles.filterCircleFillOpacity
    }
  }

  static getFilterCircleOriginOptions(isInteractive) {
    if (isInteractive === undefined) isInteractive = false;
    return {
      interactive: isInteractive,
      pane: PaneSymbol.FILTER_CIRCLE,
      color: LayerStyles.filterCircleBorderColor,
      fillColor: LayerStyles.filterCircleFillColor,
      fillOpacity: 1,
      radius: 1
    }
  }

  static getFilterBufferOptions(width) {
    return {
      isInteractive: false,
      pane: PaneSymbol.FILTER_BUFFER,
      corridor: width,
      color: LayerStyles.faultColor,
      opacity: LayerStyles.filterBufferOpacity
    }
  }

  static getPopulationShape(populationNumber) {
    if (populationNumber > 100000) {
      return 'star-5';
    } else if (populationNumber > 10000) {
      return 'diamond';
    } else if (populationNumber > 1000) {
      return 'triangle';
    } else {
      return 'circle';
    }
  }

  static getPopulationRadius(shape) {
    if (shape === 'star-5') {
      return 20;
    } else if (shape === 'diamond') {
      return 8;
    } else if (shape === 'triangle') {
      return 7;
    } else {
      return 6;
    }
  }

  static getIntensityColor(value) {
    let color = 'gray';
    if (value <= 1) {
      color = '#003da7';
    } else if (value <= 2) {
      color = '#00a784';
    } else if (value <= 3) {
      color = '#44a700';
    } else if (value <= 4) {
      color = '#95d300';
    } else if (value <= 5) {
      color = '#c7e900';
    } else if (value <= 6) {
      color = '#fffd00';
    } else if (value <= 7) {
      color = '#ffbe00';
    } else if (value <= 8) {
      color = '#fb7f00';
    } else if (value <= 9) {
      color = '#f93f00';
    } else if (value <= 10) {
      color = '#f80900';
    } else if (value <= 11) {
      color = '#f80087';
    } else if (value <= 12) {
      color = '#7800f8';
    }
    return color;
  }

  // Funciones de resaltado / Highlight functions

  static highlightLayer(ev) {
    const layer = ev.target;
    const newWeight = layer.options.weight + LayerStyles.highlighWeightGain;
    if (layer.setStyle !== undefined) {
      layer.setStyle({
        weight: newWeight
      })
    }
  }

  static unhighlightLayer(ev) {
    const layer = ev.target;
    const newWeight = layer.options.weight - LayerStyles.highlighWeightGain;
    if (layer.setStyle !== undefined) {
      layer.setStyle({
        weight: newWeight
      })
    }
  }

  // Funciones de marcado / Mark options

  static markLayer(layer) {
    const newWeight = layer.options.weight + LayerStyles.markedWeightGain;
    layer.setStyle({
      color: LayerStyles.markedColor,
      weight: newWeight
    })
  }

  static unmarkLayer(layer, color) {
    const newWeight = layer.options.weight - LayerStyles.markedWeightGain;
    layer.setStyle({
      weight: newWeight,
      color: color
    })
  }
}