<template>
  <div class="foods">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col mt-4">
          <h2>List <strong>Foods</strong></h2>
        </div>
      </div>
      <div class="row m-3">
        <div class="col">
          <div class="input-group mt-3">
            <input
              v-model="search"
              type="text"
              class="form-control"
              placeholder="Search Food"
              aria-label="search food"
              @keyup="searchFood"
            />
            <div class="input-group-prepend">
              <span class="input-group-text"
                ><b-icon-search></b-icon-search
              ></span>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4 justify-content-start">
        <div
          class="col-md-4 mt-4"
          v-for="product in products"
          :key="product.id"
        >
          <card-product :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import CardProduct from "@/components/CardProduct.vue";
import axios from "axios";

export default {
  name: "foodsView",
  components: {
    Navbar,
    CardProduct,
  },

  data() {
    return {
      products: [],
      search: "",
    };
  },
  methods: {
    setProducts(data) {
      this.products = data;
    },
    searchFood() {
      axios
        .get("http://localhost:3000/products?q=" + this.search)
        .then((response) => {
          this.setProducts(response.data);
          // console.log("Berhasil : ", response);
        })
        .catch((error) => console.log("gagal :", error));
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        this.setProducts(response.data);
        // console.log("Berhasil : ", response);
      })
      .catch((error) => console.log("gagal :", error));
  },
};
</script>

<style>
</style>