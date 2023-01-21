const { generateApi } = require('swagger-typescript-api')
const fs = require('fs')
const path = require('path')


// генерируем ts файлы для апишки бекенда

generateApi({
  name: 'stuffyHelperApi.ts',
  url: 'http://194.67.110.244:7777/swagger/v1/swagger.json',
  output: path.resolve(process.cwd(), './src/api/__generated__'),
  httpClientType: 'axios',
}).then(({ files, configuration }) => {
    files.forEach(({ content, name }) => {
      fs.writeFile(path, content)
    })
  }).catch((e) => console.error(e))
