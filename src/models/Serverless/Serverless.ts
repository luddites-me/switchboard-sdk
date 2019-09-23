// To parse this data:
//
//   import { Convert, Serverless } from "./file";
//
//   const serverless = Convert.toServerless(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Serverless {
  service: string;
  custom: Custom;
  provider: Provider;
  package: Package;
  functions: Functions;
  RetryDefault: RetryDefault;
  stepFunctions: StepFunctions;
  plugins: string[];
}

export interface RetryDefault {
  Retry: Retry[];
}

export interface Retry {
  ErrorEquals: ErrorEqual[];
  IntervalSeconds: number;
  MaxAttempts: number;
  BackoffRate: number;
}

export enum ErrorEqual {
  StatesALL = "States.ALL",
}

export interface Custom {
  integrationName: string;
}

export interface Functions {
  onInstallEvent: Function;
  updateCustVerifyStatusEvent: Function;
  updateEQ8ScoreEvent: Function;
  updateOrderRiskEvent: Function;
  updateOrderStatusEvent: Function;
  uninstallAction: Function;
  createOrderAction: Function;
  updateMerchantAction: Function;
  updateOrderStatusAction: Function;
}

export interface Function {
  name: string;
  handler: string;
}

export interface Package {
  exclude: string[];
  include: string[];
}

export interface Provider {
  name: string;
  runtime: string;
  stage: string;
  region: string;
  timeout: number;
  iamRoleStatements: IamRoleStatement[];
}

export interface IamRoleStatement {
  Effect: string;
  Action: string;
  Resource: string;
}

export interface StepFunctions {
  stateMachines: StateMachines;
}

export interface StateMachines {
  onInstallEvent: OnInstallEvent;
  updateCustVerifyStatusEvent: UpdateCustVerifyStatusEvent;
  updateEQ8ScoreEvent: UpdateEQ8ScoreEvent;
  updateOrderRiskEvent: UpdateOrderRiskEvent;
  updateOrderStatusEvent: UpdateOrderStatusEvent;
  uninstallAction: UninstallAction;
  createOrderAction: CreateOrderActionClass;
  updateMerchantAction: UpdateMerchantAction;
  updateOrderStatusAction: UpdateOrderStatusAction;
}

export interface CreateOrderActionClass {
  name: string;
  definition: CreateOrderActionDefinition;
}

export interface CreateOrderActionDefinition {
  StartAt: string;
  States: CreateOrderActionStates;
}

export interface CreateOrderActionStates {
  createOrderActionStart: Start;
}

export interface Start {
  Type: string;
  Resource: string;
  Retry: Retry[];
  End: boolean;
}

export interface OnInstallEvent {
  name: string;
  definition: OnInstallEventDefinition;
}

export interface OnInstallEventDefinition {
  StartAt: string;
  States: OnInstallEventDefinitionStates;
}

export interface OnInstallEventDefinitionStates {
  onInstallEventStart: Start;
}

export interface UninstallAction {
  name: string;
  definition: UninstallActionDefinition;
}

export interface UninstallActionDefinition {
  StartAt: string;
  States: UninstallActionDefinitionStates;
}

export interface UninstallActionDefinitionStates {
  uninstallActionStart: Start;
}

export interface UpdateCustVerifyStatusEvent {
  name: string;
  definition: UpdateCustVerifyStatusEventDefinition;
}

export interface UpdateCustVerifyStatusEventDefinition {
  StartAt: string;
  States: UpdateCustVerifyStatusEventDefinitionStates;
}

export interface UpdateCustVerifyStatusEventDefinitionStates {
  updateCustVerifyStatusEventStart: Start;
}

export interface UpdateEQ8ScoreEvent {
  name: string;
  definition: UpdateEQ8ScoreEventDefinition;
}

export interface UpdateEQ8ScoreEventDefinition {
  StartAt: string;
  States: UpdateEQ8ScoreEventDefinition;
}

export interface UpdateEQ8ScoreEventDefinition {
  updateEQ8ScoreEventStart: Start;
}

export interface UpdateMerchantAction {
  name: string;
  definition: UpdateMerchantActionDefinition;
}

export interface UpdateMerchantActionDefinition {
  StartAt: string;
  States: UpdateMerchantActionDefinition;
}

export interface UpdateMerchantActionDefinition {
  updateMerchantActionStart: Start;
}

export interface UpdateOrderRiskEvent {
  name: string;
  definition: UpdateOrderRiskEventDefinition;
}

export interface UpdateOrderRiskEventDefinition {
  StartAt: string;
  States: UpdateOrderRiskEventDefinition;
}

export interface UpdateOrderRiskEventDefinition {
  updateOrderRiskEventStart: Start;
}

export interface UpdateOrderStatusAction {
  name: string;
  definition: UpdateOrderStatusActionDefinition;
}

export interface UpdateOrderStatusActionDefinition {
  StartAt: string;
  States: UpdateOrderStatusActionDefinition;
}

export interface UpdateOrderStatusActionDefinition {
  updateOrderStatusActionStart: Start;
}

export interface UpdateOrderStatusEvent {
  name: string;
  definition: UpdateOrderStatusEventDefinition;
}

export interface UpdateOrderStatusEventDefinition {
  StartAt: string;
  States: UpdateOrderStatusEventDefinition;
}

export interface UpdateOrderStatusEventDefinition {
  updateOrderStatusEventStart: Start;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toServerless(json: string): Serverless {
    return cast(JSON.parse(json), r("Serverless"));
  }

  public static serverlessToJson(value: Serverless): string {
    return JSON.stringify(uncast(value, r("Serverless")), null, 2);
  }

  public static toRetryDefault(json: string): RetryDefault {
    return cast(JSON.parse(json), r("RetryDefault"));
  }

  public static retryDefaultToJson(value: RetryDefault): string {
    return JSON.stringify(uncast(value, r("RetryDefault")), null, 2);
  }

  public static toRetry(json: string): Retry {
    return cast(JSON.parse(json), r("Retry"));
  }

  public static retryToJson(value: Retry): string {
    return JSON.stringify(uncast(value, r("Retry")), null, 2);
  }

  public static toCustom(json: string): Custom {
    return cast(JSON.parse(json), r("Custom"));
  }

  public static customToJson(value: Custom): string {
    return JSON.stringify(uncast(value, r("Custom")), null, 2);
  }

  public static toFunctions(json: string): Functions {
    return cast(JSON.parse(json), r("Functions"));
  }

  public static functionsToJson(value: Functions): string {
    return JSON.stringify(uncast(value, r("Functions")), null, 2);
  }

  public static toCreateOrderAction(json: string): Function {
    return cast(JSON.parse(json), r("CreateOrderAction"));
  }

  public static createOrderActionToJson(value: Function): string {
    return JSON.stringify(uncast(value, r("CreateOrderAction")), null, 2);
  }

  public static toPackage(json: string): Package {
    return cast(JSON.parse(json), r("Package"));
  }

  public static packageToJson(value: Package): string {
    return JSON.stringify(uncast(value, r("Package")), null, 2);
  }

  public static toProvider(json: string): Provider {
    return cast(JSON.parse(json), r("Provider"));
  }

  public static providerToJson(value: Provider): string {
    return JSON.stringify(uncast(value, r("Provider")), null, 2);
  }

  public static toIamRoleStatement(json: string): IamRoleStatement {
    return cast(JSON.parse(json), r("IamRoleStatement"));
  }

  public static iamRoleStatementToJson(value: IamRoleStatement): string {
    return JSON.stringify(uncast(value, r("IamRoleStatement")), null, 2);
  }

  public static toStepFunctions(json: string): StepFunctions {
    return cast(JSON.parse(json), r("StepFunctions"));
  }

  public static stepFunctionsToJson(value: StepFunctions): string {
    return JSON.stringify(uncast(value, r("StepFunctions")), null, 2);
  }

  public static toStateMachines(json: string): StateMachines {
    return cast(JSON.parse(json), r("StateMachines"));
  }

  public static stateMachinesToJson(value: StateMachines): string {
    return JSON.stringify(uncast(value, r("StateMachines")), null, 2);
  }

  public static toCreateOrderActionClass(json: string): CreateOrderActionClass {
    return cast(JSON.parse(json), r("CreateOrderActionClass"));
  }

  public static createOrderActionClassToJson(value: CreateOrderActionClass): string {
    return JSON.stringify(uncast(value, r("CreateOrderActionClass")), null, 2);
  }

  public static toCreateOrderActionDefinition(json: string): CreateOrderActionDefinition {
    return cast(JSON.parse(json), r("CreateOrderActionDefinition"));
  }

  public static createOrderActionDefinitionToJson(value: CreateOrderActionDefinition): string {
    return JSON.stringify(uncast(value, r("CreateOrderActionDefinition")), null, 2);
  }

  public static toCreateOrderActionStates(json: string): CreateOrderActionStates {
    return cast(JSON.parse(json), r("CreateOrderActionStates"));
  }

  public static createOrderActionStatesToJson(value: CreateOrderActionStates): string {
    return JSON.stringify(uncast(value, r("CreateOrderActionStates")), null, 2);
  }

  public static toStart(json: string): Start {
    return cast(JSON.parse(json), r("Start"));
  }

  public static startToJson(value: Start): string {
    return JSON.stringify(uncast(value, r("Start")), null, 2);
  }

  public static toOnInstallEvent(json: string): OnInstallEvent {
    return cast(JSON.parse(json), r("OnInstallEvent"));
  }

  public static onInstallEventToJson(value: OnInstallEvent): string {
    return JSON.stringify(uncast(value, r("OnInstallEvent")), null, 2);
  }

  public static toOnInstallEventDefinition(json: string): OnInstallEventDefinition {
    return cast(JSON.parse(json), r("OnInstallEventDefinition"));
  }

  public static onInstallEventDefinitionToJson(value: OnInstallEventDefinition): string {
    return JSON.stringify(uncast(value, r("OnInstallEventDefinition")), null, 2);
  }

  public static toOnInstallEventDefinitionStates(json: string): OnInstallEventDefinitionStates {
    return cast(JSON.parse(json), r("OnInstallEventDefinitionStates"));
  }

  public static fluffyStatesToJson(value: OnInstallEventDefinitionStates): string {
    return JSON.stringify(uncast(value, r("OnInstallEventDefinitionStates")), null, 2);
  }

  public static toUninstallAction(json: string): UninstallAction {
    return cast(JSON.parse(json), r("UninstallAction"));
  }

  public static uninstallActionToJson(value: UninstallAction): string {
    return JSON.stringify(uncast(value, r("UninstallAction")), null, 2);
  }

  public static toUninstallActionDefinition(json: string): UninstallActionDefinition {
    return cast(JSON.parse(json), r("UninstallActionDefinition"));
  }

  public static uninstallActionDefinitionToJson(value: UninstallActionDefinition): string {
    return JSON.stringify(uncast(value, r("UninstallActionDefinition")), null, 2);
  }

  public static toUninstallActionDefinitionStates(json: string): UninstallActionDefinitionStates {
    return cast(JSON.parse(json), r("UninstallActionDefinitionStates"));
  }

  public static uninstallActionDefinitionStatesToJson(value: UninstallActionDefinitionStates): string {
    return JSON.stringify(uncast(value, r("UninstallActionDefinitionStates")), null, 2);
  }

  public static toUpdateCustVerifyStatusEvent(json: string): UpdateCustVerifyStatusEvent {
    return cast(JSON.parse(json), r("UpdateCustVerifyStatusEvent"));
  }

  public static updateCustVerifyStatusEventToJson(value: UpdateCustVerifyStatusEvent): string {
    return JSON.stringify(uncast(value, r("UpdateCustVerifyStatusEvent")), null, 2);
  }

  public static toUpdateCustVerifyStatusEventDefinition(json: string): UpdateCustVerifyStatusEventDefinition {
    return cast(JSON.parse(json), r("UpdateCustVerifyStatusEventDefinition"));
  }

  public static updateCustVerifyStatusEventDefinitionToJson(value: UpdateCustVerifyStatusEventDefinition): string {
    return JSON.stringify(uncast(value, r("UpdateCustVerifyStatusEventDefinition")), null, 2);
  }

  public static toUpdateCustVerifyStatusEventDefinitionStates(json: string): UpdateCustVerifyStatusEventDefinitionStates {
    return cast(JSON.parse(json), r("UpdateCustVerifyStatusEventDefinitionStates"));
  }

  public static updateCustVerifyStatusEventDefinitionStatesToJson(value: UpdateCustVerifyStatusEventDefinitionStates): string {
    return JSON.stringify(uncast(value, r("UpdateCustVerifyStatusEventDefinitionStates")), null, 2);
  }

  public static toUpdateEQ8ScoreEvent(json: string): UpdateEQ8ScoreEvent {
    return cast(JSON.parse(json), r("UpdateEQ8ScoreEvent"));
  }

  public static updateEQ8ScoreEventToJson(value: UpdateEQ8ScoreEvent): string {
    return JSON.stringify(uncast(value, r("UpdateEQ8ScoreEvent")), null, 2);
  }

  public static toUpdateEQ8ScoreEventDefinition(json: string): UpdateEQ8ScoreEventDefinition {
    return cast(JSON.parse(json), r("UpdateEQ8ScoreEventDefinition"));
  }

  public static updateEQ8ScoreEventDefinitionToJson(value: UpdateEQ8ScoreEventDefinition): string {
    return JSON.stringify(uncast(value, r("UpdateEQ8ScoreEventDefinition")), null, 2);
  }

  public static toUpdateEQ8ScoreEventDefinitionStates(json: string): UpdateEQ8ScoreEventDefinition {
    return cast(JSON.parse(json), r("UpdateEQ8ScoreEventDefinitionStates"));
  }

  public static updateEQ8ScoreEventDefinitionStatesToJson(value: UpdateEQ8ScoreEventDefinition): string {
    return JSON.stringify(uncast(value, r("UpdateEQ8ScoreEventDefinitionStates")), null, 2);
  }

  public static toUpdateMerchantAction(json: string): UpdateMerchantAction {
    return cast(JSON.parse(json), r("UpdateMerchantAction"));
  }

  public static updateMerchantActionToJson(value: UpdateMerchantAction): string {
    return JSON.stringify(uncast(value, r("UpdateMerchantAction")), null, 2);
  }

  public static toUpdateMerchantActionDefinition(json: string): UpdateMerchantActionDefinition {
    return cast(JSON.parse(json), r("UpdateMerchantActionDefinition"));
  }

  public static updateMerchantActionDefinitionToJson(value: UpdateMerchantActionDefinition): string {
    return JSON.stringify(uncast(value, r("UpdateMerchantActionDefinition")), null, 2);
  }

  public static toUpdateMerchantActionDefinitionStates(json: string): UpdateMerchantActionDefinition {
    return cast(JSON.parse(json), r("UpdateMerchantActionDefinitionStates"));
  }

  public static updateMerchantActionDefinitionStatesToJson(value: UpdateMerchantActionDefinition): string {
    return JSON.stringify(uncast(value, r("UpdateMerchantActionDefinitionStates")), null, 2);
  }

  public static toUpdateOrderRiskEvent(json: string): UpdateOrderRiskEvent {
    return cast(JSON.parse(json), r("UpdateOrderRiskEvent"));
  }

  public static updateOrderRiskEventToJson(value: UpdateOrderRiskEvent): string {
    return JSON.stringify(uncast(value, r("UpdateOrderRiskEvent")), null, 2);
  }

  public static toUpdateOrderRiskEventDefinition(json: string): UpdateOrderRiskEventDefinition {
    return cast(JSON.parse(json), r("UpdateOrderRiskEventDefinition"));
  }

  public static updateOrderRiskEventDefinitionToJson(value: UpdateOrderRiskEventDefinition): string {
    return JSON.stringify(uncast(value, r("UpdateOrderRiskEventDefinition")), null, 2);
  }

  public static toUpdateOrderRiskEventDefinitionStates(json: string): UpdateOrderRiskEventDefinition {
    return cast(JSON.parse(json), r("UpdateOrderRiskEventDefinitionStates"));
  }

  public static updateOrderRiskEventDefinitionStatesToJson(value: UpdateOrderRiskEventDefinition): string {
    return JSON.stringify(uncast(value, r("UpdateOrderRiskEventDefinitionStates")), null, 2);
  }

  public static toUpdateOrderStatusAction(json: string): UpdateOrderStatusAction {
    return cast(JSON.parse(json), r("UpdateOrderStatusAction"));
  }

  public static updateOrderStatusActionToJson(value: UpdateOrderStatusAction): string {
    return JSON.stringify(uncast(value, r("UpdateOrderStatusAction")), null, 2);
  }

  public static toUpdateOrderStatusActionDefinition(json: string): UpdateOrderStatusActionDefinition {
    return cast(JSON.parse(json), r("UpdateOrderStatusActionDefinition"));
  }

  public static updateOrderStatusActionDefinitionToJson(value: UpdateOrderStatusActionDefinition): string {
    return JSON.stringify(uncast(value, r("UpdateOrderStatusActionDefinition")), null, 2);
  }

  public static toUpdateOrderStatusActionDefinitionStates(json: string): UpdateOrderStatusActionDefinition {
    return cast(JSON.parse(json), r("UpdateOrderStatusActionDefinitionStates"));
  }

  public static updateOrderStatusActionDefinitionStatesToJson(value: UpdateOrderStatusActionDefinition): string {
    return JSON.stringify(uncast(value, r("UpdateOrderStatusActionDefinitionStates")), null, 2);
  }

  public static toUpdateOrderStatusEvent(json: string): UpdateOrderStatusEvent {
    return cast(JSON.parse(json), r("UpdateOrderStatusEvent"));
  }

  public static updateOrderStatusEventToJson(value: UpdateOrderStatusEvent): string {
    return JSON.stringify(uncast(value, r("UpdateOrderStatusEvent")), null, 2);
  }

  public static toUpdateOrderStatusEventDefinition(json: string): UpdateOrderStatusEventDefinition {
    return cast(JSON.parse(json), r("UpdateOrderStatusEventDefinition"));
  }

  public static updateOrderStatusEventDefinitionToJson(value: UpdateOrderStatusEventDefinition): string {
    return JSON.stringify(uncast(value, r("UpdateOrderStatusEventDefinition")), null, 2);
  }

  public static toUpdateOrderStatusEventDefinitionStates(json: string): UpdateOrderStatusEventDefinition {
    return cast(JSON.parse(json), r("UpdateOrderStatusEventDefinitionStates"));
  }

  public static updateOrderStatusEventDefinitionStatesToJson(value: UpdateOrderStatusEventDefinition): string {
    return JSON.stringify(uncast(value, r("UpdateOrderStatusEventDefinitionStates")), null, 2);
  }
}

function invalidValue(typ: any, val: any): never {
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    var map: any = {};
    typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    var map: any = {};
    typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    var l = typs.length;
    for (var i = 0; i < l; i++) {
      var typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) { }
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue("array", val);
    return val.map(el => transform(el, typ, getProps));
  }

  function transformDate(typ: any, val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue("Date", val);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue("object", val);
    }
    var result: any = {};
    Object.getOwnPropertyNames(props).forEach(key => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps);
    });
    Object.getOwnPropertyNames(val).forEach(key => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === "object" && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
        : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
          : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(typ, val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  "Serverless": o([
    { json: "service", js: "service", typ: "" },
    { json: "custom", js: "custom", typ: r("Custom") },
    { json: "provider", js: "provider", typ: r("Provider") },
    { json: "package", js: "package", typ: r("Package") },
    { json: "functions", js: "functions", typ: r("Functions") },
    { json: "RetryDefault", js: "RetryDefault", typ: r("RetryDefault") },
    { json: "stepFunctions", js: "stepFunctions", typ: r("StepFunctions") },
    { json: "plugins", js: "plugins", typ: a("") },
  ], false),
  "RetryDefault": o([
    { json: "Retry", js: "Retry", typ: a(r("Retry")) },
  ], false),
  "Retry": o([
    { json: "ErrorEquals", js: "ErrorEquals", typ: a(r("ErrorEqual")) },
    { json: "IntervalSeconds", js: "IntervalSeconds", typ: 0 },
    { json: "MaxAttempts", js: "MaxAttempts", typ: 0 },
    { json: "BackoffRate", js: "BackoffRate", typ: 0 },
  ], false),
  "Custom": o([
    { json: "integrationName", js: "integrationName", typ: "" },
  ], false),
  "Functions": o([
    { json: "onInstallEvent", js: "onInstallEvent", typ: r("CreateOrderAction") },
    { json: "updateCustVerifyStatusEvent", js: "updateCustVerifyStatusEvent", typ: r("CreateOrderAction") },
    { json: "updateEQ8ScoreEvent", js: "updateEQ8ScoreEvent", typ: r("CreateOrderAction") },
    { json: "updateOrderRiskEvent", js: "updateOrderRiskEvent", typ: r("CreateOrderAction") },
    { json: "updateOrderStatusEvent", js: "updateOrderStatusEvent", typ: r("CreateOrderAction") },
    { json: "uninstallAction", js: "uninstallAction", typ: r("CreateOrderAction") },
    { json: "createOrderAction", js: "createOrderAction", typ: r("CreateOrderAction") },
    { json: "updateMerchantAction", js: "updateMerchantAction", typ: r("CreateOrderAction") },
    { json: "updateOrderStatusAction", js: "updateOrderStatusAction", typ: r("CreateOrderAction") },
  ], false),
  "CreateOrderAction": o([
    { json: "name", js: "name", typ: "" },
    { json: "handler", js: "handler", typ: "" },
  ], false),
  "Package": o([
    { json: "exclude", js: "exclude", typ: a("") },
    { json: "include", js: "include", typ: a("") },
  ], false),
  "Provider": o([
    { json: "name", js: "name", typ: "" },
    { json: "runtime", js: "runtime", typ: "" },
    { json: "stage", js: "stage", typ: "" },
    { json: "region", js: "region", typ: "" },
    { json: "timeout", js: "timeout", typ: 0 },
    { json: "iamRoleStatements", js: "iamRoleStatements", typ: a(r("IamRoleStatement")) },
  ], false),
  "IamRoleStatement": o([
    { json: "Effect", js: "Effect", typ: "" },
    { json: "Action", js: "Action", typ: "" },
    { json: "Resource", js: "Resource", typ: "" },
  ], false),
  "StepFunctions": o([
    { json: "stateMachines", js: "stateMachines", typ: r("StateMachines") },
  ], false),
  "StateMachines": o([
    { json: "onInstallEvent", js: "onInstallEvent", typ: r("OnInstallEvent") },
    { json: "updateCustVerifyStatusEvent", js: "updateCustVerifyStatusEvent", typ: r("UpdateCustVerifyStatusEvent") },
    { json: "updateEQ8ScoreEvent", js: "updateEQ8ScoreEvent", typ: r("UpdateEQ8ScoreEvent") },
    { json: "updateOrderRiskEvent", js: "updateOrderRiskEvent", typ: r("UpdateOrderRiskEvent") },
    { json: "updateOrderStatusEvent", js: "updateOrderStatusEvent", typ: r("UpdateOrderStatusEvent") },
    { json: "uninstallAction", js: "uninstallAction", typ: r("UninstallAction") },
    { json: "createOrderAction", js: "createOrderAction", typ: r("CreateOrderActionClass") },
    { json: "updateMerchantAction", js: "updateMerchantAction", typ: r("UpdateMerchantAction") },
    { json: "updateOrderStatusAction", js: "updateOrderStatusAction", typ: r("UpdateOrderStatusAction") },
  ], false),
  "CreateOrderActionClass": o([
    { json: "name", js: "name", typ: "" },
    { json: "definition", js: "definition", typ: r("CreateOrderActionDefinition") },
  ], false),
  "CreateOrderActionDefinition": o([
    { json: "StartAt", js: "StartAt", typ: "" },
    { json: "States", js: "States", typ: r("PurpleStates") },
  ], false),
  "PurpleStates": o([
    { json: "createOrderActionStart", js: "createOrderActionStart", typ: r("Start") },
  ], false),
  "Start": o([
    { json: "Type", js: "Type", typ: "" },
    { json: "Resource", js: "Resource", typ: "" },
    { json: "Retry", js: "Retry", typ: a(r("Retry")) },
    { json: "End", js: "End", typ: true },
  ], false),
  "OnInstallEvent": o([
    { json: "name", js: "name", typ: "" },
    { json: "definition", js: "definition", typ: r("OnInstallEventDefinition") },
  ], false),
  "OnInstallEventDefinition": o([
    { json: "StartAt", js: "StartAt", typ: "" },
    { json: "States", js: "States", typ: r("FluffyStates") },
  ], false),
  "FluffyStates": o([
    { json: "onInstallEventStart", js: "onInstallEventStart", typ: r("Start") },
  ], false),
  "UninstallAction": o([
    { json: "name", js: "name", typ: "" },
    { json: "definition", js: "definition", typ: r("UninstallActionDefinition") },
  ], false),
  "UninstallActionDefinition": o([
    { json: "StartAt", js: "StartAt", typ: "" },
    { json: "States", js: "States", typ: r("TentacledStates") },
  ], false),
  "TentacledStates": o([
    { json: "uninstallActionStart", js: "uninstallActionStart", typ: r("Start") },
  ], false),
  "UpdateCustVerifyStatusEvent": o([
    { json: "name", js: "name", typ: "" },
    { json: "definition", js: "definition", typ: r("UpdateCustVerifyStatusEventDefinition") },
  ], false),
  "UpdateCustVerifyStatusEventDefinition": o([
    { json: "StartAt", js: "StartAt", typ: "" },
    { json: "States", js: "States", typ: r("StickyStates") },
  ], false),
  "StickyStates": o([
    { json: "updateCustVerifyStatusEventStart", js: "updateCustVerifyStatusEventStart", typ: r("Start") },
  ], false),
  "UpdateEQ8ScoreEvent": o([
    { json: "name", js: "name", typ: "" },
    { json: "definition", js: "definition", typ: r("UpdateEQ8ScoreEventDefinition") },
  ], false),
  "UpdateEQ8ScoreEventDefinition": o([
    { json: "StartAt", js: "StartAt", typ: "" },
    { json: "States", js: "States", typ: r("IndigoStates") },
  ], false),
  "IndigoStates": o([
    { json: "updateEQ8ScoreEventStart", js: "updateEQ8ScoreEventStart", typ: r("Start") },
  ], false),
  "UpdateMerchantAction": o([
    { json: "name", js: "name", typ: "" },
    { json: "definition", js: "definition", typ: r("UpdateMerchantActionDefinition") },
  ], false),
  "UpdateMerchantActionDefinition": o([
    { json: "StartAt", js: "StartAt", typ: "" },
    { json: "States", js: "States", typ: r("IndecentStates") },
  ], false),
  "IndecentStates": o([
    { json: "updateMerchantActionStart", js: "updateMerchantActionStart", typ: r("Start") },
  ], false),
  "UpdateOrderRiskEvent": o([
    { json: "name", js: "name", typ: "" },
    { json: "definition", js: "definition", typ: r("UpdateOrderRiskEventDefinition") },
  ], false),
  "UpdateOrderRiskEventDefinition": o([
    { json: "StartAt", js: "StartAt", typ: "" },
    { json: "States", js: "States", typ: r("HilariousStates") },
  ], false),
  "HilariousStates": o([
    { json: "updateOrderRiskEventStart", js: "updateOrderRiskEventStart", typ: r("Start") },
  ], false),
  "UpdateOrderStatusAction": o([
    { json: "name", js: "name", typ: "" },
    { json: "definition", js: "definition", typ: r("UpdateOrderStatusActionDefinition") },
  ], false),
  "UpdateOrderStatusActionDefinition": o([
    { json: "StartAt", js: "StartAt", typ: "" },
    { json: "States", js: "States", typ: r("AmbitiousStates") },
  ], false),
  "AmbitiousStates": o([
    { json: "updateOrderStatusActionStart", js: "updateOrderStatusActionStart", typ: r("Start") },
  ], false),
  "UpdateOrderStatusEvent": o([
    { json: "name", js: "name", typ: "" },
    { json: "definition", js: "definition", typ: r("UpdateOrderStatusEventDefinition") },
  ], false),
  "UpdateOrderStatusEventDefinition": o([
    { json: "StartAt", js: "StartAt", typ: "" },
    { json: "States", js: "States", typ: r("CunningStates") },
  ], false),
  "CunningStates": o([
    { json: "updateOrderStatusEventStart", js: "updateOrderStatusEventStart", typ: r("Start") },
  ], false),
  "ErrorEqual": [
    "States.ALL",
  ],
};
