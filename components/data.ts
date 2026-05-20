export type FlagInfo = {
  name: string;
  short: string;
  meaning: string;
  colors: { label: string; hex: string; meaning: string }[];
};

export const navItems = [
  { href: "#inicio", label: "Início" },
  { href: "#nao-binario", label: "Não-Binário" },
  { href: "#bandeiras", label: "Bandeiras" },
  { href: "#frases", label: "Frases" },
  { href: "#historia", label: "História" },
  { href: "#apoio", label: "Apoio" }
];

export type EducationCard = {
  title: string;
  eyebrow: string;
  body: string;
  accent: "yellow" | "purple" | "cyan" | "pink" | "blue" | "orange";
};

export const educationCards: EducationCard[] = [
  {
    title: "Identidade, não aparência",
    eyebrow: "Essência",
    body: "Ser não-binárie é viver uma identidade de gênero que não cabe totalmente nas categorias homem ou mulher. Cada pessoa define sua própria linguagem, expressão e caminho.",
    accent: "yellow"
  },
  {
    title: "Pronomes importam",
    eyebrow: "Respeito",
    body: "Algumas pessoas usam elu/delu, ile/dile, ele/dele, ela/dela ou mais de um conjunto. Perguntar com gentileza é um ato simples de cuidado.",
    accent: "purple"
  },
  {
    title: "O cotidiano também acolhe",
    eyebrow: "Prática",
    body: "Use o nome escolhido, evite pressupor gênero pela aparência e corrija-se sem transformar a pessoa em aula pública quando errar.",
    accent: "cyan"
  },
  {
    title: "Não existe um jeito único",
    eyebrow: "Pluralidade",
    body: "Pessoas não-binárias podem ser femininas, masculinas, andróginas, fluídas, discretas, expansivas, trans, intersexo ou não. Individualidade vem primeiro.",
    accent: "pink"
  }
];

export const myths = [
  "Mito: é fase. Realidade: identidade merece respeito em qualquer etapa da vida.",
  "Mito: todo mundo usa o mesmo pronome. Realidade: cada pessoa escolhe como quer ser chamada.",
  "Mito: precisa de uma aparência específica. Realidade: gênero não é figurino obrigatório."
];

export const flags: FlagInfo[] = [
  {
    name: "Não-Binária",
    short: "NB",
    meaning: "Representa pessoas cujas identidades não se encaixam exclusivamente em homem ou mulher.",
    colors: [
      { label: "Amarelo", hex: "#FFF430", meaning: "gêneros fora do binário" },
      { label: "Branco", hex: "#FFFFFF", meaning: "múltiplos gêneros" },
      { label: "Roxo", hex: "#9C59D1", meaning: "mistura e fluidez entre gêneros" },
      { label: "Preto", hex: "#000000", meaning: "ausência de gênero" }
    ]
  },
  {
    name: "Trans",
    short: "TR",
    meaning: "Celebra pessoas trans, travestis e todas as jornadas de afirmação de gênero.",
    colors: [
      { label: "Azul", hex: "#5BCEFA", meaning: "masculinidades e meninos trans" },
      { label: "Rosa", hex: "#F5A9B8", meaning: "feminilidades e meninas trans" },
      { label: "Branco", hex: "#FFFFFF", meaning: "pessoas não-binárias, intersexo ou em transição" },
      { label: "Rosa", hex: "#F5A9B8", meaning: "cuidado e afirmação" },
      { label: "Azul", hex: "#5BCEFA", meaning: "orgulho e reconhecimento" }
    ]
  },
  {
    name: "Bissexual",
    short: "BI",
    meaning: "Representa atração por mais de um gênero.",
    colors: [
      { label: "Rosa", hex: "#D60270", meaning: "atração pelo mesmo gênero" },
      { label: "Roxo", hex: "#9B4F96", meaning: "atração por múltiplos gêneros" },
      { label: "Azul", hex: "#0038A8", meaning: "atração por outros gêneros" }
    ]
  },
  {
    name: "Pansexual",
    short: "PAN",
    meaning: "Celebra atração independente de gênero.",
    colors: [
      { label: "Rosa", hex: "#FF218C", meaning: "atração por mulheres" },
      { label: "Amarelo", hex: "#FFD800", meaning: "atração por pessoas não-binárias" },
      { label: "Azul", hex: "#21B1FF", meaning: "atração por homens" }
    ]
  },
  {
    name: "Lésbica",
    short: "LES",
    meaning: "Representa mulheres e pessoas alinhadas à lesbianidade que amam mulheres.",
    colors: [
      { label: "Laranja escuro", hex: "#D52D00", meaning: "não conformidade de gênero" },
      { label: "Laranja", hex: "#EF7627", meaning: "independência" },
      { label: "Branco", hex: "#FFFFFF", meaning: "relações únicas com a feminilidade" },
      { label: "Rosa", hex: "#D162A4", meaning: "serenidade e paz" },
      { label: "Magenta", hex: "#A30262", meaning: "amor e comunidade" }
    ]
  },
  {
    name: "Gay",
    short: "GAY",
    meaning: "Celebra homens gays e comunidades de amor, afeto e resistência.",
    colors: [
      { label: "Verde", hex: "#078D70", meaning: "comunidade" },
      { label: "Verde claro", hex: "#98E8C1", meaning: "cura" },
      { label: "Branco", hex: "#FFFFFF", meaning: "pessoas trans e não-binárias" },
      { label: "Azul claro", hex: "#7BADE2", meaning: "alegria" },
      { label: "Azul", hex: "#3D1A78", meaning: "fortalecimento" }
    ]
  },
  {
    name: "Assexual",
    short: "ACE",
    meaning: "Representa pessoas no espectro assexual.",
    colors: [
      { label: "Preto", hex: "#000000", meaning: "assexualidade" },
      { label: "Cinza", hex: "#A3A3A3", meaning: "área cinza e demissexualidade" },
      { label: "Branco", hex: "#FFFFFF", meaning: "aliades e relações" },
      { label: "Roxo", hex: "#800080", meaning: "comunidade" }
    ]
  },
  {
    name: "Agênero",
    short: "AGE",
    meaning: "Representa pessoas que se reconhecem sem gênero ou fora de categorias de gênero.",
    colors: [
      { label: "Preto", hex: "#000000", meaning: "ausência de gênero" },
      { label: "Cinza", hex: "#BCC4C7", meaning: "semi-gênero" },
      { label: "Branco", hex: "#FFFFFF", meaning: "sem gênero" },
      { label: "Verde", hex: "#B8F483", meaning: "gêneros não-binários" },
      { label: "Branco", hex: "#FFFFFF", meaning: "neutralidade" },
      { label: "Cinza", hex: "#BCC4C7", meaning: "variações no espectro" },
      { label: "Preto", hex: "#000000", meaning: "identidade agênero" }
    ]
  },
  {
    name: "Gênero Fluido",
    short: "FLU",
    meaning: "Celebra identidades de gênero que podem mudar ao longo do tempo.",
    colors: [
      { label: "Rosa", hex: "#FF75A2", meaning: "feminilidade" },
      { label: "Branco", hex: "#FFFFFF", meaning: "todos os gêneros" },
      { label: "Roxo", hex: "#BE18D6", meaning: "combinações de gênero" },
      { label: "Preto", hex: "#000000", meaning: "ausência de gênero" },
      { label: "Azul", hex: "#333EBD", meaning: "masculinidade" }
    ]
  },
  {
    name: "Intersexo",
    short: "INT",
    meaning: "Representa pessoas intersexo e a defesa por autonomia corporal.",
    colors: [
      { label: "Amarelo", hex: "#FFD800", meaning: "cor fora dos códigos rosa/azul" },
      { label: "Roxo", hex: "#7902AA", meaning: "inteireza, autonomia e dignidade" }
    ]
  }
];

export const affirmations = [
  "Você merece existir exatamente como é.",
  "Seu nome e seu pronome importam.",
  "Orgulho também é descanso, colo e pertencimento.",
  "Não há nada em você que precise diminuir para caber.",
  "Toda forma honesta de ser merece espaço.",
  "Comunidade é quando a gente respira melhor juntes."
];

export const timelineItems = [
  {
    year: "1969",
    title: "Stonewall",
    body: "A rebelião de Stonewall, em Nova York, vira símbolo global de resistência LGBTQIA+ contra violência e repressão."
  },
  {
    year: "1978",
    title: "Bandeira do arco-íris",
    body: "Gilbert Baker cria a bandeira arco-íris, que se torna um dos símbolos mais reconhecidos de orgulho e diversidade."
  },
  {
    year: "1990",
    title: "Saúde e dignidade",
    body: "A homossexualidade deixa de ser classificada como doença pela Organização Mundial da Saúde."
  },
  {
    year: "2014",
    title: "Bandeira Não-Binária",
    body: "Kye Rowan cria a bandeira não-binária, com amarelo, branco, roxo e preto como símbolos de pluralidade de gênero."
  },
  {
    year: "2019",
    title: "LGBTfobia é crime no Brasil",
    body: "O Supremo Tribunal Federal enquadra a LGBTfobia como crime de racismo até que haja legislação específica."
  },
  {
    year: "Hoje",
    title: "Representatividade viva",
    body: "Pessoas LGBTQIA+ seguem criando redes de cuidado, arte, pesquisa, política e alegria para tornar o futuro mais habitável."
  }
];

export const resources = [
  {
    title: "CVV 188",
    body: "Apoio emocional gratuito e prevenção do suicídio, com atendimento 24 horas em todo o Brasil.",
    href: "https://cvv.org.br/?lang=pt-BR",
    label: "Acessar CVV"
  },
  {
    title: "Disque 100",
    body: "Canal nacional para denúncias de violações de direitos humanos, incluindo LGBTQIAfobia.",
    href: "https://lgbtqia.mdh.gov.br/disque-100/",
    label: "Ver canais"
  },
  {
    title: "Casa 1",
    body: "Centro de acolhida, cultura e clínica social para pessoas LGBT+ em São Paulo.",
    href: "https://www.casaum.org/a-casa-1/",
    label: "Conhecer"
  },
  {
    title: "ANTRA",
    body: "Rede nacional de articulação por cidadania e direitos de travestis e pessoas trans.",
    href: "https://antrabrasil.org/sobre/",
    label: "Ler mais"
  },
  {
    title: "ABGLT",
    body: "Organização brasileira de promoção da cidadania e dos direitos humanos LGBTQIA+.",
    href: "https://www.abglt.org/",
    label: "Visitar"
  },
  {
    title: "Mães pela Diversidade",
    body: "Rede de acolhimento para famílias de pessoas LGBTQIA+ e atuação por respeito e direitos.",
    href: "https://maespeladiversidade.org.br/",
    label: "Apoiar"
  }
];

export const mascotMessages = [
  "Você merece existir exatamente como é.",
  "Seu pronome importa.",
  "Orgulho também é pertencimento.",
  "Respira. Você não precisa se explicar para merecer respeito.",
  "Tem lugar para você aqui.",
  "Sua alegria também é resistência."
];
