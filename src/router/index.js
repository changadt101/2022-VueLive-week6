import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/HomePage.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/ProductsList.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/ProductContent.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/CartList.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/HomeAdmin.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/ProductsAdmin.vue'),
      },
      {
        path: 'coupons',
        component: () => import('../views/CouponsAdmin.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
});

export default router;
