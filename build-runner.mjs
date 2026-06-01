#!/usr/bin/env node
import { build } from 'esbuild'
import { existsSync, readFileSync } from 'fs'
import { createRequire } from 'module'
import { resolve as resolvePath } from 'path'

const manifest = JSON.parse(readFileSync('./manifest.json', 'utf8'))
const pluginId = manifest.id
const entry = './src/runner.ts'

if (!existsSync(entry)) {
  console.log('No runner.ts — skipping')
  process.exit(0)
}

const _require = createRequire(import.meta.url)

// esbuild's Go binary walks up the filesystem from cwd and may find a stray
// .pnp.cjs in a parent directory (e.g. the user's home dir), which then blocks
// resolution of deps that ARE installed in this package's node_modules.
// This plugin resolves bundled deps explicitly, bypassing PnP.
const pnpBypass = {
  name: 'pnp-bypass',
  setup(build) {
    build.onResolve({ filter: /^@faker-js\/faker/ }, (args) => ({
      path: _require.resolve('@faker-js/faker', { paths: [resolvePath(args.resolveDir)] }),
    }))
  },
}

await build({
  entryPoints: [entry],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: `dist/${pluginId}-runner.js`,
  plugins: [pnpBypass],
  external: [
    'node:*','fs','path','os','http','https','net','crypto',
    'child_process','worker_threads','stream','events','util',
    'url','buffer','readline','tty','assert','zlib',
    '@voiden/executors','@voiden/sdk','electron',
  ],
  minify: true,
})
console.log(`Built dist/${pluginId}-runner.js`)
