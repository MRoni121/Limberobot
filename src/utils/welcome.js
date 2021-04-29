"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var welcomeMessages = [
    "Que bom que voc\u00EA veio, <nome>! Que a gra\u00E7a do Senhor invada sua alma e te tranquilize. Seja bem-vindo!",
    "Seja bem-vindo, <nome>! Minha casa e meu cora\u00E7\u00E3o sempre estar\u00E3o abertos para receb\u00EA-lo",
    "Bem-vindo. Enfim voc\u00EA chegou, <nome>! Respire fundo. Sorria. Deixe suas preocupa\u00E7\u00F5es de lado. Entre e sinta-se em casa",
    "Seja humilde, pois, at\u00E9 o Sol com toda sua grandeza se p\u00F5e para deixar a Lua brilhar. Seja bem-vindo, <nome>!",
    "Vale a pena viver - nem que seja para dizer que n\u00E3o vale a pena. Seja bem-vindo, <nome>, e fa\u00E7a valer a pena!",
    "Seja bem-vindo, <nome>! Se vives de acordo com as leis da natureza, nunca ser\u00E1s pobre; se vives de acordo com as opini\u00F5es alheias, nunca ser\u00E1s rico.",
    "Cada dia \u00E9 uma nova oportunidade para celebrarmos e usufruirmos de tudo que a vida nos d\u00E1. Seja bem-vindo, <nome>!",
];
exports.default = (function (name) { return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]
    .replace('<nome>', name); });
