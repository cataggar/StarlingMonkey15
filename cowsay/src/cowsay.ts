import * as ts from 'typescript';

export const cow = {

  tsVersion(): string {
    return ts.version;
  }

};
