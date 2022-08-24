import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import foodsView from '../views/FoodsView.vue'
import foodDetail from '../views/FoodDetail.vue'
import cart from '../views/cart.vue'
import PesanSukses from '../views/PesananSukses.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/foods',
    name: 'Foods',
    component: foodsView
  },
  {
    path: '/foods/:id',
    name: 'FoodDetail',
    component: foodDetail
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/pesanan-sukses',
    name: 'pesanan-sukses',
    component: PesanSukses
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
