'use strict';

const glob = require('glob');
const fs = require('fs');

const filePatcher = (path, search, ignore) => {
  let globOptions = { cwd: path };

  const patch = '/script was here /\n\n'

  const patchFiles = (search, options) => {
    glob(search, options, (err, filenames) => {
        for (const file of filenames) {

          fs.readFile(file, 'utf-8', (err, fileData) => {

            if (fileData && fileData.toString().indexOf(patch) === -1) {
              const newFileData = patch + fileData

              fs.writeFile(file, newFileData, (err) => {

                if (err) console.error(`Error writing to file: ${err}`);

              })
            }
          })
        }
    })
  }

  if (ignore) {
    fs.access(ignore, fs.constants.F_OK, (err) => {

      if (err) {
        console.error(`File ${ignore} does not exist`)
        return
      }

      fs.readFile(ignore, 'utf-8', (err, ignoreData) => {
        const ignoreDataList = ignoreData.toString().trim().split(/\s+/)
        globOptions = { ...globOptions, ignore: ignoreDataList }

        patchFiles(search, globOptions)
      })
    })
  } else {
    patchFiles(search, globOptions)
  }
}

filePatcher('.', '**/*.*')

