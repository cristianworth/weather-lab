# Avisos de terceiros

A licença MIT em `LICENSE` cobre o código original e a documentação do Weather Lab. Dependências, fontes e dados conservam seus avisos e condições próprios. Este arquivo reúne os avisos das dependências diretas de execução instaladas na preparação da versão 0.1.0; as versões exatas estão no `package-lock.json`.

Ao atualizar dependências de execução, confira os respectivos arquivos de licença e atualize estes avisos. Ferramentas de desenvolvimento e dependências transitivas mantêm suas licenças nos pacotes distribuídos; esta relação não é um inventário completo de todo o ecossistema de desenvolvimento.

## React e React DOM

[React e React DOM](https://github.com/facebook/react) são distribuídos sob MIT. Os dois pacotes instalados trazem o mesmo aviso, reproduzido abaixo.

```text
MIT License

Copyright (c) Meta Platforms, Inc. and affiliates.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Lucide React

[Lucide](https://github.com/lucide-icons/lucide) é distribuído sob ISC, com aviso MIT para os ícones derivados de Feather identificados na licença do pacote. O texto instalado está reproduzido integralmente abaixo.

```text
ISC License

Copyright (c) 2026 Lucide Icons and Contributors

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

---

The following Lucide icons are derived from the Feather project:

airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out

The MIT License (MIT) (for the icons listed above)

Copyright (c) 2013-present Cole Bemis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Fontes

DM Sans e Manrope são carregadas pelo Google Fonts, sem arquivos de fonte incorporados ao repositório. As famílias usam SIL Open Font License 1.1; consulte os avisos oficiais de [DM Sans](https://github.com/google/fonts/blob/main/ofl/dmsans/OFL.txt) e [Manrope](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt). Se passar a distribuir as fontes localmente, preserve os avisos aplicáveis junto aos arquivos.

## Dados e serviço meteorológico

Dados por [Open-Meteo](https://open-meteo.com/) e localidades baseadas no [GeoNames](https://www.geonames.org/). A Open-Meteo oferece seus dados sob [CC BY 4.0](https://open-meteo.com/en/licence), com crédito e link à licença, e exige link junto à apresentação dos dados. O acesso ao serviço gratuito segue separadamente seus [termos de uso não comercial](https://open-meteo.com/en/terms).

A licença MIT do Weather Lab não concede permissão para ignorar esses termos. Código e documentação podem ser reutilizados conforme MIT; uma implantação precisa respeitar as condições dos serviços e dados que utilizar. A interface já inclui os créditos; preserve-os nas adaptações.
