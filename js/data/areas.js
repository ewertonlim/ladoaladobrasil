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
  mte:      { name: "Ministério do Trabalho — Novo Caged", url: "https://www.gov.br/trabalho-e-emprego/pt-br/assuntos/estatisticas-trabalho/novo-caged" },
  tesouro:  { name: "Tesouro Nacional — Resultado do Tesouro Nacional", url: "https://www.tesourotransparente.gov.br" },
  mec:      { name: "MEC — Criança Alfabetizada, Pé-de-Meia e Tempo Integral", url: "https://www.gov.br/mec/pt-br" },
  seeg:     { name: "Observatório do Clima — SEEG e fiscalização ambiental", url: "https://seeg.eco.br" },
  mapbiomas:{ name: "MapBiomas — Relatório Anual do Fogo", url: "https://brasil.mapbiomas.org" },
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
        { kind: "resultado", t: "Ponto fraco: a inflação acumulou 4,22% em 12 meses até agosto/2026 e a projeção do mercado para o ano está perto de 5%, acima do teto da meta (4,5%).", s: "ibge" },
        { kind: "resultado", t: "A Selic chegou a 15% ao ano em 2025 e seguia nesse patamar no início de 2026, o maior nível desde 2006, o que encarece o crédito e freia a atividade.", s: "bcb" },
        { kind: "resultado", t: "O rendimento médio da população chegou a R$ 3.367 em 2025, alta real de 5,7% e o terceiro ano seguido de ganho.", s: "ibge" }
      ],
      jair: [
        { kind: "resultado", t: "O PIB variou +1,2% (2019), −3,3% (2020, ano da pandemia), +4,8% (2021) e +3,0% (2022).", s: "ibge" },
        { kind: "resultado", t: "O desemprego passou de dois dígitos e chegou a 14,9% em 2021, no pico da pandemia, e fechou 2022 perto de 8%.", s: "ibge" },
        { kind: "resultado", t: "A inflação (IPCA) foi de 10,06% em 2021 e 5,79% em 2022, bem acima do teto da meta em 2021.", s: "ibge" },
        { kind: "resultado", t: "A Selic caiu à mínima histórica de 2% em 2020 e subiu até 13,75% em 2022 para conter a inflação.", s: "bcb" },
        { kind: "resultado", t: "O rendimento médio de todas as fontes foi de R$ 2.533 em 2022, o segundo menor valor da série iniciada em 2012.", s: "ibge" }
      ],
      rating: { l: 4, j: 3 },
      note: "Os dois mandatos têm contexto distinto: o de Jair enfrentou a pandemia, que derrubou o PIB em 2020 e levou o desemprego a 14,9%. A recuperação de 2021–2022 foi forte, mas veio com inflação de dois dígitos e com a Selic subindo de 2% para 13,75%.\n\nNo recorte comparável, Lula entrega crescimento mais estável, desemprego na mínima da série e renda média em alta pelo terceiro ano. As ressalvas são a inflação perto do teto da meta e a Selic em 15%, a maior desde 2006, que encarece o crédito e tende a frear a economia."
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
      note: "Ambos apresentam diretrizes sem metas numéricas claras de crescimento, inflação ou emprego. Lula aposta no Estado como indutor, com reindustrialização e valorização do salário mínimo; Flávio, num Estado mais enxuto, com privatizações e revisão da reforma tributária.\n\nSão linhas diferentes, e o resultado de cada uma depende da execução e do apoio no Congresso. Sem metas verificáveis dos dois lados, não há vantagem objetiva: empate."
    }
  },
  {
    id: "trabalho", icon: "👷", title: "Trabalho e Renda",
    lead: "Jornada, salário e o bolso do trabalhador.",
    mandate: {
      lula: [
        { kind: "resultado", t: "Retomou a política de valorização do salário mínimo, com ganho real garantido em lei (Lei 14.663/2023).", s: "lei14663" },
        { kind: "resultado", t: "A isenção do IR até R$ 5 mil por mês entrou em vigor em 1º/jan/2026, compensada por tributação de rendas acima de R$ 600 mil por ano.", s: "lei15270" },
        { kind: "resultado", t: "O emprego com carteira teve saldo de 1,45 milhão de vagas em 2023, 1,69 milhão em 2024 e 1,28 milhão em 2025.", s: "mte" },
        { kind: "resultado", t: "A informalidade caiu de 39,0% em 2024 para 38,1% em 2025, e a desocupação média de 2025 foi de 5,6%.", s: "ibge" }
      ],
      jair: [
        { kind: "resultado", t: "Aprovou a Reforma da Previdência em 2019 (EC 103), que mudou idade mínima e regras de aposentadoria.", s: "ibge" },
        { kind: "resultado", t: "O salário mínimo foi de R$ 998 (2019) para R$ 1.212 (2022), sem ganho real relevante, já que a regra de valorização acabou em 2019.", s: "lei14663" },
        { kind: "resultado", t: "A Carteira Verde e Amarela (MP 905/2019), que previa contratação mais barata de jovens, perdeu a validade sem ser votada.", s: "tse" },
        { kind: "resultado", t: "O emprego com carteira fechou 191,9 mil vagas em 2020 e teve saldo de 2,7 milhões em 2021 e 2,0 milhões em 2022, na recuperação pós-pandemia.", s: "mte" },
        { kind: "resultado", t: "O rendimento domiciliar por pessoa caiu ao menor valor da série (R$ 1.484) em 2021 e subiu para R$ 1.586 em 2022.", s: "ibge" }
      ],
      rating: { l: 4, j: 2 },
      note: "Lula combina ganho real do salário mínimo, que chegou a R$ 1.621 em 2026, com a isenção do IR até R$ 5 mil, e o emprego com carteira cresceu mais de 1,2 milhão de vagas em cada ano. A informalidade caiu, mas ainda atinge quase 4 em cada 10 ocupados.\n\nJair tem a Reforma da Previdência como feito de peso e forte geração de vagas formais em 2021–2022, na recuperação pós-pandemia. Mas o salário mínimo ficou sem ganho real e a renda das famílias atingiu o menor valor da série em 2021."
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
      note: "As propostas de Lula são mais específicas: o fim da escala 6x1 e a regulamentação do trabalho por aplicativos já estão em debate no Congresso. O custo para as empresas e a forma de transição ainda precisam ser definidos.\n\nFlávio propõe flexibilizar contratos e priorizar a negociação entre empresas e trabalhadores, o que pode facilitar a contratação de jovens e de pessoas acima de 50 anos. O risco apontado por críticos é a perda de proteção ao trabalhador, que a campanha nega."
    }
  },
  {
    id: "contas", icon: "🏛️", title: "Contas Públicas e Tributos",
    lead: "Dívida, déficit e o tamanho do Estado.",
    mandate: {
      lula: [
        { kind: "resultado", t: "A dívida bruta chegou a 82,9% do PIB em agosto/2026, o maior nível desde março de 2021 (alta de 4,2 pontos percentuais em oito meses).", s: "bcb" },
        { kind: "resultado", t: "Há projeção de déficit primário perto de R$ 80,9 bilhões em 2026. A meta formal só é cumprida por deduções e exclusões de despesas previstas no arcabouço fiscal.", s: "bcb" },
        { kind: "resultado", t: "Aprovou o arcabouço fiscal (2023) e a reforma tributária do consumo (EC 132/2023), duas reformas estruturais.", s: "lei15270" },
        { kind: "resultado", t: "O governo central teve déficit primário de R$ 42,9 bilhões (0,36% do PIB) em 2024 e de R$ 61,7 bilhões (0,48% do PIB) em 2025. A meta fiscal foi cumprida nos dois anos.", s: "tesouro" },
        { kind: "resultado", t: "Com juros altos, o déficit nominal do setor público, que inclui os juros da dívida, ficou em 8,45% do PIB em 2024.", s: "bcb" }
      ],
      jair: [
        { kind: "resultado", t: "A dívida bruta subiu durante a pandemia (acima de 85% do PIB em 2020), mas fechou 2022 em 71,7%, abaixo de onde começou o governo (75,3% em 2018).", s: "bcb" },
        { kind: "resultado", t: "Aprovou a Reforma da Previdência (2019) e concluiu a privatização da Eletrobras (2022).", s: "bcb" },
        { kind: "resultado", t: "Ponto fraco: o teto de gastos foi flexibilizado por emendas (PEC dos Precatórios em 2021 e PEC de 2022, às vésperas da eleição) para ampliar gastos.", s: "bcb" },
        { kind: "resultado", t: "O governo central teve déficit primário recorde de R$ 743 bilhões em 2020, com os gastos da pandemia, e fechou 2022 com superávit de R$ 54 bilhões, o primeiro desde 2013.", s: "tesouro" }
      ],
      rating: { l: 2, j: 3 },
      note: "Aqui o mandato de Jair sai melhor: a dívida terminou menor do que começou e 2022 fechou com superávit primário. Esse resultado teve ajuda da inflação alta, que infla o PIB nominal, e conviveu com mudanças no teto de gastos às vésperas da eleição.\n\nNo governo Lula, o arcabouço fiscal e a reforma tributária são avanços estruturais, e a meta fiscal foi cumprida em 2024 e 2025. Mas os déficits persistem, a dívida voltou a subir e os juros altos elevam o custo da dívida, o que pesa contra Lula."
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
      note: "Flávio apresenta direção fiscal mais definida, com metas de superávit e limites a gastos. Cortar ministérios e cargos, porém, tem efeito pequeno no orçamento: o grosso da despesa está em Previdência, saúde e educação, e o plano não detalha onde cortaria.\n\nLula mantém a linha atual, que aposta em aumentar receitas tributando rendas altas. Essa linha não zerou o déficit no mandato, o que reduz a credibilidade da promessa de equilíbrio."
    }
  },
  {
    id: "seguranca", icon: "🛡️", title: "Segurança Pública",
    lead: "Homicídios, polícia e o papel do governo federal.",
    mandate: {
      lula: [
        { kind: "resultado", t: "As mortes violentas intencionais caíram 8,2% em 2025 (40.775 casos). A taxa foi de 19,1 por 100 mil, a menor da série iniciada em 2012.", s: "fbsp" },
        { kind: "resultado", t: "Ressalvas: a letalidade policial subiu 5,4% (6.602 mortes, recorde da série) e os feminicídios cresceram 4% (1.571 vítimas).", s: "fbsp" },
        { kind: "resultado", t: "Os registros de estupro caíram 5,4% em 2025 (84.388 casos), a primeira queda desde a pandemia. O Fórum alerta para possível subnotificação.", s: "fbsp" },
        { kind: "resultado", t: "Os novos registros de CACs caíram de 329,5 mil (2022) para 67,9 mil (2024), depois dos decretos que restringiram o acesso a armas.", s: "fbsp" }
      ],
      jair: [
        { kind: "resultado", t: "As mortes violentas intencionais caíram de cerca de 57 mil (2018) para cerca de 47,5 mil (2022), uma queda expressiva, em parte atribuída aos estados.", s: "fbsp" },
        { kind: "resultado", t: "Decretos de 2019–2022 flexibilizaram o acesso a armas, e o arsenal em mãos de caçadores, atiradores e colecionadores (CACs) cresceu fortemente.", s: "fbsp" },
        { kind: "resultado", t: "Os registros de CACs ativos subiram de 117,5 mil (2018) para 783,4 mil (2022), alta de 665%, e as apreensões de armas caíram 12,5% em 2022.", s: "fbsp" },
        { kind: "resultado", t: "A letalidade policial foi de 6.430 mortes em 2022, estável em relação a 2021.", s: "fbsp" }
      ],
      rating: { l: 4, j: 3 },
      note: "Os dois mandatos viram queda de homicídios, que depende muito das polícias estaduais. Sob Jair, a queda veio junto com a explosão dos registros de armas para CACs, de 117,5 mil para 783,4 mil, e com menos apreensões de armas.\n\nO menor patamar de mortes violentas da série em 2025 e a primeira queda dos registros de estupro desde a pandemia dão vantagem a Lula, que restringiu o acesso a armas. A ressalva é a letalidade policial recorde, com 6.602 mortes."
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
      note: "Flávio propõe medidas mais incisivas, como reduzir a maioridade penal e reforçar as fronteiras com as Forças Armadas. A eficácia de endurecer penas é debatida entre especialistas, e a maioridade penal exige mudar a Constituição.\n\nLula propõe coordenação federal, com um Ministério da Segurança e mais integração com os estados, de efeito indireto e de prazo mais longo. Nenhum dos dois traz metas de redução de crimes. Empate."
    }
  },
  {
    id: "educacao", icon: "🎓", title: "Educação",
    lead: "Qualidade do ensino básico, permanência na escola e financiamento.",
    mandate: {
      lula: [
        { kind: "resultado", t: "O Ideb 2025 subiu em todas as etapas (anos iniciais 6,3; anos finais 5,3; ensino médio 4,5), os maiores valores desde 2005.", s: "inep" },
        { kind: "resultado", t: "Criou o Pé-de-Meia para reduzir a evasão no ensino médio.", s: "inep" },
        { kind: "resultado", t: "A alfabetização na idade certa subiu de 59,2% (2024) para 66% (2025), acima da meta do ano (64%). A meta é chegar a 80% em 2030.", s: "mec" },
        { kind: "resultado", t: "O Pé-de-Meia atendeu cerca de 4 milhões de estudantes por ano em 2024 e 2025, e o Escola em Tempo Integral financiou 965 mil matrículas no ciclo 2023–2024.", s: "mec" }
      ],
      jair: [
        { kind: "resultado", t: "O Ideb 2021 foi de 5,8 (anos iniciais), 5,1 (anos finais) e 4,2 (ensino médio), em um período marcado por escolas fechadas na pandemia.", s: "inep" },
        { kind: "resultado", t: "O ensino médio ficou estagnado em 4,2 entre 2019 e 2021.", s: "inep" },
        { kind: "resultado", t: "O Enem 2021 teve cerca de 3,1 milhões de inscritos, o menor número desde 2005.", s: "inep" }
      ],
      rating: { l: 4, j: 2 },
      note: "A trajetória favorece Lula: o Ideb subiu, a alfabetização na idade certa passou da meta em 2025 e o Pé-de-Meia passou a pagar cerca de 4 milhões de alunos por ano para que concluam o ensino médio.\n\nÉ preciso considerar que a pandemia pesou sobre os resultados de 2021, com escolas fechadas e ensino remoto, e que parte da melhora atual é recuperação depois desse período. A gestão das escolas também é sobretudo de estados e municípios."
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
      note: "As propostas de Lula têm metas objetivas: universalizar o Pé-de-Meia, ampliar o tempo integral e alfabetizar todas as crianças na idade certa. O desafio é bancar a expansão com o orçamento apertado.\n\nO plano de Flávio trata a educação pela eficiência do gasto e não traz metas de aprendizagem. Entidades de professores temem mudanças nos recursos garantidos pela Constituição; a campanha diz que o foco é gastar melhor."
    }
  },
  {
    id: "saude", icon: "🩺", title: "Saúde",
    lead: "SUS, pandemia, filas e acesso a medicamentos.",
    mandate: {
      lula: [
        { kind: "resultado", t: "Relançou o Mais Médicos em 2023 e ampliou o Farmácia Popular. Em 2025 lançou o Agora Tem Especialistas para reduzir filas.", s: "ms" },
        { kind: "resultado", t: "Ressalva: as filas por consultas e exames especializados continuam sendo um desafio do SUS.", s: "ms" },
        { kind: "resultado", t: "A vacinação infantil voltou a subir: a 1ª dose da tríplice viral passou de 80,7% para 96,3%, e o país recuperou em 2024 o certificado de livre do sarampo.", s: "ms" },
        { kind: "resultado", t: "O Mais Médicos passou de 13,7 mil para 27,3 mil profissionais, e os 41 itens do Farmácia Popular ficaram gratuitos em 2025.", s: "ms" }
      ],
      jair: [
        { kind: "resultado", t: "O Brasil registrou cerca de 690 mil mortes por Covid-19 até dezembro de 2022. A compra de vacinas foi atrasada, e o governo defendeu tratamentos sem eficácia comprovada.", s: "ms" },
        { kind: "resultado", t: "A CPI da Pandemia (2021) recomendou o indiciamento do presidente. O relatório é político, e Bolsonaro nega as acusações.", s: "senado" },
        { kind: "resultado", t: "Lançou o Médicos pelo Brasil em substituição ao Mais Médicos. No fim de 2022, a maioria da população já estava vacinada pelo SUS.", s: "ms" },
        { kind: "resultado", t: "A cobertura da vacina contra a poliomielite caiu para cerca de 71% em 2021, a menor da série, e o Brasil perdeu em 2019 o certificado de país livre do sarampo.", s: "ms" }
      ],
      rating: { l: 4, j: 2 },
      note: "Os mandatos têm contextos diferentes, mas a condução da pandemia, o atraso na compra de vacinas e a queda da vacinação infantil, com a pólio perto de 71% em 2021, pesam contra Jair.\n\nLula recuperou a vacinação, dobrou o Mais Médicos e tornou gratuitos os itens do Farmácia Popular. O ponto fraco são as filas por consultas, exames e cirurgias especializadas, que seguem longas apesar dos programas de redução."
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
      note: "As propostas convergem em digitalização: Lula quer ampliar os serviços digitais do SUS e Flávio, um prontuário único ligado ao CPF. Flávio vai além ao propor comprar horários ociosos de hospitais privados para reduzir filas e entregar remédios em casa.\n\nNenhum dos dois traz meta numérica de redução de filas nem diz de onde virá o dinheiro. Empate."
    }
  },
  {
    id: "social", icon: "🤝", title: "Proteção Social e Desigualdade",
    lead: "Pobreza, fome e programas sociais.",
    mandate: {
      lula: [
        { kind: "resultado", t: "A extrema pobreza monetária ficou em 4,6% em 2025 (4,8% em 2024), cerca de 9,8 milhões de pessoas.", s: "fgv" },
        { kind: "resultado", t: "O Brasil saiu do Mapa da Fome da ONU em 2025.", s: "fao" },
        { kind: "resultado", t: "Ressalva: o Gini subiu para 0,511 em 2025 (0,504 em 2024), sinal de mais desigualdade.", s: "ibge" },
        { kind: "resultado", t: "A pobreza (linha do Banco Mundial) caiu de 27,3% em 2023 para 23,1% em 2024, com 8,6 milhões de pessoas a menos nessa condição.", s: "ibge" },
        { kind: "resultado", t: "A insegurança alimentar grave atingiu 3,2% dos domicílios em 2024, o menor nível da série.", s: "ibge" }
      ],
      jair: [
        { kind: "resultado", t: "Em 2020, o Auxílio Emergencial de R$ 600 (valor ampliado pelo Congresso) reduziu a pobreza durante a pandemia.", s: "fgv" },
        { kind: "resultado", t: "Substituiu o Bolsa Família pelo Auxílio Brasil em 2021 e elevou o benefício para R$ 600 em 2022, ano eleitoral.", s: "fgv" },
        { kind: "resultado", t: "Em 2022, 33 milhões de brasileiros estavam em situação de fome, segundo a Rede PENSSAN.", s: "penssan" },
        { kind: "resultado", t: "A pobreza chegou a 36,7% em 2021, o maior nível da série, e caiu para 31,6% em 2022. A extrema pobreza foi de 9,0% para 5,9%.", s: "ibge" },
        { kind: "resultado", t: "O Gini caiu de 0,544 (2021) para 0,518 (2022), o menor da série, com o Auxílio Brasil ampliado e a retomada do emprego.", s: "ibge" }
      ],
      rating: { l: 4, j: 3 },
      note: "O Auxílio Emergencial teve efeito importante em 2020, e o Auxílio Brasil ampliado ajudou a reduzir pobreza e desigualdade em 2022. Mas a pobreza chegou ao maior nível da série em 2021, e 33 milhões de pessoas passavam fome em 2022.\n\nNo governo Lula, a pobreza e a insegurança alimentar grave caíram ao menor nível das séries do IBGE, e o país saiu de novo do Mapa da Fome em 2025. A ressalva é o Gini em alta em 2025, sinal de mais concentração de renda."
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
      note: "Ambos prometem manter o Bolsa Família, que hoje atende cerca de 19 milhões de famílias. O reajuste anunciado perto do 1º turno é criticado pela oposição como eleitoral.\n\nFlávio acrescenta a porta de saída, com qualificação, crédito e emprego, mas sem detalhar como nem com quanto dinheiro. Sem metas de nenhum dos lados, empate."
    }
  },
  {
    id: "ambiente", icon: "🌳", title: "Meio Ambiente e Clima",
    lead: "Desmatamento, fiscalização e imagem internacional.",
    mandate: {
      lula: [
        { kind: "resultado", t: "O desmatamento na Amazônia Legal caiu para cerca de 9 mil km² (2023), 6.518 km² (2024) e 5.731 km² (2025, queda de 12,07%).", s: "inpe" },
        { kind: "resultado", t: "No Cerrado, a supressão de vegetação recuou 11,49% em 2025 (7.235 km²). O Fundo Amazônia foi retomado em 2023.", s: "inpe" },
        { kind: "resultado", t: "As emissões brutas de gases de efeito estufa caíram 16,7% em 2024, a maior queda desde 2009, puxadas pelo menor desmatamento.", s: "seeg" },
        { kind: "resultado", t: "Ressalva: o fogo atingiu 30,9 milhões de hectares em 2024, com recorde na Amazônia. Em 2025 a área queimada caiu para 12,7 milhões de hectares.", s: "mapbiomas" }
      ],
      jair: [
        { kind: "resultado", t: "O desmatamento na Amazônia Legal subiu de 7.536 km² (2018) para 10.129 (2019), 10.851 (2020), 13.038 (2021, o maior da década) e 11.594 km² (2022).", s: "inpe" },
        { kind: "resultado", t: "O Fundo Amazônia foi suspenso em 2019 por Alemanha e Noruega, em meio a críticas à política ambiental.", s: "inpe" },
        { kind: "resultado", t: "As emissões brutas subiram 12,2% em 2021, a maior alta em 19 anos, puxadas pelo desmatamento.", s: "seeg" },
        { kind: "resultado", t: "As multas do Ibama por crimes contra a flora na Amazônia caíram 38% em relação à média de 2015–2018.", s: "seeg" }
      ],
      rating: { l: 4, j: 1 },
      note: "A diferença é a mais clara entre todas as áreas, e os dados de desmatamento são do mesmo órgão (INPE). Sob Jair, o desmatamento na Amazônia subiu até 2021, as multas por crimes contra a flora caíram e as emissões tiveram em 2021 a maior alta em 19 anos.\n\nSob Lula, o desmatamento caiu três anos seguidos e as emissões tiveram em 2024 a maior queda desde 2009. A ressalva são os incêndios recordes de 2024 na Amazônia, em meio à seca extrema, que recuaram em 2025."
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
      note: "Lula põe a transição ecológica e a energia limpa no centro do plano, mas sem detalhar metas novas além das já assumidas pelo país. Flávio incorpora mecanismos de mercado, como créditos de carbono e pagamento por serviços ambientais.\n\nO plano de Flávio não traz metas de desmatamento nem de emissões, o que impede verificar resultados. Por isso fica atrás."
    }
  },
  {
    id: "externa", icon: "🌐", title: "Política Externa e Comércio",
    lead: "Tarifaço americano, blocos econômicos e inserção do Brasil.",
    mandate: {
      lula: [
        { kind: "resultado", t: "A balança comercial teve superávit recorde de US$ 98,8 bilhões em 2023.", s: "mdic" },
        { kind: "resultado", t: "Diante do tarifaço americano (até 25%, podendo chegar a 37,5% se cumulativo), criou grupo de trabalho com os EUA e o plano \"Brasil Soberano\" de crédito subsidiado. As tarifas seguem em vigor e atingiram máquinas, calçados, móveis e madeira.", s: "bdf" },
        { kind: "resultado", t: "As exportações bateram recorde de US$ 349 bilhões em 2025, com superávit de US$ 68,3 bilhões, apesar da queda de 6,6% nas vendas para os EUA.", s: "mdic" },
        { kind: "resultado", t: "O acordo Mercosul–União Europeia foi assinado em janeiro de 2026. A UE eliminará tarifas para 92% das exportações do bloco.", s: "mdic" }
      ],
      jair: [
        { kind: "resultado", t: "Superávit comercial de US$ 62,3 bilhões em 2022.", s: "mdic" },
        { kind: "resultado", t: "O país foi alvo de críticas internacionais pela política ambiental e iniciou o processo de adesão à OCDE em 2022.", s: "mdic" },
        { kind: "resultado", t: "As exportações chegaram ao recorde de US$ 334,4 bilhões em 2022, impulsionadas pelos preços das commodities.", s: "mdic" }
      ],
      rating: { l: 3, j: 2 },
      note: "As exportações recordes e o superávit favorecem Lula, assim como a assinatura do acordo Mercosul–União Europeia em 2026, negociado desde 1999. O impasse com os EUA, porém, segue sem solução e derrubou as vendas para aquele país.\n\nNo mandato de Jair, as exportações também bateram recorde em 2022, puxadas pelos preços das commodities, e o país iniciou a adesão à OCDE. A política ambiental, no entanto, gerou atritos com parceiros europeus."
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
      note: "Lula aposta no BRICS e no Sul Global e trata soberania digital e IA como prioridade. Isso mantém a diversificação de parceiros, mas pode aumentar os atritos com os EUA.\n\nFlávio propõe aproximação com os EUA e, segundo reportagens, discute a saída do Mercosul. Isso traz risco comercial relevante, inclusive para o acordo recém-assinado com a União Europeia, o que penaliza Flávio."
    }
  }
];
