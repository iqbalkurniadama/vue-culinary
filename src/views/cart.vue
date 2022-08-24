<template>
  <div class="cartView">
    <Navbar :updateKeranjang="keranjangs" />
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
              <li class="breadcrumb-item active" aria-current="page">Cart</li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h3>My <strong>Cart</strong></h3>
          <div class="table-responsive mt-4">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Makanan</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Total Harga</th>
                  <th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.id">
                  <th>{{ index + 1 }}</th>
                  <td>
                    <img
                      :src="require(`../assets/images/${keranjang.products.gambar}`)"
                      class="img-fluid shadow rounded"
                      width="250"
                    />
                  </td>
                  <td>{{ keranjang.products.nama }}</td>
                  <td>{{ keranjang.keterangan ? keranjang.keterangan : '-' }}</td>
                  <td align="center">{{ keranjang.jumlah_pemesanan }}</td>
                  <td align="center">{{ keranjang.products.harga }}</td>
                  <td align="center">
                    <strong>{{ keranjang.products.harga * keranjang.jumlah_pemesanan }}</strong>
                  </td>
                  <td align="center" class="text-denger">
                    <b-icon-trash @click="hapusKeranjang(keranjang.id)"></b-icon-trash>
                  </td>
                </tr>
                <tr>
                  <td colspan="6" align="right">
                    <strong>Total Harga : </strong>
                  </td>
                  <td align="center">
                    <strong> Rp.{{ totalHarga }}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- form checkout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form class="mt-2" v-on:submit.prevent>
            <div class="form-group">
              <label for="nama">Nama</label>
              <input type="text" class="form-control" v-model="pesan.nama" />
            </div>
            <div class="form-group">
              <label for="noMeja">Nomer Meja</label>
              <input type="number" class="form-control" v-model="pesan.noMeja" />
            </div>
            <button type="submit" class="btn btn-success float-right" @click="checkout">
              <b-icon-cart></b-icon-cart> Order
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import axios from 'axios';

export default {
  name: 'cartView',
  components: {
    Navbar,
  },

  data() {
    return {
      keranjangs: [],
      pesan: {},
    };
  },

  methods: {
    setKeranjang(data) {
      this.keranjangs = data;
    },
    hapusKeranjang(id) {
      axios
        .delete(`http://localhost:3000/keranjangs/${id}`)
        .then(() => {
          this.$toast.error('Sukses hapus keranjang', {
            type: 'error',
            position: 'top-right',
            duration: 3000,
            dismissible: true,
          });
          // update halaman setelah klik hapus
          axios
            .get('http://localhost:3000/keranjangs')
            .then((res) => this.setKeranjang(res.data))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    },
    checkout() {
      if (this.pesan.nama && this.pesan.noMeja) {
        this.pesan.keranjangs = this.keranjangs;
        axios
          .post('http://localhost:3000/pesanans', this.pesan)
          .then(() => {
            // Hapus Semua Keranjang
            this.keranjangs.map(function (item) {
              return axios.delete('http://localhost:3000/keranjangs/' + item.id).catch((err) => console.log(err));
            });
            this.$router.push({ path: '/pesanan-sukses' });
            this.$toast.success('Sukses Dipesan', {
              type: 'success',
              position: 'top-right',
              duration: 3000,
              dismissible: true,
            });
          })
          .catch((err) => console.log(err));
      } else {
        this.$toast.error('Nama dan Nomor Meja Harus diisi', {
          type: 'error',
          position: 'top-right',
          duration: 3000,
          dismissible: true,
        });
      }
    },
  },

  mounted() {
    axios
      .get('http://localhost:3000/keranjangs')
      .then((res) => this.setKeranjang(res.data))
      .catch((error) => console.log(error));
  },

  computed: {
    totalHarga() {
      return this.keranjangs.reduce(function (items, data) {
        return items + data.products.harga * data.jumlah_pemesanan;
      }, 0);
    },
  },
};
</script>

<style>
</style>