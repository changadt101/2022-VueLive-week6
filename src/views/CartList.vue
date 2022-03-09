<template>
  <h1>購物車列表</h1>

  <div class="container">
    <table class="table align-middle">
      <thead>
        <tr>
          <th>商品圖片</th>
          <th>商品名稱</th>
          <th>商品價格</th>
          <th>操作選項</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td style="width: 200px;">
            <div
              style="height: 100px; background-size: cover; background-position: center;"
              :style="{backgroundImage: `url(${product.imageUrl})`}"
            ></div>
          </td>

          <td>{{ product.title }}</td>

          <td>
            <div
              class="h5"
              v-if="product.origin_price === product.price"
            >{{ product.price }} 元</div>

            <template v-else>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </template>
          </td>

          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-danger"
                :disabled="loadingStatus.loadingProduct === product.id"
                @click="addToCart(product.id)"
              >
                <div
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  v-if="loadingStatus.loadingProduct === product.id"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                加入購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import emitter from '@/utils/emitter';

export default {
  data() {
    return {
      loadingStatus: {
        loadingProduct: '',
      },
      products: [],
    };
  },
  methods: {
    getProductsList() {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/products/all`;

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
    addToCart(productId, quantity = 1) {
      const url = `${process.env.VUE_APP_APIURL}/api/${process.env.VUE_APP_APIPATH}/cart`;
      const addToCartParams = {
        product_id: productId,
        qty: quantity,
      };

      this.loadingStatus.loadingProduct = productId;

      this.$http.post(url, { data: addToCartParams })
        .then(() => {
          this.loadingStatus.loadingProduct = '';
          emitter.emit('get-cart-data');
        })
        .catch((error) => {
          const { message } = error.response.data;

          this.loadingStatus.loadingProduct = '';

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
