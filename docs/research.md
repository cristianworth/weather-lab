# Pesquisa inicial

Consulta e experimentos em 17/10/2026. Este registro separa documentação, observações e propostas; não é uma especificação aprovada.

## SDD e GitHub Spec Kit

**Documentado:** o fluxo distingue o que construir e por quê (`specify`) de como construir (`plan`). Princípios orientam as etapas; `clarify` resolve ambiguidades; `tasks` decompõe o plano; `analyze` procura inconsistências; `implement` executa; `converge` compara implementação e artefatos. [Referência oficial](https://github.github.com/spec-kit/reference/agentic-sdd.html).

**Recomendação:** começar com Markdown manual para exercitar a elaboração e a revisão, mantendo Spec Kit como referência concreta. A ferramenta automatiza a organização, mas os documentos gerados continuam exigindo julgamento humano. A decisão será revisada com Cristian. [Projeto oficial](https://github.com/github/spec-kit).

**Não executado:** instalação, inicialização ou comandos do Spec Kit. Nomes e estrutura devem ser conferidos novamente na versão selecionada se a ferramenta for adotada.

## Open-Meteo: documentação

### Previsão

`/v1/forecast` recebe coordenadas WGS84. Oferece sete dias por padrão e até 16; isso é capacidade da API, não período escolhido para o produto.

| Necessidade possível | Campos candidatos                              | Unidade e interpretação                                          |
| -------------------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| Temperatura horária  | `temperature_2m`                               | °C por padrão; temperatura do ar a dois metros                   |
| Temperaturas diárias | `temperature_2m_min`, `temperature_2m_max`     | °C; extremos diários                                             |
| Precipitação horária | `precipitation`                                | mm; acumulado da hora anterior, incluindo chuva, pancadas e neve |
| Chuva e pancadas     | `rain`, `showers`                              | mm; componentes separados                                        |
| Acumulados diários   | `precipitation_sum`, `rain_sum`, `showers_sum` | mm; total e componentes                                          |
| Probabilidade        | `precipitation_probability`                    | %; diferente de quantidade                                       |

Para agregações diárias, informar `timezone`. `timezone=auto` resolve o fuso pelas coordenadas. A documentação informa offset fixo na resposta ISO; para atravessar horário de verão com conversão correta, recomenda Unix time e conversão pelo fuso retornado. Precisaremos decidir os limites dos intervalos apresentados nos gráficos. [Documentação de previsão](https://open-meteo.com/en/docs).

### Busca de localidades

`/v1/search` recebe `name`; permite `language=pt`, `count` de até 100 e filtro `countryCode`. Retorna identificador, nome, coordenadas, país, divisões administrativas e fuso; campos vazios podem ser omitidos. Dois caracteres buscam correspondência exata; três ou mais usam prefixo normalizado, ignorando caixa e acentos. Termos vazios ou com um caractere não retornam resultados.

Nomes podem ser ambíguos. A apresentação de estado e país é uma proposta para ajudar na escolha, ainda a validar como requisito. A base de localidades é GeoNames. [Documentação de geocoding](https://open-meteo.com/en/docs/geocoding-api).

### Autenticação, limites e condições

O acesso gratuito é destinado a uso não comercial e dispensa chave; planos comerciais usam endpoints de cliente e `apikey`. A tabela publica 600 chamadas/minuto, 5.000/hora, 10.000/dia e 300.000/mês. Os termos dizem permanecer abaixo dos limites por minuto, hora e dia. Consultas extensas podem contar como múltiplas chamadas. O serviço gratuito não oferece garantia de disponibilidade. [Planos e contagem](https://open-meteo.com/en/pricing), [termos](https://open-meteo.com/en/terms).

Os dados são CC BY 4.0: dar crédito, ligar a licença e indicar alterações. Open-Meteo pede link junto aos dados exibidos; a base geográfica também exige observar a atribuição a GeoNames. A licença dos dados e as condições de acesso à API são questões distintas. [Licença e atribuição](https://open-meteo.com/en/licence).

**Recomendação:** Open-Meteo é o candidato preferido para os experimentos de estudo. **Hipótese a reavaliar:** uma publicação futura de portfólio continuará dentro das condições gratuitas; os termos também mencionam atividades promocionais como comerciais. Reavaliar o uso concreto antes de publicar a aplicação.

### Alternativa consultada

OpenWeather oferece geocoding com até cinco resultados e previsão de cinco dias em intervalos de três horas. Ambos exigem chave `appid`; `units=metric` seleciona temperaturas em Celsius e `rain.3h` representa chuva em mm. Isso acrescenta uma decisão sobre provisionamento e proteção da chave. [Geocoding](https://openweathermap.org/api/geocoding-api), [previsão](https://openweathermap.org/api/forecast5).

Não foram criadas credenciais nem executadas consultas OpenWeather. Limites e condições comerciais dessa alternativa não foram auditados; a comparação é preliminar.

## Open-Meteo: consultas realmente executadas

Quatro requisições GET sem chave, por PowerShell, enviando `Origin: http://localhost:5173`. A origem é apenas um valor de teste; nenhum servidor foi criado. Todas as respostas incluíram `Access-Control-Allow-Origin: *`.

| Consulta                 | Resultado observado                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Busca de Blumenau        | HTTP 200; retornou cidade e aeroporto, ambos em Santa Catarina, BR, fuso `America/Sao_Paulo`; cidade com id `3469968`                                                                |
| Nome sem correspondência | HTTP 200; propriedade `results` ausente, não uma lista vazia explícita                                                                                                               |
| Previsão de dois dias    | HTTP 200; 48 horários e dois dias; séries horárias com comprimentos iguais; unidades °C, mm e %; fuso `America/Sao_Paulo`, offset -10800; de `2026-10-17T00:00` a `2026-10-18T23:00` |
| `count=101`              | HTTP 400; JSON com `error: true` e indicação do intervalo permitido de 1 a 100                                                                                                       |

URLs para reproduzir; a previsão muda com o dia e com as atualizações do fornecedor:

1. [Busca de localidade](https://geocoding-api.open-meteo.com/v1/search?name=Blumenau&count=3&language=pt&format=json&countryCode=BR).
2. [Busca sem correspondência](https://geocoding-api.open-meteo.com/v1/search?name=zzzzweatherlabnomatchzzzz&count=3&language=pt&format=json).
3. [Previsão](https://api.open-meteo.com/v1/forecast?latitude=-26.9194&longitude=-49.0661&hourly=temperature_2m,precipitation,rain,showers,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum&temperature_unit=celsius&precipitation_unit=mm&timezone=auto&forecast_days=2).
4. [Parâmetro inválido](https://geocoding-api.open-meteo.com/v1/search?name=Blumenau&count=101&format=json).

**Limites da evidência:** não testamos integração no navegador, transições de horário de verão, quotas sob carga, precisão meteorológica ou disponibilidade contínua. CORS foi observado nos cabeçalhos, sem teste de interface. Não presumir que toda localidade retorna todos os campos ou todos os modelos têm o mesmo horizonte.
