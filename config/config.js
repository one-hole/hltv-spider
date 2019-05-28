import YAML from 'yamljs';
import fs from 'fs';

export let Config = {
  Redis: YAML.parse(fs.readFileSync("config/config.yml").toString())[process.env.NODE_ENV]['Redis']
}