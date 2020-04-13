# Serverless Configuration

## Table of Contents

- [Serverless Configuration](#serverless-configuration)
  - [Installation](#installation)
  - [Using the `lambdaDeploy` script](#using-the-lambdadeploy-script)
    - [The Local `serverless.yml` Configuration File](#the-local-serverlessyml-configuration-file)

## Installation

Pull the `protect-sdk-switchboard` repo into your integration as a dependency by running:

```bash
yarn add @ns8/protect-switchboard-sdk
```

Since the example build scripts below rely on `ts-node`, you might also want to run `yarn add ts-node` as well.

## Using the `lambdaDeploy` script

The `protect-sdk-switchboard` repo has a fairly straightforward script located at `build/lambdaDeploy.ts` that shells out to the AWS serverless CLI command (`sls`). It will delploy the lambdas defined in your `serverless.yml` file to an AWS stack of step functions with a stage value of `test`, `prod`, or whatever the value of your ENV `DEV_SUFFIX` variable is (a three-letter string identifying you). The default stage value for this script is `test`.
Here's how you would consume the build script from your integration repo's `package.json` that has `@ns8/protect-sdk-switchboard` as a dependency:

```json
{
  "deploy": "METHOD=deploy ts-node -P ./build/tsconfig.json ./node_modules/@ns8/protect-switchboard-sdk/build/lambdaDeploy.ts",
  "undeploy": "METHOD=remove ts-node -P ./build/tsconfig.json ./node_modules/@ns8/protect-switchboard-sdk/build/lambdaDeploy.ts"
}
```

### The Local `serverless.yml` Configuration File

The `sls` command assumes you have a `serverless.yml` file in the root of your repository. See the aws [serverless](https://serverless.com/framework/docs/providers/aws/cli-reference/) cli reference for more information on configuration and usage.
For your reference, below is a `serverless.yml` file copied `@ns8/protect-switchboard-magento`. There are a few things to note about the `serverless.yml` config file:

- inside brackets, `self` refers to the yaml configuration, allowing you to reference properties within the file
- inside brackets, `opt` refers to options passed in via the `sls` cli. For example, if `sls` is called like this: `sls --stage=xyz`, then `{opt.stage}` in the `serverless.yml` resolves to `xyz`.
- the step function handler names (e.g. `UpdateMerchantAction`) are hard-coded in the sdk, but their `handler` path and contents are configurable.
- In the opposite fashion of a Typescript `tsconfig.json`, the `include` directive overrides `exclude`.
- For the below config, if you ran the `sls` command with a stage of 'xyz', the integration name would expand to `magento-integration-xyz`.

```yaml
RetryDefault:
  Retry: &ref_0
    - BackoffRate: 2
      ErrorEquals:
        - States.ALL
      IntervalSeconds: 2
      MaxAttempts: 1
custom:
  integrationName: "${self:service}-${self:provider.stage}"
  integrationTypeName: "MAGENTO"
functions:
  CreateOrderAction:
    handler: dist/switchboard.CreateOrderAction
    name: "${self:custom.integrationName}-createOrderAction"
  OnInstallEvent:
    handler: dist/switchboard.OnInstallEvent
    name: "${self:custom.integrationName}-onInstallEvent"
  UninstallAction:
    handler: dist/switchboard.UninstallAction
    name: "${self:custom.integrationName}-uninstallAction"
  UpdateCustVerifyStatusEvent:
    handler: dist/switchboard.UpdateCustVerifyStatusEvent
    name: "${self:custom.integrationName}-updateCustVerifyStatusEvent"
  UpdateEQ8ScoreEvent:
    handler: dist/switchboard.UpdateEQ8ScoreEvent
    name: "${self:custom.integrationName}-updateEQ8ScoreEvent"
  UpdateMerchantAction:
    handler: dist/switchboard.UpdateMerchantAction
    name: "${self:custom.integrationName}-updateMerchantAction"
  UpdateOrderRiskEvent:
    handler: dist/switchboard.UpdateOrderRiskEvent
    name: "${self:custom.integrationName}-updateOrderRiskEvent"
  UpdateOrderStatusAction:
    handler: dist/switchboard.UpdateOrderStatusAction
    name: "${self:custom.integrationName}-updateOrderStatusAction"
  UpdateOrderStatusEvent:
    handler: dist/switchboard.UpdateOrderStatusEvent
    name: "${self:custom.integrationName}-updateOrderStatusEvent"
  GetPollUrl:
    handler: dist/switchboard.GetPollUrl
    name: "${self:custom.integrationTypeName}-${self:provider.stage}-getPollUrl"
    environment:
      STAGE: ${self:provider.stage}
  DeletePolledMessage:
    handler: dist/switchboard.DeletePolledMessage
    name: "${self:custom.integrationTypeName}-${self:provider.stage}-deletePolledMessage"
    environment:
      STAGE: ${self:provider.stage}
package:
  exclude:
    - ./**
  include:
    - dist/**
    - serverless.yml
plugins:
  - serverless-step-functions
  - serverless-pseudo-parameters
provider:
  deploymentBucket:
    name: "${ssm:/serverless/deployment/bucket/name}"
  iamRoleStatements:
    - Action: "s3:GetObject"
      Effect: Allow
      Resource: "arn:aws:s3:::protect-api-switch-data-${self:provider.stage}/*"
    # Full access to queues with names that start with ${self:provider.stage}
    - Action: "sqs:*"
      Effect: Allow
      Resource: "arn:aws:sqs:#{AWS::Region}:#{AWS::AccountId}:${self:provider.stage}-*"
    # sqs:ListQueues to all queues in region (can't restrict to specific queues)
    - Action: "sqs:ListQueues"
      Effect: Allow
      Resource: "arn:aws:sqs:#{AWS::Region}:#{AWS::AccountId}:*"
    - Action: "sts:AssumeRole"
      Effect: Allow
      Resource: "arn:aws:iam::#{AWS::AccountId}:role/${self:custom.integrationName}-#{AWS::Region}-lambdaRole"
  name: aws
  region: us-west-2
  runtime: nodejs12.x
  stage: "${opt:stage}"
  timeout: 29
  versionFunctions: false
service: "ns8-switchboard-magento2"
stepFunctions:
  stateMachines:
    CreateOrderAction:
      definition:
        StartAt: CreateOrderActionStart
        States:
          CreateOrderActionStart:
            End: true
            Resource: "arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:custom.integrationName}-createOrderAction"
            Retry: *ref_0
            Type: Task
      name: "${self:custom.integrationName}-createOrderAction"
    OnInstallEvent:
      definition:
        StartAt: OnInstallEventStart
        States:
          OnInstallEventStart:
            End: true
            Resource: "arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:custom.integrationName}-onInstallEvent"
            Retry: *ref_0
            Type: Task
      name: "${self:custom.integrationName}-onInstallEvent"
    UninstallAction:
      definition:
        StartAt: UninstallActionStart
        States:
          UninstallActionStart:
            End: true
            Resource: "arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:custom.integrationName}-uninstallAction"
            Retry: *ref_0
            Type: Task
      name: "${self:custom.integrationName}-uninstallAction"
    UpdateCustVerifyStatusEvent:
      definition:
        StartAt: UpdateCustVerifyStatusEventStart
        States:
          UpdateCustVerifyStatusEventStart:
            End: true
            Resource: "arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:custom.integrationName}-updateCustVerifyStatusEvent"
            Retry: *ref_0
            Type: Task
      name: "${self:custom.integrationName}-updateCustVerifyStatusEvent"
    UpdateEQ8ScoreEvent:
      definition:
        StartAt: UpdateEQ8ScoreEventStart
        States:
          UpdateEQ8ScoreEventStart:
            End: true
            Resource: "arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:custom.integrationName}-updateEQ8ScoreEvent"
            Retry: *ref_0
            Type: Task
      name: "${self:custom.integrationName}-updateEQ8ScoreEvent"
    UpdateMerchantAction:
      definition:
        StartAt: UpdateMerchantActionStart
        States:
          UpdateMerchantActionStart:
            End: true
            Resource: "arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:custom.integrationName}-updateMerchantAction"
            Retry: *ref_0
            Type: Task
      name: "${self:custom.integrationName}-updateMerchantAction"
    UpdateOrderRiskEvent:
      definition:
        StartAt: UpdateOrderRiskEventStart
        States:
          UpdateOrderRiskEventStart:
            End: true
            Resource: "arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:custom.integrationName}-updateOrderRiskEvent"
            Retry: *ref_0
            Type: Task
      name: "${self:custom.integrationName}-updateOrderRiskEvent"
    UpdateOrderStatusAction:
      definition:
        StartAt: UpdateOrderStatusActionStart
        States:
          UpdateOrderStatusActionStart:
            End: true
            Resource: "arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:custom.integrationName}-updateOrderStatusAction"
            Retry: *ref_0
            Type: Task
      name: "${self:custom.integrationName}-updateOrderStatusAction"
    UpdateOrderStatusEvent:
      definition:
        StartAt: UpdateOrderStatusEventStart
        States:
          UpdateOrderStatusEventStart:
            End: true
            Resource: "arn:aws:lambda:#{AWS::Region}:#{AWS::AccountId}:function:${self:custom.integrationName}-updateOrderStatusEvent"
            Retry: *ref_0
            Type: Task
      name: "${self:custom.integrationName}-updateOrderStatusEvent"
```
