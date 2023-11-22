class MiscFunctions {
  static clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  static searchPopulation() {
    let i, obj, latlng, coords;
    const array = populationsData.features;
    const value = searchboxControl.getValue();
    if (value !== "") {
      for (i = 0; i < array.length; i++) {
        obj = array[i];
        if (obj.properties.nombre === value) {
          coords = obj.geometry.coordinates;
          latlng = L.latLng(coords[1], coords[0]);
          map.setView(latlng, 12);
        }
      }
    }

    searchboxControl.hide();
    searchboxControl.clear();
  }

  static getDate(ddmmyyyy) {
    const array = ddmmyyyy.trim().split('/');
    const day = array[0];
    const month = array[1];
    const year = array[2];
    const yyyymmdd = year + '/' + month + '/' + day;
    return new Date(yyyymmdd);
  }

  static getPreviousYearDate(date) {
    let newDate = date ? new Date(date) : new Date();
    newDate.setFullYear(newDate.getFullYear() - 1);
    return newDate;
  }

  static format(text) {
    for (let i = 1; i < arguments.length; i++) {
      text = text.replace("%" + i, arguments[i]);
    }
    text = text.replace(/%\d/g, "").trim();
    text = text.replace(/\s\s+/g, ' ');
    return text;
  }

  static getPopulationNames(array) {
    let i, obj;
    let finalArray = [];
    for (i = 0; i < array.length; i++) {
      obj = array[i].properties;
      finalArray.push(obj.nombre);
    }

    return finalArray;
  }

  static getLatLngByLayerType(layer) {
    // Devuelve el primer objeto latlng encontrado
    // Returns first latlng object found
    let latlng = null;
    const type = layer.feature.geometry.type;
    if (type === 'Point') {
      latlng = layer.getLatLng();
    } else if (type === 'MultiPoint') {
      latlng = layer.getLatLngs()[0];
    } else if (type === 'LineString') {
      latlng = layer.getLatLngs()[0];
    } else if (type === 'MultiLineString') {
      latlng = layer.getLatLngs()[0][0];
    }
    return latlng;
  }

  // Funciones de valores / Value functions

  static getFeaturesMinValue(features, attribute) {
    let value = Infinity;
    let i, properties;
    for (i = 0; i < features.length; i++) {
      properties = features[i].properties;
      if (properties[attribute] < value) value = properties[attribute];
    }
    if (value === Infinity || value < 0) value = 0;
    return value;
  }

  static getFeaturesMaxValue(features, attribute) {
    let value = 0;
    let i, properties;
    for (i = 0; i < features.length; i++) {
      properties = features[i].properties;
      if (properties[attribute] > value) value = properties[attribute];
    }
    return value;
  }
  
  static getQuakesMinMagnitude() {
    return this.getFeaturesMinValue(quakesData.features, AttributesConfig.QUAKE_MAGNITUDE);
  }

  static getQuakesMaxMagnitude() {
    return this.getFeaturesMaxValue(quakesData.features, AttributesConfig.QUAKE_MAGNITUDE);
  }

  static getQuakesMinDepth() {
    return this.getFeaturesMinValue(quakesData.features, AttributesConfig.QUAKE_DEPTH);
  }

  static getQuakesMaxDepth() {
    return this.getFeaturesMaxValue(quakesData.features, AttributesConfig.QUAKE_DEPTH);
  }

  static getFaultsMinMagnitude() {
    return this.getFeaturesMinValue(faultsData.features, AttributesConfig.FAULT_MAGNITUDE);
  }

  static getFaultsMaxMagnitude() {
    return this.getFeaturesMaxValue(faultsData.features, AttributesConfig.FAULT_MAGNITUDE);
  }

  static getFaultsMinDepth() {
    return this.getFeaturesMinValue(faultsData.features, AttributesConfig.FAULT_DEPTH);
  }

  static getFaultsMaxDepth() {
    return this.getFeaturesMaxValue(faultsData.features, AttributesConfig.FAULT_DEPTH);
  }

  static getPopulationsMinNumber() {
    return this.getFeaturesMinValue(populationsData.features, AttributesConfig.POPULATION_NUMBER);
  }

  static getPopulationsMaxNumber() {
    return this.getFeaturesMaxValue(populationsData.features, AttributesConfig.POPULATION_NUMBER);
  }

  static getIntensitiesMinValue() {
    return this.getFeaturesMinValue(intensitiesData.features, AttributesConfig.INTENSITY_VALUE);
  }

  static getIntensitiesMaxValue() {
    return this.getFeaturesMaxValue(intensitiesData.features, AttributesConfig.INTENSITY_VALUE);
  }

  static getQuakesMinIntensity() {
    let i, properties, value;
    let minValue = Infinity;
    const attribute = AttributesConfig.QUAKE_INTENSITY;
    const array = quakesData.features;
    for (i = 0; i < array.length; i++) {
      properties = array[i].properties;
      value = this.getIntensityValue(properties[attribute]);
      if (value < minValue) {
        minValue = value;
      }
    }
    if (minValue === Infinity || minValue < 0) {
      minValue = 0;
    }
    return minValue;
  }

  static getQuakesMaxIntensity() {
    let i, properties, value;
    let maxValue = 0;
    const attribute = AttributesConfig.QUAKE_INTENSITY;
    const array = quakesData.features;
    for (i = 0; i < array.length; i++) {
      properties = array[i].properties;
      value = this.getIntensityValue(properties[attribute]);
      if (value === -1) {
        value = 0;
      }
      if (value > maxValue) {
        maxValue = value;
      }
    }
    return maxValue;
  }

  static getQuakesMinDate() {
    let i, properties, date, value;
    let minValue = Infinity;
    const attribute = AttributesConfig.QUAKE_DATE;
    const features = quakesData.features;
    for (i = 0; i < features.length; i++) {
      properties = features[i].properties;
      value = properties[attribute];
      date = this.getDate(value);
      if (date < minValue) minValue = date;
    }
    if (minValue === Infinity) minValue = Date.now();
    return minValue;
  }

  static getQuakesMaxDate() {
    let i, properties, date, value;
    let maxValue = 0;
    const attribute = AttributesConfig.QUAKE_DATE;
    const features = quakesData.features;
    for (i = 0; i < features.length; i++) {
      properties = features[i].properties;
      value = properties[attribute];
      date = this.getDate(value);
      if (date > maxValue) maxValue = date;
    }
    return maxValue;
  }

  static getIntensityString(intensityValue) {
    return INTENSITY_STRING[intensityValue];
  }

  static getIntensityValue(intensityString) {
    let i, value;
    const array = intensityString.trim().split('-');
    let maxValue = 0;
    for (i = 0; i < array.length; i++) {
      value = INTENSITY_STRING.indexOf(array[i]);
      if (value < 0) value = 0;
      if (value > maxValue) maxValue = value;
    }
    return maxValue;
    // const index = INTENSITY_STRING.indexOf(intensityString);
    // return index !== -1 ? index : 0;
  }
}