<template>
  <h1>產品列表</h1>
  <div class="container">
    <div class="row row-cols-1 row-cols-lg-4 g-3">
      <div class="col" v-for="product in products" :key="product.id">
        <div class="card h-100">
          <img :src="product.imageUrl" class="card-img-top" :alt="product.title">

          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <router-link :to="`/product/${product.id}`" class="btn btn-primary">查看產品內容</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProductsList() {
      const url = `${process.env.VUE_APP_APIURL}api/${process.env.VUE_APP_APIPATH}/products/all`;

      this.$http.get(url)
        .then((res) => {
          const { products } = res.data;

          this.products = products;
        })
        .catch((error) => {
          const { message } = error.response.data;

          this.$swal({
            text: message,
            icon: 'error',
            confirmButtonText: '確定',
          });
        });
    },
  },
  mounted() {
    this.getProductsList();
  },
};
</script>
