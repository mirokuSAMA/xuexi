<template>
  <div class="home">
    <MaterialManagement/>
  </div>
</template>
  
<script>

// @ is an alias to /src
import MaterialManagement from "../components/MaterialManagement.vue"
// import Loginindex from "../components/Loginindex.vue"
        

export default {
  name: "Home",
  components: {
    MaterialManagement,
  }
};
</script>
