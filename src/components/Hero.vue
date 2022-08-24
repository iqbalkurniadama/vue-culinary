<template>
  <div class="hero">
    <!-- desktop -->
    <div class="d-none d-md-block">
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2>
                <strong>Delicius Food Menu</strong><br />
                in your Gadget
              </h2>
              <p>Come on, choose your favorite food</p>
              <router-link to="/foods" class="btn btn-lg btn-success">
                <b-icon-arrow-right></b-icon-arrow-right> Order
              </router-link>
            </div>
          </div>
        </div>
        <div class="col">
          <img src="../assets/hero.svg" alt="hero" width="100%" />
        </div>
      </div>
    </div>

    <!-- mobile -->
    <div class="d-sm-block d-md-none">
      <div class="row mt-4">
        <div class="col mb-4 text-center">
          <img src="../assets/hero.svg" alt="hero" width="90%" />
        </div>
        <div class="col-md-6">
          <div class="d-flex h-100">
            <div class="justify-content-center align-self-center">
              <h2>
                <strong>Delicius Food Menu</strong><br />
                in your Gadget
              </h2>
              <p>Come on, choose your favorite food</p>
              <router-link to="/foods" class="btn btn-lg btn-success">
                <b-icon-arrow-right></b-icon-arrow-right> Order
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroItem",
};
</script>

<style>
</style>