const { execSync } = require('child_process');
const { resolve } = require('path');

const root = resolve(__dirname, '..');
const run = (cmd) => execSync(cmd, { stdio: 'inherit', cwd: root });

// Run a Rollup build to generate JS and styles
run('yarn tsc');
run('yarn run rollup -c');
