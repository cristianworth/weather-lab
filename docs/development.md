# Como o Weather Lab foi desenvolvido

## Motivação

Cristian iniciou o projeto para praticar Spec-Driven Development (SDD), explorar frontend e testes e experimentar desenvolvimento com auxílio de IA. Sua experiência prévia é principalmente em C#, SQL Server e JavaScript, com maior familiaridade com backend e lógica.

A ideia inicial foi consultar localidades e apresentar gráficos de temperatura e chuva. Exemplos como organizar deslocamentos ou escolher roupas ajudaram a explicar a utilidade, sem especializar o produto nesses usos.

## Da pesquisa ao painel

1. **Preparação e pesquisa:** a pasta foi conferida, o repositório próprio foi preparado e as documentações oficiais de GitHub Spec Kit e Open-Meteo foram consultadas. Busca, ausência de resultado, previsão e parâmetro inválido foram experimentados. O [registro de pesquisa](research.md) distingue documentação, observações e recomendações.
2. **Definição da experiência:** a condução começou como tutoria. Em 22/10/2026, Cristian escolheu a implementação autônoma e o painel completo: condições atuais, próximos dias e gráficos horários. O escopo está na [especificação](spec.md).
3. **Plano e implementação:** React, TypeScript e Vite foram escolhidos para um frontend interativo. O contrato da API foi conferido com dados reais antes da integração. Busca, normalização e persistência ganharam responsabilidades identificáveis; os gráficos foram construídos em SVG.
4. **Validação:** testes de domínio e componentes foram complementados por cenários no Edge com dados reais. Capturas revelaram a necessidade de melhorar a escala do gráfico no celular; axe apontou ajustes de contraste e foco. Esses problemas foram corrigidos.
5. **Preparação pública:** documentação de uso, arquitetura, contribuição, privacidade e limites. Cristian escolheu explicitamente a licença MIT para o código.

## Papel de SDD e da IA

GitHub Spec Kit serviu como referência conceitual para separar especificação, plano, tarefas e validação. Seus comandos não foram instalados nem executados. Os documentos Markdown foram mantidos manualmente e a primeira implementação ficou concentrada em uma entrega; o repositório não demonstra a execução completa do workflow automatizado do Spec Kit.

Cristian definiu a intenção e escolheu a experiência principal. O agente de IA pesquisou fontes, propôs decisões técnicas, escreveu implementação e documentação e executou verificações. Essa descrição não equivale a uma revisão humana completa de cada linha ou a uma certificação de qualidade.

Os testes foram acrescentados durante implementação e validação. TDD foi discutido como possibilidade, mas não há evidência de que toda a entrega tenha seguido o ciclo teste antes do código. O projeto não é apresentado como uma implementação integral em TDD.

## Evidências e limites

Em 27/10/2026, o frontend recebeu a identidade Horizonte: símbolo SVG próprio, navegação horizontal, Barlow/Barlow Condensed, paleta atmosférica azul/âmbar e hierarquia renovada. A apresentação para portfólio e as fontes de design estão no [README](../README.md#identidade-visual-horizonte). A suíte de navegador ganhou um quarto cenário para marca/favicon e larguras de 320, 768 e 1280 px. Os testes usam a porta 4178 para evitar reutilizar a prévia de outro projeto.

A primeira entrega passou no build, em 16 testes de domínio/componentes e em três cenários Playwright com Edge no Windows. Eles verificaram busca e previsão reais, persistência, seleção de dia, tela de 390 px, tema escuro e recuperação de falha controlada. Capturas também foram inspecionadas.

A auditoria axe passou nos estados exercitados de desktop claro e celular escuro. Isso não cobre todos os estados, navegadores, tecnologias assistivas ou condições de rede. Não foram comprovadas precisão meteorológica, disponibilidade contínua ou capacidade sob carga. A primeira entrega não tinha CI; a publicação de 27/10/2026 acrescentou o workflow `Checks and Pages`, com verificações e deploy automático da `main`.

## Publicação e apresentação

Cristian autorizou commits e pushes autônomos para entregas reais. A publicação usa GitHub Pages, em `https://cristianworth.github.io/weather-lab/`. O build recebe `--base=/weather-lab/`; a marca e o favicon respeitam esse caminho. Uma suíte própria confere o build de produção no mesmo subcaminho antes do deploy.

O workflow verifica formatação, testes de domínio/componentes e cenários de navegador com respostas controladas. Isso mantém os checks de publicação independentes da disponibilidade da Open-Meteo. A suíte completa com API real foi executada localmente. Capturas reais selecionadas foram incluídas no README para uso em portfólio, com data, comando de reprodução e avisos de que a previsão muda.

As dependências exatas estão em `package-lock.json`. Para reproduzir as verificações, siga [CONTRIBUTING.md](../CONTRIBUTING.md). O [roteiro inicial](learning-path.md) é histórico; a referência funcional atual é `spec.md`.
