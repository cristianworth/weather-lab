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

Se a formatação falhar, execute `npm run format` e revise o diff. Os testes de domínio e componentes usam respostas controladas e não consultam a API real. Não há pipeline de CI configurado nesta entrega; registre no pull request o que executou.

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

Os cenários verificam busca real, persistência após recarregar, layout móvel, seleção de dias, modo escuro e recuperação de falha. Os cenários com dados reais dependem da rede e do serviço; distinga falhas externas de regressões. O Playwright usa a porta 5173 e, fora de CI, pode reutilizar a aplicação nessa porta. Feche um servidor de outro projeto antes de rodar a suíte.

Capturas e traces ficam em `test-results/`, fora do Git. A análise axe cobre critérios automatizáveis nos estados exercitados; complemente com conferência prática.

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
