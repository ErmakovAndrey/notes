export default {
    state:{
        priority: {
            standard: {name: 'standard', value: 2},
            high: {name: 'high', value: 1},
            extra: {name: 'extra', value: 0}
        },
        notes: [
            {
                id: 1,
                title: 'First Note',
                descr: 'Description First note',
                date: new Date().toLocaleString(),
                priority: 'standard',
                onEdit: false
            },
            {
                id: 2,
                title: 'Second Note',
                descr: 'Description Second note',
                date: new Date().toLocaleString(),
                priority: 'standard',
                onEdit: false
            },
            {
                id: 3,
                title: 'Third Note',
                descr: 'Description Third note',
                date: new Date().toLocaleString(),
                priority: 'high',
                onEdit: false
            },
            {
                id: 34,
                title: 'Fourth Note',
                descr: 'Description Fourth note',
                date: new Date().toLocaleString(),
                priority: 'extra',
                onEdit: false
            }
        ]
    },
    mutations: {
        addNote(state, payload) {
            state.notes.push(payload)
        },
        removeNote(state, id) {
            state.notes.splice(state.notes.map(item => item.id).indexOf(id), 1);
        },
        editTitle(state, payload) {
            let note = state.notes.find(item => item.id == payload.id);
            note.title = payload.titleValue;
            note.date = new Date().toLocaleString();
        }
    },
    actions: {
        addNote({ commit, state}, note) {
            note.id = Math.max.apply(null, state.notes.map(item => item.id));
            note.id++
            commit('addNote',note)
        },
        removeNote({ commit }, id) {
            commit('removeNote', id)
        },
        editTitle({ commit }, payload) {
            commit('editTitle', payload)
        }
    },
    getters: {
        getNotes(state) {
            return state.notes
        },
        getPriorities(state) {
            return state.priority
        },
    }
}