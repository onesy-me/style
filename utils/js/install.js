const fse = require('fs-extra');
const path = require('path');

// Add amaui-style entire build folder to @types so global types are automatically used by Typescript
fse.copy(process.cwd(), path.resolve('../../@types/amaui-style'));
