import { describe, it, expect, vi } from 'vitest'
import { greet, nativeGreet } from './greet'

describe('greet', () => {
  it('現在時刻が5時から12時未満の場合、「おはようございます」と挨拶する', () => {
    const now = {
      getHours: () => 5,
    } as Date

    const result = greet(now)
    expect(result).toBe('おはようございます')
  })

  it('現在時刻が12時から18時未満の場合、「こんにちは」と挨拶する', () => {
    const now = {
      getHours: () => 12,
    } as Date

    const result = greet(now)
    expect(result).toBe('こんにちは')
  })

  it('現在時刻が18時から5時未満の場合、「こんばんは」と挨拶する', () => {
    const now = {
      getHours: () => 18,
    } as Date

    const result = greet(now)
    expect(result).toBe('こんばんは')
  })
})

describe('nativeGreet', () => {
  it('現在時刻が5時から12時未満の場合、「おはようございます」と挨拶する', () => {
    vi.useFakeTimers().setSystemTime(new Date('2023-01-01 05:00:00'))
    const result = nativeGreet()
    expect(result).toBe('おはようございます')
  })

  it('現在時刻が12時から18時未満の場合、「こんにちは」と挨拶する', () => {
    vi.useFakeTimers().setSystemTime(new Date('2023-01-01 12:00:00'))
    const result = nativeGreet()
    expect(result).toBe('こんにちは')
  })

  it('現在時刻が18時から5時未満の場合、「こんばんは」と挨拶する', () => {
    vi.useFakeTimers().setSystemTime(new Date('2023-01-01 18:00:00'))
    const result = nativeGreet()
    expect(result).toBe('こんばんは')
  })
})
