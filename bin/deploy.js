#! /usr/bin/env node
const shell = require('shelljs')

const env = process.env.NODE_ENV
if (!['prod', 'uat'].includes(env)) {
  throw new Error('Invalid environment.')
}

const user = 'carlos'
const domain = 'cibermusic.live'
const ssh = `${user}@${domain}`
const folder = 'dist'
const remotePath = `${domain}/${env}/web`

const local = [
  `npm run build`,
  `zip -r ${folder} ${folder}`,
  `scp ${folder}.zip ${user}@${domain}:${remotePath}`,
  `rm ${folder}.zip`
].join(' && ')

const remote = [
  `cd ${remotePath}`,
  `rm -rf ${folder}`,
  `unzip ${folder}.zip`,
  `rm ${folder}.zip`,
  `chmod -R 755 .`
].join(' && ')

const steps = [local, `ssh ${ssh} "${remote}"`].join(' && ')

shell.exec(steps)
