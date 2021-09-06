// bash scripts

const { spawn } = require('child_process')

const command = (...args) => {
  return new Promise((res) => {
    const child_process = spawn(...args)
    child_process.stdout.pipe(process.stdout)
    child_process.stderr.pipe(process.stderr)

    child_process.on('close', () => {
      res()
    })

  })
}

module.exports = {
  command
}
