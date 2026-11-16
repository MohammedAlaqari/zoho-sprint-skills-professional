import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const configPath = path.join(projectRoot, 'docu', 'mcp_sprint_config.json');
const server = JSON.parse(fs.readFileSync(configPath, 'utf8')).mcpServers?.ZohoMCP;
if (server?.command !== 'npx' || !Array.isArray(server.args) || server.args[0] !== 'mcp-remote') {
  throw new Error('ZohoMCP must launch mcp-remote through npx.');
}

const npmCli = path.join(path.dirname(process.execPath), 'node_modules', 'npm', 'bin', 'npx-cli.js');
const child = spawn(process.execPath, [npmCli, '--yes', ...server.args, '--device-code'], {
  cwd: projectRoot,
  stdio: 'inherit',
  windowsHide: true,
});
child.on('error', (error) => {
  process.stderr.write(`Could not start ZohoMCP: ${error.message}\n`);
  process.exitCode = 1;
});
child.on('exit', (code) => { process.exitCode = code ?? 1; });
