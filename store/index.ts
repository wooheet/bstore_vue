import Vuex from 'vuex';
import { YggdrashStore } from './modules/yggdrash';

export const state = (): any => ({

})

export const mutations: any = {

}

export const actions = {
    async nuxtServerInit({ commit, dispatch }: any) {
        await commit('modules/yggdrash/SET_CONNECTION', { 
            network: 'Search CU',
            url: 'http://testnode.yggdrash.io',
            activeIndex: 0
        })
    }
}