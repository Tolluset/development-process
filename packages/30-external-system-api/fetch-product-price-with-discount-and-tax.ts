/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { request } from 'undici'

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
 * キャンペーン
 */
export interface Campaign {
  /**
   * キャンペーン対象商品番号一覧
   */
  targetProductNos: string[]
  /**
   * 値引率
   */
  discountRate: number
}

/**
 * 複数商品についてキャンペーン値引きと消費税(10%)込の値段合計を返す
 */
export const fetchProductPriceWithDiscountAndTax = async (
  productNos: string[]
): Promise<number> => {
  // キャンペーン情報を取得
  const { body } = await request('https://campaign.example.com/api')
  const campaign: Campaign = await body.json()

  const ddb = new DynamoDB({
    credentials: {
      accessKeyId: 'DUMMY',
      secretAccessKey: 'DUMMY',
    },
  })
  const ddbDoc = DynamoDBDocument.from(ddb)

  // 合計金額(税抜)
  let total = 0
  for (const productNo of productNos) {
    // DBから商品情報を取得
    const getOutput = await ddbDoc.get({
      TableName: 'products',
      Key: {
        no: productNo,
      },
    })
    const product = getOutput.Item as Product

    if (campaign.targetProductNos.includes(product.no)) {
      // キャンペーン対象商品の場合、値引きして加算
      total += product.price * (1 - campaign.discountRate)
      continue
    }

    // キャンペーン対象商品でない場合、そのまま加算
    total += product.price
  }

  // 合計金額(税込)を返す
  return Math.floor(total * 1.1)
}
