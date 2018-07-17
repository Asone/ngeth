const fs = require('fs');
const { spawn } = require('child_process');

const i = 0;
const packages = ['utils', 'provider', 'auth', 'contract'];

// Remove the whole package '@ngeth'
fs.unlink(__dirname + '/@ngeth', (err) => {
  err ? console.error(err) : console.log('@ngeth has been removed');
});

function packagr(package) {
  i++;
  const cmd = spawn('yarn', ['run', `build:libs:${package}`]);
  cmd.on('close', (code) => {
    fs.copyFile(
      __dirname + '/@ngeth/' + package,
      __dirname + '/node_modules/@ngeth/' + package
    );
    packagr(packages[i]);
  });
}

packagr(packages[i]);
