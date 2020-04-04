<template>
  <div>
    <NavBar />
    <div class="container pt-5 d-flex justify-content-center">
      <div class="text-center col">
        <h3 class="mb-2">Create certificate</h3>
        <div class="row">
          <b-form class="col-6">
            <label class="mb-4 mt-2">Subject data</label>
            <b-form-group>
              <b-form-input type="text" class="mr-2" placeholder="Subject common name"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input type="text" class="mr-2" placeholder="Subject first name"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input type="text" class="mr-2" placeholder="Subject last name"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input type="email" class="mr-2" placeholder="Subject email"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input type="text" class="mr-2" placeholder="Subject organization"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input type="text" class="mr-2" placeholder="Subject organization unit"></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input type="text" class="mr-2" placeholder="Subject country"></b-form-input>
            </b-form-group>
          </b-form>
          <b-form class="col-6">
            <label class="mb-4 mt-2">Validity dates</label>
            <b-form-group>
              <b-form-datepicker
                v-model="startDate"
                locale="en"
                placeholder="Start date"
              ></b-form-datepicker>
            </b-form-group>
            <b-form-datepicker
              v-model="endDate"
              locale="en"
              placeholder="End date"
            ></b-form-datepicker>
            <b-form-group label="Certificate type" class="mt-2 row">
              <b-form-radio-group v-model="selected" name="radio-inline">
                <b-form-radio value="SELF_SIGNED">Root CA</b-form-radio>
                <b-form-radio value="INTERMEDIATE">Intermediate CA</b-form-radio>
                <b-form-radio value="END_ENTITY">End entity</b-form-radio>
              </b-form-radio-group>
            </b-form-group>
            <b-form-group class="row">
              <b-dropdown text="Issuer" class="col" v-model="issuer">
                <b-dropdown-item>Issuer 1</b-dropdown-item>
                <b-dropdown-item>Issuer 2</b-dropdown-item>
                <b-dropdown-item>Issuer 3</b-dropdown-item>
                <b-dropdown-item>Issuer 4</b-dropdown-item>
                <b-dropdown-item>Issuer 5</b-dropdown-item>
              </b-dropdown>
            </b-form-group>
            <b-form-group label="Extensions" class="row">
              <b-dropdown text="Key usage" class="col-6" v-model="keyUsage">
                <b-dropdown-item value="digitalSignature">Digital Signature</b-dropdown-item>
                <b-dropdown-item value="contentCommitment">Content Commitment</b-dropdown-item>
                <b-dropdown-item value="keyEncipherment">Key Encipherment</b-dropdown-item>
                <b-dropdown-item value="dataEncipherment">Data Encipherment</b-dropdown-item>
                <b-dropdown-item value="keyAgreement">Key Agreement</b-dropdown-item>
                <b-dropdown-item value="keyCertSign">Key CertSign</b-dropdown-item>
                <b-dropdown-item value="CRLSign">CRL Sign</b-dropdown-item>
                <b-dropdown-item value="encipherOnly">Encipher Only</b-dropdown-item>
                <b-dropdown-item value="decipherOnly">Decipher Only</b-dropdown-item>
              </b-dropdown>

              <b-dropdown text="Extended key usage" class="col-6" v-model="exKeyUsage">
                <b-dropdown-item value="serverAuthentication">Server Authentication</b-dropdown-item>
                <b-dropdown-item value="clientAuthentication">Client Authentication</b-dropdown-item>
              </b-dropdown>
            </b-form-group>
            <b-form-group>
              <b-form-input type="text" class="mt-3" placeholder="Authority key identifier" :readonly="true"></b-form-input>
            </b-form-group>
          </b-form>
        </div>
        <b-button class="col-5 mt-3">Create</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  name: "CertificateForm",
  components: {
    NavBar
  },
  data() {
    return {
      selected: null,
      issuer: null,
      keyUsage: null,
      exKeyUsage: null,
      startDate: null,
      endDate: null
    }
  },
};
</script>

<style scoped>

</style>
