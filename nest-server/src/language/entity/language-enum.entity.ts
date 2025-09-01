export enum Language {
  CPP = 'C/C++',
  CS = 'C#',
  HTML = 'Html',
  CSS = 'Css',
  PHP = 'Php',
  JS = 'Javascript',
  JAVA = 'Java',
  PYTHON = 'Python',
  DART = 'Dart',
  RUST = 'Rust',
  GO = 'Golang',
  LUA = 'Lua',
  TS = 'Typescript',
  SHELL = 'Shellscript',
  YML = 'Yaml',
  SQL = 'Sql',
}

export function toLanguage(value: string): Language | undefined {
  if (Object.values(Language).includes(value as Language)) {
    return value as Language;
  }
  return undefined;
}
