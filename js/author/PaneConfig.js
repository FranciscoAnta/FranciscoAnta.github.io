/*
Esta archivo contiene las configuracines de los "panes", compuesto por un objeto con las enumeraciones 
de los símbolos y otra con las de los "z-index".
Cuanto mayor sea el "z-index", mayor prioridad tendrá el "pane" y por tanto se mostrará por encima
de panes de menor "z-index".
Se puede editar este archivo para añadir nuevos panes personalizados.

Valores por defecto:
  - Lienzo (canvas): 100.
  - Elementos SVG: 200.
  - Capas base (tile): 200.
  - Capas regulares (overlay): 400.
  - Sombras (shadow): 500.
  - Marcadores (marker): 600.
  - Tooltips: 650.
  - Popups: 700.
*/

PaneSymbol = {
  INTENSITIES:' intensities',
  REGIONS: 'regions',
  PROVINCES: 'provinces',
  FILTER_BUFFER: 'filterBuffer', // No es una capa de usuario / Not an user layer
  QUAKES: 'quakes',
  DUPLICATED_QUAKES: 'duplicatedQuakes',
  POPULATIONS: 'populations',
  DUPLICATED_POPULATIONS: 'duplicatedPopulations',
  FAULTS: 'faults',
  DUPLICATED_FAULTS: 'duplicatedFaults',
  IMPORTED_LAYER: 'importedLayer',
  FILTER_CIRCLE: 'filterCircle' // No es una capa de usuario / Not an user layer
}

PaneZIndex = {
  INTENSITIES: 290,
  REGIONS: 300,
  PROVINCES: 310,
  FILTER_BUFFER: 320, // No es una capa de usuario / Not an user layer
  QUAKES: 330,
  DUPLICATED_QUAKES: 340,
  POPULATIONS: 350,
  DUPLICATED_POPULATIONS: 360,
  FAULTS: 370,
  DUPLICATED_FAULTS: 380,
  IMPORTED_LAYER: 390,
  FILTER_CIRCLE: 400 // No es una capa de usuario / Not an user layer
}