<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
        <!--<b-house-fill></b-house-fill>-->
        <b-button style="margin-right:1em" href="/certificateForm">Create certificate </b-button>
        <b-button href="/allCertificates"> All certificates  </b-button>
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