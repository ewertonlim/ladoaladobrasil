/* ============================================================
   Lado a Lado Brasil — dados (levantados em 07/10/2026)
   Estrutura de cada área:
     mandate  = resultado do último mandato de Lula (2023–2026) x mandato de Jair Bolsonaro (2019–2022)
     proposals = propostas de Lula (2027–2030) x propostas de Flávio Bolsonaro
   kind: "resultado" = dado mensurável | "proposta" = promessa de plano de governo
   rating: nota 1–5 (l = Lula, j = Jair, f = Flávio)
   ============================================================ */

const SOURCES = {
  ibge:     { name: "IBGE — Contas Nacionais, PNAD Contínua e IPCA", url: "https://www.ibge.gov.br" },
  tse:      { name: "TSE — resultados e planos de governo", url: "https://www.tse.jus.br" },
  bcb:      { name: "Banco Central — Estatísticas fiscais", url: "https://www.bcb.gov.br/estatisticas/estatisticasfiscais" },
  lei15270: { name: "Planalto — Lei 15.270/2025 (IR até R$ 5 mil)", url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15270.htm" },
  lei14663: { name: "Planalto — Lei 14.663/2023 (valorização do salário mínimo)", url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/L14663.htm" },
  fbsp:     { name: "Fórum Brasileiro de Segurança Pública — Anuário", url: "https://forumseguranca.org.br/anuario-brasileiro-de-seguranca-publica/" },
  inep:     { name: "INEP — Ideb", url: "https://www.gov.br/inep/pt-br" },
  inpe:     { name: "INPE — Prodes (desmatamento)", url: "https://terrabrasilis.dpi.inpe.br/" },
  ms:       { name: "Ministério da Saúde — painéis e programas", url: "https://www.gov.br/saude/pt-br" },
  senado:   { name: "Senado — CPI da Pandemia", url: "https://www12.senado.leg.br/noticias" },
  mdic:     { name: "MDIC — balança comercial", url: "https://www.gov.br/mdic/pt-br/assuntos/comercio-exterior/estatisticas" },
  fao:      { name: "FAO — relatório SOFI (Mapa da Fome)", url: "https://www.fao.org/publications/home/fao-flagship-publications/the-state-of-food-security-and-nutrition-in-the-world" },
  penssan:  { name: "Rede PENSSAN — Inquérito Nacional de Insegurança Alimentar", url: "https://pesquisassan.net.br" },
  fgv:      { name: "FGV Social — pobreza e desigualdade", url: "https://cps.fgv.br" },
  cef:      { name: "Congresso em Foco — plano de governo de Lula", url: "https://congressoemfoco.com.br" },
  uol:      { name: "UOL — plano de governo de Flávio Bolsonaro", url: "https://www.uol.com.br" },
  jp:       { name: "Jovem Pan — propostas de Flávio Bolsonaro", url: "https://jovempan.com.br" },
  nexo:     { name: "Nexo Jornal — análise de propostas", url: "https://www.nexojornal.com.br" },
  poder360: { name: "Poder360 — propostas de segurança", url: "https://www.poder360.com.br" },
  bdf:      { name: "Brasil de Fato — tarifas e política externa", url: "https://www.brasildefato.com.br" },
  cnn:      { name: "CNN Brasil — tarifaço e campanha", url: "https://www.cnnbrasil.com.br" },
  abril:    { name: "Abril — plano ambiental de Flávio Bolsonaro", url: "https://abril.com.br" },
  apufsc:   { name: "APUFSC — análise do plano e educação", url: "https://apufsc.org.br" },
  oeste:    { name: "Revista Oeste — Bolsa Família no plano de Flávio", url: "https://revistaoeste.com" },
  diplo:    { name: "Le Monde Diplomatique Brasil — análise dos planos", url: "https://diplomatique.org.br" },
  congresso:{ name: "Congresso em Foco — resultado do 1º turno", url: "https://congressoemfoco.com.br" }
};

const ELECTION = {
  date: "2026-10-25T08:00:00-03:00",
  lula:   { pct: 45.16 },
  flavio: { pct: 47.03 },
  src: ["tse", "congresso"]
};

/* Comentários via Giscus (GitHub Discussions), sem backend próprio.
   Preencha os 4 campos após instalar o app em https://giscus.app (veja o passo a passo). */
const GISCUS = { repo: "", repoId: "", category: "Comentários", categoryId: "" };

const AREAS = [
  {
    id: "economia", icon: "📈", title: "Economia e Crescimento",
    lead: "PIB, emprego e inflação.",
    mandate: {
      lula: [
        { kind: "resultado", t: "O PIB cresceu 3,2% em 2023, 3,4% em 2024 e 2,3% em 2025 (R$ 12,7 trilhões).", s: "ibge" },
        { kind: "resultado", t: "O desemprego chegou a 5,3% no trimestre até agosto/2026, o menor da série histórica (desde 2012) para o período, com 103,5 milhões de ocupados.", s: "ibge" },
        { kind: "resultado", t: "Ponto fraco: a inflação acumulou 4,22% em 12 meses até agosto/2026 e a projeção do mercado para o ano está perto de 5%, acima do teto da meta (4,5%).", s: "ibge" }
      ],
      jair: [
        { kind: "resultado", t: "O PIB variou +1,2% (2019), −3,3% (2020, ano da pandemia), +4,8% (2021) e +3,0% (2022).", s: "ibge" },
        { kind: "resultado", t: "O desemprego passou de dois dígitos e chegou a 14,9% em 2021, no pico da pandemia, e fechou 2022 perto de 8%.", s: "ibge" },
        { kind: "resultado", t: "A inflação (IPCA) foi de 10,06% em 2021 e 5,79% em 2022, bem acima do teto da meta em 2021.", s: "ibge" }
      ],
      rating: { l: 4, j: 3 },
      note: "Os dois mandatos têm contexto distinto: o de Jair enfrentou a pandemia. Mesmo assim, no recorte comparável, Lula entrega crescimento mais estável e menos desemprego; a inflação perto do teto é sua principal ressalva."
    },
    proposals: {
      lula: [
        { kind: "proposta", t: "Reindustrialização com investimento público e privado e continuidade da valorização do salário mínimo acima da inflação.", s: "cef" },
        { kind: "proposta", t: "Responsabilidade fiscal combinada com maior tributação de rendas altas.", s: "cef" }
      ],
      flavio: [
        { kind: "proposta", t: "Revisar pontos da reforma tributária, com redução da alíquota do IVA e desoneração de exportações e investimentos.", s: "uol" },
        { kind: "proposta", t: "Retomar o Programa Nacional de Desestatização e reduzir o tamanho da máquina pública.", s: "uol" },
        { kind: "proposta", t: "O plano registrado não traz metas numéricas de crescimento ou de inflação.", s: "tse" }
      ],
      rating: { l: 3, f: 3 },
      note: "Ambos apresentam diretrizes sem metas numéricas claras. Linhas diferentes (Estado indutor x Estado enxuto), sem vantagem objetiva."
    }
  },
  {
    id: "trabalho", icon: "👷", title: "Trabalho e Renda",
    lead: "Jornada, salário e o bolso do trabalhador.",
    mandate: {
      lula: [
        { kind: "resultado", t: "Retomou a política de valorização do salário mínimo, com ganho real garantido em lei (Lei 14.663/2023).", s: "lei14663" },
        { kind: "resultado", t: "A isenção do IR até R$ 5 mil por mês entrou em vigor em 1º/jan/2026, compensada por tributação de rendas acima de R$ 600 mil por ano.", s: "lei15270" }
      ],
      jair: [
        { kind: "resultado", t: "Aprovou a Reforma da Previdência em 2019 (EC 103), que mudou idade mínima e regras de aposentadoria.", s: "ibge" },
        { kind: "resultado", t: "O salário mínimo foi de R$ 998 (2019) para R$ 1.212 (2022), sem ganho real relevante, já que a regra de valorização acabou em 2019.", s: "lei14663" },
        { kind: "resultado", t: "A Carteira Verde e Amarela (MP 905/2019), que previa contratação mais barata de jovens, perdeu a validade sem ser votada.", s: "tse" }
      ],
      rating: { l: 4, j: 2 },
      note: "Lula combina ganho real do mínimo e alívio do IR. Jair tem a Reforma da Previdência como feito de peso, mas sem melhora de renda para o trabalhador de base."
    },
    proposals: {
      lula: [
        { kind: "proposta", t: "Fim da escala 6x1: jornada de 40 horas semanais, dois dias de descanso e sem redução de salário.", s: "cef" },
        { kind: "proposta", t: "Regulamentar o trabalho por aplicativo, com regras de remuneração, previdência e transparência de algoritmos.", s: "cef" }
      ],
      flavio: [
        { kind: "proposta", t: "Priorizar o \"negociado sobre o legislado\" e criar contratos que facilitem a entrada de jovens (18–24 anos) e de pessoas com mais de 50 anos.", s: "jp" },
        { kind: "proposta", t: "A campanha afirma que não extinguirá a CLT, o 13º nem as férias. Críticos veem risco de precarização.", s: "jp" }
      ],
      rating: { l: 4, f: 3 },
      note: "As propostas de Lula são mais específicas e já têm cronograma político. Flávio propõe flexibilização, com potencial de gerar vagas e risco de perda de proteção."
    }
  },
  {
    id: "contas", icon: "🏛️", title: "Contas Públicas e Tributos",
    lead: "Dívida, déficit e o tamanho do Estado.",
    mandate: {
      lula: [
        { kind: "resultado", t: "A dívida bruta chegou a 82,9% do PIB em agosto/2026, o maior nível desde março de 2021 (alta de 4,2 pontos percentuais em oito meses).", s: "bcb" },
        { kind: "resultado", t: "Há projeção de déficit primário perto de R$ 80,9 bilhões em 2026. A meta formal só é cumprida por deduções e exclusões de despesas previstas no arcabouço fiscal.", s: "bcb" },
        { kind: "resultado", t: "Aprovou o arcabouço fiscal (2023) e a reforma tributária do consumo (EC 132/2023), duas reformas estruturais.", s: "lei15270" }
      ],
      jair: [
        { kind: "resultado", t: "A dívida bruta subiu durante a pandemia (acima de 85% do PIB em 2020), mas fechou 2022 em 71,7%, abaixo de onde começou o governo (75,3% em 2018).", s: "bcb" },
        { kind: "resultado", t: "Aprovou a Reforma da Previdência (2019) e concluiu a privatização da Eletrobras (2022).", s: "bcb" },
        { kind: "resultado", t: "Ponto fraco: o teto de gastos foi flexibilizado por emendas (PEC dos Precatórios em 2021 e PEC de 2022, às vésperas da eleição) para ampliar gastos.", s: "bcb" }
      ],
      rating: { l: 2, j: 3 },
      note: "Aqui o mandato de Jair sai melhor: a dívida terminou menor do que começou, ainda que com ajuda da inflação alta e com burlas ao teto no fim. A dívida em alta no governo atual pesa contra Lula."
    },
    proposals: {
      lula: [
        { kind: "proposta", t: "Combinar responsabilidade fiscal com maior tributação de rendas altas e investimentos públicos.", s: "cef" }
      ],
      flavio: [
        { kind: "proposta", t: "Reformular o regime fiscal com superávits primários e limites a gastos discricionários, para reduzir a dívida/PIB.", s: "uol" },
        { kind: "proposta", t: "Reduzir ministérios, cortar cargos comissionados e despesas administrativas; retomar privatizações.", s: "uol" }
      ],
      rating: { l: 3, f: 4 },
      note: "Flávio apresenta direção fiscal mais definida, embora cortar ministérios e cargos tenha efeito pequeno no orçamento. Lula mantém a linha atual, que produziu déficit."
    }
  },
  {
    id: "seguranca", icon: "🛡️", title: "Segurança Pública",
    lead: "Homicídios, polícia e o papel do governo federal.",
    mandate: {
      lula: [
        { kind: "resultado", t: "As mortes violentas intencionais caíram 8,2% em 2025 (40.775 casos). A taxa foi de 19,1 por 100 mil, a menor da série iniciada em 2012.", s: "fbsp" },
        { kind: "resultado", t: "Ressalvas: a letalidade policial subiu 5,4% (6.602 mortes, recorde da série) e os feminicídios cresceram 4% (1.571 vítimas).", s: "fbsp" }
      ],
      jair: [
        { kind: "resultado", t: "As mortes violentas intencionais caíram de cerca de 57 mil (2018) para cerca de 47,5 mil (2022), uma queda expressiva, em parte atribuída aos estados.", s: "fbsp" },
        { kind: "resultado", t: "Decretos de 2019–2022 flexibilizaram o acesso a armas, e o arsenal em mãos de caçadores, atiradores e colecionadores (CACs) cresceu fortemente.", s: "fbsp" }
      ],
      rating: { l: 4, j: 3 },
      note: "Os dois mandatos viram queda de homicídios, que depende muito dos estados. O menor patamar da série em 2025 dá vantagem a Lula, que carrega a ressalva da letalidade policial recorde."
    },
    proposals: {
      lula: [
        { kind: "proposta", t: "Criar o Ministério da Segurança Pública e ampliar a integração e a inteligência federal com os estados.", s: "cef" }
      ],
      flavio: [
        { kind: "proposta", t: "Reduzir a maioridade penal de 18 para 16 anos, com penas mais duras para crimes graves cometidos por adolescentes a partir de 14 anos.", s: "uol" },
        { kind: "proposta", t: "Criar um Sistema Nacional de Fronteira com as Forças Armadas e ampliar o número de presídios.", s: "poder360" }
      ],
      rating: { l: 3, f: 3 },
      note: "Empate. Flávio propõe medidas mais incisivas, mas a eficácia de endurecer penas é debatida; Lula propõe coordenação federal, de efeito indireto."
    }
  },
  {
    id: "educacao", icon: "🎓", title: "Educação",
    lead: "Qualidade do ensino básico, permanência na escola e financiamento.",
    mandate: {
      lula: [
        { kind: "resultado", t: "O Ideb 2025 subiu em todas as etapas (anos iniciais 6,3; anos finais 5,3; ensino médio 4,5), os maiores valores desde 2005.", s: "inep" },
        { kind: "resultado", t: "Criou o Pé-de-Meia para reduzir a evasão no ensino médio.", s: "inep" }
      ],
      jair: [
        { kind: "resultado", t: "O Ideb 2021 foi de 5,8 (anos iniciais), 5,1 (anos finais) e 4,2 (ensino médio), em um período marcado por escolas fechadas na pandemia.", s: "inep" },
        { kind: "resultado", t: "O ensino médio ficou estagnado em 4,2 entre 2019 e 2021.", s: "inep" }
      ],
      rating: { l: 4, j: 2 },
      note: "A trajetória do Ideb favorece Lula. É preciso considerar que a pandemia pesou sobre os resultados de 2021 e que a gestão escolar é majoritariamente estadual e municipal."
    },
    proposals: {
      lula: [
        { kind: "proposta", t: "Universalizar o Pé-de-Meia até 2027 e expandir escolas de tempo integral.", s: "cef" },
        { kind: "proposta", t: "Meta de 100% de alfabetização na idade certa.", s: "cef" }
      ],
      flavio: [
        { kind: "proposta", t: "Trata educação pela ótica de reorganização de gastos e eficiência, sem metas detalhadas de aprendizagem.", s: "apufsc" },
        { kind: "proposta", t: "Entidades docentes alertam que mexer em vinculações constitucionais de recursos pode precarizar o setor; a campanha diz que o foco é eficiência.", s: "apufsc" }
      ],
      rating: { l: 4, f: 2 },
      note: "As propostas de Lula têm metas objetivas. O plano de Flávio ainda não traz metas educacionais."
    }
  },
  {
    id: "saude", icon: "🩺", title: "Saúde",
    lead: "SUS, pandemia, filas e acesso a medicamentos.",
    mandate: {
      lula: [
        { kind: "resultado", t: "Relançou o Mais Médicos em 2023 e ampliou o Farmácia Popular. Em 2025 lançou o Agora Tem Especialistas para reduzir filas.", s: "ms" },
        { kind: "resultado", t: "Ressalva: as filas por consultas e exames especializados continuam sendo um desafio do SUS.", s: "ms" }
      ],
      jair: [
        { kind: "resultado", t: "O Brasil registrou cerca de 690 mil mortes por Covid-19 até dezembro de 2022. A compra de vacinas foi atrasada, e o governo defendeu tratamentos sem eficácia comprovada.", s: "ms" },
        { kind: "resultado", t: "A CPI da Pandemia (2021) recomendou o indiciamento do presidente. O relatório é político, e Bolsonaro nega as acusações.", s: "senado" },
        { kind: "resultado", t: "Lançou o Médicos pelo Brasil em substituição ao Mais Médicos. No fim de 2022, a maioria da população já estava vacinada pelo SUS.", s: "ms" }
      ],
      rating: { l: 4, j: 2 },
      note: "Mandatos em contextos diferentes, mas a condução da pandemia e o atraso na vacinação pesam contra Jair. Lula entrega programas de ampliação do acesso, sem resolver as filas."
    },
    proposals: {
      lula: [
        { kind: "proposta", t: "Digitalizar serviços do SUS e incluir novos exames e medicamentos no Farmácia Popular.", s: "cef" }
      ],
      flavio: [
        { kind: "proposta", t: "Criar prontuário eletrônico único vinculado ao CPF e ao Gov.br e ampliar a telessaúde.", s: "uol" },
        { kind: "proposta", t: "Contratar hospitais e clínicas privadas em horários ociosos para reduzir filas e entregar remédios em domicílio a idosos, PcDs e doentes crônicos.", s: "jp" },
        { kind: "proposta", t: "A campanha nega intenção de privatizar o SUS ou cobrar atendimento.", s: "jp" }
      ],
      rating: { l: 3, f: 3 },
      note: "As propostas convergem em digitalização. Nenhuma traz meta numérica de redução de filas. Empate."
    }
  },
  {
    id: "social", icon: "🤝", title: "Proteção Social e Desigualdade",
    lead: "Pobreza, fome e programas sociais.",
    mandate: {
      lula: [
        { kind: "resultado", t: "A extrema pobreza monetária ficou em 4,6% em 2025 (4,8% em 2024), cerca de 9,8 milhões de pessoas.", s: "fgv" },
        { kind: "resultado", t: "O Brasil saiu do Mapa da Fome da ONU em 2025.", s: "fao" },
        { kind: "resultado", t: "Ressalva: o Gini subiu para 0,511 em 2025 (0,504 em 2024), sinal de mais desigualdade.", s: "ibge" }
      ],
      jair: [
        { kind: "resultado", t: "Em 2020, o Auxílio Emergencial de R$ 600 (valor ampliado pelo Congresso) reduziu a pobreza durante a pandemia.", s: "fgv" },
        { kind: "resultado", t: "Substituiu o Bolsa Família pelo Auxílio Brasil em 2021 e elevou o benefício para R$ 600 em 2022, ano eleitoral.", s: "fgv" },
        { kind: "resultado", t: "Em 2022, 33 milhões de brasileiros estavam em situação de fome, segundo a Rede PENSSAN.", s: "penssan" }
      ],
      rating: { l: 4, j: 3 },
      note: "O auxílio emergencial teve efeito importante em 2020, mas o fim dele e a inflação levaram a mais fome em 2022. Lula tem redução da extrema pobreza e saída do Mapa da Fome, com Gini em alta."
    },
    proposals: {
      lula: [
        { kind: "proposta", t: "Continuar o Bolsa Família (reajustado em 15% perto do 1º turno, o que a oposição critica como eleitoral).", s: "cnn" }
      ],
      flavio: [
        { kind: "proposta", t: "Manter o Bolsa Família como direito de quem está em vulnerabilidade.", s: "diplo" },
        { kind: "proposta", t: "Integrar o benefício a qualificação profissional, crédito e emprego, para que não seja o \"destino final\".", s: "oeste" }
      ],
      rating: { l: 3, f: 3 },
      note: "Ambos prometem manter o programa. Flávio acrescenta a porta de saída, sem detalhar como."
    }
  },
  {
    id: "ambiente", icon: "🌳", title: "Meio Ambiente e Clima",
    lead: "Desmatamento, fiscalização e imagem internacional.",
    mandate: {
      lula: [
        { kind: "resultado", t: "O desmatamento na Amazônia Legal caiu para cerca de 9 mil km² (2023), 6.518 km² (2024) e 5.731 km² (2025, queda de 12,07%).", s: "inpe" },
        { kind: "resultado", t: "No Cerrado, a supressão de vegetação recuou 11,49% em 2025 (7.235 km²). O Fundo Amazônia foi retomado em 2023.", s: "inpe" }
      ],
      jair: [
        { kind: "resultado", t: "O desmatamento na Amazônia Legal subiu de 7.536 km² (2018) para 10.129 (2019), 10.851 (2020), 13.038 (2021, o maior da década) e 11.594 km² (2022).", s: "inpe" },
        { kind: "resultado", t: "O Fundo Amazônia foi suspenso em 2019 por Alemanha e Noruega, em meio a críticas à política ambiental.", s: "inpe" }
      ],
      rating: { l: 4, j: 1 },
      note: "A diferença é a mais clara entre todas as áreas, e os dados são do mesmo órgão (INPE)."
    },
    proposals: {
      lula: [
        { kind: "proposta", t: "Transição ecológica e energia limpa no centro da estratégia de desenvolvimento.", s: "cef" }
      ],
      flavio: [
        { kind: "proposta", t: "Meio ambiente como \"ativo verde\", com mercado de carbono e pagamento por serviços ambientais.", s: "abril" },
        { kind: "proposta", t: "O plano não traz metas de redução de desmatamento.", s: "abril" }
      ],
      rating: { l: 3, f: 2 },
      note: "Flávio incorpora mecanismos de mercado, mas sem metas ambientais verificáveis."
    }
  },
  {
    id: "externa", icon: "🌐", title: "Política Externa e Comércio",
    lead: "Tarifaço americano, blocos econômicos e inserção do Brasil.",
    mandate: {
      lula: [
        { kind: "resultado", t: "A balança comercial teve superávit recorde de US$ 98,8 bilhões em 2023.", s: "mdic" },
        { kind: "resultado", t: "Diante do tarifaço americano (até 25%, podendo chegar a 37,5% se cumulativo), criou grupo de trabalho com os EUA e o plano \"Brasil Soberano\" de crédito subsidiado. As tarifas seguem em vigor e atingiram máquinas, calçados, móveis e madeira.", s: "bdf" }
      ],
      jair: [
        { kind: "resultado", t: "Superávit comercial de US$ 62,3 bilhões em 2022.", s: "mdic" },
        { kind: "resultado", t: "O país foi alvo de críticas internacionais pela política ambiental e iniciou o processo de adesão à OCDE em 2022.", s: "mdic" }
      ],
      rating: { l: 3, j: 2 },
      note: "O superávit recorde e a resposta ao tarifaço favorecem Lula, mas o impasse com os EUA segue sem solução."
    },
    proposals: {
      lula: [
        { kind: "proposta", t: "Fortalecer BRICS e Sul Global e tratar soberania digital e IA como prioridade estratégica.", s: "cef" }
      ],
      flavio: [
        { kind: "proposta", t: "Mudar a política externa, aproximando o país dos EUA e, segundo reportagens, discutindo a saída do Mercosul.", s: "bdf" },
        { kind: "proposta", t: "Enviou cartas aos EUA pedindo isenção de tarifas. Em pesquisa de julho/2026, 51% atribuíram a ele responsabilidade pelas tarifas; a campanha rejeita essa leitura.", s: "cnn" }
      ],
      rating: { l: 3, f: 2 },
      note: "A proposta de deixar o Mercosul traz risco comercial relevante, o que penaliza Flávio."
    }
  }
];
