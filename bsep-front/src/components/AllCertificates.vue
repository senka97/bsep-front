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
                    <b-button size="sm"  class="mr-2" v-b-modal.modalDetails >  Details    </b-button>
                </template>
                </b-table>
            </div>
            </div>
        </div>
        <b-modal id="modalDetails" title="Certificate information" ok-only>
            <table >
                <tr>
                    <th>Subject common name</th>
                    <td><b-form-input type="text"  disabled="true"></b-form-input></td>
                </tr>
                <tr>
                    <th>Subject email</th>
                    <td><b-form-input type="text"  disabled="true"></b-form-input></td>
                </tr>
                <tr>
                    <th>Subject organization</th>
                    <td><b-form-input type="text"  disabled="true"></b-form-input></td>
                </tr>
                <tr>
                    <th>Subject organization unit </th>
                    <td><b-form-input type="text"  disabled="true"></b-form-input></td>
                </tr>
                <tr>
                    <th>Subject country</th>
                    <td><b-form-input type="text"  disabled="true"></b-form-input></td>
                </tr>
                <tr>
                    <th>Start date</th>
                    <td><b-form-input type="text"  disabled="true"></b-form-input></td>
                </tr>
                <tr>
                    <th>End date</th>
                    <td><b-form-input type="text"  disabled="true"></b-form-input></td>
                </tr>
                <tr>
                    <th>Serial number</th>
                    <td><b-form-input type="text"  disabled="true"></b-form-input></td>
                </tr>
                <tr>
                    <th>Type</th>
                    <td><b-form-input type="text"  disabled="true"></b-form-input></td>
                </tr>
                <tr>
                    <th>Key usage</th>
                    <td><b-form-input type="text"  disabled="true"></b-form-input></td>
                </tr>
                <tr>
                    <th>Extended key usage</th>
                    <td><b-form-input type="text"  disabled="true"></b-form-input></td>
                </tr>
                <tr>
                    <th>Authority key identifier</th>
                    <td><b-form-input type="text"  disabled="true"></b-form-input></td>
                </tr>
                <tr><td colspan="2"></td></tr>
            </table>
        
        </b-modal>
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
        fields: ['subjectFirstName', 'subjectLastName','startDate', 'endDate', 'revoke', 'details'],
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