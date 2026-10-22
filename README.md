# Weather Lab

**Seu tempo, em perspectiva.** Um painel de previsão do tempo para explorar condições atuais, temperatura e chuva por localidade.

Projeto open source criado por [Cristian](https://github.com/cristianworth), com código sob a [licença MIT](LICENSE). A interface e a documentação principal estão em português do Brasil.

## Objetivo

O Weather Lab organiza a previsão em uma visão rápida do presente e em detalhes dos próximos dias. O objetivo é facilitar a comparação de temperatura, quantidade de chuva e probabilidade de precipitação ao longo do dia.

Planejar deslocamentos, escolher o que vestir ou organizar uma atividade ao ar livre são exemplos de uso. O aplicativo é um painel geral e deixa a decisão com a pessoa que consulta a previsão.

O projeto também registra uma experiência de desenvolvimento com auxílio de IA e práticas de Spec-Driven Development (SDD): requisitos, decisões técnicas, implementação e validação ficam disponíveis no mesmo repositório. O [relato do desenvolvimento](docs/development.md) explica o processo e seus limites.

## Estado do projeto

Versão inicial **0.1.0**, com aplicação funcional, testes e build de produção. O repositório permite execução local e geração de arquivos estáticos; não há demonstração hospedada oficial nesta entrega.

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

Requer Git, Node.js 22.12+ e npm. Ambiente validado com Node.js 24 e Microsoft Edge no Windows. As consultas à previsão precisam de internet.

```sh
git clone https://github.com/cristianworth/weather-lab.git
cd weather-lab
npm ci
npm run dev
```

Abra o endereço local informado pelo Vite, normalmente `http://127.0.0.1:5173/`. Não é necessária chave de API ou arquivo `.env`. Se já estiver dentro de um clone, comece em `npm ci`.

## Comandos

| Comando                | Finalidade                                        |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Iniciar o servidor de desenvolvimento             |
| `npm test`             | Executar os testes de domínio e componentes       |
| `npm run test:watch`   | Acompanhar testes durante o desenvolvimento       |
| `npm run test:e2e`     | Executar cenários de navegador com Playwright     |
| `npm run build`        | Verificar os tipos e gerar a aplicação em `dist/` |
| `npm run preview`      | Servir localmente o build já gerado               |
| `npm run format`       | Formatar código e documentação                    |
| `npm run format:check` | Verificar a formatação sem modificar arquivos     |

Para conferir uma alteração:

```sh
npm test
npm run build
npm run preview
```

Para os testes de navegador, no Windows com Microsoft Edge instalado:

```sh
npm run test:e2e
```

O Playwright inicia a aplicação na porta 5173 ou reutiliza uma prévia existente fora de CI. Os cenários de integração consultam a API real; o cenário de recuperação usa uma resposta controlada. A configuração de Chromium em outros ambientes e a conferência prática estão no [guia de contribuição](CONTRIBUTING.md). Capturas e traces ficam em `test-results/`, fora do Git.

## Tecnologias e qualidade

React, TypeScript, Vite, CSS e gráficos SVG. Vitest e Testing Library verificam domínio e interface; Playwright e axe verificam os fluxos no navegador e critérios automatizáveis de acessibilidade. As versões exatas estão no lockfile.

A aplicação consulta a API diretamente e não precisa de backend ou banco de dados para o escopo atual. Preferências ficam no navegador; não há sincronização entre dispositivos. As fontes DM Sans e Manrope são carregadas pelo Google Fonts, com fallback local.

O [guia de arquitetura](docs/architecture.md) descreve contratos e fluxo de dados. O [documento de privacidade](docs/privacy.md) explica armazenamento e requisições a terceiros.

## Limitações e publicação

- A previsão depende da disponibilidade e dos limites dos serviços externos; não há previsão offline.
- Preferências e favoritos pertencem ao navegador e à origem do site, sem sincronização entre dispositivos.
- A geolocalização depende de permissão e de um contexto seguro, como HTTPS ou localhost.
- A análise automatizada de acessibilidade cobre estados específicos; não equivale a uma avaliação completa com tecnologias assistivas.
- O resultado de `npm run build` pode ser servido por uma hospedagem estática. `npm run preview` é uma ferramenta de conferência local, não uma configuração de produção.

O código MIT permite reutilização, inclusive comercial, preservando seus avisos. O acesso gratuito à API segue separadamente as [condições não comerciais da Open-Meteo](https://open-meteo.com/en/terms). Verifique essas condições antes de hospedar uma instância para uso promocional ou comercial. Uma previsão pode mudar e não substitui os alertas oficiais.

## Contribuir e reportar problemas

Correções, melhorias de acessibilidade, testes e documentação são bem-vindos. Consulte [CONTRIBUTING.md](CONTRIBUTING.md) e o [código de conduta](CODE_OF_CONDUCT.md). Use as [issues](https://github.com/cristianworth/weather-lab/issues) para bugs e propostas; vulnerabilidades seguem [SECURITY.md](SECURITY.md).

## Licença e créditos

Código original e documentação do projeto: [MIT](LICENSE), escolhida por Cristian. Dependências, fontes e dados mantêm suas próprias licenças e atribuições. Os avisos das dependências de execução estão em [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Documentação

- [Especificação do painel](docs/spec.md).
- [Como o projeto foi desenvolvido](docs/development.md).
- [Arquitetura e fluxo de dados](docs/architecture.md).
- [Privacidade e serviços externos](docs/privacy.md).
- [Plano técnico e decisões](docs/plan.md).
- [Tarefas e validação](docs/tasks.md).
- [Pesquisa inicial e consultas executadas](docs/research.md).
- [Ponto de retomada](docs/checkpoint.md).

O projeto começou como uma tutoria de SDD. Em 22/10/2026, Cristian escolheu a implementação autônoma, com perguntas apenas sobre decisões relevantes da experiência. O [roteiro de tutoria inicial](docs/learning-path.md) fica preservado como histórico.

Repositório público: [cristianworth/weather-lab](https://github.com/cristianworth/weather-lab).
