
export const setEntry = (state, entries) => {
    state.entries = [...state.entries, ...entries]
    state.isLoading = false
}

export const updateEntry = (state, entry) => {
    const index = state.entries.map( entry => entry.id).indexOf(entry.id)
    state.entries[index] = entry

}

export const createEntry = (state, entry) => {
    state.entries = [entry, ...state.entries]
}

export const deleteEntry = (state, id) => {
    state.entries = state.entries.filter(entry => entry.id !== id)
}