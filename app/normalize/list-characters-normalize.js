export function listCharactersNormalize (data = []) {
  return data?.map((character, i) => ({
    id: character?.id || i,
    name: character?.name || '--',
    image: character?.image || '--'
  })) ?? []
}
