import babel from 'rollup-plugin-babel'

export default {
  input: './src/index.js',

  output: {
    file: './dist/type-storage-utils.js',
    format: 'umd',
    name: 'typeStorage'
  },
  
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}