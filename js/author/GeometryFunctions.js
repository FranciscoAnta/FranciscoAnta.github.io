class GeometryFunctions {
  static isFeatureInsideCircle(feature, cLat, cLng, r) {
    // ¡El parámetro r debe estar en metros!
    // En todos los siguientes casos, un radio de valor mínimo se
    // considera como infinito y por tanto toda capa estaría dentro
    // The r parameter must be in meters!
    // In all the following cases, a minimum value radius is
    // considered infinite and thus all layer is inside 
    const geometry = feature.geometry;
    const type = geometry.type;
    if (r === MIN_RADIUS) {
      return true;
    } else if (type === 'Point') {
      return this.isPointInsideCircle(geometry.coordinates[1], geometry.coordinates[0], cLat, cLng, r);
    } else if (type === 'MultiPoint') {
      return this.isMultiPointInsideCircle(geometry.coordinates, cLat, cLng, r);
    } else if (type === 'LineString') {
      return this.isLineInsideCircle(geometry.coordinates, cLat, cLng, r);
    } else if (type === 'MultiLineString') {
      return this.isMultiLineInsideCircle(geometry.coordinates, cLat, cLng, r);
    } else {
      return false;
    }
  }

  static isPointInsideCircle(pLat, pLng, cLat, cLng, r) {
    const circleLatLng = L.latLng(cLat, cLng);
    const pointLatLng = L.latLng(pLat, pLng);
    return map.distance(pointLatLng, circleLatLng) <= r;
  }

  static isMultiPointInsideCircle(coordinatesArray, cLat, cLng, r) {
    let i, coordinates;
    for (i = 0; i < coordinatesArray.length; i++) {
      coordinates = coordinatesArray[i];
      if (this.isPointInsideCircle(coordinates[1], coordinates[0], cLat, cLng, r)) {
        return true;
      }
    }
    return false;
  }

  static isLineInsideCircle(coordinatesArray, cLat, cLng, r) {
    const cLatLng = L.latLng(cLat, cLng);
    return this.getMinimumDistanceToLine(coordinatesArray, cLatLng) <= r;
  }

  static isMultiLineInsideCircle(coordinatesArray, cLat, cLng, r) {
    let i, coordinates;
    for (i = 0; i < coordinatesArray.length; i++) {
      coordinates = coordinatesArray[i];
      if (this.isLineInsideCircle(coordinates, cLat, cLng, r)) {
        return true;
      }
    }
    return false;
  }

  static getMinimumDistanceToLine(coordinatesArray, oLatLng) {
    let i, coordinates1, coordinates2, p1LatLng, p2LatLng, d;
    let minValue = Infinity;
    for (i = 0; i < coordinatesArray.length - 1; i++) {
      coordinates1 = coordinatesArray[i];
      coordinates2 = coordinatesArray[i + 1];
      p1LatLng = L.latLng(coordinates1[1], coordinates1[0]);
      p2LatLng = L.latLng(coordinates2[1], coordinates2[0]);
      d = this.getDistanceToSegment(oLatLng, p1LatLng, p2LatLng);
      if (d < minValue) minValue = d;
    }
    return minValue;
  }

  static getDistanceToSegment(oLatLng, p1LatLng, p2LatLng) {
    const oPoint = map.latLngToLayerPoint(oLatLng);
    const p1Point = map.latLngToLayerPoint(p1LatLng);
    const p2Point = map.latLngToLayerPoint(p2LatLng);
    const cPoint = L.LineUtil.closestPointOnSegment(oPoint, p1Point, p2Point);
    const cLatLng = map.layerPointToLatLng(cPoint);
    return map.distance(oLatLng, cLatLng);
  }

  static isPointInsideBounds(bounds, pLat, pLng) {
    const latlng = L.latLng(pLat, pLng);
    return bounds.contains(latlng);
  }

  static getClosestObject(layers, oLatLng) {
    let closestLayer = null;
    if (layers.length > 0) {
      const type = layers[0].feature.geometry.type;
      if (type === 'Point') {
        closestLayer = this.getClosestPointLayer(layers, oLatLng);
      } else if (type === 'MultiPoint') {
        closestLayer = this.getClosestMultiPointLayer(layers, oLatLng);
      } else if (type === 'LineString') {
        closestLayer = this.getClosestLineLayer(layers, oLatLng);
      } else if (type === 'MultiLineString') {
        closestLayer = this.getClosestMultiLineLayer(layers, oLatLng);
      }
    }
    return closestLayer;
  }

  static getClosestPointLayer(layers, oLatLng) {
    let i, layer, pLatLng, distance;
    let closestLayer = null;
    let minDistance = Infinity;
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      pLatLng = layer.getLatLng();
      distance = map.distance(oLatLng, pLatLng);
      if (distance < minDistance) {
        minDistance = distance;
        closestLayer = layer;
      }
    }
    return closestLayer;
  }

  static getClosestMultiPointLayer(layers, oLatLng) {
    let i, j, layer, pLatLngs, pLatLng, distance;
    let closestLayer = null;
    let minDistance = Infinity;
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      pLatLngs = layer.getLatLngs();
      for (j = 0; j < pLatLngs.length; j++) {
        pLatLng = pLatLngs[j];
        distance = map.distance(oLatLng, pLatLng);
        if (distance < minDistance) {
          minDistance = distance;
          closestLayer = layer;
        }
      }
    }
    return closestLayer;
  }

  static getClosestLineLayer(layers, oLatLng) {
    let i, layer, coordinates, distance;
    let closestLayer = null;
    let minDistance = Infinity;
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      coordinates = layer.feature.geometry.coordinates;
      distance = this.getMinimumDistanceToLine(coordinates, oLatLng);
      if (distance < minDistance) {
        minDistance = distance;
        closestLayer = layer;
      }
    }
    return closestLayer;
  }

  static getClosestMultiLineLayer(layers, oLatLng) {
    let i, j, layer, lCoordinates, pCoordinates, distance;
    let closestLayer = null;
    let minDistance = Infinity;
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      lCoordinates = layer.feature.geometry.coordinates;
      for (j = 0; j < lCoordinates.length; j++) {
        pCoordinates = lCoordinates[j];
        distance = this.getMinimumDistanceToLine(pCoordinates, oLatLng);
        if (distance < minDistance) {
          minDistance = distance;
          closestLayer = layer;
        }
      }
    }
    return closestLayer;
  }

  static getLayersInRadius(layers, cLat, cLng, r) {
    let i, layer;
    const finalLayers = [];
    for (i = 0; i < layers.length; i++) {
      layer = layers[i];
      if (this.isFeatureInsideCircle(layer.feature, cLat, cLng, r)) {
        finalLayers.push(layer);
      }
    }
    return finalLayers;
  }

  static isObjectInsidePolygon(pointObj, polygonObj) {
    // pointObj y polygonObj son objetos (o capas) de una capa geoJSON
    const type = polygonObj.feature.geometry.type;
    const pointLatLng = pointObj.getLatLng();
    if (type === 'MultiPolygon') {
      return this.isPointInsideMultiPolygon(pointLatLng, polygonObj.getLatLngs());
    } else if (type === 'Polygon') {
      return this.isPointInsidePolygon(pointLatLng, polygonObj.getLatLngs());
    } else {
      return false;
    }
  }

  static isPointInsideMultiPolygon(pointLatLng, multiPolygonLatLngs) {
    for (let i = 0; i < multiPolygonLatLngs.length; i++) {
      if (this.isPointInsidePolygon(pointLatLng, multiPolygonLatLngs[i])) {
        return true;
      }
    }
    return false;
  }

  static isPointInsidePolygon(pointLatLng, polygonLatLngs) {
    let i, j, k, xj, yj, xk, yk, isIntersect;
    let isInside = false;
    const x = pointLatLng.lng;
    const y = pointLatLng.lat;
    for (i = 0; i < polygonLatLngs.length; i++) {
      for (j = 0, k = polygonLatLngs[i].length - 1; j < polygonLatLngs[i].length; k = j++) {
        xj = polygonLatLngs[i][j].lng;
        yj = polygonLatLngs[i][j].lat;
        xk = polygonLatLngs[i][k].lng;
        yk = polygonLatLngs[i][k].lat;

        isIntersect = ((yj > y) != (yk > y))
        && (x < (xk - xj) * (y - yj) / (yk - yj) + xj);
        if (isIntersect) {
          isInside = !isInside;
        }
      }
    }
    return isInside;
  }

  isPointPolygonVertex(pointLatLng, polygonLatLngs) {
    let i, j, vertexLatLng;
    for (i = 0; i < polygonLatLngs.length; i++) {
      for (j = 0; j < polygonLatLngs[i].length; j++) {
        vertexLatLng = polygonLatLngs[i][j];
        if (pointLatLng.lat === vertexLatLng.lat 
        && pointLatLng.lng === vertexLatLng.lng) {
            return true;
        }
      }
    }
    return false;
  }

  static isPolygonObjectInsideRadius(polygonLayer, lat, lng, r) {
    // pointObj y polygonObj son objetos (o capas) de una capa geoJSON
    const type = polygonLayer.feature.geometry.type;
    const pointLatLng = L.latLng(lat, lng);
    if (type === 'MultiPolygon') {
      return this.isMultiPolygonInsideRadius(polygonLayer.getLatLngs(), pointLatLng, r);
    } else if (type === 'Polygon') {
      return this.isPolygonInsideRadius(polygonLayer.getLatLngs(), pointLatLng, r);
    } else {
      return false;
    }
  }

  static isMultiPolygonInsideRadius(multiPolygonLatLngs, pointLatLng, r) {
    for (let i = 0; i < multiPolygonLatLngs.length; i++) {
      if (this.isPolygonInsideRadius(multiPolygonLatLngs[i], pointLatLng, r)) {
        return true;
      }
    }
    return false;
  }

  static isPolygonInsideRadius(polygonLatLngs, pointLatLng, r) {
    let i, j, polygonLatLng;
    for (i = 0; i < polygonLatLngs.length; i++) {
      for (j = 0; j < polygonLatLngs[i].length; j++) {
        polygonLatLng = polygonLatLngs[i][j];
        if (this.isPointInsideCircle(polygonLatLng.lat, polygonLatLng.lng,
          pointLatLng.lat, pointLatLng.lng, r)) {
          return true;
        }
      }
    }
    return false;
  }

  static isPointInsideBuffer(pointLayer, faultLayer, distance) {
    const type = faultLayer.feature.geometry.type;
    const coordinates = faultLayer.feature.geometry.coordinates;
    if (type === 'LineString') {
      return this.isPointInsideLineBuffer(pointLayer, coordinates, distance);
    } else if (type === 'MultiLineString') {
      return this.isPointInsideMultiLineBuffer(pointLayer, coordinates, distance);
    }
    return false;
  }

  static isPointInsideLineBuffer(pointLayer, faultCoordinates, distance) {
    return this.getMinimumDistanceToLine(faultCoordinates, pointLayer.getLatLng()) <= distance;
  }

  static isPointInsideMultiLineBuffer(pointLayer, faultCoordinates, distance) {
    let i, coordinates;
    for (i = 0; i < faultCoordinates.length; i++) {
      coordinates = faultCoordinates[i];
      if (this.isPointInsideLineBuffer(pointLayer, coordinates, distance)) {
        return true;
      }
    }
    return false;
  }
}