# Remotion Multi-Project Workspace

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

This repo is set up to host multiple Remotion video projects while sharing one root toolchain (`.agents`, `package.json`, TypeScript, ESLint, etc.).

## Workspace Structure

Each project lives under `src/projects/<project-name>/` and exports a `VideoProject` object.

Registered projects are combined in `src/projects/index.ts`, and `src/RemotionRoot.tsx` auto-registers all compositions in Remotion Studio.

Composition IDs follow this pattern:

`<projectId>__<compositionId>`

Examples:

- `spctek__brand-demo`
- `starter__starter-demo`

## Commands

**Install Dependencies**

```console
npm i
```

**Start Preview**

```console
npm run dev
```

**Render video**

```console
npm run render
```

**Render a specific composition**

```console
npm run render -- spctek__brand-demo
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).

## Add a New Project

1. Copy `src/projects/starter` into a new folder: `src/projects/<your-project>`.
2. Replace the starter composition with your own scenes/components.
3. Update the exported project metadata (`id`, `compositions`) in that project's `index.ts`.
4. Import and add the project to the `projects` array in `src/projects/index.ts`.

## Help

We provide help on our [Discord server](https://discord.gg/6VzzNDwUwV).

## Issues

Found an issue with Remotion? [File an issue here](https://github.com/remotion-dev/remotion/issues/new).

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
