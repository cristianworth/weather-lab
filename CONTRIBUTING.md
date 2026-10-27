# Contribuindo com o Weather Lab

Este é um projeto pessoal mantido por [Cristian](https://github.com/cristianworth), com interface em português e escopo de painel geral de previsão do tempo. Correções, testes, melhorias de acessibilidade e documentação são bem-vindos.

## Antes de começar

Leia o [objetivo](README.md), a [especificação](docs/spec.md) e a [arquitetura](docs/architecture.md). Para uma mudança relevante de comportamento ou uma dependência nova, abra uma issue explicando problema, proposta e resultado esperado. Correções pequenas e documentação podem ser enviadas diretamente em um pull request.

Não é necessário instalar Spec Kit nem usar IA. Contribuições assistidas por IA seguem os mesmos critérios: compreender o que foi alterado, manter o escopo claro e apresentar evidências de validação.

## Preparar o ambiente

Faça um fork e clone sua cópia. Use Node.js 22.12+ e npm:

```sh
git clone https://github.com/SEU_USUARIO/weather-lab.git
cd weather-lab
npm ci
npm run dev
```

Abra o endereço impresso pelo Vite. Não há backend, banco, chave ou variável de ambiente obrigatória. A previsão e as fontes externas precisam de internet.

## Desenvolver e verificar

- Prefira mudanças pequenas, com identificadores e comentários técnicos em inglês. Textos da interface e a documentação principal ficam em português.
- Preserve contratos, valores ausentes, unidades e o fuso da cidade.
- Atualize especificação e documentação quando mudar comportamento ou decisões técnicas.
- Acrescente testes que protejam o comportamento alterado e seus efeitos colaterais plausíveis.
- Mantenha dependências e lockfile consistentes. Use `npm ci` para reproduzir o ambiente existente.

Antes de enviar:

```sh
npm run format:check
npm test
npm run build
```

Se a formatação falhar, execute `npm run format` e revise o diff. Os testes de domínio e componentes usam respostas controladas e não consultam a API real. O workflow `Checks and Pages` verifica formatação, testes e build, além dos cenários de navegador com respostas controladas. Registre no pull request também suas conferências práticas e a suíte completa com API real, quando executada.

### Testes de navegador

No Windows com Microsoft Edge instalado:

```sh
npm run test:e2e
```

Para usar o Chromium do Playwright, instale o navegador:

```sh
npx playwright install chromium
```

No PowerShell:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'chromium'
npm run test:e2e
```

Em um shell POSIX, como Bash:

```sh
PLAYWRIGHT_CHANNEL=chromium npm run test:e2e
```

A configuração padrão usa `msedge`. A alternativa Chromium é suportada pela configuração; a verificação da primeira entrega foi feita com Edge no Windows. Ambientes Linux mínimos podem precisar das dependências de sistema exigidas pelo Playwright.

Os cenários verificam busca real, persistência após recarregar, layout móvel, seleção de dias, modo escuro, recuperação de falha e consistência da marca/favicon. Os cenários com dados reais dependem da rede e do serviço; distinga falhas externas de regressões. O Playwright usa a porta 4178, separada da prévia usual na 5173. Defina `WEATHER_LAB_PORT` no ambiente para usar outra porta. Fora de CI, a suíte pode reutilizar a aplicação nessa porta; confira se ela pertence ao Weather Lab antes de executar.

Capturas e traces ficam em `test-results/`, fora do Git. A análise axe cobre critérios automatizáveis nos estados exercitados; complemente com conferência prática.

### Build de produção e capturas de portfólio

O GitHub Pages serve o projeto em `/weather-lab/`. Confira caminhos de JavaScript, CSS, marca e favicon com:

```sh
npm run build -- --base=/weather-lab/
npm run test:pages
```

A suíte de produção inicia uma prévia na porta 4180 e permite os mesmos parâmetros de navegador da suíte padrão. Para gerar as imagens selecionadas do README, inicie uma prévia em outra aba do terminal:

```sh
npm run preview -- --base=/weather-lab/ --port 4182
```

No PowerShell:

```powershell
$env:WEATHER_LAB_URL = 'http://127.0.0.1:4182/weather-lab/'
npm run screenshots
```

Em Bash:

```sh
WEATHER_LAB_URL=http://127.0.0.1:4182/weather-lab/ npm run screenshots
```

O script usa Edge por padrão e aceita `PLAYWRIGHT_CHANNEL=chromium`. Ele consulta dados reais sem substituir a previsão por fixtures. Confira as quatro imagens em `docs/images/` antes de incluí-las no commit e atualize a data indicada no README. Essas capturas de apresentação são uma exceção intencional aos resultados temporários; não versione traces ou logs.

### Conferência prática

1. Busque uma cidade, confira estado/país e selecione por teclado ou ponteiro.
2. Escolha outro dia; gráfico, tabela, horários solares e resumo devem acompanhar a seleção.
3. Alterne temperatura/chuva e °C/°F; quantidade e probabilidade devem manter unidades distintas.
4. Salve um favorito, mude o tema, recarregue e confira a persistência.
5. Confira teclado e tela pequena, sem rolagem horizontal na página. Teste erro e nova tentativa se alterar a integração.

## Pull requests e commits

Envie pull requests para `main`. Descreva problema, comportamento resultante, validação e limitações. Para mudanças visuais, anexe capturas ao PR sem versionar resultados temporários nem dados pessoais.

Use mensagens claras em inglês, como `fix: preserve selected city after reload` ou `docs: explain forecast data flow`. Não inclua credenciais, arquivos `.env`, dependências, builds, resultados brutos ou temporários.

A versão fica em `package.json` e é usada pela interface. Não a aumente a cada contribuição: alinhe mudanças de versão com o mantenedor. Antes de commits e merges, confira changelog e regras de release existentes. A entrega inicial não possui changelog; esta documentação mantém a versão funcional 0.1.0.

## Bugs, propostas e segurança

Abra uma [issue](https://github.com/cristianworth/weather-lab/issues) com reprodução, resultado esperado/observado e ambiente. Para uma funcionalidade, explique a necessidade e o resultado desejado. Evite incluir localização exata ou outros dados pessoais.

Vulnerabilidades seguem [SECURITY.md](SECURITY.md), e as interações seguem o [código de conduta](CODE_OF_CONDUCT.md). Contribuições aceitas serão distribuídas sob a [licença MIT do projeto](LICENSE); preserve avisos de terceiros e tenha autorização para contribuir com o material enviado.
