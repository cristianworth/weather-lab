# Privacidade e serviços externos

Este documento descreve o código da versão 0.1.0. Uma instância hospedada pode acrescentar registros e políticas da própria hospedagem; esses comportamentos não são definidos pelo frontend deste repositório.

## Armazenamento no navegador

| Chave de `localStorage` | Conteúdo                                        |
| ----------------------- | ----------------------------------------------- |
| `weather-lab.location`  | Localidade escolhida, incluindo coordenadas     |
| `weather-lab.favorites` | Até 20 localidades favoritas e suas coordenadas |
| `weather-lab.unit`      | Celsius ou Fahrenheit                           |
| `weather-lab.theme`     | Tema claro ou escuro                            |

Os dados pertencem à origem do site e não são sincronizados. Permanecem até serem substituídos ou removidos pelo usuário ou navegador. O código valida o conteúdo e continua funcionando se o armazenamento estiver indisponível; nesse caso, preferências podem durar apenas enquanto a aplicação estiver aberta.

Para remover os dados, limpe o armazenamento do site nas configurações ou ferramentas de desenvolvimento do navegador. Isso remove também favoritos e preferências. O aplicativo não grava a previsão recebida no `localStorage`.

## Requisições externas

- **Busca:** o texto digitado, a partir de dois caracteres e após a espera de busca, é enviado a `geocoding-api.open-meteo.com`. A base geográfica usada pelo fornecedor é GeoNames.
- **Previsão:** coordenadas da localidade escolhida são enviadas a `api.open-meteo.com`, junto com variáveis, período, unidades e fuso.
- **Minha localização:** o navegador é consultado somente ao acionar esse controle. A posição retornada é usada e persistida como uma localidade; as coordenadas são enviadas ao fornecedor da previsão. Não há acompanhamento contínuo nem busca reversa do nome da cidade.
- **Fontes:** DM Sans e Manrope são solicitadas ao Google Fonts, podendo envolver `fonts.googleapis.com` e `fonts.gstatic.com`. Há fallback para fontes locais.

Os serviços externos recebem os metadados de rede e HTTP transmitidos pelo navegador, incluindo o endereço IP. Seus termos e políticas se aplicam a esse processamento. Consulte os [termos e privacidade da Open-Meteo](https://open-meteo.com/en/terms) e a [política do Google](https://policies.google.com/privacy).

## Limites atuais

O código não implementa login, cookies próprios, analytics, publicidade, envio de favoritos a um backend do projeto ou coleta de histórico de navegação. Isso não representa promessa de anonimato perante hospedagem ou provedores externos.

Use a busca por nome se não quiser fornecer a posição do dispositivo. Evite incluir coordenadas exatas em issues, capturas ou logs públicos. Falhas de segurança seguem [SECURITY.md](../SECURITY.md).
