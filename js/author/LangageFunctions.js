AvailableLangages = ['spanish', 'english'];

class LangageFunctions {
  static getLangage() {
    return langage; // Modificar después
  }

  static getText(key, langage) {
    if (!langage) langage = this.getLangage();
    return this[langage][key];
  }

  static spanish = {
    NAME: "Castellano",

    // Textos del control de capas
    EMPTY_LAYER: "Nada",
    OSM_LAYER: "Open Street Map",
    REGIONS_LAYER: "Comunidades Autónomas",
    PROVINCES_LAYER: "Provincias",
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
    SIDE_PANEL_SPATIAL_LATITUDE_FILTER_TEXT: "Latitud [º]:  ",
    SIDE_PANEL_SPATIAL_LONGITUDE_FILTER_TEXT: "Longitud [º]:  ",
    SIDE_PANEL_SPATIAL_RADIUS_FILTER_TEXT: "Radio [km]:  ",

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
    SIDE_PANEL_OPTIONS_CONTROLS_TITLE: "Visibilidad de controles",
    SIDE_PANEL_OPTIONS_STYLES_TITLE: "Estilos de capas",
    SIDE_PANEL_OPTIONS_LAYER_CONTROL_ALWAYS_DEPLOYED_TEXT: "C. de capas siempre desplegado",
    SIDE_PANEL_OPTIONS_SCALEBAR_CONTROL_VISIBLE_TEXT: "Mostrar barra de escala",
    SIDE_PANEL_OPTIONS_COORDINATE_VISOR_CONTROL_VISIBLE_TEXT: "Mostrar visor de coordenadas",
    SIDE_PANEL_OPTIONS_QUAKES_STYLES_TITLE: "Estilos de sismos",
    SIDE_PANEL_OPTIONS_QUAKES_BORDER_COLOR_TEXT: "Color de borde de sismo",
    SIDE_PANEL_OPTIONS_QUAKES_FILL_COLOR_TEXT: "Color de relleno de sismo",
    SIDE_PANEL_OPTIONS_FAULTS_STYLES_TITLE: "Estilos de fallas",
    SIDE_PANEL_OPTIONS_FAULTS_BORDER_COLOR_TEXT: "Color de borde de falla",
    SIDE_PANEL_OPTIONS_POPULATIONS_STYLES_TITLE: "Estilos de poblaciones",
    SIDE_PANEL_OPTIONS_POPULATIONS_BORDER_COLOR_TEXT: "Color de borde de población",
    SIDE_PANEL_OPTIONS_POPULATIONS_FILL_COLOR_TEXT: "Color de relleno de población",
    SIDE_PANEL_OPTIONS_INTENSITIES_STYLES_TITLE: "Estilos de intensidades",
    SIDE_PANEL_OPTIONS_INTENSITIES_BORDER_COLOR_TEXT: "Color de borde de población",
    SIDE_PANEL_OPTIONS_REGIONS_STYLES_TITLE: "Estilos de comunidades autónomas",
    SIDE_PANEL_OPTIONS_REGIONS_BORDER_COLOR_TEXT: "C. de borde de comunidad autónoma",
    SIDE_PANEL_OPTIONS_PROVINCES_STYLES_TITLE: "Estilos de provincias",
    SIDE_PANEL_OPTIONS_PROVINCES_BORDER_COLOR_TEXT: "Color de borde de provincia",
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
    + "<h3>Leaflet.EasyPrint</h3><b>Autor:</b> Rowan Winsemius.<br><b>Dirección</b> <a href='https://github.com/rowanwins/leaflet-easyPrint' target='_blank'>https://github.com/rowanwins/leaflet-easyPrint</a>"
    + "<h3>Leaflet.contextmenu</h3><b>Autor:</b> Adam Ratcliffe.<br><b>Dirección</b> <a href='https://github.com/aratcliffe/Leaflet.contextmenu' target='_blank'>https://github.com/aratcliffe/Leaflet.contextmenu</a>"
    + "<h3>Leaflet.EasyButton</h3><b>Autor:</b> atstp.<br><b>Dirección</b> <a href='https://github.com/CliffCloud/Leaflet.EasyButton' target='_blank'>https://github.com/CliffCloud/Leaflet.EasyButton</a>"
    + "<h3>Leaflet.BetterScale</h3><b>Autor:</b> Dan Brown<br><b>Dirección</b> <a href='https://github.com/daniellsu/leaflet-betterscale' target='_blank'>https://github.com/daniellsu/leaflet-betterscale</a>"
    + "<h3>Leaflet.AnimatedSearchBox</h3><b>Autor:</b> Luka Steinbach.<br><b>Dirección</b> <a href='https://github.com/luka1199/Leaflet.AnimatedSearchBox' target='_blank'>https://github.com/luka1199/Leaflet.AnimatedSearchBox</a>"
    + "<h3>Fuse</h3><b>Autor:</b> Kiro Risk.<br><b>Dirección</b> <a href='https://www.fusejs.io/' target='_blank'>https://www.fusejs.io/</a>"
    + "<h2>Orígenes de los datos</h2>"
    + "<h3>Límites de comunidades autónomas</h3><b>Autor:</b> Pendiente.<br></b>Dirección:</b> <a href='' target='_blank'>Pendiente</a>"
    + "<h3>Límites de provincias</h3><b>Autor:</b> Pendiente.<br><b>Dirección:</b> <a href='' target='_blank'>Pendiente</a>"
    + "<h3>Sismos</h3><b>Autor:</b> Instituto Geográfico Nacional.<br><b>Dirección:</b> <a href='https://www.ign.es/' target='_blank'>https://www.ign.es/</a>"
    + "<h3>Fallas</h3><b>Autor:</b> Pendiente.<br><b>Dirección:</b> <a href='' target='_blank'>Pendiente</a>"
    + "<h3>Poblaciones</h3><b>Autor:</b> Pendiente.<br><b>Dirección:</b> <a href='' target='_blank'>Pendiente</a>"
    + "<h3>Intensidades</h3><b>Autor:</b> Pendiente.<br><b>Dirección:</b> <a href='' target='_blank'>Pendiente</a>"
    + "<h3>Iconos del panel lateral</h3><b>Dirección:</b> <a href='https://www.reshot.com/free-svg-icons' target='_blank'>https://www.reshot.com/free-svg-icons</a>",

    // Ventana de alerta / Alert window
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
    CONTEXT_MENU_LAST_QUAKE_BY_MAGNITUDE_IN_RADIUS_TEXT: "Obtener último sismo mayor mayor que una magnitud en radio",
    CONTEXT_MENU_LAST_QUAKE_BY_INTENSITY_IN_RADIUS_TEXT: "Obtener último sismo mayor mayor que una intensidad en radio",

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

    // Textos de archivo
    PRINTED_MAP_FILENAME: "Captura de pantalla"
  }

  static english = {
    NAME: "English",

    // Control Layer Texts
    EMPTY_LAYER: "Empty",
    OSM_LAYER: "Open Street Map",
    REGIONS_LAYER: "Regions",
    PROVINCES_LAYER: "Provinces",
    QUAKES_LAYER: "Quakes",
    FAULTS_LAYER: "Faults",
    POPULATIONS_LAYER: "Populations",
    INTENSITIES_LAYER: "Intensities",

    // Coordinate Visor Control Texts
    COORDINATE_VISOR_CONTROL_LATITUDE: "Latitude",
    COORDINATE_VISOR_CONTROL_LONGITUDE: "Longitude",

    // Context menu texts
    CONTEXT_MENU_CENTER_MAP_ITEM: "Center map",
    CONTEXT_MENU_DRAW_FILTER_CIRCLE_ITEM: "Draw filter circle",

    // File texts
    PRINTED_MAP_FILENAME: 'Screenshot'
  }
}