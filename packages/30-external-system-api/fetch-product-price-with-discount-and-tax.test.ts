import { expect, test } from 'vitest'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import {
  Campaign,
  fetchProductPriceWithDiscountAndTax,
} from './fetch-product-price-with-discount-and-tax'

const campaign: Campaign = {
  targetProductNos: ['0001', '0002'],
  discountRate: 0.5,
}

const ddbDoc = {
  get: async ({ Key: { no } }: { Key: { no: keyof typeof products } }) =>
    products[no],
} as unknown as DynamoDBDocument

const products = {
  '0001': {
    Item: {
      no: '0001',
      name: 'トイレ消臭剤',
      price: 100,
    },
  },
  '0002': {
    Item: {
      no: '0002',
      name: 'トイレブラシ',
      price: 80,
    },
  },
  '0003': {
    Item: {
      no: '0003',
      name: 'トイレットペーパー',
      price: 10,
    },
  },
}

test('商品Noから消費税込みの値段を取得する', async () => {
  const result = await fetchProductPriceWithDiscountAndTax(
    ['0001', '0002', '0003'],
    campaign,
    ddbDoc
  )
  expect(result).toBe(110)
})
