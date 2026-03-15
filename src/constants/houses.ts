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
      { text: "Liderando as músicas na fogueira com um violão ou organizando um teatro.", points: { PERIPOU: 1 } },
      { text: "Na roda de conversa e nos dormitórios, garantindo que ninguém se sinta isolado.", points: { KALIDA: 1 } },
      { text: "Puxando um debate profundo sobre um tema teológico ou tirando dúvidas difíceis.", points: { FILINI: 1 } },
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
    text: "Se a igreja recebesse uma grande doação financeira inesperada, no que você votaria para investir primeiro?",
    options: [
      { text: "Em novos equipamentos de som, iluminação e instrumentos musicais de ponta.", points: { PERIPOU: 1 } },
      { text: "Na reforma do espaço de convivência (cantina/café) para promover mais comunhão.", points: { KALIDA: 1 } },
      { text: "Em uma grande biblioteca teológica, compra de Bíblias e material de estudo para os líderes.", points: { FILINI: 1 } },
      { text: "Na infraestrutura física do prédio: segurança, climatização e organização das salas.", points: { OCTANI: 1 } },
      { text: "No envio de missionários e no financiamento de projetos sociais pela cidade.", points: { AGOLGO: 1 } },
      { text: "Na criação de um espaço silencioso para retiros espirituais e salas de aconselhamento.", points: { KONIPAK: 1 } },
    ]
  },
  {
    id: 5,
    text: "Qual versículo ou princípio bíblico mais ressoa com o seu chamado?",
    options: [
      { text: "\"Cantai ao Senhor um cântico novo.\" (Adoração)", points: { PERIPOU: 1 } },
      { text: "\"Acolhei-vos uns aos outros, como Cristo nos acolheu.\" (Comunhão)", points: { KALIDA: 1 } },
      { text: "\"Conhecereis a verdade, e a verdade vos libertará.\" (Ensino)", points: { FILINI: 1 } },
      { text: "\"Tudo o que fizerem, façam de todo o coração.\" (Serviço)", points: { OCTANI: 1 } },
      { text: "\"Ide por todo o mundo, pregai o evangelho a toda criatura.\" (Missões)", points: { AGOLGO: 1 } },
      { text: "\"Orai sem cessar.\" (Intercessão)", points: { KONIPAK: 1 } },
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
    text: "O que te deixa mais frustrado na dinâmica da comunidade?",
    options: [
      { text: "Cultos muito mecânicos, sem espaço para a criatividade fluir.", points: { PERIPOU: 1 } },
      { text: "Ver pessoas novas entrando e saindo sem que ninguém converse com elas.", points: { KALIDA: 1 } },
      { text: "Pregações ou estudos rasos, com falta de profundidade e base bíblica.", points: { FILINI: 1 } },
      { text: "Desorganização, atrasos recorrentes e falta de excelência nos processos práticos.", points: { OCTANI: 1 } },
      { text: "Uma igreja fechada em si mesma, que não sai às ruas para impactar a cidade.", points: { AGOLGO: 1 } },
      { text: "Falta de fervor na oração, reuniões espiritualmente frias e sem busca real.", points: { KONIPAK: 1 } },
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
      { text: "Davi ou Miriã (Música, poesia e adoração).", points: { PERIPOU: 1 } },
      { text: "Barnabé ou Rute (Consolação, amizade e lealdade).", points: { KALIDA: 1 } },
      { text: "Paulo ou Apolo (Mestres, defensores da fé e teólogos).", points: { FILINI: 1 } },
      { text: "Neemias ou Marta (Construtores, organizadores e servos práticos).", points: { OCTANI: 1 } },
      { text: "Filipe ou Pedro (Evangelistas intrépidos e missionários).", points: { AGOLGO: 1 } },
      { text: "Ana ou João Batista (Intercessores constantes e vozes proféticas).", points: { KONIPAK: 1 } },
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
