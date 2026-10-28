# Identidade visual: Horizonte

<img src="../public/favicon.svg" width="80" height="80" alt="Símbolo Horizonte: sol âmbar e duas linhas curvas claras sobre um círculo azul atlântico." />

Em 27/10/2026, a interface foi redesenhada para aproximar sua identidade do tema meteorológico e melhorar a leitura dos dados. A direção **Horizonte** combina uma janela azul para o tempo atual, uma faixa contínua de previsão e gráficos com cores próprias para temperatura e chuva.

### Problema e decisões

| Antes                                                        | Redesign                                                      | Intenção                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------- | ------------------------------------------------------------ |
| Monograma “W” dentro de um quadrado arredondado              | Símbolo vetorial original com sol e duas linhas de horizonte  | Criar uma marca reconhecível na aba e no cabeçalho           |
| Barra lateral permanente e cartões semelhantes               | Navegação horizontal, painel atual dominante e faixa semanal  | Dar mais espaço à previsão e distinguir níveis de informação |
| Superfícies neutras e verde discreto                         | Azul atlântico, cobalto, céu e âmbar                          | Vincular a identidade ao céu e separar funções visuais       |
| DM Sans/Manrope e rótulos pequenos                           | Barlow para leitura e Barlow Condensed para títulos e números | Aumentar a presença tipográfica com uma hierarquia legível   |
| Chamadas decorativas, letras maiúsculas e metáforas em erros | Textos diretos em sentence case                               | Explicar dados, estados e ações com clareza                  |

### Paleta e tipografia

| Token     | Hex       | Papel                                         |
| --------- | --------- | --------------------------------------------- |
| Atlântico | `#16445C` | Cabeçalho, marca e dia selecionado            |
| Cobalto   | `#2459BE` | Condições atuais, ações e chuva no tema claro |
| Céu       | `#C6E5F1` | Superfícies secundárias e contraste da marca  |
| Âmbar     | `#F5B841` | Sol e indicador da seleção semanal            |
| Gelo      | `#EAF5F9` | Fundo do tema claro                           |
| Tinta     | `#132B3A` | Texto principal                               |

O modo escuro usa fundos azuis profundos e cores de texto ajustadas. Cores funcionais adicionais, como o âmbar escuro da curva de temperatura, são derivadas para preservar contraste sobre superfícies claras. A seleção do dia usa também marcador e estado acessível; quantidade e probabilidade mantêm rótulos e unidades.

A família Barlow, de Jeremy Tribby, oferece larguras relacionadas e uma linguagem de sinalização adequada à leitura de informação. A escolha de Barlow Condensed nos títulos e números dá personalidade ao painel sem recorrer a outra família sem relação. A escala vai de 12–16 px nos detalhes a 27–52 px nos títulos e cerca de 106–110 px na temperatura principal, com ajustes por largura de tela. Textos explicativos têm largura de leitura limitada.

### Marca e ilustração

O [favicon SVG](../public/favicon.svg) é o arquivo canônico da marca; o componente `BrandMark` reutiliza o mesmo recurso no cabeçalho, rodapé e modal. O desenho usa círculo, disco solar e duas curvas abertas, com poucos elementos para manter a silhueta em 16, 32 e 64 pixels. A URL versionada do favicon permite atualizar a identidade na aba.

A ilustração das condições atuais também é SVG próprio. Sol/lua, nuvens e precipitação acompanham a categoria meteorológica. As linhas curvas se inspiram na linguagem dos mapas atmosféricos, mas são composição de marca: não representam pressão medida, trajetórias de vento nem uma escala meteorológica. A informação quantitativa fica nos dados e nos gráficos.

### Fontes e referências de design

- [NOAA — Surface Weather Plots](https://www.noaa.gov/jetstream/wxmaps-max): referência conceitual de síntese visual e organização de informação meteorológica. Os desenhos do projeto são originais.
- [Barlow, projeto de Jeremy Tribby](https://github.com/jpt/barlow): origem e características da família tipográfica. Licenças oficiais de [Barlow](https://github.com/google/fonts/blob/main/ofl/barlow/OFL.txt) e [Barlow Condensed](https://github.com/google/fonts/blob/main/ofl/barlowcondensed/OFL.txt), sob SIL OFL 1.1.
- [W3C — contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) e [contraste não textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html): referências para leitura, controles, indicadores e gráficos. A análise automatizada é complementada por conferência visual, sem alegação de certificação.

Para reproduzir a apresentação, execute o aplicativo e os testes de navegador. Eles geram capturas em `test-results/`, fora do histórico, incluindo estudos do símbolo em fundos claro/escuro. Os fluxos de busca, favoritos, unidades, seleção de dias e persistência foram preservados no redesign.
