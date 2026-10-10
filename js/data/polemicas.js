/* ============================================================
   Lado a Lado Brasil — Área de Polêmicas (levantado em 07/10/2026)
   group: "lula" = críticas ao governo Lula | "bolsonaro" = críticas à família Bolsonaro
   verdict.type: procede | parcial | nao | aberto
   Observação: vereditos são avaliações editoriais sobre os FATOS documentados.
   Não substituem decisão judicial. Vale a presunção de inocência.
   ============================================================ */

Object.assign(SOURCES, {
  stf:      { name: "STF — decisões e notícias", url: "https://portal.stf.jus.br" },
  camara:   { name: "Câmara dos Deputados — tramitação de projetos", url: "https://www.camara.leg.br" },
  senadoLeg:{ name: "Senado Federal — notícias e matérias legislativas", url: "https://www12.senado.leg.br/noticias" },
  tesouro:  { name: "Tesouro Nacional / Receita Federal — carga tributária", url: "https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/estudos/carga-tributaria" },
  planalto: { name: "Planalto — legislação federal", url: "https://www.planalto.gov.br/ccivil_03/" },
  lei14843: { name: "Planalto — Lei 14.843/2024 (saídas temporárias)", url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/L14843.htm" },
  lei15358: { name: "Planalto — Lei 15.358/2026 (Antifacção)", url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/L15358.htm" },
  ue:       { name: "Comissão Europeia — Lei de Serviços Digitais (DSA)", url: "https://digital-strategy.ec.europa.eu/pt/policies/digital-services-act-package" },
  globo:    { name: "G1 / Globo — cobertura política", url: "https://g1.globo.com/politica/" },
  gazeta:   { name: "Gazeta do Povo — cobertura política", url: "https://www.gazetadopovo.com.br" },
  infomoney:{ name: "InfoMoney — cobertura política e econômica", url: "https://www.infomoney.com.br" },
  uolPol:   { name: "UOL — cobertura política", url: "https://noticias.uol.com.br" },
  jotaPol:  { name: "JOTA — análise jurídica", url: "https://www.jota.info" },
  conab:    { name: "Conab — leilões de arroz (2024)", url: "https://www.conab.com.br" },
  gzh:      { name: "GZH — financiamento do BRB e Flávio Bolsonaro", url: "https://gauchazh.clicrbs.com.br" },
  pf:       { name: "Polícia Federal — inquéritos e operações", url: "https://www.gov.br/pf/pt-br" },
  cgu:      { name: "CGU — Operação Sem Desconto (descontos no INSS)", url: "https://www.gov.br/cgu/pt-br/assuntos/noticias/2025/04/cgu-e-pf-combatem-descontos-nao-autorizados-em-beneficios-do-inss" },
  inss:     { name: "INSS — ressarcimento de descontos indevidos", url: "https://www.gov.br/inss/pt-br" },
  bbc:      { name: "BBC News Brasil — fraude do INSS: o que é fato", url: "https://www.bbc.com/portuguese/articles/cy0xj17wwjlo" },
  agbr:     { name: "Agência Brasil — CPMI do INSS e saída de Lupi", url: "https://agenciabrasil.ebc.com.br/politica" },
  amado:    { name: "Amado Mundo — memorando sobre terras raras e EUA", url: "https://amadomundo.com/o-plano-de-flavio-para-alianca-com-eua-por-terras-raras/" },
  valor:    { name: "Valor Econômico — discurso de Flávio na CPAC", url: "https://valor.globo.com/politica/noticia/2026/03/30/governistas-criticam-discurso-de-flavio-nos-eua-lesa-patria.ghtml" },
  lei15506: { name: "Planalto — Lei 15.506/2026 (Política Nacional de Minerais Críticos)", url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2026/lei/L15506.htm" },
  globoLiq: { name: "O Globo — BC decreta liquidação do Banco Master", url: "https://oglobo.globo.com/economia/noticia/2025/11/18/banco-central-decreta-liquidacao-extrajudicial-do-banco-master.ghtml" },
  g1Master: { name: "G1 — áudios de Flávio a Vorcaro", url: "https://g1.globo.com/politica/noticia/2026/05/14/o-que-flavio-bolsonaro-disse-sobre-o-caso-master-antes-de-mensagens-revelarem-pedidos-de-dinheiro-a-vorcaro.ghtml" },
  g1Visita: { name: "G1 / Jornal Nacional — visita de Flávio a Vorcaro", url: "https://g1.globo.com/jornal-nacional/noticia/2026/05/19/depois-de-dizer-que-nao-tinha-relacao-com-vorcaro-flavio-bolsonaro-admite-visita-ao-banqueiro-apos-1a-prisao-do-dono-do-master.ghtml" },
  est500k:  { name: "Estadão — R$ 500 mil de empresa ligada ao Master", url: "https://www.estadao.com.br/politica/flavio-bolsonaro-recebeu-r-500-mil-de-diretor-de-empresa-do-esquema-do-banco-master/" },
  estDH:    { name: "Estadão Verifica — relatório da PF sobre “Dark Horse”", url: "https://www.estadao.com.br/estadao-verifica/pf-confirma-quer-nao-houve-corrupcao-dark-horse-falso/" },
  folhaDH:  { name: "Folha — Mendonça autoriza inquérito sobre “Dark Horse”", url: "https://www1.folha.uol.com.br/poder/2026/07/pgr-recomenda-ao-stf-investigacao-sobre-repasses-a-filme-sobre-jair-bolsonaro.shtml" },
  folhaLula:{ name: "Folha — Lula relata encontro com Vorcaro", url: "https://www1.folha.uol.com.br/mercado/2026/02/lula-diz-que-recebeu-vorcaro-a-pedido-de-mantega-e-que-avisou-a-banqueiro-que-investigacao-seria-tecnica.shtml" },
  globoWarde:{ name: "O Globo — mensagens de Vorcaro e do advogado Walfrido Warde", url: "https://oglobo.globo.com/politica/noticia/2026/09/22/mensagens-de-vorcaro-mostram-advogado-articulando-aproximacao-de-banqueiro-com-governo-estive-com-o-presidente-lula-longamente-ontem-vc-vai-gostar.ghtml" },
  cnnVeja:  { name: "CNN Brasil — áudio de Vorcaro sobre filme de Lula", url: "https://www.cnnbrasil.com.br/politica/entenda-caso-envolvendo-audio-de-vorcaro-sobre-filme-de-lula/" },
  otempo:   { name: "O Tempo — PGR e defesa negam depoimento de Vorcaro", url: "https://www.otempo.com.br/politica/judiciario/2026/10/9/vorcaro-e-pgr-negam-depoimento-oral-durante-negociacoes-por-delacao" }
});

const VERDICT_LABEL = {
  procede: "Procede",
  parcial: "Procede em parte",
  nao: "Não procede",
  aberto: "Em aberto"
};

const POLEMICAS = [
  /* ================= GOVERNO LULA ================= */
  {
    id: "censura", group: "lula", target: "Governo Lula", icon: "🗣️",
    title: "“Censura” e regulação das redes sociais",
    accusation: "A oposição afirma que o governo apoia medidas autoritárias e tentativas de censura, citando o apoio ao PL das Fake News e a proximidade com decisões judiciais que suspenderam perfis e canais de direita.",
    defense: "O governo diz que busca combater desinformação danosa, discurso de ódio e tentativas de desestabilização institucional, e que responsabilizar grandes plataformas é padrão em democracias contemporâneas.",
    facts: [
      { t: "O PL 2630/2020 (PL das Fake News) não foi aprovado. Perdeu força na Câmara e não virou lei.", s: "camara" },
      { t: "Em junho de 2025, o STF declarou parcialmente inconstitucional o art. 19 do Marco Civil. Plataformas podem ser responsabilizadas, mesmo sem ordem judicial, por falha sistêmica em conteúdos graves (terrorismo, golpe de Estado, crimes contra crianças). Para calúnia, difamação e injúria, continua sendo exigida ordem judicial.", s: "stf" },
      { t: "As suspensões de perfis e canais foram determinadas por ministros do STF, que integram o Judiciário, e não por ato do Executivo. Juristas divergem sobre a proporcionalidade dessas ordens.", s: "jotaPol" },
      { t: "Responsabilizar plataformas por falhas sistêmicas é o modelo adotado pela União Europeia na Lei de Serviços Digitais.", s: "ue" }
    ],
    verdict: { type: "parcial", text: "O governo de fato defendeu regular as plataformas, mas a regulação que vigora veio do STF, e o PL das Fake News nunca foi aprovado. Atribuir “censura” ao Executivo não encontra respaldo em ato próprio dele. A crítica a ordens judiciais de remoção, por outro lado, é um debate legítimo sobre os limites da liberdade de expressão." }
  },
  {
    id: "impostos", group: "lula", target: "Governo Lula", icon: "💸",
    title: "Aumento de impostos e descontrole fiscal",
    accusation: "Críticos dizem que a gestão expandiu gastos e a carga tributária sobre o consumidor comum, citando o fim da isenção de remessas internacionais (a “taxa das blusinhas”), revisões do arcabouço fiscal e déficits.",
    defense: "O governo sustenta que corrigiu distorções concorrenciais, fechou brechas de grandes empresas e priorizou investimento social, reajuste do salário mínimo e preços de alimentos.",
    facts: [
      { t: "A carga tributária bruta chegou a 32,40% do PIB em 2025, a maior da série iniciada em 2010. A alta foi puxada por Imposto de Renda retido na fonte, IOF e contribuições previdenciárias.", s: "tesouro" },
      { t: "A dívida bruta foi a 82,9% do PIB em agosto/2026, o maior nível desde 2021, e há projeção de déficit primário perto de R$ 80,9 bilhões em 2026.", s: "bcb" },
      { t: "O fim da isenção para compras até US$ 50 (alíquota de 20%) foi incluído pelo Congresso no projeto do programa Mover e sancionado em 2024. Reportagens apontam que uma lei sancionada em setembro/2026 zerou a alíquota federal, e o ICMS dos estados continua.", s: "uolPol" },
      { t: "Do outro lado: a isenção do IR até R$ 5 mil entrou em vigor em 2026, compensada com tributação de altas rendas, e o salário mínimo voltou a ter ganho real por lei.", s: "lei15270" }
    ],
    verdict: { type: "procede", text: "Carga recorde, dívida em alta e déficit são fatos medidos por órgãos oficiais. O governo tem bons argumentos ao lembrar que parte da arrecadação vem de tributar altas rendas e do emprego formal, e que a taxa das blusinhas nasceu no Congresso. Ainda assim, o desequilíbrio fiscal é real e foi a principal fragilidade." }
  },
  {
    id: "judiciario", group: "lula", target: "Governo Lula", icon: "⚖️",
    title: "Relação com o Judiciário e “perseguição política”",
    accusation: "Bolsonaristas dizem que o Executivo age em conluio com ministros do STF para criminalizar a oposição, apontando as condenações do 8 de janeiro, investigações contra aliados de Jair Bolsonaro e inelegibilidades.",
    defense: "O governo diz que o Judiciário agiu dentro da lei para punir ataques ao Estado Democrático de Direito e que as instituições funcionam de forma autônoma, sem ingerência do Planalto.",
    facts: [
      { t: "A Primeira Turma do STF condenou Jair Bolsonaro a 27 anos e 3 meses por organização criminosa armada, tentativa de abolição violenta do Estado Democrático de Direito, golpe de Estado e danos ao patrimônio tombado. A decisão transitou em julgado em novembro de 2025.", s: "cnn" },
      { t: "Quem julga é o Judiciário. Nas fontes consultadas não há prova pública de ingerência do Planalto nessas decisões.", s: "stf" },
      { t: "O Congresso aprovou a chamada Lei da Dosimetria, que reduziria penas do 8 de janeiro. Sua aplicação está suspensa por liminar do ministro Alexandre de Moraes, e o STF ainda vai julgar as ações que questionam a lei.", s: "globo" },
      { t: "A defesa de Bolsonaro apresentou pedidos de revisão criminal, ainda em análise.", s: "infomoney" }
    ],
    verdict: { type: "nao", text: "A tese de conluio entre o Planalto e o STF não está comprovada: as condenações vêm do Judiciário, em processo com provas e recursos. O debate sobre o rigor das penas do 8 de janeiro e o poder concentrado de alguns ministros é legítimo, e está sendo discutido no próprio Congresso e no STF." }
  },
  {
    id: "seguranca-lula", group: "lula", target: "Governo Lula", icon: "🛡️",
    title: "Segurança pública e combate ao crime",
    accusation: "Alega-se postura branda com o crime organizado, foco excessivo em desarmamento civil, veto ao endurecimento penal (fim da “saidinha”) e resistência a classificar facções como terroristas.",
    defense: "O governo diz que a segurança deve priorizar inteligência financeira para desarticular a cúpula do narcotráfico e do tráfico de armas, e que armar a população e a letalidade policial sem controle não reduzem a violência.",
    facts: [
      { t: "Lula sancionou a Lei 14.843/2024, mas vetou o trecho que acabava com as saídas para visita à família. O Congresso derrubou o veto em 28/05/2024.", s: "lei14843" },
      { t: "O governo se opõe a classificar PCC e CV como organizações terroristas. Em maio de 2026 os EUA os designaram terroristas estrangeiros, e Lula e assessores criticaram a medida, vendo risco à soberania.", s: "poder360" },
      { t: "O governo enviou o PL Antifacção (PL 5.582/2025), sancionado como Lei 15.358/2026: cria o crime de domínio social estruturado, aumenta penas, restringe benefícios e prevê presídio federal para líderes.", s: "lei15358" },
      { t: "As mortes violentas intencionais caíram 8,2% em 2025, para a menor taxa da série (19,1 por 100 mil). A letalidade policial, porém, bateu recorde.", s: "fbsp" }
    ],
    verdict: { type: "parcial", text: "O veto à saidinha (derrubado) e a resistência ao rótulo de terrorismo são fatos. Já a ideia de “postura branda” é contrariada pela Lei Antifacção e pela queda de homicídios. A discussão sobre o rótulo terrorista envolve riscos reais de soberania, e nem a medida nem a rejeição dela são consensuais entre especialistas." }
  },
  {
    id: "externa-lula", group: "lula", target: "Governo Lula", icon: "🌐",
    title: "Política externa e alinhamento ideológico",
    accusation: "A direita critica a aproximação e o alívio diplomático a governos autoritários de esquerda (Venezuela, Cuba, Nicarágua), além de falas sobre o Oriente Médio e a guerra na Ucrânia, acusando o Brasil de se afastar de parceiros ocidentais.",
    defense: "O governo afirma que preza o multilateralismo, a solução negociada e a não intervenção, dialogando com todos os atores para defender interesses comerciais e geopolíticos.",
    facts: [
      { t: "Venezuela 2024: o Brasil, com Colômbia e México, cobrou a divulgação das atas e não endossou o resultado do CNE. Lula disse que Maduro deveria “arcar com as consequências” e chamou o regime de “muito desagradável”, mas evitou o termo ditadura.", s: "uolPol" },
      { t: "Em fevereiro de 2024, Israel declarou Lula persona non grata após ele comparar a ofensiva em Gaza ao Holocausto, e os países convocaram embaixadores.", s: "globo" },
      { t: "O Brasil e a China apresentaram em 2024 um plano de seis pontos para a Ucrânia, inicialmente rejeitado por Kiev. Celso Amorim atuou como enviado especial.", s: "bdf" },
      { t: "Lula mantém laços históricos com governos de Cuba e Nicarágua.", s: "uolPol" }
    ],
    verdict: { type: "parcial", text: "A fala sobre Gaza gerou custo diplomático concreto. Na Venezuela, porém, o Brasil não endossou o resultado oficial, o que enfraquece a tese de alívio automático a aliados ideológicos. A neutralidade ativa é uma escolha legítima de política externa, mas críticos veem ambiguidade com regimes autoritários, e esse ponto segue em disputa." }
  },
  {
    id: "gestao", group: "lula", target: "Governo Lula", icon: "🏢",
    title: "Gestão, ministérios e “aparelhamento”",
    accusation: "A oposição aponta a recriação e a inflação de ministérios, a nomeação de aliados em estatais e fundos de pensão e erros como o leilão de arroz após as enchentes do RS em 2024.",
    defense: "O governo diz que a estrutura reflete a reconstrução de políticas desmontadas e que os órgãos de controle e transparência seguem atuando de forma autônoma.",
    facts: [
      { t: "O governo tem 38 ministérios (contando órgãos com status de ministério), número que chegou a esse patamar com a criação do Ministério do Empreendedorismo em 2023.", s: "senadoLeg" },
      { t: "O leilão de arroz importado da Conab (maio/2024) foi anulado em junho/2024, depois que se soube que vencedores incluíam empresas sem capacidade técnica para o setor (como uma fábrica de sorvetes). O governo revisou as regras com AGU e CGU.", s: "conab" },
      { t: "Há projetos no Congresso (como o PLP 75/2026) para endurecer a governança de estatais e fundos de pensão. O STF validou a Lei das Estatais, que impõe quarentena a dirigentes partidários.", s: "jotaPol" },
      { t: "Nas fontes consultadas não há condenação por desvio de recursos nesses casos.", s: "infomoney" }
    ],
    verdict: { type: "parcial", text: "O número de ministérios e o fiasco do leilão são fatos, e o próprio governo anulou o certame. “Aparelhamento” é uma crítica política legítima sobre nomeações, sem comprovação judicial de irregularidades até aqui." }
  },

  {
    id: "inss", group: "lula", target: "Governo Lula", icon: "👵",
    title: "Fraude nos descontos do INSS",
    accusation: "A oposição acusa o governo de deixar explodir, sob sua gestão, um esquema bilionário de descontos não autorizados em aposentadorias e pensões, de ignorar alertas desde 2023 e de proteger pessoas próximas a Lula, como o irmão Frei Chico, vice-presidente de um sindicato investigado, e o filho Fábio Luís, o Lulinha.",
    defense: "O governo diz que o esquema começou antes de 2023, que foram a CGU e a PF do próprio governo que o investigaram e desmontaram, que Lula demitiu o presidente do INSS e o ministro Carlos Lupi e que as vítimas estão sendo ressarcidas sem precisar ir à Justiça.",
    facts: [
      { t: "A CGU e a PF deflagraram a Operação Sem Desconto em abril de 2025. Entidades descontaram cerca de R$ 6,3 bilhões de aposentados entre 2019 e 2024, e 97% dos entrevistados numa amostra disseram não ter autorizado a cobrança. Nem todo o valor foi desconto irregular.", s: "cgu" },
      { t: "Os descontos associativos foram de R$ 413 milhões em 2016 para R$ 2,8 bilhões em 2024. Lupi foi alertado em junho de 2023, e o valor mensal triplicou até abril de 2024, antes das primeiras providências. O TCU também havia apontado falhas em 2023.", s: "globo" },
      { t: "Das 11 entidades investigadas, 10 assinaram acordo com o INSS antes de 2023, várias em 2021 e 2022. Lula exonerou o presidente do INSS em abril de 2025, e Lupi deixou o ministério em 2 de maio de 2025.", s: "bbc" },
      { t: "O Sindnapi, que tem Frei Chico como vice-presidente, foi alvo de buscas da PF em outubro de 2025, mas Frei Chico não é investigado. Lulinha é alvo de dois inquéritos no STF por suposto tráfico de influência, e a PGR diz que eles não têm relação com a fraude do INSS.", s: "poder360" },
      { t: "A CPMI do INSS terminou em março de 2026 sem relatório aprovado: o parecer da oposição, que pedia o indiciamento de Lulinha, Lupi e um ex-ministro de Bolsonaro, foi rejeitado por 19 a 12.", s: "agbr" },
      { t: "Até junho de 2026, o INSS havia devolvido mais de R$ 3,2 bilhões a 4,7 milhões de aposentados, com correção pela inflação.", s: "inss" }
    ],
    verdict: { type: "parcial", text: "A fraude é real e cresceu muito em 2023 e 2024, quando o governo já tinha sido alertado e demorou a agir. Por outro lado, o esquema começou antes, foi desmontado por órgãos do próprio governo e as vítimas estão sendo ressarcidas. Não há prova de que familiares de Lula participaram dos desvios." }
  },

  {
    id: "master-lula", group: "lula", target: "Governo Lula", icon: "🏦",
    title: "Banco Master e Daniel Vorcaro",
    accusation: "A oposição acusa Lula de ter relação próxima com Daniel Vorcaro, dono do Banco Master. Cita o encontro dos dois no Planalto, fora da agenda oficial, aliados que trabalharam para o banco, como Guido Mantega, e reportagem da Veja segundo a qual Vorcaro teria pago R$ 30 milhões em dinheiro vivo ao Instituto Lula, para um documentário sobre o presidente, em troca de acesso a fundos de pensão.",
    defense: "O Planalto diz que Lula encontrou Vorcaro uma única vez, a pedido de Mantega, e avisou que o Banco Central faria uma análise técnica, sem interferência política. Lembra que foi o BC, presidido por um indicado de Lula, que vetou a venda do Master ao BRB e liquidou o banco. O Instituto Lula nega ter recebido dinheiro, e a campanha chama a reportagem de “farsa com objetivos eleitorais”.",
    facts: [
      { t: "O Banco Central liquidou o Master em novembro de 2025, por crise de liquidez e graves violações às normas, e Vorcaro foi preso pela PF. Em setembro, o BC já havia vetado a compra do Master pelo BRB.", s: "globoLiq" },
      { t: "Lula recebeu Vorcaro no Planalto em 4 de dezembro de 2024, sem registro na agenda. Ele foi levado por Guido Mantega, consultor contratado pelo banco, e o encontro teve a presença de Rui Costa e Gabriel Galípolo. Lula confirmou a reunião em 2026 e disse ter avisado que a análise do BC seria técnica.", s: "folhaLula" },
      { t: "Mensagens extraídas pela PF do celular de Vorcaro mostram o advogado Walfrido Warde dizendo ao banqueiro que levava recados “do presidente”. O Planalto diz que Lula não teve outro contato com Vorcaro nem conhecia a articulação. Segundo o jornal, o próprio Warde afirma que nunca tratou do assunto diretamente com Lula. Nas mesmas mensagens, Vorcaro reclama que Gleisi Hoffmann e Aloizio Mercadante atuavam “contra” o banco.", s: "globoWarde" },
      { t: "Em outubro de 2026, a Veja divulgou um áudio, sem data, atribuído a Vorcaro, que fala em dinheiro para “o filme do Lula” por intermediação de João Vaccari Neto. A defesa do banqueiro diz não reconhecer a origem nem a autenticidade do material.", s: "cnnVeja" },
      { t: "A PF afirma que Vorcaro não prestou depoimento com esse conteúdo nem entregou documentos sobre o tema. As propostas de delação dele foram rejeitadas pela PF e depois pela PGR, e integrantes da PGR dizem que o filme sobre Lula não aparecia nelas.", s: "otempo" }
    ],
    verdict: { type: "aberto", text: "A proximidade de pessoas do governo com Vorcaro está documentada: houve uma reunião fora da agenda, e Mantega era consultor pago pelo banco. Já a acusação de pagamento ao Instituto Lula depende de um áudio sem data, sem prova apresentada e que PF e PGR dizem não ter recebido. Nenhuma das fontes consultadas noticia inquérito contra Lula, e foi o BC do atual governo que liquidou o banco." }
  },

  /* ================= FAMÍLIA BOLSONARO ================= */
  {
    id: "rachadinha", group: "bolsonaro", target: "Flávio Bolsonaro", icon: "🧾",
    title: "Rachadinhas e Fabrício Queiroz",
    accusation: "O Ministério Público do RJ apontou suspeita de que, na Alerj, Flávio coordenava a apropriação de salários de assessores (peculato e lavagem), com movimentações atípicas de Fabrício Queiroz, pagamentos em dinheiro vivo e depósitos fracionados.",
    defense: "A defesa alega vício na origem da investigação (quebra de sigilo sem fundamentação e uso de dados do Coaf sem autorização judicial), o que levou à anulação das provas. Flávio diz ser vítima de perseguição para atingir o pai.",
    facts: [
      { t: "O STJ (2021) anulou a quebra de sigilo bancário e fiscal por falta de fundamentação. O STF (2ª Turma) anulou relatórios do Coaf compartilhados sem autorização judicial.", s: "stf" },
      { t: "Em maio de 2022, o TJRJ rejeitou a denúncia contra Flávio e Queiroz, a pedido do próprio MPRJ, após a perda das provas.", s: "globo" },
      { t: "O mérito nunca foi julgado, e o arquivamento não impede nova investigação com provas válidas.", s: "jotaPol" },
      { t: "Em setembro de 2026, Gilmar Mendes manteve a quebra de sigilo de Danielle Nóbrega, ex-assessora de Flávio, numa ação de improbidade ligada ao antigo gabinete.", s: "stf" }
    ],
    verdict: { type: "aberto", text: "Não há condenação. As provas foram anuladas por falhas processuais, o que não prova inocência nem culpa. O caso ficou sem julgamento de mérito, e novas apurações cíveis seguem em andamento." }
  },
  {
    id: "patrimonio", group: "bolsonaro", target: "Flávio Bolsonaro", icon: "🏠",
    title: "Evolução patrimonial e mansão em Brasília",
    accusation: "Críticos questionam a rápida evolução do patrimônio de Flávio, com destaque para a compra de uma mansão de cerca de R$ 6 milhões em Brasília em 2021 e transações imobiliárias antigas com dinheiro em espécie.",
    defense: "Flávio afirma que o imóvel foi comprado com financiamento regular do BRB, complementado pela venda de outros bens e por rendimentos como advogado e empresário, e nega irregularidade fiscal.",
    facts: [
      { t: "O financiamento do BRB foi de R$ 3,1 milhões, com juros de 3,71% ao ano, abaixo da média do banco na época (cerca de 4,85%). O prazo era de 30 anos, e a dívida foi quitada em cerca de três anos.", s: "gzh" },
      { t: "Reportagens apontam que a PF abriu, em outubro de 2026, investigação sobre as condições do financiamento, dentro de apuração mais ampla de fraudes no BRB que envolve o ex-presidente do banco, preso em 2026.", s: "pf" },
      { t: "Flávio diz que o dinheiro veio da venda de um imóvel anterior e de participação em franquia de chocolates.", s: "gzh" }
    ],
    verdict: { type: "aberto", text: "Os fatos objetivos (taxa abaixo da média e quitação antecipada) pedem explicação, mas não há acusação formal nem prova de favorecimento. Está sob investigação, e Flávio tem direito à presunção de inocência." }
  },
  {
    id: "milicia", group: "bolsonaro", target: "Flávio Bolsonaro", icon: "🎖️",
    title: "Vínculos históricos com milicianos no Rio",
    accusation: "A oposição cita homenagens de Flávio na Alerj a policiais depois acusados de chefiar milícias, como o ex-capitão Adriano da Nóbrega, e o emprego de parentes dele no gabinete.",
    defense: "Flávio diz que as honrarias reconheceram o histórico de combate ao crime, antes de qualquer condenação, que não sabia de desvios posteriores e que repudia as milícias.",
    facts: [
      { t: "Em 2005, Flávio concedeu a Medalha Tiradentes a Adriano da Nóbrega quando este já estava preso, acusado de homicídio, e chegou a visitá-lo na cadeia. Isso contraria o argumento de que a honraria veio antes de qualquer acusação.", s: "uolPol" },
      { t: "A mãe e a ex-mulher de Adriano foram nomeadas no gabinete de Flávio. O MPRJ apontou que esses cargos teriam servido ao esquema de rachadinha, com parte dos salários repassada ao grupo de Queiroz.", s: "gazeta" },
      { t: "Flávio diz que as indicações partiram de seu ex-assessor Fabrício Queiroz. Adriano foi apontado como chefe do Escritório do Crime e morreu em 2020.", s: "gzh" }
    ],
    verdict: { type: "parcial", text: "A homenagem e as nomeações estão documentadas, e parte da defesa não bate com os fatos (Adriano já era acusado em 2005). Não há, porém, decisão judicial ligando Flávio a crimes da milícia. Por isso procede o fato, mas não a imputação de participação." }
  },
  {
    id: "terras-raras", group: "bolsonaro", target: "Flávio Bolsonaro", icon: "🪨",
    title: "Terras raras e “entreguismo” aos EUA",
    accusation: "Governistas acusam Flávio de “entreguismo” e de “traição à pátria” por oferecer aos Estados Unidos as terras raras e os minerais críticos do Brasil em troca de apoio político de Donald Trump, citando o discurso dele num evento conservador no Texas e um memorando com a marca da campanha que prevê alinhamento a Washington.",
    defense: "Flávio diz que quer atrair investimento e processar os minerais no Brasil, gerando emprego, e não vender pedra bruta. Afirma que coopera “com todos os países” e que o governo Lula é que trata o Brasil como “colônia chinesa”. O autor do memorando, André Marinho, nega que o texto seja da campanha.",
    facts: [
      { t: "Em 28 de março de 2026, na CPAC, no Texas, Flávio disse que “o Brasil é a solução para que os Estados Unidos não dependam mais da China em terras raras e minerais críticos”. Ministros e deputados do PT chamaram a fala de “lesa-pátria”.", s: "valor" },
      { t: "Um memorando de 22 páginas, em inglês, com a marca “Flávio Bolsonaro | 2026 Campaign”, prevê alinhar o Brasil aos EUA num sistema de abastecimento paralelo ao da China, com processamento no país e US$ 50 a 100 bilhões em investimentos. O autor, André Marinho, confirmou a autoria, mas nega ligação com a campanha.", s: "amado" },
      { t: "O plano de governo registrado no TSE fala em agregar valor no Brasil, com o Estado como “regulador e coordenador”, e em cooperar com qualquer país. Especialistas ouvidos pela imprensa o consideram genérico e sem salvaguardas ambientais.", s: "cnn" },
      { t: "A única mina de terras raras em escala comercial no país, a Serra Verde (GO), já tinha capital estrangeiro e foi vendida em 2026 à americana USA Rare Earth, com previsão de enviar toda a produção inicial aos EUA. O negócio aconteceu no governo Lula, que é contra e estuda revê-lo.", s: "globo" },
      { t: "Em setembro de 2026, Lula sancionou a Lei 15.506/2026, a Política Nacional de Minerais Críticos, que prevê incentivo ao processamento no Brasil e reforça o controle sobre operações estratégicas.", s: "lei15506" }
    ],
    verdict: { type: "parcial", text: "O alinhamento com os EUA está documentado na fala de Flávio e no memorando ligado à sua campanha, e oferecer minerais estratégicos a uma potência estrangeira em meio a uma disputa eleitoral é uma crítica legítima. “Entregar” as reservas, porém, não consta de nenhuma proposta formal: o plano oficial prevê processamento no país e cooperação com todos. A venda da Serra Verde aos EUA, aliás, aconteceu no atual governo." }
  },
  {
    id: "master-flavio", group: "bolsonaro", target: "Flávio Bolsonaro", icon: "🏦",
    title: "Banco Master, Vorcaro e o filme “Dark Horse”",
    accusation: "Críticos acusam Flávio de ter pedido e cobrado dinheiro de Daniel Vorcaro, dono do Banco Master, para financiar “Dark Horse”, filme sobre Jair Bolsonaro, inclusive quando as fraudes do banco já eram públicas. Ele também teria visitado o banqueiro depois da primeira prisão e recebido R$ 500 mil de empresa ligada ao grupo, enquanto dizia não ter relação com o caso e atribuía o escândalo ao PT.",
    defense: "Flávio admite os pedidos, mas diz que se tratava de “patrocínio privado para um filme privado”, sem nenhuma vantagem ao banqueiro. Afirma que os R$ 500 mil pagaram serviços de advocacia legais, que tentam “marginalizar a advocacia”, e acusa aliados de Lula de terem “relações espúrias” com o Master.",
    facts: [
      { t: "Em maio de 2026, o Intercept revelou áudios e mensagens em que Flávio cobra de Vorcaro parcelas para o filme (“Irmão, estou e estarei contigo sempre”), inclusive em novembro de 2025, quando já havia investigações da CVM e da PF sobre o banco. Flávio confirmou os pedidos. Pouco antes, tinha usado em evento uma camiseta com a frase “O PIX é do Bolsonaro; o Master é do Lula”.", s: "g1Master" },
      { t: "Segundo relatório da PF, foram combinados cerca de R$ 134 milhões para o filme, e pelo menos R$ 61 milhões foram repassados, com o dinheiro gasto nos EUA sob orientação de Eduardo Bolsonaro. A PF diz que Flávio era interlocutor direto de Vorcaro nessas conversas.", s: "estDH" },
      { t: "Depois de negar relação com o banqueiro, Flávio admitiu ter ido à casa de Vorcaro em São Paulo no fim de 2025, logo após a primeira prisão dele, quando Vorcaro usava tornozeleira. Disse que foi pedir dinheiro para o filme.", s: "g1Visita" },
      { t: "Em abril de 2025, o escritório de advocacia de Flávio emitiu nota de R$ 500 mil para uma empresa cujo sócio é diretor de uma companhia do conglomerado do Master. Duas outras notas de R$ 500 mil, emitidas para a companhia do grupo, foram canceladas. Flávio não detalhou os serviços.", s: "est500k" },
      { t: "Em julho de 2026, a pedido da PF e com parecer favorável da PGR, o ministro André Mendonça (STF) autorizou inquérito sobre os repasses. Flávio é investigado por possíveis crimes de lavagem de dinheiro, corrupção e evasão de divisas, mas não foi denunciado.", s: "folhaDH" }
    ],
    verdict: { type: "parcial", text: "A relação com Vorcaro está documentada e foi admitida: houve pedidos e cobranças de dinheiro, uma visita após a prisão e pagamento ao escritório de Flávio por empresa ligada ao grupo. Isso contradiz a negativa inicial dele. Se houve crime, porém, ainda depende do inquérito no STF: não há denúncia nem condenação, e vale a presunção de inocência." }
  },
  {
    id: "pandemia", group: "bolsonaro", target: "Jair Bolsonaro", icon: "🦠",
    title: "Gestão da pandemia de Covid-19",
    accusation: "A CPI da Pandemia e a oposição responsabilizam o governo por atraso intencional na compra de vacinas, incentivo a medicamentos sem eficácia comprovada, críticas ao isolamento e desestímulo às máscaras.",
    defense: "Os defensores dizem que o governo equilibrou saúde e sobrevivência da economia, que o país comprou centenas de milhões de doses assim que a Anvisa aprovou e que a autonomia médica permitia a prescrição off-label.",
    facts: [
      { t: "O relatório final da CPI (outubro/2021) recomendou o indiciamento de Bolsonaro por nove crimes, incluindo epidemia com resultado morte e crimes contra a humanidade, e foi enviado ao MPF, à PGR e ao TPI.", s: "senado" },
      { t: "Depoimentos mostraram que a Pfizer fez a primeira oferta em agosto de 2020 e não teve resposta por meses, o que atrasou o início da vacinação.", s: "jotaPol" },
      { t: "O Brasil registrou cerca de 690 mil mortes por Covid-19 até dezembro de 2022.", s: "ms" },
      { t: "A CPI é um órgão político. Nas fontes consultadas, não consta condenação criminal por esses fatos.", s: "senado" }
    ],
    verdict: { type: "procede", text: "O atraso na resposta à Pfizer e a defesa de tratamentos sem eficácia estão registrados em depoimentos e documentos. A responsabilização penal, porém, não foi decidida pela Justiça, e o contexto de uma pandemia global deve ser considerado ao avaliar a escala das mortes." }
  },
  {
    id: "golpe", group: "bolsonaro", target: "Jair Bolsonaro", icon: "🏛️",
    title: "Atos de 8 de janeiro e trama golpista",
    accusation: "Governistas e o Ministério Público acusam o núcleo bolsonarista de promover questionamentos sem provas às urnas e de fomentar uma tentativa de golpe, que culminou na depredação das sedes dos Três Poderes em 8/1/2023.",
    defense: "Lideranças condenam o vandalismo, mas dizem que as manifestações eram pacíficas, alegam omissão do governo federal e denunciam punições desproporcionais aos presos.",
    facts: [
      { t: "O STF condenou Jair Bolsonaro a 27 anos e 3 meses por organização criminosa armada, tentativa de abolição violenta do Estado Democrático de Direito, golpe de Estado e danos qualificados. A decisão transitou em julgado em novembro de 2025. Ele cumpre a pena em prisão domiciliar por motivo de saúde.", s: "cnn" },
      { t: "A Lei da Dosimetria, aprovada pelo Congresso, está suspensa por liminar de Moraes, e o STF ainda julgará sua constitucionalidade.", s: "globo" },
      { t: "A defesa pede revisão criminal, e a anistia é debatida no Congresso. Juristas apontam risco de inconstitucionalidade para anistia a crimes contra o Estado Democrático.", s: "cef" },
      { t: "A tese de omissão deliberada do governo federal não foi acolhida na condenação, conforme as fontes consultadas.", s: "stf" }
    ],
    verdict: { type: "procede", text: "A trama golpista foi reconhecida em decisão final do STF, e o 8 de janeiro está documentado. O debate sobre o tamanho das penas aos manifestantes de base é legítimo e segue em discussão. Já a tese de omissão do governo não foi acolhida pela Corte." }
  },
  {
    id: "joias-abin", group: "bolsonaro", target: "Jair Bolsonaro", icon: "💎",
    title: "Joias sauditas e “Abin paralela”",
    accusation: "A PF investigou o desvio de presentes oficiais sauditas para venda nos EUA e o uso da Abin para monitorar adversários e proteger aliados de investigações.",
    defense: "Na questão das joias, a defesa alega dúvida sobre as regras para bens personalíssimos e diz que depositou valores conforme o TCU. Na Abin, diz que as atividades eram contrainteligência técnica do Estado.",
    facts: [
      { t: "Joias: a PF indiciou Bolsonaro em julho de 2024 por peculato, associação criminosa e lavagem de dinheiro. Em março de 2026, a PGR pediu o arquivamento na esfera criminal, alegando falta de clareza na lei sobre presentes a presidentes, e a esfera cível e administrativa pode prosseguir.", s: "pf" },
      { t: "Abin: o inquérito foi enviado ao STF em junho de 2025. A PF aponta uso ilegal da agência para monitorar autoridades e adversários, e indiciou, entre outros, o deputado Alexandre Ramagem e o vereador Carlos Bolsonaro.", s: "pf" },
      { t: "Bolsonaro não foi formalmente indiciado nesse relatório da Abin, embora a PF aponte indícios de organização criminosa já tratados em outros inquéritos.", s: "gazeta" }
    ],
    verdict: { type: "parcial", text: "No caso das joias, houve indiciamento, mas a PGR pediu arquivamento criminal, então está em aberto. No caso da Abin, as apurações contra aliados são graves, mas Jair não foi indiciado ali. Ambos sem condenação definitiva." }
  }
];
