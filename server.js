const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const fs = require('fs')
process.on('uncaughtException', (err) => {
  fs.appendFileSync('crash.log', new Date().toISOString() + ' Uncaught Exception: ' + err.stack + '\n')
})
process.on('unhandledRejection', (reason, promise) => {
  fs.appendFileSync('crash.log', new Date().toISOString() + ' Unhandled Rejection: ' + reason + '\n')
})
const originalConsoleError = console.error;
console.error = function (...args) {
  fs.appendFileSync('crash.log', new Date().toISOString() + ' console.error: ' + args.join(' ') + '\n');
  originalConsoleError.apply(console, args);
}

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + (process.env.PORT || 3000))
  })
})
