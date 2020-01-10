<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            
            <div class="" style="">
                <nuxt-link to="/" class="h2 text-white nav-link"><span class="text-success">Climate</span>Master</nuxt-link>
            </div>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">

                    <div class="navbar-nav ml-auto">

                        <div class="nav-item">
                            <nuxt-link to="/" class="nav-link text-white">Home</nuxt-link>
                        </div>

                        <div class="nav-item ml-md-5">
                            <nuxt-link to="/climadvices" class="nav-link text-white">Climadvices</nuxt-link>
                        </div>
                        
                        <div class="nav-item dropdown ml-md-5">
                            <a class="nav-link dropdown-toggle text-white" href="#" id="dropdownCompany" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Unternehmen</a>
                            <div class="dropdown-menu" aria-labelledby="dropdownCompany">
                                <nuxt-link to="/we" class="dropdown-item">Wir</nuxt-link>
                                <nuxt-link to="/blog" class="dropdown-item">Blog</nuxt-link>
                            </div>
                        </div>

                        <client-only>
                        <div class="nav-item dropdown ml-md-5">
                            <a class="nav-link dropdown-toggle text-white" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Mein ClimateMaster</a>
                            <!-- if not logged in -->
                            <div class="dropdown-menu" v-if="loggedIn === false" aria-labelledby="dropdown04">
                                <nuxt-link to="/account/register" class="dropdown-item">Registrieren</nuxt-link>
                                <div class="text-center">
                                    <nuxt-link to="/account/login" class="btn btn-success">Einloggen</nuxt-link>
                               </div>
                            </div>
                            <!-- if logged in -->
                            <div class="dropdown-menu" v-if="loggedIn === true" aria-labelledby="dropdown04">
                                <nuxt-link to="/account/myProfile" class="dropdown-item">Mein Profil</nuxt-link>
                                <nuxt-link to="/myClimateMaster" class="dropdown-item" >Mein Klimaschutz</nuxt-link>
                                <div class="text-center">
                                    <button class="btn btn-danger"  v-on:click="logout()">Ausloggen</button>
                               </div>
                            </div>
                        </div>
                        </client-only>
                    </div>
            </div>
        </nav>
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
