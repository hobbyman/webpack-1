<template>
      <div id="org">
          <div v-if='empls' class="container">
              <div class="row-fluid">
                  <div v-for='empl in empls' class='col-md-3 col-sm-6'>
                      <router-link :to="pathToEmpl(empl)" class='thumbnail'>
                          <img :src="imgSrc(empl)" class='pic-small pic-small-left'/>
                          <p class="list-item">
                              {{ empl.lastname }}, {{ empl.firstname }}
                          </p>
                      </router-link>
                  </div>
              </div>
          </div>
      </div>
</template>

<script>
    import EmplSearch from 'components/EmplSearch'
    import axios from 'axios'
    import Pict from '../api-calls'

    export default {
        name: 'org',
        data () {
            return {
                empls : null,
                error   : null
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
                this.error = this.empls = null;
                var url = "";
                if ( this.$route && this.$route.params && 'org' in this.$route.params ) {
                    url = Pict.orgApiPath( this.$route.params.org );
                }
                if ( this.$route && this.$route.params && 'letter' in this.$route.params ) {
                    url = Pict.lastNameStartsWithApiPath( this.$route.params.letter );
                }
                axios.get(url)
                    .then(function(response) {
                        app.empls = response.data;
                    }
                );
            },
            imgSrc(empl) {
                return Pict.image( empl );
            },
            pathToEmpl(empl) {
                return Pict.pathToEmpl(empl.id);
            }
        }
    }
</script>