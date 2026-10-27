# Plano técnico

## Decisões de implementação

- **React + TypeScript + Vite:** painel com estados compartilhados de localidade, unidade e dia; componentes separados para busca, gráficos e ícones. Tipos explícitos para os dados normalizados e compilação estática antes do build.
- **CSS e SVG:** identidade visual própria, responsividade e gráficos exploráveis sem dependência de uma biblioteca de visualização. O gráfico mede a largura disponível para manter rótulos legíveis no celular.
- **Open-Meteo + GeoNames:** consulta pública sem segredo de API, usando os contratos pesquisados e conferidos com consultas reais. Datas Unix são formatadas pelo identificador de fuso retornado pela API; não se usa o fuso do dispositivo para a previsão.
- **Frontend direto, sem backend ou banco:** não há autenticação, segredo, gravação compartilhada ou regra de servidor no escopo atual. Uma camada de servidor será reconsiderada se surgirem responsabilidades concretas.
- **Persistência local:** localidade, favoritos, unidade e tema via `localStorage`, com validação e fallback seguro. A previsão é consultada novamente ao abrir ou atualizar; não é apresentada como atual a partir de um cache antigo.
- **Dependências fixadas:** versões exatas e `package-lock.json`. Node.js 22.12+; ambiente verificado em Node.js 24.

Referências verificadas: [Vite](https://vite.dev/guide/), [React](https://react.dev/learn/creating-a-react-app), [previsão Open-Meteo](https://open-meteo.com/en/docs) e [geocoding](https://open-meteo.com/en/docs/geocoding-api).

## Responsabilidades e fluxo

`LocationSearch` → seleção de `Location` → `App` → `getForecast` → validação e normalização → estado de previsão → condições atuais, dias, gráficos e detalhes.

- `src/lib/weather.ts`: tipos, chamadas HTTP, timeout de 15 segundos, aborto, validação de séries, unidades e formatação no fuso da cidade.
- `src/lib/storage.ts`: leitura validada e persistência tolerante a falhas.
- `src/components/LocationSearch.tsx`: debounce de 350 ms, cancelamento, resultados e navegação por teclado.
- `src/components/ForecastChart.tsx`: série do dia, temperatura/chuva, exploração por ponteiro e teclado e tabela acessível.
- `src/App.tsx`: composição, seleção, favoritos, geolocalização, tema e recuperação de falhas.
- `src/styles.css`: tokens visuais, estados de foco, modo escuro e layouts responsivos.

Toda resposta só atualiza o estado se a operação ainda estiver ativa. A troca de cidade aborta a consulta anterior. A chuva é normalizada como `rain + showers`, sem tratar valores ausentes como zero. Probabilidade permanece um campo separado.

## Verificação e entrega

Vitest/Testing Library para domínio, horários, unidades, persistência, corrida entre consultas e interações; Playwright/Edge para fluxos reais e responsividade; axe para auditoria automatizada de acessibilidade. O build executa o TypeScript antes de empacotar.

Versão inicial 0.1.0, exibida a partir do `package.json`. Não havia changelog nem política de release. Não foram criados remotos ou branches adicionais. Cristian autorizou a documentação open source, a licença MIT e, posteriormente, commits/pushes autônomos. A publicação usa GitHub Pages via `.github/workflows/pages.yml`, com checks antes do deploy e build em `/weather-lab/`. As capturas de portfólio selecionadas em `docs/images/` são versionadas por autorização explícita.
