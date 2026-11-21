# Ponto de retomada

Atualizado em 21/11/2026. Entrega de produto de referência: redesign Horizonte, galeria de portfólio e publicação via GitHub Pages. O estado da adoção do GitHub Flow é acompanhado na [issue #1](https://github.com/cristianworth/weather-lab/issues/1) e no [PR #2](https://github.com/cristianworth/weather-lab/pull/2). Versão funcional 0.1.0; sem release ou incremento de versão nesta adoção documental.

## Direção e autonomia

- Modo execução para implementação e decisões rotineiras no escopo autorizado. Seguir o [processo de contribuição](../CONTRIBUTING.md#pull-requests-e-commits): branch de trabalho, PR, revisão do diff e checks do SHA atual antes da integração autorizada. Manter histórico coeso em inglês e verificar changelog/regras antes de commits ou merges.
- Perguntar somente sobre diferenças relevantes de funcionalidades, com quatro opções e recomendação. O aplicativo é um painel geral de previsão; transporte e roupa são exemplos de uso.
- Redesign Horizonte: azul atlântico/cobalto/âmbar, Barlow/Barlow Condensed, navegação horizontal, faixa semanal e símbolo SVG original compartilhado. Referências e estudo visual no README.
- Stack: React, TypeScript, Vite e Open-Meteo. Sem chave ou backend. MIT escolhida por Cristian.

## Publicação e portfólio

- GitHub Pages configurado para workflow: https://cristianworth.github.io/weather-lab/.
- `.github/workflows/pages.yml` verifica formatação, testes, build e cenários de navegador com respostas controladas; publica apenas após sucesso em pushes à `main`. Conferir o estado real no Actions e a revisão servida antes de afirmar que uma nova publicação terminou.
- Build: `npm run build -- --base=/weather-lab/`. A prévia de produção também exige `--base=/weather-lab/`. `npm run test:pages` valida o build na porta 4180.
- Capturas selecionadas em `docs/images/` são versionadas por autorização explícita. `npm run screenshots` atualiza a galeria com dados reais; use `WEATHER_LAB_URL` para selecionar a prévia. Resultados brutos continuam ignorados em `test-results/`.

## Evidências e próximos passos

- Redesign validado com 16 testes de domínio/componentes, quatro cenários Playwright/Edge, inspeção visual e axe nos estados exercitados; a suíte completa também passou no build de produção em `/weather-lab/`.
- Marca conferida em 16, 32 e 64 px, fundos claro/escuro e layouts de 320, 390, 768 e 1280 px. Isso não equivale a auditoria completa de acessibilidade nem valida precisão meteorológica.
- Repositório: `D:/Repo/weather-lab`, branch padrão `main`, remoto `https://github.com/cristianworth/weather-lab.git`, autoria local com noreply da conta `cristianworth`. Verificar branch atual e sincronização pelas referências Git.
- Na adoção [#1](https://github.com/cristianworth/weather-lab/issues/1), revisão independente e aprovação de Cristian para o diff precedem integração; consulte o [PR #2](https://github.com/cristianworth/weather-lab/pull/2) para o estado atual. A autorização desta adoção não concede permissões gerais futuras. O template e o CI existentes são reutilizados; as tarefas de produto concluídas permanecem em `docs/tasks.md`.
- Próximo passo de produto: experimentar a versão publicada e avaliar ajustes concretos. O relato privado de segurança ainda não foi configurado; não prometer esse canal. Consultas precisam de internet e estão sujeitas às condições da Open-Meteo.
