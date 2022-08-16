import journalApi from "@/api/journalApi"

export const loadEntry = async ({ commit }) => {
    const { data } = await journalApi.get('/entries.json')

    // Edge case if there is no entries
    if (!data) {
        commit('setEntry', [])
        return
    }

    const entries = []
    for (let id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id]
        })
    }

    commit('setEntry', entries)
}

export const updateEntry = async ({ commit }, entry) => {
    const { date, picture, text } = entry

    //payload
    const entryToUpdate = { date, picture, text }
    const res = await journalApi.put(`/entries/${entry.id}.json`, entryToUpdate)
    console.log('res', res);

    commit('updateEntry', { ...entry })
}

export const createEntry = async ({ commit }, entry) => {

    const { date, picture, text } = entry
    const entryToCreate = { date, picture, text }
    const { data } = await journalApi.post('/entries.json', entryToCreate)

    entryToCreate.id = data.name

    commit('createEntry', entryToCreate)

    return data.name
}

export const deleteEntry = async ({ commit }, id) => {
    await journalApi.delete(`/entries/${id}.json`)

    commit('deleteEntry', id)
}
