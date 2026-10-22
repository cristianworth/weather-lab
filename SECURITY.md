# Segurança

## Escopo de manutenção

O projeto está em fase inicial. Correções são avaliadas para o estado atual de `main`; não há compromisso de manter versões antigas nem prazo de resposta garantido.

## Relatar uma vulnerabilidade

Não publique instruções de exploração, credenciais ou dados pessoais em uma issue pública.

Consulte a [área de avisos de segurança](https://github.com/cristianworth/weather-lab/security/advisories). Se a opção **Report a vulnerability** estiver disponível, use o formulário privado. Em 22/10/2026, o relato privado do GitHub estava desativado; esta entrega de documentação não modifica essa configuração.

Enquanto não houver canal privado, abra uma issue apenas solicitando um canal reservado, sem detalhes técnicos sensíveis, ou solicite contato ao [mantenedor](https://github.com/cristianworth). Aguarde a definição do canal antes de enviar os detalhes.

Quando houver canal adequado, informe versão ou commit, componente afetado, impacto, reprodução mínima e possível mitigação. Use dados sintéticos quando possível.

## Dados e dependências

O aplicativo atual não possui login nem backend próprio. Consultas, coordenadas e fontes envolvem serviços externos; veja [privacidade](docs/privacy.md). Dependências ficam fixadas no lockfile, mas futuras atualizações precisam de revisão.

Não inclua segredos no frontend: arquivos e variáveis incorporados ao build podem ser inspecionados pelo visitante. A licença MIT do projeto não altera licenças nem condições dos serviços de terceiros.
