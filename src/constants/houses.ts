import type { House, Question } from '../types';

export const HOUSES: Record<string, House> = {
  AGOLGO: {
    id: 'AGOLGO',
    name: 'AGOLGO',
    mascot: 'Cavalo',
    colors: ['#006400', '#000000'], // Verde escuro e preto
    traits: ['Sabedoria'],
    description: 'A casa daqueles que buscam a sabedoria em todas as coisas.',
  },
  FILINI: {
    id: 'FILINI',
    name: 'FILINI',
    mascot: 'Ovelha',
    colors: ['#0000FF', '#FF0000'], // Azul e vermelho
    traits: ['União'],
    description: 'A força da união é o que move esta casa.',
  },
  KALIDA: {
    id: 'KALIDA',
    name: 'KALIDA',
    mascot: 'Urso',
    colors: ['#FFFF00', '#800080'], // Amarelo e roxo
    traits: ['Força física', 'Proteção'],
    description: 'A casa dos fortes e protetores.',
  },
  PERIPOU: {
    id: 'PERIPOU',
    name: 'PERIPOU',
    mascot: 'Raposa',
    colors: ['#FFA500', '#000000'], // Laranja com preto
    traits: ['Destemida', 'Sangue nos olhos'],
    description: 'Para os destemidos que não fogem de um desafio.',
  },
  KONIPAK: {
    id: 'KONIPAK',
    name: 'KONIPAK',
    mascot: 'Coruja',
    colors: ['#800080', '#8A9A5B'], // Roxa com verde musgo
    traits: ['Sabedoria', 'Agressividade', 'Afiada', 'Misteriosa', 'Imprevisível'],
    description: 'Sábios, mas afiados e imprevisíveis.',
  },
  OCTANI: {
    id: 'OCTANI',
    name: 'OCTANI',
    mascot: 'Polvo',
    colors: ['#00FFFF', '#FFA500'], // Ciano e Laranja
    traits: ['Cauteloso', 'Astuto', 'Paciente'],
    description: 'Para aqueles que sabem que a paciência e a astúcia vencem qualquer jogo.',
  },
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "O que você faz nos primeiros 15 minutos ao chegar na igreja?",
    options: [
      { text: "Vai direto checar o som, os instrumentos ou os ensaios do dia.", points: { PERIPOU: 1 } },
      { text: "Fica na porta da igreja ou da sala abraçando e dando as boas-vindas a quem chega.", points: { KALIDA: 1 } },
      { text: "Senta para ler o boletim, repassar o estudo do dia e abrir a Bíblia.", points: { FILINI: 1 } },
      { text: "Confere se as cadeiras estão arrumadas, os equipamentos ligados e o espaço limpo.", points: { OCTANI: 1 } },
      { text: "Conversa com os visitantes para saber de onde vieram e apresenta os projetos da igreja.", points: { AGOLGO: 1 } },
      { text: "Procura um lugar mais silencioso para orar e interceder antes de tudo começar.", points: { KONIPAK: 1 } },
    ]
  },
  {
    id: 2,
    text: "Durante um retiro ou acampamento de pré-adolescentes e jovens, onde é mais fácil te encontrar?",
    options: [
      { text: "Liderando as músicas na fogueira com um violão ou organizando um role.", points: { PERIPOU: 1 } },
      { text: "Na roda de conversa e nos dormitórios, garantindo que ninguém se sinta isolado.", points: { KALIDA: 1 } },
      { text: "Debatendo sobre assuntos bíblicos/teológicos ou tirando dúvidas difíceis.", points: { FILINI: 1 } },
      { text: "Na cozinha, na cantina ou na secretaria ajudando a organizar a logística do evento.", points: { OCTANI: 1 } },
      { text: "Planejando uma ação de impacto ou doação na comunidade vizinha ao acampamento.", points: { AGOLGO: 1 } },
      { text: "Em uma tenda ou sala de oração, aconselhando e ouvindo os desabafos da galera.", points: { KONIPAK: 1 } },
    ]
  },
  {
    id: 3,
    text: "Qual característica os irmãos do seu Grupo de Discipulado (GD) mais admiram em você?",
    options: [
      { text: "Sua criatividade e talento artístico.", points: { PERIPOU: 1 } },
      { text: "Sua simpatia, carisma e amor acolhedor.", points: { KALIDA: 1 } },
      { text: "Sua inteligência, memória bíblica e sede de aprender.", points: { FILINI: 1 } },
      { text: "Sua responsabilidade, pontualidade e proatividade.", points: { OCTANI: 1 } },
      { text: "Sua coragem, ousadia e paixão por alcançar pessoas.", points: { AGOLGO: 1 } },
      { text: "Sua fé, conselhos sábios e sensibilidade espiritual.", points: { KONIPAK: 1 } },
    ]
  },
  {
    id: 4,
    text: "Seu time está perdido em meio a um desafio do NewGames, você:",
    options: [
      { text: "Sempre tentando ajudar e servir em alguma parte do evento", points: { PERIPOU: 1 } },
      { text: "Sempre tentando ajudar e servir em alguma parte do evento", points: { KALIDA: 1 } },
      { text: "Sempre tentando ajudar e servir em alguma parte do evento", points: { KONIPAK: 1 } },
      { text: "Sempre tentando ajudar e servir em alguma parte do evento", points: { OCTANI: 1 } },
      { text: "Sempre tentando ajudar e servir em alguma parte do evento", points: { FILINI: 1 } },
    ]
  },
  {
    id: 5,
    text: "Qual versículo ou princípio bíblico mais ressoa com o seu chamado?",
    options: [
      { text: "Planejando como podemos colocar em prática tudo que vivemos no nosso dia a dia", points: { PERIPOU: 1 } },
      { text: "Planejando como podemos colocar em prática tudo que vivemos no nosso dia a dia", points: { KALIDA: 1 } },
      { text: "Planejando como podemos colocar em prática tudo que vivemos no nosso dia a dia", points: { FILINI: 1 } },
      { text: "Planejando como podemos colocar em prática tudo que vivemos no nosso dia a dia", points: { OCTANI: 1 } },
      { text: "Planejando como podemos colocar em prática tudo que vivemos no nosso dia a dia", points: { AGOLGO: 1 } },
      { text: "Planejando como podemos colocar em prática tudo que vivemos no nosso dia a dia", points: { KONIPAK: 1 } },
    ]
  },
  {
    id: 6,
    text: "Como você reage quando percebe que há uma tensão ou conflito no grupo?",
    options: [
      { text: "Tenta trazer leveza através de uma música, uma piada ou uma dinâmica criativa.", points: { PERIPOU: 1 } },
      { text: "Promove um lanche ou encontro com comida para tentar apaziguar os ânimos de todos.", points: { KALIDA: 1 } },
      { text: "Busca princípios e textos bíblicos para mediar e resolver o problema na raiz.", points: { FILINI: 1 } },
      { text: "Cria um protocolo ou escala mais justa para que o problema não volte a acontecer.", points: { OCTANI: 1 } },
      { text: "Foca no quadro geral e lembra a todos que há coisas mais urgentes para se fazer lá fora.", points: { AGOLGO: 1 } },
      { text: "Intercede secretamente em oração e oferece escuta empática para cada lado, separadamente.", points: { KONIPAK: 1 } },
    ]
  },
  {
    id: 7,
    text: "Como você descreveria o seu ritmo natural ao buscar um objetivo?",
    options: [
      { text: "\"Eu vou com tudo logo de cara; se eu ver uma oportunidade, eu agarro e não solto até conseguir.\"", points: { PERIPOU: 1 } },
      { text: "\"Eu foco em manter o ritmo alto, mas sempre olho para o lado para garantir que ninguém do meu círculo ficou para trás.\"", points: { KALIDA: 1 } },
      { text: "\"Eu prefiro não gastar energia à toa; fico no meu canto analisando o terreno até ter 100% de certeza de onde pisar.\"", points: { KONIPAK: 1 } },
      { text: "\"Eu deixo os outros se cansarem primeiro; observo onde eles estão errando e uso isso para encontrar o meu próprio atalho.\"", points: { OCTANI: 1 } },
      { text: "\"Eu trato tudo como um quebra-cabeça; se eu organizar as peças e a lógica antes, o resultado vem sem esforço físico.\"", points: { AGOLGO: 1 } },
      { text: "\"Eu não me importo tanto com a velocidade ou com o plano, desde que eu esteja cercado de pessoas em quem confio.\"", points: { FILINI: 1 } },
    ]
  },
  {
    id: 8,
    text: "Você tem um sábado livre com o seu GD. O que prefere organizar para a galera?",
    options: [
      { text: "Uma noite de talentos, ensaio de banda, sarau ou ir a um show cristão.", points: { PERIPOU: 1 } },
      { text: "Uma noite da pizza na sua casa, com muitas risadas e jogos de tabuleiro.", points: { KALIDA: 1 } },
      { text: "Um grupo de estudos intenso sobre um livro cristão ou tema apologético polêmico.", points: { FILINI: 1 } },
      { text: "Um mutirão para ajudar a arrumar, pintar ou limpar o espaço de encontros da igreja.", points: { OCTANI: 1 } },
      { text: "Um evangelismo criativo, distribuição de marmitas ou ação social na rua.", points: { AGOLGO: 1 } },
      { text: "Uma vigília de oração, testemunhos e louvor acústico bem intimista.", points: { KONIPAK: 1 } },
    ]
  },
  {
    id: 9,
    text: "Qual figura ou grupo bíblico mais parece com o seu perfil de atuação?",
    options: [
      { text: "Davi ou Miriã.", points: { PERIPOU: 1 } },
      { text: "Barnabé ou Rute.", points: { KALIDA: 1 } },
      { text: "Paulo ou Apolo.", points: { FILINI: 1 } },
      { text: "Neemias ou Marta.", points: { OCTANI: 1 } },
      { text: "Filipe ou Pedro.", points: { AGOLGO: 1 } },
      { text: "Ana ou João Batista.", points: { KONIPAK: 1 } },
    ]
  },
  {
    id: 10,
    text: "Qual destas palavras resume melhor o seu propósito principal na igreja?",
    options: [
      { text: "Inspirar.", points: { PERIPOU: 1 } },
      { text: "Acolher.", points: { KALIDA: 1 } },
      { text: "Ensinar.", points: { FILINI: 1 } },
      { text: "Servir.", points: { OCTANI: 1 } },
      { text: "Alcançar.", points: { AGOLGO: 1 } },
      { text: "Interceder.", points: { KONIPAK: 1 } },
    ]
  },
];
