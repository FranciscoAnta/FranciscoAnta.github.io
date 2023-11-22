/*
Esta clase únicamente contiene las "constantes" del visor, es decir, la configuración inicial y básica del sistema.
No son constantes realmente, ya que por motivos de testeo pueden modificarse mientras el programa está funcionando,
aunque es preferible evitarlo.

This class contains the visor "constants", the intial and basic system setup.
These are not actual constants, since, for testing reasons, can be modified while the program is working, although
it is preferable not to do so.
*/

const INITIAL_ZOOM_LEVEL = 5;
const INITIAL_LONGITUDE = -3.7;
const INITIAL_LATITUDE = 40.41;
const INITIAL_DATE = new Date();
const INITIAL_POPULATION_MIN_NUMBER = 2000;
const POPULATION_NAMES = MiscFunctions.getPopulationNames(populationsData.features);
const INTENSITY_STRING = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

const DEFAULT_INSIDE_TERRITORIAL_LIMIT = false;
const DEFAULT_EXPORT_NAME = "Exported";
const MAX_FILE_NAME = 20;
const DEFAULT_EXPORT_LAYER_VISIBLE_BOUND_ONLY_CHECKED = false;
const DEFAULT_LAYER_CONTROL_ALLWAYS_DEPLOYED = true;
const DEAULT_SCALEBAR_CONTROL_VISIBLE = true;
const DEFAULT_COORDINATE_VISOR_CONTROL_VISIBLE = true;
const DEFAULT_FILTER_LEGEND_CONTROL_VISIBLE = true;
const DEFAULT_EVENT_LEGEND_CONTROL_VISIBLE = true;
const MAX_BUFFER_WIDTH = 1000; // En km / In km
const CONTEXT_MENU_WIDTH = 400;

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;
const MIN_RADIUS = 0; // En km / In km
const MAX_RADIUS = 10000; // En km / In km

const QUAKES_MIN_MAGNITUDE = MiscFunctions.getQuakesMinMagnitude();
const QUAKES_MAX_MAGNITUDE = MiscFunctions.getQuakesMaxMagnitude();
const QUAKES_MIN_INTENSITY = MiscFunctions.getQuakesMinIntensity();
const QUAKES_MAX_INTENSITY = MiscFunctions.getQuakesMaxIntensity();
const QUAKES_MIN_DEPTH = MiscFunctions.getQuakesMinDepth();
const QUAKES_MAX_DEPTH = MiscFunctions.getQuakesMaxDepth();
const QUAKES_MIN_DATE = MiscFunctions.getQuakesMinDate();
const QUAKES_MAX_DATE = MiscFunctions.getQuakesMaxDate();

const FAULTS_MIN_MAGNITUDE = MiscFunctions.getFaultsMinMagnitude();
const FAULTS_MAX_MAGNITUDE = MiscFunctions.getFaultsMaxMagnitude();
const FAULTS_MIN_DEPTH = MiscFunctions.getFaultsMinDepth();
const FAULTS_MAX_DEPTH = MiscFunctions.getFaultsMaxDepth();

const POPULATIONS_MIN_NUMBER = MiscFunctions.getPopulationsMinNumber();
const POPULATIONS_MAX_NUMBER = MiscFunctions.getPopulationsMaxNumber();

const INTENSITIES_MIN_VALUE = MiscFunctions.getIntensitiesMinValue();
const INTENSITIES_MAX_VALUE = MiscFunctions.getIntensitiesMaxValue();