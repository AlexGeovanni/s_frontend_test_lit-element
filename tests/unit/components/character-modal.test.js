import { fixture, html } from '@open-wc/testing'
import '../../../app/components/characters/character-modal/character-modal'
import { expect, it } from 'vitest'

it('renders ui-modal', async () => {
  const el = await fixture(html`
    <character-modal></character-modal>
  `)

  const modal = el.shadowRoot.querySelector('ui-modal')

  expect(modal).toBeTruthy()
})

it('renders character info', async () => {
  const character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    gender: 'Male',
    species: 'Human',
    image: 'test.jpg'
  }

  const el = await fixture(html`
    <character-modal .character=${character}></character-modal>
  `)

  expect(el.shadowRoot.textContent).toContain('Rick Sanchez')
  expect(el.shadowRoot.textContent).toContain('Alive')
})
