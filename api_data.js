/*
Exemlo formato de raw_data
raw_data = PlanetsDataJSON.bodies[0]
{…}
​
  aphelion: 152100000 //em Km
  ​
  escape: 11190  // em m/s
  ​
  gravity: 9.8 // em m/s^2
  ​
  mass: Object { massValue: 5.97237, massExponent: 24 }  // = 5.97237^24 Kg
  ​
  meanRadius: 6371.0084 //em Km
  ​
  moons: Array [ {} ] //vetor de strings com campos vazios cada um correspondendo a uma lua
  ​
  perihelion: 147095000 // em Km
  ​
  sideralOrbit: 365.256 //em dias terrestres

  sideralRotation: 23.9345 // em horas
*/
class PlanetDataFromAPI {
  constructor(name) {
    this.name = name; //name;
    this.raio_medio = {}; //raw_data.meanRadius;
    this.dist_media_sol = {}; //(raw_data.aphelion + raw_data.perihelion) / 2;
    this.massa = {}; //raw_data.mass;
    this.gravidade = {}; //raw_data.gravity;
    this.vel_escape = {}; //raw_data.escape;
    this.periodo_translacao = {}; //raw_data.sideralOrbit;
    this.periodo_rotacao = {}; //raw_data.sideralRotation;
    this.luas = {}; //raw_data.moons.length;
  }
  inicia(entry) {
    this.raio_medio = entry.meanRadius;
    this.dist_media_sol = (entry.aphelion + entry.perihelion) / 2;
    this.massa = entry.mass;
    this.gravidade = entry.gravity;
    this.vel_escape = entry.escape;
    this.periodo_translacao = entry.sideralOrbit;
    this.periodo_rotacao = entry.sideralRotation;
    this.luas = entry.moons == null ? 0 : entry.moons.length;
  }
}

// Bundled planetary data.
//
// This used to be fetched live from https://api.le-systeme-solaire.net, but that
// API now requires an API key (returns 401 without a Bearer token). Since these
// are physical constants that never change, we ship the values locally so the
// app works offline and on static hosts (e.g. GitHub Pages) with no key needed.
//
// Each entry matches the shape the API returned, so PlanetDataFromAPI.inicia()
// consumes it unchanged. Values from le-systeme-solaire.net (distances in km,
// sideralOrbit in Earth days, sideralRotation in hours; negative = retrograde).
const PLANET_API_DATA = {
  mercury: { meanRadius: 2439.4, aphelion: 69816900, perihelion: 46001200, mass: { massValue: 3.30114, massExponent: 23 }, gravity: 3.7, escape: 4250, sideralOrbit: 87.969, sideralRotation: 1407.6, moons: null },
  venus: { meanRadius: 6051.8, aphelion: 108942109, perihelion: 107476259, mass: { massValue: 4.86747, massExponent: 24 }, gravity: 8.87, escape: 10360, sideralOrbit: 224.701, sideralRotation: -5832.5, moons: null },
  earth: { meanRadius: 6371.0084, aphelion: 152100000, perihelion: 147095000, mass: { massValue: 5.97237, massExponent: 24 }, gravity: 9.8, escape: 11190, sideralOrbit: 365.256, sideralRotation: 23.9345, moons: [{ moon: "Moon" }] },
  mars: { meanRadius: 3389.5, aphelion: 249200000, perihelion: 206600000, mass: { massValue: 6.41712, massExponent: 23 }, gravity: 3.71, escape: 5030, sideralOrbit: 686.885, sideralRotation: 24.6229, moons: [{ moon: "Phobos" }, { moon: "Deimos" }] },
  jupiter: { meanRadius: 69911, aphelion: 816081455, perihelion: 740595274, mass: { massValue: 1.89819, massExponent: 27 }, gravity: 24.79, escape: 60200, sideralOrbit: 4332.589, sideralRotation: 9.925, moons: new Array(95).fill({}) },
  saturn: { meanRadius: 58232, aphelion: 1503509229, perihelion: 1349823615, mass: { massValue: 5.6834, massExponent: 26 }, gravity: 10.44, escape: 36090, sideralOrbit: 10759.22, sideralRotation: 10.656, moons: new Array(146).fill({}) },
  uranus: { meanRadius: 25362, aphelion: 3006318143, perihelion: 2734998229, mass: { massValue: 8.68127, massExponent: 25 }, gravity: 8.87, escape: 21380, sideralOrbit: 30688.5, sideralRotation: -17.24, moons: new Array(27).fill({}) },
  neptune: { meanRadius: 24622, aphelion: 4537039826, perihelion: 4459631496, mass: { massValue: 1.02413, massExponent: 26 }, gravity: 11.15, escape: 23560, sideralOrbit: 60182, sideralRotation: 16.11, moons: new Array(14).fill({}) },
};
