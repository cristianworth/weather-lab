# Ponto de retomada

Atualizado em 27/10/2026. Entrega: redesign Horizonte, galeria de portfólio e publicação via GitHub Pages. Versão funcional 0.1.0; sem release ou incremento de versão nesta entrega.

## Direção e autonomia

- Modo execução. Cristian autoriza e incentiva commits e pushes autônomos de entregas reais neste projeto; manter histórico coeso em inglês e verificar changelog/regras antes de commits ou merges.
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
- Repositório: `D:/Repo/weather-lab`, branch `main`, remoto `https://github.com/cristianworth/weather-lab.git`, autoria local com noreply da conta `cristianworth`. Verificar sincronização pelas referências Git.
- Próximo passo de produto: experimentar a versão publicada e avaliar ajustes concretos. O relato privado de segurança ainda não foi configurado; não prometer esse canal. Consultas precisam de internet e estão sujeitas às condições da Open-Meteo.
