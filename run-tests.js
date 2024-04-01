import fs from 'fs';
import { exec } from 'child_process';

fs.readdir('./test_cases', (err, files) => {
  if (err) throw err;

  const sideFiles = files.filter(file => file.endsWith('.side'));
  const command = `selenium-side-runner -c "browserName=chrome chromeOptions.args=[--headless=new,--disable-gpu]" ${sideFiles.map(file => `./test_cases/${file}`).join(' ')}`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
});