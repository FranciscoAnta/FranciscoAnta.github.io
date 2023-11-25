AvailableLangages = ['spanish', 'english'];

class LangageFunctions {
  static getLangage() {
    return langage; // Modificar después
  }

  static getText(key, langage) {
    if (!langage) langage = this.getLangage();
    return this[langage][key];
  }

  static updateContextMenuTexts() {
    let i, item;
    const items = GeneralFunctions.getContextMenuItems();
    map.contextmenu.removeAllItems();
    for (i = 0; i < items.length; i++) {
      item = items[i];
      map.contextmenu.addItem(item);
    }
  }

  static updateLayersTexts() {
    SidePanelFunctions.initializeQuakeFiltersInputs();
    SidePanelFunctions.initializeFaultFiltersInputs();
    SidePanelFunctions.initializePopulationFiltersInputs();
    SidePanelFunctions.initializeSpatialFiltersInputs();
    LayerFunctions.removeAllLayers();
    LayerFunctions.removeLimitsLayers();
    LayerFunctions.removeFilterBufferLayer();
    LangageFunctions.updateLayerControlBaseLayersTexts();
    GeneralFunctions.initializeOverlayLayers();
    GeneralFunctions.finishDraw();
    SidePanelFunctions.initializeExportLayerSelect();
    SidePanelFunctions.setFilterLegendAllLayersFilters();
  }

  static updateLayerControlBaseLayersTexts() {
    if (layerControl) {
      layerControl.removeLayer(emptyLayer);
      layerControl.removeLayer(osmLayer);
      layerControl.addBaseLayer(emptyLayer, LangageFunctions.getText('EMPTY_LAYER'));
      layerControl.addBaseLayer(osmLayer, LangageFunctions.getText('OSM_LAYER'));
    }
  }

  static spanish = {
    NAME: "Castellano",

    // Textos del control de capas
    EMPTY_LAYER: "Nada",
    OSM_LAYER: "Open Street Map",
    REGIONS_LAYER: "Comunidades Autónomas",
    PROVINCES_LAYER: "Provincias",
    TERRITORIAL_LIMIT: "Límite territorial",
    QUAKES_LAYER: "Sismos",
    FAULTS_LAYER: "Fallas",
    POPULATIONS_LAYER: "Poblaciones",
    INTENSITIES_LAYER: "Intensidades",
    DUPLICATED_QUAKES_LAYER: "Copia de sismos",
    DUPLICATED_FAULTS_LAYER: "Copia de fallas",
    DUPLICATED_POPULATIONS_LAYER: "Copia de poblaciones",

    // Textos del panel lateral

    // Todos los filtros
    SIDE_PANEL_ALL_FILTERS_TAB_TITLE: "Filtrar todas las capas",
    SIDE_PANEL_ALL_FILTERS_TAB_DESCRIPTION: "Filtra las capas de sismos, fallas y poblaciones según los parámetros especificados.",
    SIDE_PANEL_QUAKE_FILTERS_TITLE: "Filtros de sismos",
    SIDE_PANEL_FAULT_FILTERS_TITLE: "Filtros de fallas",
    SIDE_PANEL_POPULATION_FILTERS_TITLE: "Filtros de poblaciones",

    // Filtros de sismos
    SIDE_PANEL_QUAKE_FILTERS_TAB_TITLE: "Filtrar capa de sismos",
    SIDE_PANEL_QUAKE_FILTERS_TAB_DESCRIPTION: "Filtra únicamente la capa de sismos según los parámetros especificados.",
    SIDE_PANEL_QUAKE_MAGNITUDE_FILTERS_TITLE: "Filtros de magnitud",
    SIDE_PANEL_QUAKE_MIN_MAGNITUDE_FILTER_TEXT: "Magnitud mínima:  ",
    SIDE_PANEL_QUAKE_MAX_MAGNITUDE_FILTER_TEXT: "Magnitud máxima:  ",
    SIDE_PANEL_QUAKE_INTENSITY_FILTERS_TITLE: "Filtros de intensidad",
    SIDE_PANEL_QUAKE_MIN_INTENSITY_FILTER_TEXT: "Intensidad mínima:  ",
    SIDE_PANEL_QUAKE_MAX_INTENSITY_FILTER_TEXT: "Intensidad máxima:  ",
    SIDE_PANEL_QUAKE_DEPTH_FILTERS_TITLE: "Filtros de profundidad",
    SIDE_PANEL_QUAKE_MIN_DEPTH_FILTER_TEXT: "Profundidad mínima [km]:  ",
    SIDE_PANEL_QUAKE_MAX_DEPTH_FILTER_TEXT: "Profundidad máxima [km]:  ",
    SIDE_PANEL_QUAKE_DATE_FILTERS_TITLE: "Filtros de fecha",
    SIDE_PANEL_QUAKE_MIN_DATE_FILTER_TEXT: "Fecha mínima:  ",
    SIDE_PANEL_QUAKE_MAX_DATE_FILTER_TEXT: "Fecha máxima:  ",
    SIDE_PANEL_QUAKE_UNKNOWN_INTENSITY: "Desconocida",

    // Filtros de fallas
    SIDE_PANEL_FAULT_FILTERS_TAB_TITLE: "Filtrar la capa de fallas",
    SIDE_PANEL_FAULT_FILTERS_TAB_DESCRIPTION: "Filtra únicamente la capa de fallas según los parámetros especificados.<br><br>Las fallas que cruzan parcialmente el radio de búsqueda se consideran como dentro.",
    SIDE_PANEL_FAULT_MAGNITUDE_FILTERS_TITLE: "Filtros de magnitud",
    SIDE_PANEL_FAULT_MIN_MAGNITUDE_FILTER_TEXT: "Magnitud mínima esperable:  ",
    SIDE_PANEL_FAULT_MAX_MAGNITUDE_FILTER_TEXT: "Magnitud máxima esperable:  ",
    SIDE_PANEL_FAULT_DEPTH_FILTERS_TITLE: "Filtros de profundidad",
    SIDE_PANEL_FAULT_MIN_DEPTH_FILTER_TEXT: "Profundidad mínima [km]:  ",
    SIDE_PANEL_FAULT_MAX_DEPTH_FILTER_TEXT: "Profundidad máxima [km]:  ",

    // Filtros de poblaciones
    SIDE_PANEL_POPULATION_FILTERS_TAB_TITLE: "Filtrar capa de poblaciones",
    SIDE_PANEL_POPULATION_FILTERS_TAB_DESCRIPTION: "Filtra únicamente la capa de poblaciones según los parámetros especificados.",
    SIDE_PANEL_POPULATION_NUMBER_FILTERS_TITLE: "Filtros de número de habitantes",
    SIDE_PANEL_POPULATION_MIN_NUMBER_FILTER_TEXT: "Mínimo de habitantes:  ",
    SIDE_PANEL_POPULATION_MAX_NUMBER_FILTER_TEXT: "Máximo de habitantes:  ",

    // Filtros espaciales
    SIDE_PANEL_SPATIAL_FILTERS_TAB_TITLE: "Filtros espaciales",
    SIDE_PANEL_SPATIAL_FILTERS_TAB_DESCRIPTION: "Filtra los elementos de las capas cuyos centros (sismos y poblaciones) estén dentro del radio de búsqueda especificados o lo crucen (fallas).<br><br>Esta opción no filtra por ningún otro tipo de parámetro.",
    SIDE_PANEL_SPATIAL_FILTERS_TITLE: "Filtros espaciales",
    SIDE_PANEL_SPATIAL_FILTERS_COORDINATES_TITLE: "Coordenadas del centro de búsqueda",
    SIDE_PANEL_SPATIAL_FILTERS_RADIUS_TITLE: "Radio de búsqueda",
    SIDE_PANEL_SPATIAL_CONDITION_TITLE: "Condición",
    SIDE_PANEL_SPATIAL_LATITUDE_FILTER_TEXT: "Latitud [º]:  ",
    SIDE_PANEL_SPATIAL_LONGITUDE_FILTER_TEXT: "Longitud [º]:  ",
    SIDE_PANEL_SPATIAL_RADIUS_FILTER_TEXT: "Radio [km]:  ",
    SIDE_PANEL_SPATIAL_RADIUS_FIXED_TEXT: "Fijar",
    SIDE_PANEL_SPATIAL_INSIDE_TERRITORIAL_LIMIT_FILTER_TEXT: "Dentro de límite territorial",

    // Botones
    SIDE_PANEL_FILTER_BUTTON: "Filtrar",
    SIDE_PANEL_FILTER_ALL_BUTTON: "Filtrar todos",
    SIDE_PANEL_DUPLICATE_BUTTON: "Duplicar y filtrar",
    SIDE_PANEL_DUPLICATE_ALL_BUTTON: "Duplicar y filtrar todos",
    SIDE_PANEL_REFRESH_BUTTON: "Limpiar",
    SIDE_PANEL_REFRESH_ALL_BUTTON: "Limpiar todos",
    SIDE_PANEL_UNMARK_ALL_BUTTON: "Desmarcar todos",
    SIDE_PANEL_UNMARK_BUTTON: "Desmarcar",

    // Archivos
    SIDE_PANEL_FILES_TAB_TITLE: "Gestión de archivos",
    SIDE_PANEL_FILES_TAB_DESCRIPTION: "Importa capas desde archivos GeoJSON y exporta capas a formato CSV y GeoJSON.",
    SIDE_PANEL_FILES_IMPORT_TITLE: "Importar",
    SIDE_PANEL_FILES_IMPORT_LAYER_NAME_TEXT: "<b>Nombre (opcional)</b>:",
    SIDE_PANEL_FILES_IMPORT_LAYER_BUTTON_TEXT: "Cargar",
    SIDE_PANEL_FILES_EXPORT_TITLE: "Exportar",
    SIDE_PANEL_FILES_EXPORT_NAME_TEXT: "<b>Nombre:</b>  ",
    SIDE_PANEL_FILES_EXPORT_LAYER_TEXT: "<b>Capa:</b>  ",
    SIDE_PANEL_FILES_EXPORT_ONLY_VISIBLE_BOUNDS_TEXT: "Exportar vista actual",
    SIDE_PANEL_FILES_EXPORT_CSV_BUTTON_TEXT: "Exportar CSV",
    SIDE_PANEL_FILES_EXPORT_GEOJSON_BUTTON_TEXT: "Exportar GeoJSON",

    // Opciones
    SIDE_PANEL_OPTIONS_TITLE: "Opciones del visor",
    SIDE_PANEL_OPTIONS_DESCRIPTION: "Modifica el idioma, visibilidad de controles y estilos de capas",
    SIDE_PANEL_OPTIONS_LANGAGE_TITLE: "Idioma",
    SIDE_PANEL_OPTIONS_LANGAGE_TEXT: "<em><b>Aviso:</b> Cambiar el idioma reiniciará todas las capas a su estado inicial.</em>",
    SIDE_PANEL_OPTIONS_CONTROLS_TITLE: "Visibilidad de controles",
    SIDE_PANEL_OPTIONS_STYLES_TITLE: "Estilos de capas",
    SIDE_PANEL_OPTIONS_LAYER_CONTROL_ALWAYS_DEPLOYED_TEXT: "C. de capas siempre desplegado",
    SIDE_PANEL_OPTIONS_SCALEBAR_CONTROL_VISIBLE_TEXT: "Mostrar barra de escala",
    SIDE_PANEL_OPTIONS_COORDINATE_VISOR_CONTROL_VISIBLE_TEXT: "Mostrar visor de coordenadas",
    SIDE_PANEL_OPTIONS_FILTER_LEGEND_CONTROL_VISIBLE_TEXT: "Mostrar leyenda de filtros",
    SIDE_PANEL_OPTIONS_EVENT_LEGEND_CONTROL_VISIBLE_TEXT: "Mostrar leyenda de eventos",
    SIDE_PANEL_OPTIONS_QUAKES_STYLES_TITLE: "Estilos de sismos",
    SIDE_PANEL_OPTIONS_QUAKES_BORDER_COLOR_TEXT: "Color de borde de sismo",
    SIDE_PANEL_OPTIONS_QUAKES_FILL_COLOR_TEXT: "Color de relleno de sismo",
    SIDE_PANEL_OPTIONS_FAULTS_STYLES_TITLE: "Estilos de fallas",
    SIDE_PANEL_OPTIONS_FAULTS_BORDER_COLOR_TEXT: "Color de borde de falla",
    SIDE_PANEL_OPTIONS_POPULATIONS_STYLES_TITLE: "Estilos de poblaciones",
    SIDE_PANEL_OPTIONS_POPULATIONS_BORDER_COLOR_TEXT: "Color de borde de población",
    SIDE_PANEL_OPTIONS_POPULATIONS_FILL_COLOR_TEXT: "Color de relleno de población",
    SIDE_PANEL_OPTIONS_INTENSITIES_STYLES_TITLE: "Estilos de intensidades",
    SIDE_PANEL_OPTIONS_INTENSITIES_BORDER_COLOR_TEXT: "Color de borde de intensidad",
    SIDE_PANEL_OPTIONS_REGIONS_STYLES_TITLE: "Estilos de comunidades autónomas",
    SIDE_PANEL_OPTIONS_REGIONS_BORDER_COLOR_TEXT: "C. de borde de comunidad autónoma",
    SIDE_PANEL_OPTIONS_PROVINCES_STYLES_TITLE: "Estilos de provincias",
    SIDE_PANEL_OPTIONS_PROVINCES_BORDER_COLOR_TEXT: "Color de borde de provincia",
    SIDE_PANEL_OPTIONS_TERRITORIAL_LIMIT_STYLES_TITLE: "Estilos de límite territorial",
    SIDE_PANEL_OPTIONS_TERRITORIAL_LIMIT_BORDER_COLOR_TEXT: "C. de borde de l. territorial",
    SIDE_PANEL_OPTIONS_FILTER_CIRCLE_STYLES_TITLE: "Estilos de círculo de filtrado",
    SIDE_PANEL_OPTIONS_FILTER_CIRCLE_BORDER_COLOR_TEXT: "C. de borde de c. de filtrado",
    SIDE_PANEL_OPTIONS_FILTER_CIRCLE_FILL_COLOR_TEXT: "C. de relleno de c. de filtrado",
    SIDE_PANEL_OPTIONS_IMPORTED_LAYER_TITLE: "Capa importada",
    SIDE_PANEL_OPTIONS_IMPORTED_LAYER_BORDER_COLOR_TEXT: "C. de borde de c. importada",
    SIDE_PANEL_OPTIONS_IMPORTED_LAYER_FILL_COLOR_TEXT: "C. de relleno de c. importada",
    SIDE_PANEL_OPTIONS_SYSTEM_STYLES_TITLE: "Estilos de sistema",
    SIDE_PANEL_OPTIONS_MARKED_COLOR_TEXT: "Color de marcado",

    // Instrucciones
    SIDE_PANEL_INSTRUCTIONS_TITLE: "Manual de usuario",
    SIDE_PANEL_INSTRUCTIONS_DESCRIPTION: "<h2>Controles básicos:<h2>Ratón",

    // Contacto
    SIDE_PANEL_CONTACT_TITLE: "Información",
    SIDE_PANEL_CONTACT_DESCRIPTION: "<h2>Nombre del proyecto</h2>Visor de eventos sísmicos de España."
    + "<h2>Asignatura</h2>Trabajo de Fin de Máster de Ingeniería Geodésica y Cartografía."
    + "<h2>Escuela</h2>Escuela Superior de Ingenieros en Topografía, Geodesia y Cartografía. Universidad Politécnica de Madrid."
    + "<h2>Información de contacto</h2><h3>Autor</h3><b>Nombre:</b> Francisco Manuel Anta Sánchez.<br>"
    + "<b>Correo electrónico:</b> <a href='mailto:francisco.anta.sanchez@gmail.com'>francisco.anta.sanchez@gmail.com</a>"
    + "<h3>Tutor</h3><b>Nombre:</b> Jorge Miguel Gaspar Escribano."
    + "<h2>Créditos de plugins de terceros</h2>"
    + "<h3>Leaflet</h3><b>Autor:</b> Volodymyr Agafonkin.<br><b>Dirección:</b> <a href='https://leafletjs.com/' target='_blank'>https://leafletjs.com/</a>"
    + "<h3>Leaflet.SidePanel</h3><b>Autor:</b> Maxwell Ilai.<br><b>Dirección</b> <a href='https://github.com/maxwell-ilai/Leaflet.SidePanel' target='_blank'>https://github.com/maxwell-ilai/Leaflet.SidePanel</a>"
    + "<h3>Leaflet.SvgShapeMarkers</h3><b>Autor:</b> Rowan Winsemius.<br><b>Dirección</b> <a href='https://github.com/rowanwins/Leaflet.SvgShapeMarkers' target='_blank'>https://github.com/rowanwins/Leaflet.SvgShapeMarkers</a>"
    + "<h3>Leaflet.Control.Window</h3><b>Autor:</b> mapshakers.<br><b>Dirección</b> <a href='https://github.com/mapshakers/leaflet-control-window' target='_blank'>https://github.com/mapshakers/leaflet-control-window</a>"
    + "<h3>Leaflet.Corridor</h3><b>Autor:</b> Mikhail Shilkov.<br><b>Dirección</b> <a href='https://github.com/mikhailshilkov/leaflet-corridor' target='_blank'>https://github.com/mikhailshilkov/leaflet-corridor</a>"
    + "<h3>Leaflet.EasyPrint</h3><b>Autor:</b> Rowan Winsemius.<br><b>Dirección</b> <a href='https://github.com/rowanwins/leaflet-easyPrint' target='_blank'>https://github.com/rowanwins/leaflet-easyPrint</a>"
    + "<h3>Leaflet.contextmenu</h3><b>Autor:</b> Adam Ratcliffe.<br><b>Dirección</b> <a href='https://github.com/aratcliffe/Leaflet.contextmenu' target='_blank'>https://github.com/aratcliffe/Leaflet.contextmenu</a>"
    + "<h3>Leaflet.EasyButton</h3><b>Autor:</b> atstp.<br><b>Dirección</b> <a href='https://github.com/CliffCloud/Leaflet.EasyButton' target='_blank'>https://github.com/CliffCloud/Leaflet.EasyButton</a>"
    + "<h3>Leaflet.BetterScale</h3><b>Autor:</b> Dan Brown<br><b>Dirección</b> <a href='https://github.com/daniellsu/leaflet-betterscale' target='_blank'>https://github.com/daniellsu/leaflet-betterscale</a>"
    + "<h3>Leaflet.AnimatedSearchBox</h3><b>Autor:</b> Luka Steinbach.<br><b>Dirección</b> <a href='https://github.com/luka1199/Leaflet.AnimatedSearchBox' target='_blank'>https://github.com/luka1199/Leaflet.AnimatedSearchBox</a>"
    + "<h3>Fuse</h3><b>Autor:</b> Kiro Risk.<br><b>Dirección</b> <a href='https://www.fusejs.io/' target='_blank'>https://www.fusejs.io/</a>"
    + "<h2>Orígenes de los datos</h2>"
    + "<h3>Límites de comunidades autónomas</h3><b>Autor:</b> Instituto Geográfico Nacional (IGN).<br><b>Dirección:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Límites de provincias</h3><b>Autor:</b> Instituto Geográfico Nacional (IGN).<br><b>Dirección:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Límite territorial</h3><b>Autor:</b> Generado con QGIS (<a href='https://www.qgis.org/es/site/' target='_blank'>https://www.qgis.org/es/site/</a>) a partir de datos de límites de comundiades autónomas del Instituto Geográfico Nacional (IGN).<br><b>Dirección:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Sismos</h3><b>Autor:</b> Instituto Geográfico Nacional (IGN).<br><b>Dirección:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Fallas</h3><b>Autor:</b> QAFI (Quaternary Active Faults database of Iberia), Instituto Geológico y Minero de España (IGME).<br><b>Dirección:</b> <a href='http://info.igme.es/qafi/' target='_blank'>http://info.igme.es/qafi/</a>"
    + "<h3>Poblaciones</h3><b>Autor:</b> Centroides generados con QGIS (<a href='https://www.qgis.org/es/site/' target='_blank'>https://www.qgis.org/es/site/</a>) a partir de datos de población del Instituto Geográfico Nacional (IGN).<br><b>Dirección:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Intensidades</h3><b>Autor:</b> Generado a partir de la publicación \"Mapa de intensidades máximas (MIM) de España (península Ibérica y Baleares)\" de María José García Rodríguez, Luis Cabañas Rodríguez y Cecilia Albizua del Olmo, X Asamblea Hispano Portuguesa de Geodesia y Geofísica, Toledo, 2023 y de la publicación \"Revisión del Catálogo Sísmico de la Islas Canarias\" del Instituto Geográfico Nacional (IGN)."
    + "<h3>Iconos del panel lateral</h3><b>Dirección:</b> <a href='https://www.reshot.com/free-svg-icons' target='_blank'>https://www.reshot.com/free-svg-icons</a>",

    // Ventana de alerta
    ALERT_WINDOW_FILTER_ALL_LAYERS_TEXT: "Se han filtrado todas las capas.",
    ALERT_WINDOW_FILTER_LAYER_FORMAT: "Se ha filtrado la capa %1.",
    ALERT_WINDOW_DUPLICATE_ALL_LAYERS_TEXT: "Se han filtrado y duplicado todas las capas.",
    ALERT_WINDOW_DUPLICATE_LAYER_FORMAT: "Se ha filtrado y duplicado la capa %1.",
    ALERT_WINDOW_REFRESH_ALL_TEXT: "Se han limpiado todos los filtros y capas.",
    ALERT_WINDOW_REFRESH_FORMAT: "Se han limpiado los filtros de %1.",
    ALERT_WINDOW_UNMARK_ALL_TEXT: "Se han desmarcado todas las capas",
    ALERT_WINDOW_UNMARK_FORMAT: "Se han desmarcado los eventos de la capa %1",
    ALERT_WINDOW_IMPORT_LAYER_FORMAT: "Se ha importado la capa %1.",
    ALERT_WINDOW_EXPORT_LAYER_FORMAT: "Se ha exportado la capa %1.",

    // Textos del menú contextual
    // General
    CONTEXT_MENU_CENTER_MAP_ITEM: "Centrar mapa",
    CONTEXT_MENU_SET_COORDINATES_ITEM: "Fijar coordenadas",
    CONTEXT_MENU_DRAW_FILTER_CIRCLE_ITEM: "Dibujar círculo de filtrado",
    CONTEXT_MENU_ZOOM_TO_CLOSEST_QUAKES_ITEM: "Zoom a sismo más cercano al lugar seleccionado",
    CONTEXT_MENU_ZOOM_TO_CLOSEST_FAULTS_ITEM: "Zoom a falla más cercana al lugar seleccionado",
    CONTEXT_MENU_ZOOM_TO_CLOSEST_POPULATIONS_ITEM: "Zoom a población más cercana al lugar seleccionado",
    CONTEXT_MENU_ZOOM_TO_BIGGEST_MAGNITUDE_QUAKE_IN_RADIUS_TEXT: "Zoom a sismo de mayor magnitud en radio",
    CONTEXT_MENU_ZOOM_TO_BIGGEST_INTENSITY_QUAKE_IN_RADIUS_TEXT: "Zoom a sismo de mayor intensidad en radio",
    CONTEXT_MENU_PAN_TO_MAX_INTENSITY_IN_RADIUS: "Desplazar a intensidad máxima en radio",
    CONTEXT_MENU_QUAKES_NUMBER_IN_RADIUS_TEXT: "Obtener número de sismos en radio",
    CONTEXT_MENU_FAULTS_NUMBER_IN_RADIUS_TEXT: "Obtener número de fallas en radio",
    CONTEXT_MENU_POPULATIONS_NUMBER_IN_RADIUS_TEXT: "Obtener número de habitantes en radio",
    CONTEXT_MENU_LAST_QUAKE_BY_MAGNITUDE_IN_RADIUS_TEXT: "Obtener último sismo mayor que una magnitud en radio",
    CONTEXT_MENU_LAST_QUAKE_BY_INTENSITY_IN_RADIUS_TEXT: "Obtener último sismo mayor que una intensidad en radio",

    // Fallas
    CONTEXT_MENU_POPULATIONS_DISTANCE_TO_FAULT: "Obtener poblaciones a una distancia de la falla",
    CONTEXT_MENU_BIGGEST_QUAKE_DISTANCE_TO_FAULT: "Obtener sismo de mayor magnitud a una distancia de la falla",
    CONTEXT_MENU_POPULATION_NUMBER_DISTANCE_TO_FAULT: "Obtener poblaciones con habitantes mayores a un valor a una distancia de la falla",

    // Poblaciones
    CONTEXT_MENU_POPULATION_MAX_INTENSITY_TEXT: "Obtener intensidad máxima sentida en la población",

    // Textos de consulta
    QUERY_QUAKE_NUMBER_IN_RADIUS_TITLE: "Número de sismos en radio.<br>Capa: %1.",
    QUERY_FAULT_NUMBER_IN_RADIUS_TITLE: "Número de fallas en radio.<br>Capa: %1.",
    QUERY_POPULATION_NUMBER_IN_RADIUS_TITLE: "Número de habitantes en radio.<br>Capa: %1.",
    QUERY_OBJECT_NUMBER_IN_RADIUS_TEXT: "<b>Total: %1.</b><br><b>Latitud:</b> %2º.<br><b>Longitud:</b> %3º.<br><b>Radio:</b> %4km<br>Los objetos han sido marcados en el mapa.",
    QUERY_POPULATION_MAX_INTENSITY_TITLE: "Intensidad máxima sentida en la población %1",
    QUERY_POPULATION_MAX_INTENSITY_TEXT: "<b>Intensidad máxima: %1.</b><br><b>Latitud:</b> %2º.<br><b>Longitud:</b> %3º.",
    QUERY_LAST_QUAKE_BY_MAGNITUDE_TITLE: "Último sismo de magnitud >= %1",
    QUERY_LAST_QUAKE_BY_MAGNITUDE_FORMAT: "<b>Localización: </b>%1.<br><b>Magnitud: </b>%2.<br><b>Fecha: </b>%3.<br><b>Latitud: </b>%4º.<br><b>Longitud: </b>%5º.<br><b>Radio: </b>%6km.",
    QUERY_LAST_QUAKE_BY_INTENSITY_TITLE: "Último sismo de intensidad >= %1",
    QUERY_LAST_QUAKE_BY_INTENSITY_FORMAT: "<b>Localización: </b>%1.<br><b>Intensidad: </b>%2.<br><b>Fecha: </b>%3.<br><b>Latitud: </b>%4º.<br><b>Longitud: </b>%5º.<br><b>Radio: </b>%6km.",
    QUERY_POPULATIONS_NUMBER_TO_FAULT_TITLE: "Número de habitantes a %1km de la falla seleccionada",
    QUERY_POPULATIONS_NUMBER_TO_FAULT_FORMAT: "<b>Número total de habitantes: </b>%1.<br><b>Número de poblaciones:</b> %2.",
    QUERY_POPULATIONS_BY_NUMBER_TO_FAULT_TITLE: "Poblaciones de más de %1 habitantes a %2km de la falla seleccionada",
    QUERY_POPULATIONS_BY_NUMBER_TO_FAULT_FORMAT: "<b>Número total de habitantes: </b>%1.<br><b>Número de poblaciones:</b> %2.",
    QUERY_NO_OBJECT_FOUND_TEXT: "No se ha encontrado ningún objeto.",
    QUERY_NAME_TEXT: "Nombre",
    QUERY_QUAKE_MAGNITUDE_TEXT: "Magnitud",
    QUERY_FAULT_MAGNITUDE_TEXT: "Magnitud máxima",
    QUERY_POPULATION_NUMBER_TEXT: "Habitantes",
    QUERY_MAGNITUDE_INPUT_TEXT: "Magnitud >=  ",
    QUERY_INTENSITY_SELECT_TEXT: "Intensidad >=  ",
    QUERY_DISTANCE_INPUT_TEXT: "Distancia [km]:  ",
    QUERY_POPULATION_NUMBER_INPUT_TEXT: "Número de habitantes >=  ",
    QUERY_ACCEPT_BUTTON_TEXT: "Aceptar",

    // Textos del visor de coordenadas
    COORDINATE_VISOR_CONTROL_LATITUDE: "Latitud",
    COORDINATE_VISOR_CONTROL_LONGITUDE: "Longitud",

    // Textos de la leyenda de filtros
    FILTER_LEGEND_CONTROL_TITLE: "Filtros activos",
    FILTER_LEGEND_CONTROL_MAGNITUDE: "Mag.",
    FILTER_LEGEND_CONTROL_DEPTH: "Prof.[km]",
    FILTER_LEGEND_CONTROL_INTENSITY: "Int.",
    FILTER_LEGEND_CONTROL_DATE: "Fecha",
    FILTER_LEGEND_CONTROL_POPULATION: "Habs.",
    FILTER_LEGEND_CONTROL_UNKNOWN: "Des.",

    // Textos de la leyenda de eventos
    EVENT_LEGEND_CONTROL_TITLE: "Leyenda",
    EVENT_LEGEND_CONTROL_INTENSITY_TITLE: "Intensidades máximas",
    EVENT_LEGEND_CONTROL_FAULT_TITLE: "Fallas",
    EVENT_LEGEND_CONTROL_FAULT_TEXT: "Falla",
    EVENT_LEGEND_CONTROL_POPULATION_TITLE: "Habitantes",
    EVENT_LEGEND_CONTROL_MAGNITUDE_TITLE: "Magnitud",
    EVENT_LEGEND_CONTROL_MAGNITUDE_LETTER: "M",
    EVENT_LEGEND_CONTROL_POPULATION_NUMBER_LETTER: "M",

    // Textos de archivo
    PRINTED_MAP_FILENAME: "Captura de pantalla",

    // Otros textos
    MINIMIZE_BUTTON_SYMBOl: "-",
    MAXIMIZE_BUTTON_SYMBOl: "+",
    POPUP_UNKNOWN_TEXT: "Desconocido/a"
  }

  static english = {
    NAME: "English",

    // Layer control texts
    EMPTY_LAYER: "Empty",
    OSM_LAYER: "Open Street Map",
    REGIONS_LAYER: "Regions",
    PROVINCES_LAYER: "Provinces",
    TERRITORIAL_LIMIT: "Territorial limit",
    QUAKES_LAYER: "Quakes",
    FAULTS_LAYER: "Faults",
    POPULATIONS_LAYER: "Populations",
    INTENSITIES_LAYER: "Intensities",
    DUPLICATED_QUAKES_LAYER: "Copy of quakes",
    DUPLICATED_FAULTS_LAYER: "Copy of faults",
    DUPLICATED_POPULATIONS_LAYER: "Copy of populations",

    // Side panel texts

    // All filters
    SIDE_PANEL_ALL_FILTERS_TAB_TITLE: "Filter all layers",
    SIDE_PANEL_ALL_FILTERS_TAB_DESCRIPTION: "Filter quakes, faults and populations layers by the specified parameters",
    SIDE_PANEL_QUAKE_FILTERS_TITLE: "Quakes filters",
    SIDE_PANEL_FAULT_FILTERS_TITLE: "Faults filters",
    SIDE_PANEL_POPULATION_FILTERS_TITLE: "Populations filters",

    // Quakes filters
    SIDE_PANEL_QUAKE_FILTERS_TAB_TITLE: "Filter quakes layer",
    SIDE_PANEL_QUAKE_FILTERS_TAB_DESCRIPTION: "Filtra únicamente la capa de sismos según los parámetros especificados.",
    SIDE_PANEL_QUAKE_FILTERS_TAB_DESCRIPTION: "Filters only quakes layers by the specified parameters.",
    SIDE_PANEL_QUAKE_MAGNITUDE_FILTERS_TITLE: "Magnitude filters",
    SIDE_PANEL_QUAKE_MIN_MAGNITUDE_FILTER_TEXT: "Minimum magnitude:  ",
    SIDE_PANEL_QUAKE_MAX_MAGNITUDE_FILTER_TEXT: "Maximum magnitude:  ",
    SIDE_PANEL_QUAKE_INTENSITY_FILTERS_TITLE: "Intensity filters",
    SIDE_PANEL_QUAKE_MIN_INTENSITY_FILTER_TEXT: "Minimum intensity:  ",
    SIDE_PANEL_QUAKE_MAX_INTENSITY_FILTER_TEXT: "Maximum intensity:  ",
    SIDE_PANEL_QUAKE_DEPTH_FILTERS_TITLE: "Depth filters",
    SIDE_PANEL_QUAKE_MIN_DEPTH_FILTER_TEXT: "Minimum depth [km]:  ",
    SIDE_PANEL_QUAKE_MAX_DEPTH_FILTER_TEXT: "Maximum depth [km]:  ",
    SIDE_PANEL_QUAKE_DATE_FILTERS_TITLE: "Date filters",
    SIDE_PANEL_QUAKE_MIN_DATE_FILTER_TEXT: "Minimum date:  ",
    SIDE_PANEL_QUAKE_MAX_DATE_FILTER_TEXT: "Maximum date:  ",
    SIDE_PANEL_QUAKE_UNKNOWN_INTENSITY: "Unknown",

    // Faults filters
    SIDE_PANEL_FAULT_FILTERS_TAB_TITLE: "Filter faults layers",
    SIDE_PANEL_FAULT_FILTERS_TAB_DESCRIPTION: "Filters only populations layer by the specified parameters.<br><br>Faults that partially cross the filter radius are considered as inside.",
    SIDE_PANEL_FAULT_MAGNITUDE_FILTERS_TITLE: "Magnitude filters",
    SIDE_PANEL_FAULT_MIN_MAGNITUDE_FILTER_TEXT: "Minimum expected magnitude:  ",
    SIDE_PANEL_FAULT_MAX_MAGNITUDE_FILTER_TEXT: "Maximum expceted magnitude:  ",
    SIDE_PANEL_FAULT_DEPTH_FILTERS_TITLE: "Depth filters",
    SIDE_PANEL_FAULT_MIN_DEPTH_FILTER_TEXT: "Minimum depth [km]:  ",
    SIDE_PANEL_FAULT_MAX_DEPTH_FILTER_TEXT: "Maximum depth [km]:  ",

    // Populations filters
    SIDE_PANEL_POPULATION_FILTERS_TAB_TITLE: "Filter populations layers",
    SIDE_PANEL_POPULATION_FILTERS_TAB_DESCRIPTION: "Filters only populations layer by the specified parameters.",
    SIDE_PANEL_POPULATION_NUMBER_FILTERS_TITLE: "Inhabitants number filters",
    SIDE_PANEL_POPULATION_MIN_NUMBER_FILTER_TEXT: "Minimum inhabitants:  ",
    SIDE_PANEL_POPULATION_MAX_NUMBER_FILTER_TEXT: "Maximum inhabitants:  ",

    // Spatial filters
    SIDE_PANEL_SPATIAL_FILTERS_TAB_TITLE: "Spatial filters",
    SIDE_PANEL_SPATIAL_FILTERS_TAB_DESCRIPTION: "Filtra los elementos de las capas cuyos centros (sismos y poblaciones) estén dentro del radio de búsqueda especificados o lo crucen (fallas).<br><br>Esta opción no filtra por ningún otro tipo de parámetro.",
    SIDE_PANEL_SPATIAL_FILTERS_TAB_DESCRIPTION: "Filters only elements from layers whose centers (quakes and populations) are inside the filter radius or that cross it (faults).<br><br>This option does not filter by any other type of parameter.",
    SIDE_PANEL_SPATIAL_FILTERS_TITLE: "Spatial filters",
    SIDE_PANEL_SPATIAL_FILTERS_COORDINATES_TITLE: "Filter center coordinates",
    SIDE_PANEL_SPATIAL_FILTERS_RADIUS_TITLE: "Filter radius",
    SIDE_PANEL_SPATIAL_CONDITION_TITLE: "Condition",
    SIDE_PANEL_SPATIAL_LATITUDE_FILTER_TEXT: "Latitude [º]:  ",
    SIDE_PANEL_SPATIAL_LONGITUDE_FILTER_TEXT: "Longitude [º]:  ",
    SIDE_PANEL_SPATIAL_RADIUS_FILTER_TEXT: "Radius [km]:  ",
    SIDE_PANEL_SPATIAL_RADIUS_FIXED_TEXT: "Lock",
    SIDE_PANEL_SPATIAL_INSIDE_TERRITORIAL_LIMIT_FILTER_TEXT: "Inside territorial limit",

    // Buttons
    SIDE_PANEL_FILTER_BUTTON: "Filter",
    SIDE_PANEL_FILTER_ALL_BUTTON: "Filter all",
    SIDE_PANEL_DUPLICATE_BUTTON: "Duplicate and filter",
    SIDE_PANEL_DUPLICATE_ALL_BUTTON: "Duplicate and filter all",
    SIDE_PANEL_REFRESH_BUTTON: "Refresh",
    SIDE_PANEL_REFRESH_ALL_BUTTON: "Refresh all",
    SIDE_PANEL_UNMARK_BUTTON: "Unmark",
    SIDE_PANEL_UNMARK_ALL_BUTTON: "Unmark all",

    // Files
    SIDE_PANEL_FILES_TAB_TITLE: "File management",
    SIDE_PANEL_FILES_TAB_DESCRIPTION: "Import layers from GeoJSON files and export layers to CSV and GeoJSON formats.",
    SIDE_PANEL_FILES_IMPORT_TITLE: "Import",
    SIDE_PANEL_FILES_IMPORT_LAYER_NAME_TEXT: "<b>Name (optional)</b>:",
    SIDE_PANEL_FILES_IMPORT_LAYER_BUTTON_TEXT: "Load",
    SIDE_PANEL_FILES_EXPORT_TITLE: "Export",
    SIDE_PANEL_FILES_EXPORT_NAME_TEXT: "<b>Name:</b>  ",
    SIDE_PANEL_FILES_EXPORT_LAYER_TEXT: "<b>Layer:</b>  ",
    SIDE_PANEL_FILES_EXPORT_ONLY_VISIBLE_BOUNDS_TEXT: "Export current view",
    SIDE_PANEL_FILES_EXPORT_CSV_BUTTON_TEXT: "Export CSV",
    SIDE_PANEL_FILES_EXPORT_GEOJSON_BUTTON_TEXT: "Export GeoJSON",

    // Options
    SIDE_PANEL_OPTIONS_TITLE: "Visor options",
    SIDE_PANEL_OPTIONS_DESCRIPTION: "Modifies langage, controls visibility and layers styles",
    SIDE_PANEL_OPTIONS_LANGAGE_TITLE: "Langange",
    SIDE_PANEL_OPTIONS_LANGAGE_TEXT: "<em><b>Warning:</b> Changing langage will revert layers to their original state.</em>",
    SIDE_PANEL_OPTIONS_CONTROLS_TITLE: "Controls visibility",
    SIDE_PANEL_OPTIONS_STYLES_TITLE: "Layers styles",
    SIDE_PANEL_OPTIONS_LAYER_CONTROL_ALWAYS_DEPLOYED_TEXT: "Layer control always deployed",
    SIDE_PANEL_OPTIONS_SCALEBAR_CONTROL_VISIBLE_TEXT: "Show scalebar",
    SIDE_PANEL_OPTIONS_COORDINATE_VISOR_CONTROL_VISIBLE_TEXT: "Show coordinate visor",
    SIDE_PANEL_OPTIONS_FILTER_LEGEND_CONTROL_VISIBLE_TEXT: "Show filter legend",
    SIDE_PANEL_OPTIONS_EVENT_LEGEND_CONTROL_VISIBLE_TEXT: "Show event legend",
    SIDE_PANEL_OPTIONS_QUAKES_STYLES_TITLE: "Quakes styles",
    SIDE_PANEL_OPTIONS_QUAKES_BORDER_COLOR_TEXT: "Quake border color",
    SIDE_PANEL_OPTIONS_QUAKES_FILL_COLOR_TEXT: "Quake fill color",
    SIDE_PANEL_OPTIONS_FAULTS_STYLES_TITLE: "Faults styles",
    SIDE_PANEL_OPTIONS_FAULTS_BORDER_COLOR_TEXT: "Fault border color",
    SIDE_PANEL_OPTIONS_POPULATIONS_STYLES_TITLE: "Populations styles",
    SIDE_PANEL_OPTIONS_POPULATIONS_BORDER_COLOR_TEXT: "Population border color",
    SIDE_PANEL_OPTIONS_POPULATIONS_FILL_COLOR_TEXT: "Population fill color",
    SIDE_PANEL_OPTIONS_INTENSITIES_STYLES_TITLE: "Intensities styles",
    SIDE_PANEL_OPTIONS_INTENSITIES_BORDER_COLOR_TEXT: "Intensity border color",
    SIDE_PANEL_OPTIONS_REGIONS_STYLES_TITLE: "Regions styles",
    SIDE_PANEL_OPTIONS_REGIONS_BORDER_COLOR_TEXT: "Region border color",
    SIDE_PANEL_OPTIONS_PROVINCES_STYLES_TITLE: "Provinces styles",
    SIDE_PANEL_OPTIONS_PROVINCES_BORDER_COLOR_TEXT: "Province border color",
    SIDE_PANEL_OPTIONS_TERRITORIAL_LIMIT_STYLES_TITLE: "Territorial limit styles",
    SIDE_PANEL_OPTIONS_TERRITORIAL_LIMIT_BORDER_COLOR_TEXT: "Territorial limit border color",
    SIDE_PANEL_OPTIONS_FILTER_CIRCLE_STYLES_TITLE: "Filter circle style",
    SIDE_PANEL_OPTIONS_FILTER_CIRCLE_BORDER_COLOR_TEXT: "Filter circle border color",
    SIDE_PANEL_OPTIONS_FILTER_CIRCLE_FILL_COLOR_TEXT: "Filter circle fill color",
    SIDE_PANEL_OPTIONS_IMPORTED_LAYER_TITLE: "Imported layer",
    SIDE_PANEL_OPTIONS_IMPORTED_LAYER_BORDER_COLOR_TEXT: "Imported layer border color",
    SIDE_PANEL_OPTIONS_IMPORTED_LAYER_FILL_COLOR_TEXT: "Imported layer fill color",
    SIDE_PANEL_OPTIONS_SYSTEM_STYLES_TITLE: "System styles",
    SIDE_PANEL_OPTIONS_MARKED_COLOR_TEXT: "Mark color",

    // User manual
    SIDE_PANEL_INSTRUCTIONS_TITLE: "User manual",
    SIDE_PANEL_INSTRUCTIONS_DESCRIPTION: "<h2>Basic controls:<h2>Mouse",

    // Contact
    SIDE_PANEL_CONTACT_TITLE: "Information",
    SIDE_PANEL_CONTACT_DESCRIPTION: "<h2>Project name</h2>\"Visor de eventos sísmicos de España\" (Seismic events visor of Spain)."
    + "<h2>Subject</h2>Master in \"Ingeniería Geodésica y Cartografía\" final project."
    + "<h2>School</h2>\"Escuela Superior de Ingenieros en Topografía, Geodesia y Cartografía\". \"Universidad Politécnica de Madrid\"."
    + "<h2>Conctact information</h2><h3>Author</h3><b>Name:</b> Francisco Manuel Anta Sánchez.<br>"
    + "<b>E-mail:</b> <a href='mailto:francisco.anta.sanchez@gmail.com'>francisco.anta.sanchez@gmail.com</a>"
    + "<h3>Tutor</h3><b>Name:</b> Jorge Miguel Gaspar Escribano."
    + "<h2>Third party plugin credits:</h2>"
    + "<h3>Leaflet</h3><b>Author:</b> Volodymyr Agafonkin.<br><b>Address:</b> <a href='https://leafletjs.com/' target='_blank'>https://leafletjs.com/</a>"
    + "<h3>Leaflet.SidePanel</h3><b>Author:</b> Maxwell Ilai.<br><b>Address</b> <a href='https://github.com/maxwell-ilai/Leaflet.SidePanel' target='_blank'>https://github.com/maxwell-ilai/Leaflet.SidePanel</a>"
    + "<h3>Leaflet.SvgShapeMarkers</h3><b>Author:</b> Rowan Winsemius.<br><b>Address</b> <a href='https://github.com/rowanwins/Leaflet.SvgShapeMarkers' target='_blank'>https://github.com/rowanwins/Leaflet.SvgShapeMarkers</a>"
    + "<h3>Leaflet.Control.Window</h3><b>Author:</b> mapshakers.<br><b>Address</b> <a href='https://github.com/mapshakers/leaflet-control-window' target='_blank'>https://github.com/mapshakers/leaflet-control-window</a>"
    + "<h3>Leaflet.Corridor</h3><b>Author:</b> Mikhail Shilkov.<br><b>Address</b> <a href='https://github.com/mikhailshilkov/leaflet-corridor' target='_blank'>https://github.com/mikhailshilkov/leaflet-corridor</a>"
    + "<h3>Leaflet.EasyPrint</h3><b>Author:</b> Rowan Winsemius.<br><b>Address</b> <a href='https://github.com/rowanwins/leaflet-easyPrint' target='_blank'>https://github.com/rowanwins/leaflet-easyPrint</a>"
    + "<h3>Leaflet.contextmenu</h3><b>Author:</b> Adam Ratcliffe.<br><b>Address</b> <a href='https://github.com/aratcliffe/Leaflet.contextmenu' target='_blank'>https://github.com/aratcliffe/Leaflet.contextmenu</a>"
    + "<h3>Leaflet.EasyButton</h3><b>Author:</b> atstp.<br><b>Address</b> <a href='https://github.com/CliffCloud/Leaflet.EasyButton' target='_blank'>https://github.com/CliffCloud/Leaflet.EasyButton</a>"
    + "<h3>Leaflet.BetterScale</h3><b>Author:</b> Dan Brown<br><b>Address</b> <a href='https://github.com/daniellsu/leaflet-betterscale' target='_blank'>https://github.com/daniellsu/leaflet-betterscale</a>"
    + "<h3>Leaflet.AnimatedSearchBox</h3><b>Author:</b> Luka Steinbach.<br><b>Address</b> <a href='https://github.com/luka1199/Leaflet.AnimatedSearchBox' target='_blank'>https://github.com/luka1199/Leaflet.AnimatedSearchBox</a>"
    + "<h3>Fuse</h3><b>Author:</b> Kiro Risk.<br><b>Address</b> <a href='https://www.fusejs.io/' target='_blank'>https://www.fusejs.io/</a>"
    + "<h2>Data origin</h2>"
    + "<h3>Region (Comunidades Autónomas) limits</h3><b>Author:</b> Instituto Geográfico Nacional (IGN).<br><b>Address:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Province limits</h3><b>Author:</b> Instituto Geográfico Nacional (IGN).<br><b>Address:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Territorial limit</h3><b>Author:</b> Generated with QGIS (<a href='https://qgis.org/en/site/' target='_blank'>https://qgis.org/en/site/</a>) from region data from Instituto Geográfico Nacional (IGN).<br><b>Address:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Quakes</h3><b>Author:</b> Instituto Geográfico Nacional (IGN).<br><b>Address:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Faults</h3><b>Author:</b> QAFI (Quaternary Active Faults database of Iberia), Instituto Geológico y Minero de España (IGME).<br><b>Address:</b> <a href='http://info.igme.es/qafi/' target='_blank'>http://info.igme.es/qafi/</a>"
    + "<h3>Poblaciones</h3><b>Author:</b> Centroids generated with QGIS (<a href='https://qgis.org/en/site/' target='_blank'>https://qgis.org/en/site/</a>) from poblational data from Instituto Geográfico Nacional (IGN).<br><b>Address:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Intensidades</h3><b>Author:</b> Generated from the publication \"Mapa de intensidades máximas (MIM) de España (península Ibérica y Baleares)\" de María José García Rodríguez, Luis Cabañas Rodríguez y Cecilia Albizua del Olmo, X Asamblea Hispano Portuguesa de Geodesia y Geofísica, Toledo, 2023 y and the publication \"Revisión del Catálogo Sísmico de la Islas Canarias\" del Instituto Geográfico Nacional (IGN)."
    + "<h3>Side panel icons</h3><b>Address:</b> <a href='https://www.reshot.com/free-svg-icons' target='_blank'>https://www.reshot.com/free-svg-icons</a>",

    // Alert window
    ALERT_WINDOW_FILTER_ALL_LAYERS_TEXT: "Filtered all layers.",
    ALERT_WINDOW_FILTER_LAYER_FORMAT: "Filtered %1 layer.",
    ALERT_WINDOW_DUPLICATE_ALL_LAYERS_TEXT: "Filtered and duplicated all layers.",
    ALERT_WINDOW_DUPLICATE_LAYER_FORMAT: "Filtered and duplicated %1 layer.",
    ALERT_WINDOW_REFRESH_ALL_TEXT: "Refreshed all layers.",
    ALERT_WINDOW_REFRESH_FORMAT: "Refreshed %1 layer.",
    ALERT_WINDOW_UNMARK_ALL_TEXT: "Unmarked all layers",
    ALERT_WINDOW_UNMARK_FORMAT: "Unmarked all events in %1 layer.",
    ALERT_WINDOW_IMPORT_LAYER_FORMAT: "Imported %1 layer.",
    ALERT_WINDOW_EXPORT_LAYER_FORMAT: "Exported %1 layer.",

    // Context menut texts
    // General
    CONTEXT_MENU_CENTER_MAP_ITEM: "Center map",
    CONTEXT_MENU_SET_COORDINATES_ITEM: "Set coordinates",
    CONTEXT_MENU_DRAW_FILTER_CIRCLE_ITEM: "Draw filter circle",
    CONTEXT_MENU_ZOOM_TO_CLOSEST_QUAKES_ITEM: "Zoom to closest quake to clicked position",
    CONTEXT_MENU_ZOOM_TO_CLOSEST_FAULTS_ITEM: "Zoom to closest fault to clicked position",
    CONTEXT_MENU_ZOOM_TO_CLOSEST_POPULATIONS_ITEM: "Zoom to closest population to clicked position",
    CONTEXT_MENU_ZOOM_TO_BIGGEST_MAGNITUDE_QUAKE_IN_RADIUS_TEXT: "Zoom to biggest magnitude quake in radius",
    CONTEXT_MENU_ZOOM_TO_BIGGEST_INTENSITY_QUAKE_IN_RADIUS_TEXT: "Zoom to biggest intensity quake in radius",
    CONTEXT_MENU_PAN_TO_MAX_INTENSITY_IN_RADIUS: "Pan to biggest intensity in radius",
    CONTEXT_MENU_QUAKES_NUMBER_IN_RADIUS_TEXT: "Get quakes number in radius",
    CONTEXT_MENU_FAULTS_NUMBER_IN_RADIUS_TEXT: "Get faults number in radius",
    CONTEXT_MENU_POPULATIONS_NUMBER_IN_RADIUS_TEXT: "Get inhabitants number in radius",
    CONTEXT_MENU_LAST_QUAKE_BY_MAGNITUDE_IN_RADIUS_TEXT: "Get last quake bigger than a magnitude in radius",
    CONTEXT_MENU_LAST_QUAKE_BY_INTENSITY_IN_RADIUS_TEXT: "Get last quake bigger than an intensity in radius",

    // Faults
    CONTEXT_MENU_POPULATIONS_DISTANCE_TO_FAULT: "Get populations from a distance to a fault",
    CONTEXT_MENU_BIGGEST_QUAKE_DISTANCE_TO_FAULT: "Get biggest magnitude quake from a distance to a fault",
    CONTEXT_MENU_POPULATION_NUMBER_DISTANCE_TO_FAULT: "Get highest inhabitants number populations from a distance to a fault",

    // Populations
    CONTEXT_MENU_POPULATION_MAX_INTENSITY_TEXT: "Get highest intensity felt in the population",

    // Query texts
    QUERY_QUAKE_NUMBER_IN_RADIUS_TITLE: "Number of quakes in radius.<br>Layer: %1.",
    QUERY_FAULT_NUMBER_IN_RADIUS_TITLE: "Number of faults in radius.<br>Layer: %1.",
    QUERY_POPULATION_NUMBER_IN_RADIUS_TITLE: "Number of inhabitants in radius.<br>Layer: %1.",
    QUERY_OBJECT_NUMBER_IN_RADIUS_TEXT: "<b>Total: %1.</b><br><b>Latitude:</b> %2º.<br><b>Longitude:</b> %3º.<br><b>Radius:</b> %4km<br>Objects have been marked in the map.",
    QUERY_POPULATION_MAX_INTENSITY_TITLE: "Highest intensity felt in the population %1.",
    QUERY_POPULATION_MAX_INTENSITY_TEXT: "<b>Maximum intensity: %1.</b><br><b>Latitude:</b> %2º.<br><b>Longitude:</b> %3º.",
    QUERY_LAST_QUAKE_BY_MAGNITUDE_TITLE: "Last quake of magnitude >= %1",
    QUERY_LAST_QUAKE_BY_MAGNITUDE_FORMAT: "<b>Location: </b>%1.<br><b>Magnitude: </b>%2.<br><b>Date: </b>%3.<br><b>Latitude: </b>%4º.<br><b>Longitude: </b>%5º.<br><b>Radius: </b>%6km.",
    QUERY_LAST_QUAKE_BY_INTENSITY_TITLE: "Last quake of intensity >= %1",
    QUERY_LAST_QUAKE_BY_INTENSITY_FORMAT: "<b>Location: </b>%1.<br><b>Intensity: </b>%2.<br><b>Date: </b>%3.<br><b>Latitude: </b>%4º.<br><b>Longitude: </b>%5º.<br><b>Radius: </b>%6km.",
    QUERY_POPULATIONS_NUMBER_TO_FAULT_TITLE: "Number of inhabitants at %1km from the selected fault",
    QUERY_POPULATIONS_NUMBER_TO_FAULT_FORMAT: "<b>Total number of inhabitants: </b>%1.<br><b>Number of populations:</b> %2.",
    QUERY_POPULATIONS_BY_NUMBER_TO_FAULT_TITLE: "Poblaciones de más de %1 habitantes a %2km de la falla seleccionada",
    QUERY_POPULATIONS_BY_NUMBER_TO_FAULT_TITLE: "Populations with higher than %1 inhabitants at %2km from the selected fault",
    QUERY_POPULATIONS_BY_NUMBER_TO_FAULT_FORMAT: "<b>Total number of inhabitants: </b>%1.<br><b>Number of populations:</b> %2.",
    QUERY_NO_OBJECT_FOUND_TEXT: "No object has been found.",
    QUERY_NAME_TEXT: "Name",
    QUERY_QUAKE_MAGNITUDE_TEXT: "Magnitude",
    QUERY_FAULT_MAGNITUDE_TEXT: "Maximum magnitude",
    QUERY_POPULATION_NUMBER_TEXT: "Inhabitants",
    QUERY_MAGNITUDE_INPUT_TEXT: "Magnitude >=  ",
    QUERY_INTENSITY_SELECT_TEXT: "Intensity >=  ",
    QUERY_DISTANCE_INPUT_TEXT: "Distance [km]:  ",
    QUERY_POPULATION_NUMBER_INPUT_TEXT: "Number of inhabitants >=  ",
    QUERY_ACCEPT_BUTTON_TEXT: "Accept",

    // Coordinates visor texts
    COORDINATE_VISOR_CONTROL_LATITUDE: "Latitude",
    COORDINATE_VISOR_CONTROL_LONGITUDE: "Longitude",

    // Filter legend texts
    FILTER_LEGEND_CONTROL_TITLE: "Active filters",
    FILTER_LEGEND_CONTROL_MAGNITUDE: "Mag.",
    FILTER_LEGEND_CONTROL_DEPTH: "Depth[km]",
    FILTER_LEGEND_CONTROL_INTENSITY: "Int.",
    FILTER_LEGEND_CONTROL_DATE: "Date",
    FILTER_LEGEND_CONTROL_POPULATION: "Inh.",
    FILTER_LEGEND_CONTROL_UNKNOWN: "Ukn.",

    // Event legend texts
    EVENT_LEGEND_CONTROL_TITLE: "Legend",
    EVENT_LEGEND_CONTROL_INTENSITY_TITLE: "Maximum intensities",
    EVENT_LEGEND_CONTROL_FAULT_TITLE: "Faults",
    EVENT_LEGEND_CONTROL_FAULT_TEXT: "Fault",
    EVENT_LEGEND_CONTROL_POPULATION_TITLE: "Population number",
    EVENT_LEGEND_CONTROL_MAGNITUDE_TITLE: "Magnitude",
    EVENT_LEGEND_CONTROL_MAGNITUDE_LETTER: "M",
    EVENT_LEGEND_CONTROL_POPULATION_NUMBER_LETTER: "P",

    // File texts
    PRINTED_MAP_FILENAME: "Screenshot",

    // Other texts
    MINIMIZE_BUTTON_SYMBOl: "-",
    MAXIMIZE_BUTTON_SYMBOl: "+",
    POPUP_UNKNOWN_TEXT: "Unknown"
  }
}