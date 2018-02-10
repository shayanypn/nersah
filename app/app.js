import CORE from './core/core.js';

let myWindow = (typeof window !== 'undefined') ? window : {};

myWindow.nersah = new CORE();

module.exports = myWindow.nersah;

module.exports.default = myWindow.nersah;
