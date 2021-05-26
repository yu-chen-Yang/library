import Vue from 'vue';
import Vuex from 'vuex';
import reader from './modules/reader';
import tempBook from "./modules/tempBook";

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        reader,
        tempBook
    }
})