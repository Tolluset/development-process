import { expect, test } from 'vitest'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { fetchProductPriceWithTax } from './fetch-product-price-with-tax'

const ddbDoc = {
  get: async () => ({
    Item: {
      no: '0001',
      name: 'トイレ消臭剤',
      price: 100,
    },
  }),
} as unknown as DynamoDBDocument

test('商品Noから消費税込みの値段を取得する', async () => {
  const result = await fetchProductPriceWithTax('0001', ddbDoc)
  expect(result).toBe(110)
})
