import axios from '../../axios/request'
import store from '../index'

export default {
    namespaced: true,
    state() {
        return {
            requests:[]
        }
    },
    getters: {
        requests(state) {
            return state.requests
        }
    },
    mutations: {
        setRequests(state, requests) {
            state.requests = requests
        },
        addRequest(state, request) {
            state.requests.push(request)
        }
    },
    actions: {
        async create({ commit, dispatch }, payload) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.post(`/request.json?auth=${token}`, payload)
                console.log(payload, '- data - ', data)
                commit('addRequest', {...payload, id: data.name})
                dispatch('setMessage', {
                    value: 'Заявка успешно создана',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async load({ commit, dispatch}) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/request.json?auth=${token}`)
                console.log( '- data - ', data)
                const requests = Object.keys(data).map(id => ({...data[id], id}))
                console.log( 'requests = ', requests)
                commit('setRequests', requests)
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async loadOne({ commit, dispatch}, id) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/request/${id}.json?auth=${token}`)
                console.log( '- data - ', data)
                return data
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async remove({ dispatch}, id) {
            try {
                const token = store.getters['auth/token']
                const {data} = await axios.delete(`/request/${id}.json?auth=${token}`)
                console.log( 'remove data - ', data)
                dispatch('setMessage', {
                    value: 'Заявка удалена',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        },
        async update({ dispatch}, request) {
            try {
                console.log('req = ', request)
                const token = store.getters['auth/token']
                const {data} = await axios.put(`/request/${request.id}.json?auth=${token}`, request)
                console.log( 'update data - ', data)
                dispatch('setMessage', {
                    value: 'Заявка обновлена',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: e.message,
                    type: 'danger'
                }, {root: true})
            }
        }

    }

}
