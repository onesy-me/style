#!/usr/bin/env node
import path from 'path';
import yargs from 'yargs';
import url from 'url';
import fg from 'fast-glob';

import is from '@amaui/utils/is';
import isEnvironment from '@amaui/utils/isEnvironment';
import getEnvironment from '@amaui/utils/getEnvironment';
import Try from '@amaui/utils/Try';
import parse from '@amaui/utils/parse';
import merge from '@amaui/utils/merge';
import { TMethod } from '@amaui/models';

import css from './css';
import { ICSSOptions } from './interfaces';

let values = [];

interface IOptions {
  imports?: Array<string>;
  files?: Array<string>;
  log?: boolean;
  package?: string;
}

class AmauiCli {
  public options_: IOptions = {};
  public fileSource: string;

  public get options(): IOptions {
    return this.options_;
  }

  public set options(options) {
    const options_ = options || {};

    if (isEnvironment('nodejs')) {
      const wd = process.cwd();

      if (options_.package && !path.isAbsolute(options_.package)) options_.package = path.resolve(options_.package);

      const packagePath = options_.package || 'package.json';

      const pkg = Try(() => require(path.resolve(wd, packagePath))) || {};
      const amauiStyleOptions = Try(() => require(path.resolve(wd, 'amaui-style.options.js'))) || {};

      if (amauiStyleOptions?.files?.length) this.fileSource = wd;
      else if (pkg['amaui-style']?.files?.length) this.fileSource = path.resolve(packagePath, '../');
      else this.fileSource = wd;

      // amaui-style.options.js priority over package.json 'amaui-style'
      const fileOptions = merge(amauiStyleOptions, pkg['amaui-style'], { merge: { array: true } });

      // amaui options priority over file options values
      this.options_ = merge(options_, fileOptions, { copy: true, merge: { array: true } });
    }
  }

  public async run(argv: any) {
    const { _, imports, log, files: files_, package: package_ } = argv;

    // Reset
    values = [];

    // Options
    // 1 argument as files
    let files = files_ || [(_.length ? parse(_[0]) : '')].filter(Boolean);

    files = is('array', files) ? files : [files];

    const optionsCli = {};

    if (imports !== undefined) optionsCli['imports'] = imports;

    if (!!files.length) optionsCli['files'] = files;

    if (log !== undefined) optionsCli['log'] = log;

    if (package_ !== undefined) optionsCli['package'] = package_;

    this.options = optionsCli;

    // Init
    await this.init();

    // Make
    await this.make();

    if (process.send) process.send('done');

    // On user cmdline cancel exit the process
    process.on('SIGINT', async () => {
      process.exit(1);
    });

    // Exit the process
    process.exit(0);
  }

  public async init() {
    // Imports
    await this.imports();

    // Import all the files to setup the mainAmauiGroup
    await this.initNode();

    if (this.options.log) console.log('\nAmaui style\n');
  }

  public async make() {
    if (this.options.log) console.log();

    if (values.length) {
      if (this.options.log) console.log(`Making ${values.length} css files\n`);

      for (const value of values) {
        const style = css(value.value, value.options);

        // Make
        await style.make();
      }
    }
    else if (this.options.log) console.log('0 css methods found');

    if (this.options.log) console.log();
  }

  public async imports() {
    if (isEnvironment('nodejs') && this.options.imports) {
      const values_ = is('string', this.options.imports) ? [this.options.imports] : this.options.imports;

      for (const value of values_) {
        await this.importFile(value as string);
      }
    }
  }

  public async initNode() {
    // Setup for nodejs mostly by importing all the regexp files from options
    if (isEnvironment('nodejs')) {
      let filePaths = [];

      // Import all test files
      if (is('string', this.options.files)) filePaths.push(this.options.files);
      else if (is('array', this.options.files)) filePaths.push(...this.options.files);

      filePaths = filePaths.filter(Boolean).map(item => path.isAbsolute(item) ? item : path.join(this.fileSource, item));

      await this.import(filePaths);
    }
  }

  public async import(files: string[]) {
    if (!!files?.length) {
      const filesPaths = (await fg(files, { onlyFiles: true }))
        .map(filePath => path.resolve(filePath));

      for (const file of filesPaths) {
        // Prepare the environment
        this.prepareEnvironment();

        await this.importFile(file);
      }
    }
  }

  private async importFile(file: string) {
    // Import a file or an import error
    try {
      require(file);
    }
    catch (error) {
      try {
        return path.isAbsolute(file) ? await import(url.pathToFileURL(file) as any) : import(file);
      }
      catch (error) {
        throw error;
      }
    }
  }

  public prepareEnvironment(): void {
    // Window or Node
    const env: any = getEnvironment();

    env.css = (value: TMethod | Record<string, any>, options: ICSSOptions) => {
      values.push({ value, options });
    };
  }
}

const run = async (argv: any) => {
  const amauiStyleCli = new AmauiCli();

  await amauiStyleCli.run(argv);
};

yargs
  .command({
    command: '$0',
    description: 'Amaui style css maker',
    builder: (command => command
      .options('imports', { type: 'array' })
      .options('files', { type: 'array' })
      .options('log', { type: 'boolean' })
      .options('package', { type: 'string' })
    ) as yargs.CommandBuilder,
    handler: run,
  } as any)
  .help()
  .version(false)
  .parse();
