# Publicação e verificações do Weather Lab

## Comandos

| Comando                | Finalidade                                          |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Iniciar o servidor de desenvolvimento               |
| `npm test`             | Executar os testes de domínio e componentes         |
| `npm run test:watch`   | Acompanhar testes durante o desenvolvimento         |
| `npm run test:e2e`     | Executar cenários de navegador com Playwright       |
| `npm run test:pages`   | Verificar o build em `/weather-lab/`                |
| `npm run screenshots`  | Atualizar as capturas selecionadas para o portfólio |
| `npm run build`        | Verificar os tipos e gerar a aplicação em `dist/`   |
| `npm run preview`      | Servir localmente o build já gerado                 |
| `npm run format`       | Formatar código e documentação                      |
| `npm run format:check` | Verificar a formatação sem modificar arquivos       |

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

O Playwright inicia a aplicação na porta 4178 ou reutiliza uma prévia existente fora de CI. A suíte de produção usa a porta 4180 e o subcaminho `/weather-lab/`. Os cenários de integração consultam a API real; o cenário de recuperação usa uma resposta controlada. A configuração de Chromium em outros ambientes e a conferência prática estão no [guia de contribuição](../CONTRIBUTING.md). Capturas e traces ficam em `test-results/`, fora do Git.

## Publicação e checks

O workflow [Checks and Pages](../.github/workflows/pages.yml) roda em pushes e pull requests para `main`. Ele instala as dependências, confere a formatação, executa os testes, gera o build com `--base=/weather-lab/` e verifica no Chromium os cenários de recuperação e marca com respostas controladas. A suíte completa com API real também pode ser executada localmente.

Quando essas verificações passam em um push para `main`, o job de deploy publica o artefato no GitHub Pages. Pull requests executam as verificações sem publicar. As actions oficiais estão fixadas por SHA. O resultado real pode ser consultado no workflow no GitHub Actions.

Para conferir o mesmo build localmente:

```sh
npm run build -- --base=/weather-lab/
npm run test:pages
```

Para abrir a versão de produção com uma prévia manual:

```sh
npm run preview -- --base=/weather-lab/
```

Use o endereço com `/weather-lab/` impresso pelo Vite. Referências: [Vite e GitHub Pages](https://vite.dev/guide/static-deploy.html#github-pages) e [workflows de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
