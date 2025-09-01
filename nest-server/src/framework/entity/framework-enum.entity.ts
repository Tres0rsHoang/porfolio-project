import { Language } from 'src/language/entity/language-enum.entity';

export enum Framework {
  Flutter = 'Flutter',
  React = 'ReactJs',
  NextJs = 'NextJs',
  NestJs = 'NestJs',
  Smarty = 'Smarty',
  Vtiger = 'Vtiger',
  ZaloMiniApp = 'Zalo Mini App',
  ZaloApi = 'Zalo Api',
  FacebookApi = 'Facebook Api',
  ExpressJs = 'ExpressJs',
  ReactNative = 'React Native',
  PostgreSql = 'PostgreSql',
  MySql = 'MySql',
  WebSocket = 'WebSocket',
  Firebase = 'Firebase',
  RabbitMQ = 'RabbitMQ',
  BullMQ = 'BullMQ',
  Docker = 'Docker',
  DotNet = '.Net',
  Unity = 'Unity',
  Prisma = 'Prisma',
  JQuery = 'JQuery',
}

export function getLanguages(framework: Framework): Language[] {
  const result: Language[] = [];
  switch (framework) {
    case Framework.Flutter:
      result.push(Language.DART);
      break;
    case Framework.React:
      result.push(Language.JS);
      result.push(Language.TS);
      result.push(Language.HTML);
      result.push(Language.CSS);
      break;
    case Framework.NextJs:
      result.push(Language.JS);
      result.push(Language.TS);
      result.push(Language.HTML);
      result.push(Language.CSS);
      break;
    case Framework.NestJs:
      result.push(Language.JS);
      result.push(Language.TS);
      break;
    case Framework.Smarty:
      result.push(Language.PHP);
      result.push(Language.HTML);
      result.push(Language.CSS);
      break;
    case Framework.Vtiger:
      result.push(Language.PHP);
      break;
    case Framework.ZaloMiniApp:
      result.push(Language.JS);
      result.push(Language.TS);
      break;
    case Framework.ExpressJs:
      result.push(Language.JS);
      result.push(Language.TS);
      break;
    case Framework.ReactNative:
      result.push(Language.JS);
      result.push(Language.TS);
      break;
    case Framework.PostgreSql:
      result.push(Language.SQL);
      break;
    case Framework.MySql:
      result.push(Language.SQL);
      break;
    case Framework.WebSocket:
      result.push(Language.JS);
      result.push(Language.TS);
      break;
    case Framework.Firebase:
      break;
    case Framework.RabbitMQ:
      break;
    case Framework.BullMQ:
      break;
    case Framework.Docker:
      result.push(Language.YML);
      break;
    case Framework.DotNet:
      result.push(Language.CS);
      break;
    case Framework.Unity:
      result.push(Language.CS);
      break;
    case Framework.Prisma:
      result.push(Language.TS);
      result.push(Language.JS);
      break;
    case Framework.JQuery:
      result.push(Language.JS);
      break;
  }
  return result;
}

export function toFramework(value: string): Framework | undefined {
  if (Object.values(Framework).includes(value as Framework)) {
    return value as Framework;
  }
  return undefined;
}
