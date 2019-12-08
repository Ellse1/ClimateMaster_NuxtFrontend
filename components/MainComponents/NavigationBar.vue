<template>
    <div class="bg-light border" id="navigationBar">
        <div class="container">
            <div class=" row">
                <nuxt-link class="col text-center h2 text-dark" to="/" exact-active-class="">Home</nuxt-link>
                <!-- <nuxt-link class="col text-center h2 text-dark" to="/blog/" exact-active-class="">Blog</nuxt-link> -->
                <nuxt-link class="col text-center h2 text-dark" to="/aboutUs" exact-active-class="">Wir</nuxt-link>
            </div>
        </div>

    </div>
</template>
<style scoped>
#navigationBar{
    opacity: 1;
     /* animation: fadeIn forwards linear 2s 1s;
    -webkit-animation: fadeIn forwards linear 2s 1s;  */
}


@-webkit-keyframes fadeIn {
  0% {opacity: 0;}
  100%{opacity: 1;}
}
@keyframes fadeIn {
  0% {opacity: 0;}
  100%{opacity: 1;}
}

</style>