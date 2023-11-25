PopupQuakeAttributes = {
  localizacion: {
    spanish: "Localización",
    english: "Location"
  },

  magnitud: {
    spanish: "Magnitud",
    english: "Magnitude",
    precision: 2
  },

  intensidad: {
    spanish: "Intensidad",
    english: "Intensity"
  },

  latitud: {
    spanish: "Latitud",
    english: "Latitude",
    precision: 4,
    suffix: "º"
  },

  longitud: {
    spanish: "Longitud",
    english: "Longitude",
    precision: 4,
    suffix: "º"
  },

  profundidad: {
    spanish: "Profundidad",
    english: "Depth",
    precision: 3,
    suffix: "km"
  },

  fecha: {
    spanish: "Fecha",
    english: "Date"
  }
}

PopupFaultAttributes = {
  ID: {
    spanish: "ID",
    english: "ID"
  },

  FaultName: {
    spanish: "Nombre",
    english: "Name"
  },

  MaxMagnitu: {
    spanish: "Magnitud máxima",
    english: "Maximum magnitude",
    precision: 2
  }
}

PopupPopulationAttributes = {
  nombre: {
    spanish: "Nombre",
    english: "Name"
  },

  habitantes: {
    spanish: "Número de habitantes",
    english: "Number of habitants"
  }
}

PopupIntensityAttributes = {
  intensidadR: {
    spanish: "Intensidad",
    english: "Intensity"
  }
}

class PopupFunctions {
  static textFormat = "<b> %1:</b> %2%3";

  static getText(obj, feature) {
    const featureProps = feature.properties;
    const format = this.getTextFormat();
    let attribute, value, name, precision, suffix;
    let text = "";
    let counter = 0;
    for (const attributeName in obj) {
      attribute = obj[attributeName];
      value = featureProps[attributeName];
      if (value !== undefined) {
        if (counter > 0) text += "<br>";
        name = this.getAttributeName(attribute);
        precision = this.getAttributePrecision(attribute);
        suffix = this.getAttributeSuffix(attribute);
        if (!suffix) suffix = "";
        if (typeof value === 'number') {
          value = String(this.getPreciseValue(value, precision));
        } else if (typeof value === 'string' && !value.trim()) {
          value = LangageFunctions.getText('POPUP_UNKNOWN_TEXT');
        }
        text += MiscFunctions.format(format, name, value, suffix);
      }
      counter++;
    }
    return text;
  }

  static getTextFormat() {
    return this.textFormat;
  }

  static getQuakeAttribute(key) {
    return PopupQuakeAttributes[key];
  }

  static getAttributeName(attribute) {
    const langage = LangageFunctions.getLangage();
    return attribute[langage];
  }

  static getAttributePrecision(attribute) {
    return attribute.precision;
  }

  static getAttributeSuffix(attribute) {
    return attribute.suffix;
  }

  static getPreciseValue(value, precision) {
    if (precision !== undefined) value = value.toFixed(precision);
    return parseFloat(value);
  }
}