/* eslint-disable no-await-in-loop */
import { test, expect } from '@playwright/test'

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

const documentClient = DynamoDBDocument.from(
  new DynamoDBClient({ endpoint: 'http://localhost:4566' })
)

test.beforeEach(async () => {
  // データリセット
  const { Items: todos = [] } = await documentClient.scan({
    TableName: 'todos',
  })
  await Promise.all(
    todos.map((todo) =>
      documentClient.delete({ TableName: 'todos', Key: { id: todo.id } })
    )
  )
})

test('basic test', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  await page.fill('input[name="content"]', 'テスト')
  await page.click('text="Todo追加"')

  // await expect(page.getByRole('listitem', { name: 'テスト' })).toBeVisible()
  await expect(
    page.getByRole('listitem').filter({ hasText: 'テスト' })
  ).toBeVisible()

  // DBにデータが追加されていることを確認する0ki 66
  await page.reload()
  await expect(
    page.getByRole('listitem').filter({ hasText: 'テスト' })
  ).toBeVisible()

  // 削除ボタンの動作と確認
  await page.click('text="Todo削除"')
  await expect(
    page.getByRole('listitem').filter({ hasText: 'テスト' })
  ).not.toBeVisible()

  // DBからデータが消されていることを確認する
  await page.reload()
  await expect(
    page.getByRole('listitem').filter({ hasText: 'テスト' })
  ).not.toBeVisible()
})
