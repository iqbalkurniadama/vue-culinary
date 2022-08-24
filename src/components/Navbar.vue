<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <div class="container-fluid">
        <b-navbar-brand href="#">Culinary</b-navbar-brand>
        <!-- hamberger menu -->
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <!--end hamberger menu -->
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/foods">Foods</router-link>
            </li>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/cart"
                >Cart <b-icon-bag></b-icon-bag>
                <span class="badge badge-success ml-2">{{
                  updateKeranjang ? updateKeranjang.length : jumlah_pesanans.length
                }}</span>
              </router-link>
            </li>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'NavbarItem',

  data() {
    return {
      jumlah_pesanans: [],
    };
  },

  props: ['updateKeranjang'],

  methods: {
    setJumlah(data) {
      this.jumlah_pesanans = data;
    },
  },

  mounted() {
    axios
      .get('http://localhost:3000/keranjangs')
      .then((response) => {
        this.setJumlah(response.data);
        // console.log("Berhasil : ", response);
      })
      .catch((error) => console.log('gagal :', error));
  },
};
</script>

<style>
</style>