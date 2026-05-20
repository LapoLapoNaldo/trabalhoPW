# Orgulho Não-Binário

Site one-page em Next.js, React, TypeScript e Tailwind CSS para celebrar o Mês do Orgulho com foco em acolhimento, representatividade e comunidade Não-Binária.

## Rodar localmente

```bash
npm install
npm run dev
```

Depois abra `http://localhost:3000`.

## Scripts

```bash
npm run build
npm run start
npm run typecheck
```

## Estrutura

```text
app/
components/
styles/
public/
```

Os dados mockados das seções ficam em `components/data.ts`. O mascote é SVG/CSS, as bandeiras são renderizadas por dados, e as animações respeitam `prefers-reduced-motion`.

## Tipografia sugerida

- `Fraunces` para títulos expressivos.
- `Nunito Sans` para textos amigáveis e legíveis.

O projeto usa variáveis CSS com fallback local para não depender de rede no build. Se quiser usar as fontes reais em produção, dá para self-hostar os arquivos em `public/fonts`.
