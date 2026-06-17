import { Api } from '../../../app/service/api'
import { describe, it, expect, vi } from 'vitest'

describe('Api', () => {
  it('retorna un json en success', async () => {
    const apiResponse = {
      info: { count: 826, pages: 42, next: 'next', prev: null },
      results: [{ id: 1, name: 'Rick Sanchez' }]
    }
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => apiResponse
      })
    )

    const result = await Api('')

    expect(result).toEqual(apiResponse)
  })

  it('throws si request falla', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false
      })
    )

    await expect(Api('')).rejects.toThrow('Request failed')
  })
})
