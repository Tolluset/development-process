import 'source-map-support'
import * as zod from 'zod'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

const { TABLE_NAME, ENDPOINT } = process.env
const documentClient = DynamoDBDocument.from(
  new DynamoDBClient({ endpoint: ENDPOINT })
)

const eventSchema = zod.object({
  id: zod.number(),
  name: zod.string(),
  age: zod.number(),
})

type Result = { ok: true; data: unknown } | { ok: false; error: unknown }
export const handler = async (event: unknown): Promise<Result> => {
  const validationResult = eventSchema.safeParse(event)
  if (!validationResult.success) {
    return { ok: false, error: validationResult.error }
  }

  const { id, name, age } = validationResult.data

  /*
   * 以下のコメントはみなさんがDynamoDB触るの初見かもしれないので、
   * わかりやすさのために記述しています。
   * 実際のコードで↓みたいなコメント書いちゃダメだよ！
   * 参考: https://twitter.com/t_wada/status/904916106153828352
   */
  const result = await documentClient.update({
    TableName: TABLE_NAME, // とあるDynamoDBテーブルの
    Key: { id }, // とあるidのItem（RDBで言うところのレコード）について
    UpdateExpression: 'SET #name=:name, age=:age', // nameとageを変更する。
    ExpressionAttributeValues: { ':name': name, ':age': age }, // nameとageの変更内容はlambda eventとして渡されたものを使う。
    ExpressionAttributeNames: { '#name': 'name' }, // nameは予約語なので、#nameという名前で使う。
    ReturnValues: 'ALL_NEW', // 更新後のItemを返す。
  })

  return { ok: true, data: result.Attributes }
}
