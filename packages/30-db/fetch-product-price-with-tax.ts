import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

/**
 * 商品
 */
export interface Product {
  /**
   * 商品番号
   * @example '0001'
   */
  no: string
  /**
   * 商品名
   * @example 'トイレ消臭剤'
   */
  name: string
  /**
   * 値段(円)
   * @example 100
   */
  price: number
}

/**
 * 商品の値段を消費税(10%)込みで返す
 */
export const fetchProductPriceWithTax = async (
  productNo: string,
  ddbDoc: DynamoDBDocument = DynamoDBDocument.from(
    new DynamoDB({
      credentials: {
        accessKeyId: 'DUMMY',
        secretAccessKey: 'DUMMY',
      },
    })
  )
): Promise<number> => {
  const getOutput = await ddbDoc.get({
    TableName: 'products',
    Key: {
      no: productNo,
    },
  })
  const product = getOutput.Item as Product
  return Math.floor(product.price * 1.1) // 切り上げ
}
