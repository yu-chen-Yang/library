import Vue from 'vue'
import VueRouter from "vue-router";
import login from "@/views/login";
import home from "@/views/home";
import addBook from "@/components/addBook";
import borrowBook from "@/components/borrowBook";
import Booking from "@/components/Booking"
import readerManage from "@/components/readerManage";
import searchBook from "./components/searchBook";

Vue.use(VueRouter)

const router=new VueRouter({
    routes:[
        {
            path:'/',
            redirect:'/home/borrowBook'
        },
        {
            path:'/login',
            name:'login',
            component:login
        },
        {
            path:'/home',
            name:'home',
            component:home,
            children:[
                {
                    path:'addBook',
                    name:'addBook',
                    component:addBook,
                },
                {
                    path:'borrowBook',
                    name:'borrowBook',
                    component:borrowBook,
                },
                {
                    path:'Booking',
                    name:'Booking',
                    component:Booking,
                },
                {
                    path:'bookManage',
                    name:'bookManage',
                    component:readerManage,
                },
                {
                    path:"searchBook",
                    name:"searchBook",
                    component:searchBook,
                }
            ]
        }
    ]
})


export default router