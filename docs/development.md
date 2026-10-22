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

A primeira entrega passou no build, em 16 testes de domínio/componentes e em três cenários Playwright com Edge no Windows. Eles verificaram busca e previsão reais, persistência, seleção de dia, tela de 390 px, tema escuro e recuperação de falha controlada. Capturas também foram inspecionadas.

A auditoria axe passou nos estados exercitados de desktop claro e celular escuro. Isso não cobre todos os estados, navegadores, tecnologias assistivas ou condições de rede. Não foram comprovadas precisão meteorológica, disponibilidade contínua ou capacidade sob carga. Não há pipeline de CI nesta entrega.

As dependências exatas estão em `package-lock.json`. Para reproduzir as verificações, siga [CONTRIBUTING.md](../CONTRIBUTING.md). O [roteiro inicial](learning-path.md) é histórico; a referência funcional atual é `spec.md`.
