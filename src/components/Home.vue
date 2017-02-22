<template>
    <div class="hello container">
        <div class="jumbotron">
            <h3>Dynetics Employee Pictorial</h3>
            <div class="row">
                <div class="col-md-8">
                    <h2>Try It</h2>
                    <p>
                        <u>Enter</u> 3 or more characters (<b>first or last name</b>) in the Search Box above, and select an employee. In the Employee view, you can navigate up and down the organizational hierarchy by clicking either the manager link, or one of the direct reports in the sidebar on the right of the screen.
                    </p>

                    <p><u>Search</u> by Organization by using the dropdown</p>
                    <!--
                    <div class='row-fluid' id='locations-list'>
                    </div>
                    -->

                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
