L.Control.EventLegend = L.Control.extend({
  container: null,
  minimized: false,

  onAdd: function(map) {
    this.container = L.DomUtil.create('div', 'eventLegend');
    L.DomEvent.disableClickPropagation(this.getContainer());
    this.minimized = false;
    this.update();
    return this.getContainer();
  },

  onRemove: function(map) {

  },

  update: function() {
    let button;
    this.container.innerHTML = this.getTitle();

    if (!this.isMinimized()) {
      if (LayerFunctions.isLayerVisible(intensitiesLayer)) {
        this.container.innerHTML += this.getIntensityContains();
      }
      if (LayerFunctions.isLayerVisible(faultsLayer) || LayerFunctions.isLayerVisible(duplicatedFaultsLayer)) {
        this.container.innerHTML += this.getFaultsContains();
      }

      if (LayerFunctions.isLayerVisible(populationsLayer) || LayerFunctions.isLayerVisible(duplicatedPopulationsLayer)) {
        this.container.innerHTML += this.getPopulationsContains();
      }

      if (LayerFunctions.isLayerVisible(quakesLayer) || LayerFunctions.isLayerVisible(duplicatedQuakesLayer)) {
        this.container.innerHTML += this.getQuakesContains();
      }
    }

    button = this.container.querySelector('#eventLegendMinimizeButton') ;
    L.DomEvent.on(button, 'click', this.onMinimizeButton, this);
  },

  getTitle() {
    const key = this.isMinimized() ? 'MAXIMIZE_BUTTON_SYMBOl' : 'MINIMIZE_BUTTON_SYMBOl';
    const title = LangageFunctions.getText('EVENT_LEGEND_CONTROL_TITLE');
    const buttonSign = LangageFunctions.getText(key);
    return "<h2>" + title + "  <button id='eventLegendMinimizeButton'>" + buttonSign + "</button></h2>";
  },

  getIntensityContains: function() {
    let i, value;
    const min = INTENSITIES_MIN_VALUE;
    const max = INTENSITIES_MAX_VALUE;
    const maxItems = (max - min + 1) * 2;
    const cols = maxItems;
    const title = LangageFunctions.getText('EVENT_LEGEND_CONTROL_TITLE');
    let contains = "<p><div><b><em>" + title + "</em></b></div><div><table>";
    for (i = 0; i < maxItems; i++) {
      value = Math.floor(i / 2) + min;
      if (i === 0) {
        contains += "<tr>";
      } else if (i % cols === 0) {
        contains += "</tr><tr>";
      }
        
      if (i % 2 === 0) {
        contains += "<td class='intensitySymbol' style='background:" + StyleFunctions.getIntensityColor(value) + "'></td>"
      } else {
        contains += "<td class='intensityText'>" + INTENSITY_STRING[value] + "</td>"
      }
    }
    contains += "</tr></table></div></p>";
    return contains;
  },

  getFaultsContains: function() {
    const title = LangageFunctions.getText('EVENT_LEGEND_CONTROL_FAULT_TITLE');
    const text = LangageFunctions.getText('EVENT_LEGEND_CONTROL_FAULT_TEXT');
    const color = StyleFunctions.getValue('faultColor');
    let contains = "<p><div><b><em>" + title + "</em></b></div>";
    contains += "<div><i class='faultSymbol' style='background:" + color + "'></i>" + text + "</div></p>";
    return contains;
  },

  getQuakesContains: function() {
    let i, size, dx, dy, dty, text;
    const min = Math.max(1, Math.floor(QUAKES_MIN_MAGNITUDE));
    const max = Math.ceil(QUAKES_MAX_MAGNITUDE);
    const maxSize = this.getQuakeSizeFormula(max);
    const x = 25;
    const y = this.getContainer().offsetHeight + maxSize + 10;
    const dl = x + maxSize / 2;
    const dw = maxSize * 3 / 5;
    const dtx = dl + dw + 10;
    const title = LangageFunctions.getText('EVENT_LEGEND_CONTROL_MAGNITUDE_TITLE');
    const borderColor = StyleFunctions.getValue('quakeBorderColor');
    const fillColor = StyleFunctions.getValue('quakeFillColor');
    let contains = "<p>";
    contains += "<div><b><em>" + title + "</em></b></div>";

    contains += "<div style='height:" + maxSize + "px'>";
    for (i = max; i >= min; i--) {
      text = this.getQuakeText(i, min, max);
      size = this.getQuakeSizeFormula(i);
      dx = x + maxSize / 2 - size / 2;
      dy = y - size;
      dty = dy - 10;
      contains += "<i class='quakeLine' style='width: " + dw + "px; left:" + dl + "px; top:" + dy + "px'></i>"
      contains += "<i class='quakeSymbol' style='width:" +  size + "px; height:" + size + "px; left:" + dx + "px; top:" + dy + "px; border-color:" + borderColor + "; background-color:" + fillColor + "'></i>"
      contains += "<i class='quakeText' style='left:" + dtx + "px; top:" + dty + "px'>" + text + "</i>"
    }

    contains += "</div>";
    contains += "</p>";
    return contains;
  },

  onMinimizeButton: function() {
    if (this.isMinimized()) {
      this.maximize();
    } else {
      this.minimize();
    }
  },

  getPopulationsContains: function() {
    const title = LangageFunctions.getText('EVENT_LEGEND_CONTROL_POPULATION_TITLE');
    const text = LangageFunctions.getText('EVENT_LEGEND_CONTROL_POPULATION_TEXT');
    const borderColor = StyleFunctions.getValue('populationBorderColor');
    const fillColor = StyleFunctions.getValue('populationFillColor');
    let contains = "<p>";
    contains += "<div><b><em>" + title + "</em></b></div>";
    // contains += "<span>Círculo: H < 10000</span><br>";
    // contains += "<span>Diamante: 10000 ≤ H ≤ 100000</span><br>";
    // contains += "<span>Círculo: H ≥ 100000</span>";
    contains += "<div><i class='popCircleSymbol' style='border-color:" + borderColor + "; background-color:" + fillColor + "'></i>" + text + " < 10000</div>";
    contains += "<div><i class='popDiamondSymbol' style='border-color:" + borderColor + "; background-color:" + fillColor + "'></i>10000 ≤ " + text + " ≤ 100000</div>";
    contains += "<div><svg width='24px' height='24px' viewBox='10 10 16 16' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'  version='1.2' baseProfile='tiny'> <title>Qt SVG Document</title> <desc>Generated with Qt</desc> <defs></defs><g fill='none' stroke='black' stroke-width='1' fill-rule='evenodd' stroke-linecap='square' stroke-linejoin='bevel' ><g fill='" + fillColor + "' fill-opacity='1' stroke='" + borderColor + "' stroke-opacity='1' stroke-width='1.13386' stroke-linecap='square' stroke-linejoin='bevel' transform='matrix(1,0,0,1,0,0)' font-family='MS Shell Dlg 2' font-size='8.25' font-weight='400' font-style='normal'><path vector-effect='none' fill-rule='evenodd' d='M14.409,13.8101 L9.26023,13.8101 L13.4256,16.8365 L11.8346,21.7332 L16,18.7068 L20.1654,21.7332 L18.5744,16.8365 L22.7398,13.8101 L17.591,13.8101 L16,8.91339 L14.409,13.8101'/></g></g></svg>"
    + text + "≥ 100000</div>";
    contains += "</p>";
    return contains;
  },

  getQuakeSizeFormula: function(magnitude) {
    return 4 * Math.pow(magnitude, 2) + 2.85;
  },

  getQuakeText: function(mag, min, max) {
    let text = "";
    const title = LangageFunctions.getText('EVENT_LEGEND_CONTROL_MAGNITUDE_Text');
    if (mag === min) {
      text = min + " ≤ " + title;
    } else if (mag === max) {
      text = mag + " ≤ " + title;
    } else {
      text = mag + " ≤ " + title + " < " + String(mag + 1);
    }
    return text;
  },

  getContainer: function() {
    return this.container;
  },

  minimize: function() {
    this.setMinimized(true);
  },

  maximize: function() {
    this.setMinimized(false);
  },

  isMinimized: function() {
    return this.minimized;
  },

  setMinimized: function(value) {
    this.minimized = value;
    this.update();
  },
})

L.control.eventLegend = function(options) {
  return new L.Control.EventLegend(options);
}