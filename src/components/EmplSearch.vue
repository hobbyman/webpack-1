<template>
    <div id="search">
        <form id="searchForm" class="navbar-form navbar-left dropdown">
            <input id="searchText" type="text" class="name-search search-query dropdown-toggle form-control" data-toggle="dropdown" placeholder="Search by name" autocomplete="off" v-model="emplname" @focus="enter"/>
            <ul class='dropdown-menu'>
                <simple-empl :item="emp" v-for="emp in searchReturnedEmpls"></simple-empl>
            </ul>

        </form>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Pict from '../api-calls'

    Vue.component( 'simple-empl', {
        template: '<li><router-link :to="pathToEmpl"><img :src="imgSrc" class="pic-small"/> {{item.lastname}}, {{item.firstname}}</router-link></li>',
        props: ['item'],
        data() {
            return {
                selectedEmpl : null
            }
        },
        methods: {
            show(item) {
                this.selectedEmpl = item;
                this.$parent.leave();
            }
        },
        computed: {
            pathToEmpl() {
                return Pict.pathToEmpl( this.item.id );
            },
            imgSrc() {
                var app = this;
                return Pict.image( app.item );
            }
        }
    });
    export default {
        name: 'search',
        data() {
            return {
                emplid: null,
                emplname: null,
                emplData: null,
                searchReturnedEmpls: null
            }
        },
        watch: {
            emplname() {
                if ( this.emplname && this.emplname.length>=3 ) {
                    this.lookupByName(this.emplname);
                } else {
                    this.leave();
                }
            }
        },
        methods: {
            enter() {
                if ( this.searchReturnedEmpls && this.searchReturnedEmpls.length>0 ) {
                    document.getElementById('searchForm').classList.add('open');
                }
            },
            leave() {
                document.getElementById('searchForm').classList.remove('open');
            },
            lookupByName(name) {
                var app = this;
                Pict.search(name).then(function(response) {
                    app.searchReturnedEmpls = response.data;
                    app.enter();
                });
            }
        }
    }
</script>

<style>
.pic,.pic-small{border-radius:10px;width:112px;height:84px;}
.pic-small{width:56px;height:42px;}
.pic-small-left{float:left;}
.dropdown-menu{max-height: 400px;overflow-y: scroll;}
.list-item{padding-top:5px;padding-left:60px;line-height: 30px !important;}
</style>