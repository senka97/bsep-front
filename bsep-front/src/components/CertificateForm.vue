<template>
  <div>
    <NavBar />
    <div class="container pt-5 d-flex justify-content-center">
      <div class="text-center col">
        <b-alert
          :show="showCreated"
          dismissible
          fade
          variant="success"
        >You succesfully created certificate</b-alert>
        <h3 class="mb-2">Create certificate</h3>
        <div class="row">
          <b-form class="col-6">
            <label class="mb-4 mt-2">Subject data</label>
            <b-form-group>
              <b-form-input
                type="text"
                class="mr-2"
                v-model="subjectCommonName"
                placeholder="Subject common name"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                type="text"
                class="mr-2"
                v-model="subjectFirstName"
                placeholder="Subject first name"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                type="text"
                class="mr-2"
                v-model="subjectLastName"
                placeholder="Subject last name"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                type="email"
                class="mr-2"
                v-model="subjectEmail"
                placeholder="Subject email"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                type="text"
                class="mr-2"
                v-model="subjectOrganization"
                placeholder="Subject organization"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                type="text"
                class="mr-2"
                v-model="subjectOrganizationUnit"
                placeholder="Subject organization unit"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                type="text"
                class="mr-2"
                v-model="subjectCountry"
                placeholder="Subject country"
              ></b-form-input>
            </b-form-group>
          </b-form>
          <b-form class="col-6">
            <label class="mb-4 mt-2">Validity dates</label>
            <b-form-group>
              <b-form-datepicker v-model="startDate" locale="en" placeholder="Start date"></b-form-datepicker>
            </b-form-group>
            <b-form-datepicker v-model="endDate" locale="en" placeholder="End date"></b-form-datepicker>
            <b-form-group label="Certificate type" class="mt-2 row">
              <b-form-radio-group v-model="selected" name="radio-inline">
                <b-form-radio value="SELF_SIGNED">Root CA</b-form-radio>
                <b-form-radio value="INTERMEDIATE">Intermediate CA</b-form-radio>
                <b-form-radio value="END_ENTITY">End entity</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <b-form-group>
              <b-form-select text="Issuer" v-model="issuer" :options="issuers" :disabled="selected == 'SELF_SIGNED'">
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>Select an issuer</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
            <b-form-group label="Extensions" class="row ml-1 mr-1">
              <b-form-select
                class="col-6"
                text="Key usage"
                v-model="keyUsage"
                :options="listOfkeyUsage"
                multiple 
              >
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>Select one/more KeyUsage</b-form-select-option>
                </template>
              </b-form-select>

              <b-form-select
                class="col-6"
                text="Extended key usage"
                v-model="exKeyUsage"
                :options="listOfExKeyUsages"
                multiple 
                :disabled="selected != 'END_ENTITY'"
              >
                <template v-slot:first>
                  <b-form-select-option :value="null" disabled>Select one/more ExtendedKeyUsage</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
          </b-form>
        </div>
        <b-button class="col-5 mt-3" @click="submit">Create</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import axios from "axios";

const baseUrl = "http://localhost:9000/api/pki";

export default {
  name: "CertificateForm",
  components: {
    NavBar
  },
  data() {
    return {
      subjectCommonName: "",
      subjectFirstName: "",
      subjectLastName: "",
      subjectEmail: "",
      subjectOrganization: "",
      subjectOrganizationUnit: "",
      subjectCountry: "",
      authKeyIdentifier: "",
      selected: null,
      issuer: null,
      keyUsage: [],
      exKeyUsage: [],
      startDate: null,
      endDate: null,
      issuers: [],
      listOfkeyUsage: [
        { value: 128, text: "Digital Signature" },
        { value: 64, text: "Content Commitment" },
        { value: 32, text: "Key Encipherment" },
        { value: 16, text: "Data Encipherment" },
        { value: 8, text: "Key Agreement" },
        { value: 4, text: "Key CertSign" },
        { value: 2, text: "CRL Sign" },
        { value: 1, text: "Encipher Only" },
        { value: 32768, text: "Decipher Only" }
      ],
      listOfExKeyUsages: [
        { value: "1.3.6.5.5.7.3.1", text: "Server Authentication" },
        { value: "1.3.6.5.5.7.3.2", text: "Client Authentication" },
        { value: "1.3.6.5.5.7.3.3", text: "Code Signing" },
        { value: "1.3.6.5.5.7.3.4", text: "Email protection" },
        { value: "1.3.6.5.5.7.3.5", text: "End system" },
        { value: "1.3.6.5.5.7.3.6", text: "Tunel" },
        { value: "1.3.6.5.5.7.3.7", text: "User" },
        { value: "1.3.6.5.5.7.3.8", text: "Time Stamping" },
        { value: "1.3.6.5.5.7.3.9", text: "OCSP Signing" }
      ],
      showCreated: false,
      
    };
  },
  created() {
    axios.get(baseUrl + "/getAllCA").then(response => {
      response.data.forEach(element => {
        this.issuers.push({
          value: element.serialNumber,
          text: element.commonName
        });
        this.authKeyIdentifier = element.subjectKeyIdentifier;
      });
    });
  },
  methods: {
    submit: function() {
      console.log(this.keyUsage, this.exKeyUsage);

      axios.post(baseUrl + "/addNewCertificate", {
          subjectCommonName: this.subjectCommonName,
          subjectFirstName: this.subjectFirstName,
          subjectLastName: this.subjectLastName,
          subjectEmail: this.subjectEmail,
          subjectOrganization: this.subjectOrganization,
          subjectOrganizationUnit: this.subjectOrganizationUnit,
          subjectCountry: this.subjectCountry,
          startDate: this.startDate,
          endDate: this.endDate,
          issuerSerialNumber: this.issuer,
          certificateType: this.selected,
          keyUsageList: this.keyUsage,
          extendedKeyUsageList: this.exKeyUsage,
        })
        .then(() => {
          this.showCreated = true;
          setTimeout(() => {this.showCreated = false;}, 3500);
          this.clearAll();
        });
      
    },
    clearAll: function() {
      this.subjectCommonName = "";
      this.subjectFirstName = "";
      this.subjectLastName = "";
      this.subjectEmail = "";
      this.subjectOrganization = "";
      this.subjectOrganizationUnit = "";
      this.subjectCountry = "";
      this.startDate = null;
      this.endDate = null;
      this.issuer = null;
      this.selected = null;
      this.keyUsage = [];
      this.exKeyUsage = [];
      location.reload();
    }
  }
};
</script>

<style scoped>
</style>
