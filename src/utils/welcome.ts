const welcomeMessages = [
  `Que bom que você veio, <nome>! Que a graça do Senhor invada sua alma e te tranquilize. Seja bem-vindo!`,
  `Seja bem-vindo, <nome>! Minha casa e meu coração sempre estarão abertos para recebê-lo`,
  `Bem-vindo. Enfim você chegou, <nome>! Respire fundo. Sorria. Deixe suas preocupações de lado. Entre e sinta-se em casa`,
  `Seja humilde, pois, até o Sol com toda sua grandeza se põe para deixar a Lua brilhar. Seja bem-vindo, <nome>!`,
  `Vale a pena viver - nem que seja para dizer que não vale a pena. Seja bem-vindo, <nome>, e faça valer a pena!`,
  `Seja bem-vindo, <nome>! Se vives de acordo com as leis da natureza, nunca serás pobre; se vives de acordo com as opiniões alheias, nunca serás rico.`,
  `Cada dia é uma nova oportunidade para celebrarmos e usufruirmos de tudo que a vida nos dá. Seja bem-vindo, <nome>!`,
]

export default (name: string) => welcomeMessages
  [Math.floor(Math.random() * welcomeMessages.length)]
  .replace('<nome>', name)