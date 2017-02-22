<template>

    <div class="toolbar">
        <!-- orig header below -->
        <nav class="navbar navbar-inverse" role='navigation'>
            <div class="collapse navbar-collapse" id="navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li class="active" id='home-li'><a href="#">Home</a></li>
                    <li id='mypic-li'><router-link to="/my">My Pic</router-link></li>
                    <li v-if="isAdmin" id='admin-li'><router-link to="/admin">Admin</router-link></li>
                </ul>
                <empl-search></empl-search>
                <form id="searchOrgForm" class="navbar-form navbar-left">
                    <select v-model='selectedOrg' class='form-control'>
                        <option value='-1'>-- Search By Organization --</option>
                        <option v-for='org in orgs' :value='org.org_id'>
                            {{ org.org_id }} ({{ org.manager_name }})
                        </option>
                    </select>
                </form>
                <form v-if="alphabet" id="searchLName" class="navbar-form navbar-left navbar-letters">
                    <letter :item="l" v-for="l in alphabet"></letter>
                </form>
            </div>
        </nav>

    </div>

</template>

<script>
    import EmplSearch from 'components/EmplSearch'

    import Vue from 'vue'
    import Pict from '../api-calls'

    Vue.component( 'letter', {
        template: '<router-link :to="pathToEmpl" class="letter">{{item}}</router-link>',
        props: ['item'],
        computed: {
            pathToEmpl() {
                return Pict.letterApiPath( this.item );
            }
        }
    });

    export default {
        data() {
            return {
                isAdmin     : false,
                selectedOrg : '-1',
                orgs        : null,
                alphabet    : "abcdefghijklmnopqrstuvwxyz".split("")
            }
        },
        watch: {
            selectedOrg() {
                var app = this;
                this.$router.push({
                    name: 'orgs',
                    params: {
                        org: app.selectedOrg
                    }
                })
            }
        },
        created() {
            var app = this;
            Pict.initialize().then(function(response) {
                var r = response;
                if ( r && 'data' in r ) {
                    var d = r.data;
                    if ( 'isEmployeeAdmin' in d ) {
                        app.isAdmin = d.isEmployeeAdmin;
                    }
                    if ( 'orgs' in d ) {
                        app.orgs = d.orgs;
                    }
                }
            });
        },
        components: {
            EmplSearch
        }
    }
</script>

<style>
.letter{padding-left:2px;color:#999999;}
.letter:hover,.letter:active{color:white;}
</style>