import { expect, it } from 'vitest'
import { listCharactersNormalize } from '../../../app/normalize/list-characters-normalize'

it('normaliza personajes correctamente', () => {
  const result = listCharactersNormalize([
    { id: 1, name: 'Rick', image: 'img.png' }
  ])

  expect(result).toEqual([
    { id: 1, name: 'Rick', image: 'img.png' }
  ])
})
