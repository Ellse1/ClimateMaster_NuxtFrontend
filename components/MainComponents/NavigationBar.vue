<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light fixed-top" id="navbar">
            
            <div class="" style="">
                <nuxt-link to="/" class="h2 text-dark nav-link"><span class="text-success">Climate</span>Master</nuxt-link>
            </div>

            <button class="navbar-toggler text-dark" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">

                    <div class="navbar-nav ml-auto">

                        <div class="nav-item">
                            <nuxt-link to="/" class="nav-link text-dark">Startseite</nuxt-link>
                        </div>

                        <div class="nav-item ml-md-5">
                            <nuxt-link to="/climadvices" class="nav-link text-dark">Climadvices</nuxt-link>
                        </div>
                        
                        <div class="nav-item dropdown ml-md-5">
                            <a class="nav-link dropdown-toggle text-dark" href="#" id="dropdownCompany" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Über uns</a>
                            <div class="dropdown-menu bg-white border-0 text-center" aria-labelledby="dropdownCompany">
                                <nuxt-link to="/we" class="dropdown-item">Wir</nuxt-link>
                                <nuxt-link to="/platform" class="dropdown-item">Die Plattform</nuxt-link>
                                <nuxt-link to="/projects" class="dropdown-item">Projekte</nuxt-link>
                            </div>
                        </div>

                        <client-only>
                        <div class="nav-item dropdown ml-md-5">
                            <a class="nav-link dropdown-toggle text-dark" href="#" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span v-if="loggedIn == true" style="vertical-align:top;">
                                   Hallo {{user.firstname}}!
                                </span>
                                <span v-if="loggedIn == false" style="vertical-align:top;">
                                   Einloggen
                                </span>
                                <font-awesome-icon icon="user-circle"  style="font-size:30px;"/>     
                            </a>
                            <!-- if not logged in -->
                            <div class="dropdown-menu dropdown-menu-right bg-white border-0" v-if="loggedIn === false" aria-labelledby="dropdown04">
                                <div class="text-center">
                                    <nuxt-link to="/account/register" class="btn btn-success">Registrieren</nuxt-link>
                               </div>
                                <div class="text-center mt-2">
                                    <nuxt-link to="/account/login" class="btn btn-success">Einloggen</nuxt-link>
                               </div>
                            </div>
                            <!-- if logged in -->
                            <div class="dropdown-menu dropdown-menu-right bg-light" v-if="loggedIn === true" aria-labelledby="dropdown04">
                                <nuxt-link to="/account/myProfile?page=factsheet" class="dropdown-item">Mein Profil</nuxt-link>
                                <nuxt-link to="/account/myClimateMaster" class="dropdown-item" ><span class="text-success">Climate</span>Master werden</nuxt-link>
                                <nuxt-link to="/account/myProfile?page=co2handprint" class="dropdown-item" >CO2 Handabruck vergrößern</nuxt-link>
                                <!-- If admin -->
                                <nuxt-link v-if="user.role === 'admin'" to="/admin/dashboard" class="dropdown-item">Admin Dashboard</nuxt-link>
                                <div class="text-center">
                                    <button class="btn btn-default"  v-on:click="logout()">Ausloggen</button>
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
    watch: {
        '$route' () {  
            var navbarOpenedOnMobile = $("#navbarCollapse").is(":visible");
            //if the route changed and the navbar collapse is opened -> close it
            if(navbarOpenedOnMobile){
                $('.navbar-toggler').click();
            }
            // $(".navbar-toggler").collapse('hide');
            // var isExpanded = $('navbarCollapse').attr('aria-expanded') === true;
            // alert(isExpanded);
            // $('.navbar-toggler').click();
        }
    },
    mounted(){
        /* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
        var prevScrollpos = window.pageYOffset;
        window.onscroll = function() {
            var currentScrollPos = window.pageYOffset;
            //if scrolled up -> show navbar
            if (prevScrollpos >= currentScrollPos) {
                document.getElementById("navbar").style.top = "0";
                //get the witdh
                var screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
                if(screenWidth >= 600){
                    if(currentScrollPos < 170){
                        //show navbar transparent
                        $("#navbar").removeClass("bg-light").addClass("bg-transparent")
                    }else{
                        //show navbar light
                        $("#navbar").removeClass("bg-transparent").addClass("bg-light")
                    }
                }
            } 
            //if scrolled down -> hide navbar
            else {
                document.getElementById("navbar").style.top = "-80px";
            }
            prevScrollpos = currentScrollPos;
        }
    },
    methods: {
        logout(){
            this.$auth.logout();
        }
    }
}
</script>
<style scoped>
#navbar {
    background-color: transparent;
    transition: top 0.3s; /* Transition effect when sliding down (and up) */
}

/*on mobile devices show navbar white*/
@media only screen and (max-width: 600px) {
    #navbar{
        background-color: white;
    }
}
</style>
