import { describe, expect, it, vi } from 'vitest'
import { Characters } from '../../../app/service/characters.service'
import { Api } from '../../../app/service/api'

vi.mock('../../../app/service/api', () => ({
  Api: vi.fn()
}))

describe('characters service', () => {
  const service = new Characters()
  it('fetch characters, calls Api with page', async () => {
    const apiResponse = {
      info: { count: 826, pages: 42, next: 'next', prev: null },
      results: [{ id: 1, name: 'Rick Sanchez' }]
    }

    Api.mockResolvedValue(apiResponse)

    const res = await service.getCharacters(1)

    expect(Api).toHaveBeenCalledWith('?page=1')

    expect(res?.results[0].name).toBe('Rick Sanchez')
  })

  it('debe lanzar error cuando la búsqueda no responde OK', async () => {
    Api.mockRejectedValue(new Error('Request failed'))
    await expect(service.searchCharactersByName('rick')).rejects.toThrow('Request failed')
  })

  it('debe codificar el texto de búsqueda y enviar la página', async () => {
    const apiResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [{ id: 1, name: 'Rick Sanchez' }]
    }
    Api.mockResolvedValue(apiResponse)

    const page = 1
    await service.searchCharactersByName('Rick Sanchez', page)
    await expect(Api).toHaveBeenCalledWith('?name=Rick%20Sanchez&page=1', {}, undefined)
  })

  it('debe devolver lista cuando favoritos retorna varios personajes', async () => {
    const characters = [
      { id: 1, name: 'Rick Sanchez' },
      { id: 2, name: 'Morty Smith' }
    ]
    Api.mockResolvedValue(characters)
    const result = await service.getFavoritesCharacters([1, 2])

    await expect(Api).toHaveBeenCalledWith('/1,2', {}, undefined)
    expect(result).toEqual(characters)
  })

  it('debe devolver character por id', async () => {
    const character = { id: 99, name: 'Rick Sanchez' }
    Api.mockResolvedValue(character)
    const result = await service.getCharactersById(99)
    expect(result).toEqual(character)
  })
})
