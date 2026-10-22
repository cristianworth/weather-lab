# Percurso de aprendizado

Status: histórico da proposta inicial de 17/10/2026. Em 22/10/2026, Cristian substituiu esta abordagem pela implementação autônoma. O fluxo ativo está em `spec.md`, `plan.md`, `tasks.md` e `checkpoint.md`; os exercícios abaixo não devem ser retomados como pendências.

## Abordagem recomendada

Praticar o primeiro incremento com documentos Markdown organizados manualmente, usando GitHub Spec Kit como referência. Isso permite elaborar cada requisito e entender a responsabilidade de cada artefato antes de automatizar sua geração. O custo é conferir manualmente a coerência entre especificação, plano, tarefas e implementação.

Spec Kit oferece templates, comandos e verificações entre artefatos. É uma boa opção para repetir o processo com mais automação, mas também exige manutenção da ferramenta e revisão do conteúdo gerado. A recomendação é reavaliá-lo depois do primeiro ciclo; a escolha permanece aberta. Nenhuma ferramenta SDD foi instalada.

No fluxo oficial, princípios orientam especificação, esclarecimento, plano, tarefas, análise de consistência, implementação e comparação final com os artefatos. A documentação atual inclui `converge` para identificar lacunas após implementar. Fonte: [referência oficial do fluxo](https://github.github.com/spec-kit/reference/agentic-sdd.html).

SDD trata a especificação como referência viva da intenção do produto: mudanças de comportamento precisam refletir-se em documentos, tarefas, testes e código. Não exige fechar o aplicativo inteiro antes de começar; vamos trabalhar em incrementos pequenos. Fonte: [fundamentos do GitHub Spec Kit](https://github.com/github/spec-kit/blob/main/spec-driven.md).

## Roteiro

| Etapa                                              | Objetivo de aprendizado                                     | Artefato esperado                                                                                 | Critério de conclusão                                                               |
| -------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1. Princípios, alimentados pela descoberta inicial | Distinguir objetivos de aprendizado, restrições e qualidade | Princípios curtos do projeto                                                                      | Cristian revisou os princípios e sabemos como conferir seu cumprimento              |
| 2. Especificação                                   | Transformar problema e usuário em comportamento observável  | Especificação com fluxos, requisitos funcionais e não funcionais, escopo e critérios de aceitação | Primeiro incremento compreensível e revisado, com pendências explícitas             |
| 3. Esclarecimento e viabilidade                    | Detectar ambiguidades e testar dependências                 | Respostas incorporadas à especificação e registro de experimentos                                 | Ambiguidades que impedem o plano resolvidas e dependências críticas verificadas     |
| 4. Plano técnico                                   | Escolher tecnologias e responsabilidades por necessidade    | Plano com fluxo de dados, contratos, persistência e estratégia de testes                          | Escolhas justificadas e ligadas aos requisitos, com divisão dos exercícios acordada |
| 5. Tarefas                                         | Dividir trabalho em resultados pequenos e verificáveis      | Lista ordenada com dependências e formas de validação                                             | Cada tarefa tem resultado observável e corresponde ao escopo                        |
| 6. Implementação e validação                       | Construir, testar e revisar incrementalmente                | Código, testes e registro da conferência da interface                                             | Critérios de aceitação conferidos e entrega revisada antes de commit e push         |
| 7. Evolução                                        | Comparar resultado e intenção e incorporar mudanças         | Documentos, decisões e tarefas atualizados                                                        | Lacunas resolvidas ou explicitamente adiadas e próximo incremento delimitado        |

As etapas permitem retorno: um experimento pode revelar uma ambiguidade e exigir revisar a especificação. A pesquisa inicial já fornece evidência de viabilidade, sem encerrar a etapa 3.

## Etapa atual: descoberta que alimentará os princípios

O objetivo imediato é compreender uma situação real de uso. Uma funcionalidade, como um gráfico, só ganha critério de qualidade quando sabemos qual decisão ela precisa ajudar alguém a tomar.

Exercício atual: completar a frase “Quero ajudar [tipo de pessoa] a decidir [decisão concreta] quando [situação em que consulta a previsão].”

Cristian responde primeiro. Depois, a tutoria revisará o que está claro, o que falta e as consequências de ambiguidades. Público, plataforma, período e apresentação serão esclarecidos gradualmente, uma pergunta por vez. Só então consolidaremos os artefatos correspondentes.

## Testes e escolhas técnicas no momento adequado

Critérios de aceitação descrevem o resultado que o usuário deve observar. Testes automatizados verificam exemplos repetíveis desse comportamento. A conferência prática observa o fluxo real, a legibilidade e a interação com a interface; complementa os testes.

TDD pode complementar SDD durante uma tarefa: escrever um teste que falha, implementar o necessário e refatorar com os testes passando. O teste vem de um comportamento especificado; não substitui a descoberta do produto.

React será avaliado pela complexidade da interface e pelo objetivo de aprendizado; TypeScript, pelo benefício de explicitar contratos; C# e backend, por responsabilidades que justifiquem um serviço; banco de dados, por requisitos reais de persistência. Não há compromisso com essas tecnologias.

## Organização proporcional

Se a abordagem manual for escolhida, a proposta é manter princípios do projeto e uma pasta por incremento, com `spec.md`, `plan.md` e `tasks.md`, acrescentando decisões e contratos quando necessários. Esses arquivos ainda não foram gerados. Se adotarmos Spec Kit, usaremos sua estrutura oficial da versão escolhida, sem simular uma instalação manual.
