<template>
  <h1>單一產品頁面</h1>
  <div class="container">
    <img :src="productData.imageUrl" :alt="productData.title">
  </div>
</template>

<script>
export default {
  data() {
    return {
      productData: {},
    };
  },
  methods: {
    getProductData() {
      const { id } = this.$route.params;
      const url = `${process.env.VUE_APP_APIURL}api/${process.env.VUE_APP_APIPATH}/product/${id}`;

      this.$http.get(url)
        .then((res) => {
          const { product } = res.data;

          this.productData = product;
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
    this.getProductData();
  },
};
</script>
