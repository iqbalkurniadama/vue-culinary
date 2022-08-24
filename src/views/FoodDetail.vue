<template>
  <div class="food-detail">
    <Navbar />
    <div class="container">
      <!-- breadcrump -->
      <div class="row mt-5">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/foods" class="text-dark">Foods</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Food Order
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row mt-3">
        <div class="col-md-6">
          <img
            :src="require(`../assets/images/${product.gambar}`)"
            class="img-fluid shadow rounded"
          />
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ product.nama }}</strong>
          </h2>
          <hr />
          <h4>
            Price : <strong>Rp. {{ product.harga }}</strong>
          </h4>
          <form class="mt-4" v-on:submit.prevent>
            <div class="form-group">
              <label for="jumlah pemesanan">Jumlah pesan</label>
              <input
                type="number"
                class="form-control"
                min="1"
                v-model="pesan.jumlah_pemesanan"
              />
            </div>
            <div class="form-group">
              <label for="keterangan">keterangan</label>
              <textarea
                v-model="pesan.keterangan"
                class="form-control"
                cols="10"
                rows="2"
                placeholder="keterangan : pedas / sedang / tidak pedas"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-success" @click="pemesanan">
              <b-icon-cart></b-icon-cart> Order
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "FoodDetailView",
  components: {
    Navbar,
  },

  data() {
    return {
      product: {},
      pesan: {},
    };
  },
  methods: {
    setProduct(data) {
      this.product = data;
    },
    pemesanan() {
      if (this.pesan.jumlah_pemesanan) {
        this.pesan.products = this.product;
        axios
          .post("http://localhost:3000/keranjangs", this.pesan)
          .then(() => {
            this.$router.push({ path: "/cart" });
            this.$toast.success("Sukses masuk keranjang", {
              type: "success",
              position: "top-right",
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((err) => console.log(err));
      } else {
        this.$toast.error("Jumlah pemesanan / keterangan harus di isi", {
          type: "error",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },
  // computed: {
  //   setProduct() {
  //     return {
  //       ...this.product,
  //       product:
  //         this.product && require(`../assets/images/${this.product.data}`),
  //     };
  //   },
  // },

  mounted() {
    axios
      .get(`http://localhost:3000/products/${this.$route.params.id}`)
      .then((res) => this.setProduct(res.data))
      .catch((error) => console.log(error));
  },
};
</script>

<style>
</style>