<template >
    <div id="temp">
        <NavBar />
        <div class="container pt-5 d-flex justify-content-center">
            <div class="text-center col">
                <h3 class="mb-2">All certificates</h3>
            <div class="container pt-5 d-flex justify-content-center">
                <b-table striped hover bordered borderless :items="items" :fields="fields">
                <template v-slot:cell(revoke)>
                    <b-button size="sm"  class="mr-2" >  Revoke    </b-button>
                </template>
                <template v-slot:cell(details)>
                    <b-button size="sm"  class="mr-2" href="/certificateDetails" >  Details    </b-button>
                </template>
                </b-table>
            </div>
            </div>
        </div>
    </div>
  
</template>

<script>
import NavBar from "../components/NavBar.vue";
import axios from "axios";

const baseUrl = "http://localhost:9000/api/pki";

export default {
    name: "AllCertificates",
    components: {
        NavBar
    },
    data() {
      return {
        fields: ['serialNumber','subject', 'startDate', 'endDate', 'revoke', 'details'],
        items: []
      }
    },
    created() {
        axios.get(baseUrl + "/getAllCertificates").then(response => {
            this.items=response.data;
        });
    },
};
</script>

<style scoped>
  #temp {
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100%;
  /*background-color:rgb(90, 87, 104);*/
}
</style>