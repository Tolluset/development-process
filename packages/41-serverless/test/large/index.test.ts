/* eslint-disable no-unused-vars */

import { beforeEach, expect, test } from 'vitest'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda'

const documentClient = DynamoDBDocument.from(
  new DynamoDBClient({ region: 'ap-northeast-1' })
)
const lambdaClient = new LambdaClient({})

beforeEach(async () => {
  await documentClient.put({
    TableName: 'shinsotsu-kenshu-table',
    Item: { id: 1, name: 'test-name_before', age: 999 },
  })
})

/**
 * 実際のリソースの設定や権限なとのバグが検出できる
 */
test('test', async () => {
  const command = new InvokeCommand({
    FunctionName: 'shinsotsu-kenshu-function',
    Payload: Buffer.from(
      JSON.stringify({ id: 1, name: 'test-name_after', age: 18 })
    ),
  })
  // 1. lambdaを呼び出して、
  try {
    const { Payload } = await lambdaClient.send(command)
    if (Payload === undefined) throw new Error('Payload is undefined')

    const response = JSON.parse(Buffer.from(Payload).toString())

    // 2. レスポンスを確認し、
    expect(response).toEqual({
      ok: true,
      data: { id: 1, name: 'test-name_after', age: 18 },
    })

    // 3. DynamoDBの値が期待通り変更されているかを確認しましょう。
    const item = await documentClient.get({
      TableName: 'shinsotsu-kenshu-table',
      Key: { id: 1 },
    })

    expect(item.Item).toEqual({
      id: 1,
      name: 'test-name_after',
      age: 18,
    })
  } catch (e) {
    console.error(e)
  }
})
