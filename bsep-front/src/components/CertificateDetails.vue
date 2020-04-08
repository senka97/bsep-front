<template>
    <div class="container pt-5  justify-content-center" style=" width: 40%">
      <b-card no-body border-variant="dark" bg-variant="light" header="Certificate" align="center" title="Certificate informaton">
        <b-tabs card>
            <b-tab title="General" active>
                <b-card-text>
                    <b-card bg-variant="light" header="Certificate information" align="left" >
                        <b-card-text> <b> Issued to: </b> {{this.certificate.subjectCommonName}}</b-card-text>
                         <b-card-text> <b> Issued by: </b> {{this.certificate.issuerCommonName}}</b-card-text>
                        <b-card-text> <b> Valid from </b> {{this.certificate.startDate}} <b> to </b> {{this.certificate.endDate}}</b-card-text>
                    </b-card>
                </b-card-text>
            </b-tab>
            <b-tab title="Details">
                <b-card-text >
                     <b-card bg-variant="light" align="left" >
                        <b-card-text> <b> Version: </b> {{this.certificate.version}} </b-card-text>
                        <b-card-text> <b> Serial number: </b> {{this.certificate.serialNumber}}</b-card-text>
                        <b-card-text> <b> Signature algorthm: </b> {{this.certificate.signatureAlgorithm}}</b-card-text>
                        <b-card-text> <b> Signature hash algorthm: </b> {{this.certificate.signatureHashAlgorithm}}</b-card-text>
                        <b-button v-b-toggle.collapse-1 variant="outline-primary" >Public key</b-button>
                            <b-collapse  id="collapse-1">
                                <b-card>{{this.certificate.publicKey}}</b-card>
                            </b-collapse>
                    </b-card>
                </b-card-text>
            </b-tab>
            <b-tab title="Extensions">
                <b-card-text >
                     <b-card bg-variant="light" align="left" >
                        <b-card-text> <b> Basic Constraints: </b> Subject type: {{this.certificate.type}}</b-card-text>
                     </b-card>
                </b-card-text>
            </b-tab>

            <b-tab title="Subject">
                <b-card-text >
                     <b-card bg-variant="light" align="left" >
                        <b-card-text v-show="this.certificate.subject"> <b> Subject:  </b> {{this.certificate.subject}} </b-card-text>
                        <b-card-text v-show="this.certificate.subjectGivenname"> <b> Subject Name: </b> {{this.certificate.subjectGivenname}} </b-card-text>
                        <b-card-text v-show="this.certificate.subjectSurname"> <b> Subject Surname: </b> {{this.certificate.subjectSurname}} </b-card-text>
                        <b-card-text v-show="this.certificate.subjectEmail"> <b> Subject Email: </b> {{this.certificate.subjectEmail}} </b-card-text>
                     </b-card>
                </b-card-text>
            </b-tab>
            <b-tab title="Issuer">
                <b-card-text >
                     <b-card bg-variant="light" align="left" >
                        <b-card-text v-show="this.certificate.issuer"> <b> Issuer:  </b> {{this.certificate.issuer}} </b-card-text>
                        <b-card-text v-show="this.certificate.issuerGivenname"> <b> Issuer Name: </b> {{this.certificate.issuerGivenname}} </b-card-text>
                        <b-card-text v-show="this.certificate.issuerSurname"> <b> Issuer Surname: </b> {{this.certificate.issuerSurname}} </b-card-text>
                        <b-card-text v-show="this.certificate.issuerEmail"> <b> Issuer Email: </b> {{this.certificate.issuerEmail}} </b-card-text>
                        <b-button size="sm" variant="outline-primary" v-show="!this.certificate.isRoot" @click="showIssuerCertificate()"  align="center"> Show issuers certificate </b-button>
                     </b-card>
                     
                </b-card-text>
            </b-tab>
          </b-tabs>
          <b-button href="/allCertificates" variant="secondary" style="width: 6em; margin: 1em">Go back </b-button>
        </b-card>
    </div>
</template>

<script>
import axios from "axios";

const baseUrl = "http://localhost:9000/api/pki/";


export default {
    name: "CertificateDetails",
    data() {
    return {
      certificate: {},
    }  
  },
  methods: {
        showIssuerCertificate: function()
        {
            this.$router.push({ path: 'certificateDetails', query: { sn: this.certificate.issuerSerialNumber } });
        },
        getIssuerCertificate: function() //poziva before route update
        {
            axios.get(baseUrl + "getCertificateDetails/"+this.certificate.issuerSerialNumber).then(
            response=> {
                this.certificate = response.data;
            }
        )
        },
        
    },
    created() {
        var id = this.$route.fullPath;
        id = id.split('?')[1];
        id = id.split('=')[1];
        axios.get(baseUrl + "getCertificateDetails/"+id).then(
            response=> {
                this.certificate = response.data;
            }
        )
              
    },
    
    beforeRouteUpdate(to, from, next)
    {
        this.getIssuerCertificate();
        next();
    }

};
</script>

<style scoped>

</style>