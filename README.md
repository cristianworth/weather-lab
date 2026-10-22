# Weather Lab

Aplicativo de previsão do tempo de Cristian: um painel responsivo para explorar condições atuais, temperatura e chuva em qualquer cidade.

## Recursos

- Busca de localidades com estado e país, incluindo navegação por teclado.
- Condições atuais, sensação térmica, vento e umidade.
- Previsão de sete dias, com seleção do dia para explorar os detalhes.
- Gráficos interativos de temperatura e chuva por hora, com tabela acessível.
- Chuva em milímetros e probabilidade de precipitação em porcentagem, identificadas separadamente.
- Nascer e pôr do sol, índice UV e resumo horário.
- Localização do dispositivo mediante solicitação, favoritos, °C/°F e modo escuro.
- Persistência local de cidade, favoritos e preferências; estados de carregamento, erro e nova tentativa.

Dados reais da [Open-Meteo](https://open-meteo.com/), localidades baseadas no [GeoNames](https://www.geonames.org/) e atribuição [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). A cidade inicial é São Paulo e pode ser alterada na busca; não representa a localização inferida do visitante.

## Executar

Requer Node.js 22.12+ e npm. Validado com Node.js 24.

```sh
npm ci
npm run dev
```

Abra o endereço local informado pelo Vite. Não é necessária chave de API ou arquivo `.env`.

```sh
npm test
npm run build
npm run preview
```

Para os testes de navegador, no Windows com Microsoft Edge instalado:

```sh
npm run test:e2e
```

O Playwright inicia a aplicação na porta 5173 ou reutiliza uma prévia existente. Os cenários de integração consultam a API real e precisam de internet. O cenário de recuperação usa uma resposta controlada. Em outros sistemas, instale o Chromium do Playwright e selecione `PLAYWRIGHT_CHANNEL=chromium` no ambiente. Capturas e traces ficam em `test-results/`, fora do Git.

## Tecnologias e qualidade

React, TypeScript, Vite, CSS e gráficos SVG. Vitest e Testing Library verificam domínio e interface; Playwright e axe verificam os fluxos no navegador e critérios automatizáveis de acessibilidade. As versões exatas estão no lockfile.

A aplicação consulta a API diretamente e não precisa de backend ou banco de dados para o escopo atual. Preferências ficam no navegador; não há sincronização entre dispositivos. As fontes DM Sans e Manrope são carregadas pelo Google Fonts, com fallback local.

O acesso gratuito à API segue as [condições não comerciais da Open-Meteo](https://open-meteo.com/en/terms). A publicação do aplicativo e seu uso futuro em portfólio devem considerar essas condições. Uma previsão pode mudar e não substitui os alertas oficiais.

## Documentação

- [Especificação do painel](docs/spec.md).
- [Plano técnico e decisões](docs/plan.md).
- [Tarefas e validação](docs/tasks.md).
- [Pesquisa inicial e consultas executadas](docs/research.md).
- [Ponto de retomada](docs/checkpoint.md).

O projeto começou como uma tutoria de SDD. Em 22/10/2026, Cristian escolheu a implementação autônoma, com perguntas apenas sobre decisões relevantes da experiência. O [roteiro de tutoria inicial](docs/learning-path.md) fica preservado como histórico.

Repositório público: [cristianworth/weather-lab](https://github.com/cristianworth/weather-lab).
