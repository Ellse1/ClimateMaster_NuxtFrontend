<template>
  <div>

    <NavigationBar class="mb-5"/>
    
    <div v-if="loggedIn" class="text-center">
      <h3>Hallo {{user.firstname}}</h3>
    </div>

    <nuxt />
  
    <div v-if="loggedIn" class="text-center"> 
        <nuxt-link to="/" exact-active-class="active">Home</nuxt-link> |
        <a @click.prevent="logout" href="#">logout</a>
    </div>

  </div>
</template>
<script>
import NavigationBar from '~/components/MainComponents/NavigationBar';
export default {
  components:{
    NavigationBar,
  },
  methods: {
    logout(){
      this.$auth.logout();
    }
  }
}
</script>

<style>
.loading-animation:after {
  content: " ";
  display: block;
  width: 20px;
  height: 20px;
  /* margin: 8px; */
  margin:auto;
  border-radius: 50%;
  border: 2px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: loading-animation 1.2s linear infinite;
}
@keyframes loading-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>