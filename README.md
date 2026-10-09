# Lado a Lado Brasil

Site estático que compara **Lula** e **Flávio Bolsonaro** (2º turno das eleições presidenciais de 2026), área por área, com argumentos baseados em dados e **fontes citadas**.

## O que o site faz

- **Nove áreas de comparação:** Economia, Trabalho e Renda, Contas Públicas, Segurança, Educação, Saúde, Proteção Social, Meio Ambiente e Política Externa.
- **Duas disputas por área:**
  - **Mandatos:** resultado do último mandato de Lula (2023–2026) contra o mandato de Jair Bolsonaro (2019–2022).
  - **Propostas:** promessas de Lula contra as de Flávio Bolsonaro.
- **Vencedor por área:** calculado a partir de notas de 1 a 5 em cada disputa. Um controle deslizante define o peso de mandatos e propostas.
- **Área de Polêmicas:** seis acusações contra o governo Lula e seis contra a família Bolsonaro, cada uma com contraponto, fatos com fontes e veredito (Procede, Procede em parte, Não procede ou Em aberto).
- **Comentários por área:** Giscus (GitHub Discussions) quando configurado. Sem configuração, os comentários ficam apenas no navegador de quem escreve (`localStorage`).
- **Menu superior** para trocar de área sem rolagem, com navegação por hash (`#/economia`, `#/polemicas`).

## Estrutura

```
ladoaladobrasil/
├── index.html              # estrutura da página
├── css/
│   ├── styles.css          # tema, layout, cards e páginas de área
│   └── polemicas.css       # estilos da área de polêmicas
└── js/
    ├── app.js              # roteamento, renderização, cálculo de vencedores, comentários
    └── data/
        ├── areas.js        # fontes, resultado do 1º turno, config do Giscus e as 9 áreas
        └── polemicas.js    # as 12 polêmicas, fontes extras e vereditos
```

## Rodando localmente

Não há build nem dependências. Abra o `index.html` no navegador ou sirva a pasta:

```bash
npx serve .
# ou
python -m http.server 8000
```

## Editando o conteúdo

- **Áreas, argumentos, fontes e notas:** `js/data/areas.js` (objeto `SOURCES` e lista `AREAS`).
  - Cada área tem `mandate` (Lula x Jair) e `proposals` (Lula x Flávio).
  - Cada argumento tem `kind` (`resultado` ou `proposta`), texto `t` e chave de fonte `s`.
  - As notas ficam em `rating`: `l` (Lula), `j` (Jair) e `f` (Flávio), de 1 a 5.
- **Polêmicas:** `js/data/polemicas.js`. Cada item tem `accusation`, `defense`, `facts` e `verdict.type` (`procede`, `parcial`, `nao` ou `aberto`).
- **Resultado do 1º turno e data do 2º turno:** objeto `ELECTION` em `areas.js`.

## Comentários com Giscus

1. Crie um repositório público no GitHub e ative **Settings → Features → Discussions**.
2. Crie uma categoria de discussão chamada `Comentários`.
3. Instale o app [giscus](https://github.com/apps/giscus) no repositório.
4. Em [giscus.app](https://giscus.app), informe o repositório e a categoria e copie `repoId` e `categoryId`.
5. Preencha `GISCUS` em `js/data/areas.js`:

```js
const GISCUS = { repo: "usuario/repositorio", repoId: "...", category: "Comentários", categoryId: "..." };
```

Cada área vira uma conversa separada.

## Publicando no AWS S3

1. Crie um bucket e ative **Static website hosting** com `index.html` como documento de índice.
2. Envie `index.html`, `css/` e `js/` mantendo a estrutura de pastas.
3. Para HTTPS e domínio próprio, use CloudFront na frente do bucket.

## Transparência e metodologia

- Este site é **informativo** e não tem vínculo com campanhas, partidos ou o TSE.
- Os dados foram levantados em **07/10/2026**. Confira os números nas fontes originais antes de divulgar.
- Muitos links apontam para o portal da instituição ou do veículo, não para a matéria exata. Substitua por links diretos quando possível.
- As **notas e vereditos são avaliações editoriais** sobre fatos documentados, e outro critério pode levar a outro resultado. Não substituem decisão judicial, e vale a presunção de inocência.
- Mandatos têm contextos diferentes (por exemplo, a pandemia em 2020–2021). Flávio Bolsonaro não tem mandato executivo, então o mandato comparado é o de Jair Bolsonaro, e as propostas são julgadas separadamente.
- Propostas são promessas, não resultados.
