# Collaboration

Este é um projeto pessoal de Cristian. Em 22/10/2026, ele substituiu a tutoria passo a passo pela implementação autônoma do aplicativo completo. As instruções explícitas da conversa prevalecem sobre este resumo.

- Converse em português. Prefira inglês natural para identificadores, arquivos, testes, comentários técnicos e mensagens de commit.
- Trabalhe no modo execução: implemente, valide e documente a solução completa. Cristian tem experiência em C#, SQL Server e JavaScript e maior familiaridade com backend e lógica.
- Leia `docs/checkpoint.md` ao retomar. Use `docs/spec.md`, `docs/plan.md` e `docs/tasks.md` como referência do produto e da implementação atual.
- Pergunte somente sobre diferenças relevantes nas funcionalidades e na experiência. Em cada pergunta, ofereça quatro opções e identifique a recomendação. Resolva decisões técnicas rotineiras autonomamente.
- Transporte e roupa são exemplos de uso, não uma especialização do produto. A experiência aprovada é um painel geral com condições atuais, próximos dias e gráficos horários de temperatura e chuva.
- Preserve a distinção entre decisões de Cristian e escolhas de implementação. Prefira contratos públicos e testes de comportamento relevantes.
- Preserve configurações existentes. A branch padrão e de publicação é `main`. Para mudanças, use uma branch curta a partir da referência remota atualizada, preservando alterações e commits locais de outros trabalhos. Siga o processo de [contribuição](CONTRIBUTING.md); ele não concede autorização operacional além do pedido atual.
- Registre entregas reais em commits coesos. Antes de qualquer commit ou merge, procure changelog e regras de versão. Se existirem, leia-os, recomende a versão adequada e pergunte sobre atualizar changelog e versão, salvo autorização já dada no mesmo escopo. Mantenha versões consistentes, sem incrementá-las a cada commit da mesma entrega.
- Continue a implementação e as decisões rotineiras autonomamente dentro do escopo autorizado; integração é uma etapa separada. Revise o diff e os checks do SHA atual antes do merge autorizado. Push direto à `main` exige autorização explícita; CI verde não autoriza integração. Após integrar, acompanhe o deploy do commit e confira a publicação.
- Configure o `.gitignore` antes do primeiro commit. Mantenha credenciais, dependências, builds, resultados brutos, capturas temporárias e temporários fora do histórico. Capturas selecionadas em `docs/images/` são assets de portfólio explicitamente autorizados e devem ser versionadas. A versão exibida vem do `package.json`.
- Mantenha `docs/checkpoint.md` curto e atualizado com etapa, decisões e pendências. Explique verificações e limitações; não apresente documentação consultada como teste executado.
- No fechamento de uma entrega, apresente, quando aplicável, como testar; depois Workflow; por último TL;DR. Uma pergunta de continuidade não é obrigatória.
