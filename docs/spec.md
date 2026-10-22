# Weather Lab — painel de previsão

Atualizado em 22/10/2026. Versão inicial da aplicação: 0.1.0.

## Decisões de Cristian

- O produto é um aplicativo geral de previsão do tempo. Deslocamento e vestuário são exemplos de uso, não uma restrição de público ou de funcionalidades.
- A IA implementa o projeto e consulta Cristian somente sobre diferenças relevantes da experiência, apresentando quatro opções e sua recomendação.
- Experiência escolhida: painel completo com condições atuais, próximos dias e gráficos horários de temperatura e chuva.

## Escopo implementado por decisão técnica

Interface web em português, responsiva, com busca global de localidades e seleção explícita de resultados homônimos. A cidade inicial é São Paulo. A localização do dispositivo só é solicitada por ação do usuário; caso não seja permitida, a busca continua disponível.

O painel exibe condições atuais e sete dias de previsão. A seleção de um dia atualiza o gráfico, a tabela, os horários do sol e o resumo horário. O gráfico alterna temperatura e quantidade de chuva. Favoritos, unidade de temperatura e tema ficam salvos neste navegador.

Sem cadastro, recomendações automáticas de transporte/roupa, mapas, comparação simultânea de cidades ou sincronização de favoritos entre dispositivos nesta entrega. Essas possibilidades podem ser avaliadas como novos incrementos.

## Critérios de aceitação

1. Ao abrir o painel, o visitante vê uma localidade inicial identificada e dados reais, ou um carregamento seguido de erro compreensível com nova tentativa; nunca recebe uma previsão inventada.
2. Ao buscar uma cidade, recebe opções com região e país. Pode selecionar com mouse, toque ou teclado. Uma busca vazia, sem resultados ou com falha tem tratamento próprio.
3. Ao trocar rapidamente de cidade, uma resposta antiga não pode substituir os dados da cidade mais recente.
4. Ao selecionar um dos sete dias, o gráfico e os detalhes correspondem à data e ao fuso da localidade, independentemente do fuso do dispositivo.
5. Temperatura pode ser exibida em °C ou °F. Conversões não alteram os dados originais nem exigem nova chamada à API.
6. Quantidade de chuva e probabilidade têm unidades distintas. Chuva representa chuva mais pancadas; probabilidade se refere à precipitação, incluindo neve. O acumulado horário corresponde ao intervalo anterior ao horário exibido.
7. Valores indisponíveis aparecem como “—”; zero continua sendo zero. Séries incompletas são rejeitadas em vez de desalinhadas silenciosamente.
8. Favoritos podem ser incluídos, abertos e removidos; até 20 localidades. A cidade escolhida e as preferências persistem após recarregar. Armazenamento inválido ou indisponível não impede a navegação.
9. O painel funciona em desktop e celular sem rolagem horizontal na página. Listas horizontais ficam contidas e podem ser navegadas. Controles têm nomes acessíveis, foco visível e gráficos oferecem uma tabela alternativa.
10. Créditos e licença ficam visíveis. O visitante pode consultar a explicação das medidas e do uso de coordenadas. Publicação e condições de uso comercial devem ser reavaliadas antes de hospedar a aplicação.

## Validação

Testes de domínio e componentes verificam os contratos e os fluxos. Testes no Edge verificam dados reais, busca por teclado, persistência, seleção de dias, modos claro/escuro, responsividade, falha e recuperação. A auditoria axe complementa a conferência visual; não substitui uma avaliação completa com tecnologias assistivas.
