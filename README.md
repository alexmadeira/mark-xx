<p align="center">
  <img src="./docs/assets/logo-dark.svg#gh-dark-mode-only" alt="Logo dark" width="110" />
  <img src="./docs/assets/logo-light.svg#gh-light-mode-only" alt="Logo light" width="110" />
</p>

<h1 align="center">MARK-XX</h1>

<p align="center">
  Portfólio pessoal focado em performance, arquitetura e experiência.
</p>

<p align="center">
  <a href="https://alexmadeira.com.br"><img src="https://img.shields.io/badge/live-alexmadeira.com.br-5097E4?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Website" /></a>
  <a href="https://github.com/alexmadeira/mark-xx"><img src="https://img.shields.io/badge/source-mark--xx-111827?style=for-the-badge&logo=github&logoColor=white" alt="Source Code" /></a>
  <img src="https://img.shields.io/badge/react-19-149ECA?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/vite-7-7C3AED?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/typescript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5.9" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/tailwindcss-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="TailwindCSS v4" />
  <img src="https://img.shields.io/badge/zustand-state-111827?style=flat-square" alt="Zustand" />
  <img src="https://img.shields.io/badge/react_query-persist-FF4154?style=flat-square&logo=reactquery&logoColor=white" alt="React Query Persist" />
  <img src="https://img.shields.io/badge/prismic-cms-5163BA?style=flat-square&logo=prismic&logoColor=white" alt="Prismic CMS" />
  <img src="https://img.shields.io/badge/pwa-offline--first-22C55E?style=flat-square" alt="PWA Offline First" />
  <img src="https://img.shields.io/badge/phaser-easter%20egg-8B5CF6?style=flat-square" alt="Phaser" />
</p>

---

<p align="center">
  <img src="./docs/assets/hero-readme.png" alt="MARK-XX hero" />
</p>

---

## Sobre

O **MARK-XX** é um portfólio que funciona como laboratório técnico.

A proposta não é apenas expor interface. O projeto foi estruturado para demonstrar:
- arquitetura modular
- performance percebida
- persistência e resiliência de navegação
- sistema visual orientado por tokens
- experimentação controlada com features isoladas

---

## Preview

<p align="center">
  <img src="./docs/assets/preview-placeholder.png" alt="Preview do projeto" />
</p>

---

## Stack

```txt
React 19
Vite 7
TypeScript 5.9
TailwindCSS v4
Zustand
TanStack React Query + Persist
Prismic CMS
Mitt
Phaser
Vite PWA
```

---

## Por que esse projeto é diferente

### 1. Sistema visual orientado por tokens

O projeto utiliza um sistema centralizado de design tokens de `font`, `colors`, `spacing`, `animation` e `breakpoint`, centralizados no `global.css`. A paleta inclui famílias próprias como `mark`, `nextjs`, `web` e `html`, reforçando a ideia de identidade visual por tecnologia.

### 2. Arquitetura em camadas

A estrutura separa UI, serviços, fetchers, builders, mappers, stores e tipagem dedicada. Isso reduz acoplamento, melhora previsibilidade e facilita evolução em escala. A árvore do projeto mostra essa separação com clareza. 

### 3. PWA e cache de runtime

O projeto usa `VitePWA` com estratégias de cache para fontes, GitHub API, Cloudinary e Prismic CDN, reforçando a abordagem offline-first e a redução de round trips. 

### 4. Engenharia orientada a experiência

Mesmo elementos “extras” servem como prova técnica. O projeto possui easter eggs e integração com Phaser, o que transforma features paralelas em um campo de teste para lazy loading, isolamento e eventos globais. A presença do game e do módulo snake aparece diretamente na base do repositório. 

### 5. Identidade própria

O repositório possui um logo SVG próprio em componente React, o que permitiu derivar os assets deste README mantendo coerência visual com a base do projeto. 

---

## Fluxo técnico

```txt
API → Requester → Fetcher → Mapper → Store → UI
```

Essa organização favorece:
- contratos mais previsíveis
- tipagem forte ponta a ponta
- reaproveitamento de integrações
- menor vazamento de responsabilidade na UI

---

## Recursos principais

- **Design tokens centralizados**
- **PWA com cache inteligente**
- **React Query com persistência**
- **Stores por domínio com Zustand**
- **Prismic como fonte de conteúdo**
- **Feature experimental com Phaser**
- **Event-driven communication com `mitt`**
- **Separação clara entre dados, estado e renderização**

---

## Estrutura

```txt
src/
├── app/             # páginas, componentes e providers de UI
├── services/        # regras, builders, controllers, mappers e stores
├── config/          # configuração de requester, UI e partículas
├── game/            # engine e módulos do easter egg Snake
├── @types/          # contratos e tipagens globais
└── styles/          # tokens e CSS global
```

---

## Rodando localmente

```bash
pnpm install
pnpm dev
```

### Outros comandos

```bash
pnpm build
pnpm test
pnpm test:unit
pnpm lint:check
pnpm lint:fix
pnpm type-check
```

Os scripts de build, testes, lint e geração de tipos estão definidos no `package.json`. 

---

## Filosofia

- UI bonita sem consistência técnica não sustenta produto.
- Performance percebida vale mais do que “efeito demo”.
- Arquitetura invisível é parte do valor.
- Portfólio também pode ser ambiente de engenharia.

---

## Assets incluídos neste kit

```txt
docs/assets/
├── hero-readme.svg
├── logo-gradient.svg
└── preview-placeholder.svg
```

---

## Autor

**Alex Madeira**  
Front-end Engineer focado em performance, arquitetura e experiência.

<p>
  <a href="https://www.linkedin.com/in/alex-madeira/">LinkedIn</a> ·
  <a href="https://alexmadeira.com.br">Website</a>
</p>
