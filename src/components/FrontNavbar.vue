<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Week6 Homework</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart">購物車</router-link>
          </li>
        </ul>
      </div>

      <button type="button" class="btn btn-primary">
        結帳
        <span class="badge rounded-pill bg-danger">{{ cartData.carts.length }}</span>
      </button>
    </div>
  </nav>
</template>

<script>
import emitter from '@/utils/emitter';

export default {
  data() {
    return {
      cartData: {
        carts: [],
      },
    };
  },
  methods: {
    getCartData() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart`;

      this.$http.get(url)
        .then((res) => {
          const { data } = res.data;

          this.cartData = data;
        })
        .catch((error) => {
          const { message } = error.response.data;

          this.$swal({
            text: message,
            icon: 'error',
            confirmButtonText: '確定',
          });

          this.cartData = {
            carts: [],
          };
        });
    },
  },
  mounted() {
    this.getCartData();
    emitter.on('get-cart-data', () => {
      this.getCartData();
    });
  },
};
</script>
