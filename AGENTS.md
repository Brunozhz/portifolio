# Regras de trabalho do portfólio

Estas regras valem para qualquer agente ou pessoa que alterar este repositório.

## Fluxo obrigatório

1. Toda correção, melhoria ou funcionalidade começa em uma Issue do GitHub.
2. O trabalho deve acontecer em uma branch própria. Não desenvolver diretamente na `main`.
3. Toda alteração entra por Pull Request.
4. A descrição da Pull Request deve mencionar a Issue com `Closes #numero` ou `Refs #numero`.
5. Antes do merge, executar `npm run quality`. Para mudanças de interação ou navegação, executar também `npm run test:e2e`.
6. O deploy acontece somente depois do merge da Pull Request aprovada.

## Direção do portfólio

- O site apresenta a história de Bruno, o que ele desenvolve, suas habilidades e as tecnologias usadas no dia a dia.
- Não transformar o conteúdo em página de serviços ou limitar a atuação a sistemas de vendas.
- Não mencionar VFX, FRISAJO ou o nome da empresa atual.
- Manter as cinco versões: inglês, francês do Québec, português, italiano e alemão suíço.
- Klumify é um projeto próprio em desenvolvimento. Mostrar apenas o contexto já autorizado e manter detalhes internos reservados.
- Toda afirmação precisa ser sustentada pelo conteúdo fornecido por Bruno ou por evidência verificável no repositório.

## Interface e movimento

- Usar movimento para orientar, dar feedback ou preservar continuidade. Não animar tudo por decoração.
- Para este portfólio, priorizar acabamento sutil e profissional. Entradas podem usar opacidade e pequeno deslocamento; saídas devem ser mais discretas.
- Respeitar `prefers-reduced-motion` em toda animação.
- Animar apenas propriedades de composição, como `transform`, `opacity`, `filter` e `clip-path`.
- Conteúdo abaixo da primeira dobra pode usar lazy loading com skeleton estável, sem causar mudança de layout.
- Não usar imagens genéricas de servidores, robôs, cérebros ou circuitos para representar trabalhos que não envolvem esses elementos.

## Qualidade

- `npm run lint`: qualidade e formatação com Biome.
- `npm run check:architecture`: contratos simples entre camadas do projeto.
- `npm run test`: testes unitários e de integração com Vitest.
- `npm run test:e2e`: fluxos principais com Playwright.
- `npm run test:mutation`: verificação periódica da força dos testes com Stryker.
- `npm run check:unused`: dependências e arquivos não utilizados com Knip.
- Commits seguem Conventional Commits e podem ser verificados com `npm run check:commits`.

## Observabilidade

- Erros de interface são capturados pelo error boundary do Next.js.
- Web Vitals são expostos pelo evento `portfolio:web-vital`.
- Quando `NEXT_PUBLIC_OBSERVABILITY_ENDPOINT` estiver configurado, as métricas são enviadas com `sendBeacon`.
- Não adicionar vários fornecedores de observabilidade ao mesmo tempo. Sentry, Datadog, New Relic ou OpenTelemetry só devem ser integrados quando houver uma conta e um destino definidos.
