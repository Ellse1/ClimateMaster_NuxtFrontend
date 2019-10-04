<template>
  <div>
    <nuxt />

    <div class="text-center">
      <nuxt-link to="/" exact-active-class="active">Home</nuxt-link> |
      <nuxt-link to="/HandlungsvorschalgHinzufuegen" exact-active-class="active">Handlungsmoeglichkeit hinzufuegen</nuxt-link> |
      <nuxt-link to="/login" exact-active-class="active">login</nuxt-link>
    </div>
  
                    <template v-if="!loggedIn">
                        <li class="nav-item">
                            <nuxt-link to="/login" class="nav-link">
                                Login
                            </nuxt-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="">Register</a>
                        </li>
                    </template>
                    <template v-if="loggedIn">
                        <li class="nav-item">
                            <a class="nav-link" @click.prevent="logout" href="#">
                                    Logout
                            </a>  
                        </li>
                    </template>

  </div>
</template>
<script>
export default {
  methods: {
    logout(){
      this.$auth.logout();
    }
  }
}
</script>