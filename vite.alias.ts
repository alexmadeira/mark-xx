import path from 'node:path'

export const alias = {
  '@': path.resolve(__dirname, './src/@types'),
  _APP: path.resolve(__dirname, './src/app'),
  _LAY: path.resolve(__dirname, './src/app/layouts'),
  _PAG: path.resolve(__dirname, './src/app/pages'),
  _STR: path.resolve(__dirname, './src/services/store'),
  _SRV: path.resolve(__dirname, './src/services'),
  _CFG: path.resolve(__dirname, './src/config'),
  _AST: path.resolve(__dirname, './src/_assets_'),
  '~': path.resolve(__dirname, './src'),
}
