<template>
      <div id="empl">
          <div v-if='emplData' class="container">
              <div class="row">
                  <div class="col-md-7">
                       <p>
                           <img :src="imgSrc" class="pic"/>
                       </p>
                       <h1>{{ emplData.lastname }}, {{ emplData.firstname }}</h1>
                       <br/>
                       <div class="row show-grid">
                           <div class="col-md-3">Manager:</div>
                           <div class="col-md-6"><i class="glyphicon glyphicon-user"></i> <router-link :to="pathToMgr">{{ emplData.managerlastname }}, {{ emplData.managerfirstname }}</router-link></div>
                       </div>
                       <div class="row show-grid">
                           <div class="col-md-3">Email:</div>
                           <div class="col-md-6"><i class="glyphicon glyphicon-envelope"></i> <a :href="'mailto:' + emplData.email">{{ emplData.email }}</a></div>
                       </div>
                       <div class="row show-grid">
                           <div class="col-md-3">ORG:</div>
                           <div class="col-md-6"><i class="glyphicon glyphicon-th-list"></i> <router-link :to="pathToOrg">{{ emplData.org_id}}</div>
                       </div>
                       <div class="row show-grid">
                           <div class="col-md-3">Location:</div>
                           <div class="col-md-6"><i class="glyphicon glyphicon-map-marker"></i> {{ emplData.location }}</div>
                       </div>
                       <div class="row show-grid">
                           <div class="col-md-3">Employee #:</div>
                           <div class="col-md-6"><i class="glyphicon glyphicon-info-sign"></i> {{ emplData.id }}</div>
                       </div>
                  </div>
                  <div class="col-md-4">
                      <div class="well">
                          <div v-if="emplData.reports.length==0">
                              <h3 class="modal-header">No Direct Reports</h3>
                          </div>
                          <div v-else>
                              <h3 class="modal-header">Direct Reports</h3>
                          </div>
                          <ul class='nav nav-list'>
                              <simple-empl :item="emp" v-for="emp in emplData.reports"></simple-empl>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
</template>

<script>
    import EmplSearch from 'components/EmplSearch'
    import Pict from '../api-calls'
    export default {
        name: 'empl',
        data () {
            return {
                emplData : null,
                error    : null
            }
        },
        components: {
            EmplSearch
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route' : 'fetchData'
        },
        methods: {
            fetchData() {
                var app = this;
                this.error = this.emplData = null;
                Pict.employee(this.$route.params.id)
                    .then(function(response) {
                        app.emplData = response.data;
                    }
                );
            }
        },
        computed: {
            imgSrc() {
                return Pict.image( this.emplData )
            },
            pathToOrg() {
                return Pict.employeesByOrgApiPath( this.emplData.org_id );
            },
            pathToMgr() {
                return Pict.pathToEmpl(this.emplData.managerid)
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.show-grid { margin-bottom: 15px; }
.show-grid [class^="col-"] { padding-top: 10px; padding-bottom: 10px; background-color: #f5f5f5; border: 1px solid #e3e3e3; }
</style>
