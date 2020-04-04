<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <router-link to="/" class="defaultStyle"><b-nav-item>Create certificate</b-nav-item></router-link>
          <b-nav-item>All certificates</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

export default {

};
</script>

<style scoped>
.defaultStyle {
  text-decoration: none;
}
</style>