const state = {
    id:"-1",
    isLogin:false,
    name:"-1",
    tele:"-1",
    email:"-1"
}

//定义getters
const getters = {
    id:state=>{
        return state.id;
    },
    isLogin:state=>{
        return state.isLogin;
    },
    name:state=>{
        return state.name;
    },
    tele:state=>{
        return state.tele;
    },
    email:state=>{
        return state.email
    }
}

//定义actions映射
const actions = {
    logIn({commit},readers){
        commit("login",readers);
    },
    logOut({commit}){
        commit('logout')
    }
}

//真正用于修改数据的方法
const mutations = {
    login:function (state,readers){
        state.id=readers.id;
        state.isLogin=true;
        state.name=readers.name;
        state.tele=readers.tele;
        state.email=readers.email;
        console.log(state.isLogin);
        console.log(state.id);
    },
    logout:function (state){
        state.id="";
        state.isLogin=false;
        state.name="";
        state.tele="";
        state.email="";
    }
}

//导出所有配置
export default {
    state,
    getters,
    actions,
    mutations
};