/* eslint-disable no-new */
import * as cdk from 'aws-cdk-lib'
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as iam from 'aws-cdk-lib/aws-iam'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'

const app = new cdk.App()
const stack = new cdk.Stack(app, 'ShinsotsuKenshu')

const shinsotsuKenshuTable = new dynamodb.Table(stack, 'Table', {
  tableName: 'shinsotsu-kenshu-table',
  partitionKey: { name: 'id', type: dynamodb.AttributeType.NUMBER },
  removalPolicy: cdk.RemovalPolicy.DESTROY,
})

new NodejsFunction(stack, 'Lambda', {
  functionName: 'shinsotsu-kenshu-function',
  entry: './lambda/index.ts',
  environment: {
    TABLE_NAME: 'shinsotsu-kenshu-table',
  },
}).addToRolePolicy(
  new iam.PolicyStatement({
    actions: ['dynamodb:*'],
    resources: [shinsotsuKenshuTable.tableArn],
  })
)
