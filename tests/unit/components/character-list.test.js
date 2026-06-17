import { fixture, html, oneEvent } from '@open-wc/testing'
import '../../../app/components/characters/character-list/character-list'
import { expect, it } from 'vitest'

it('debe renderizar una character-card por cada personaje', async () => {
  const characters = [
    { id: 1, name: 'Rick Sanchez' },
    { id: 2, name: 'Morty Smith' }
  ]

  const el = await fixture(html`
    <character-list .characters=${characters}></character-list>
  `)

  await el.updateComplete

  const cards = el.shadowRoot.querySelectorAll('character-card')

  expect(cards.length).toBe(2)
})

it('debe mostrar estado de carga cuando loading es true', async () => {
  // Renderiza el listado en estado loading.
  const el = await fixture(html`
    <character-list
      .loading=${true}
      .error=${''}
      .info=${{}}
      .characters=${[]}
      .currentPage=${1}
    ></character-list>
  `)

  // Verifica que se vea el skeleton de carga.
  const statusMssg = el.shadowRoot.querySelector('status-message')
  expect(statusMssg).toBeTruthy()
})

it('debe manejar la selección de un personaje', async () => {
  const el = await fixture(html`
    <character-list
      .characters=${[
        { id: 1, name: 'Rick Sanchez' },
        { id: 2, name: 'Morty Smith' }
      ]}
    ></character-list>
  `)

  await el.updateComplete

  const card = el.shadowRoot.querySelector('character-card')

  const eventPromise = oneEvent(el, 'character-selected')

  card.dispatchEvent(
    new CustomEvent('character-selected', {
      detail: { id: 2 },
      bubbles: true,
      composed: true
    })
  )

  const event = await eventPromise

  expect(event.detail.id).toBe(2)
})
