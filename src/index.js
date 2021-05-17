import Vue from 'vue'
import VueRouter from "vue-router";
import login from "@/views/login";
import home from "@/views/home";
import addBook from "@/components/addBook";
import borrowBook from "@/components/borrowBook";
import returnBook from "@/components/returnBook"
import readerManage from "@/components/readerManage";

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
                    path:'returnBook',
                    name:'returnBook',
                    component:returnBook,
                },
                {
                    path:'readerManage',
                    name:'readerManage',
                    component:readerManage,
                }
            ]
        }
    ]
})


export default router