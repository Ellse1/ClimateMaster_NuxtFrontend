<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="container text-center mt-3 border border-success rounded" style="max-width:400px;">
                <!-- <h1 class="display-3"><b><span class="text-success">Climate</span>Master 2020</b></h1> -->
                <h2>Melde dich hier an und werde noch 2020 umweltfreundlich klimaneutral.</h2>

                <form class="mt-5">
                    <div class="container" style="">
                        <div class="row">
                            <div class="col">
                                <input class="form-control" v-model="firstname" placeholder="Vorname"/>
                            </div>
                            <div class="col">
                                <input class="form-control" v-model="lastname" placeholder="Nachname"/>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col">
                                <input class="form-control" v-model="email" placeholder="E-Mail"/>
                            </div>
                        </div>
                    </div>
                    <button class="btn btn-success mt-2">ClimateMaster 2020 werden</button>
                </form>

                <div class="mt-5 mb-3">
                    Wir schicken dir einen Bestätigungslink. Folge dem Link und bestätige, dass du schon 2020
                    vorbildlich, umweltfreundlich klimaneutral werden willst.
                </div>

            </div>
            </div>
        </div>
    </div>
</template>

 <script>
export default {
    layout: 'indexLayout',
    data(){
        return{
            firstname: '',
            lastname: '',
            email: ''
        }
    }
}
 </script>

<style>

#id_container_climatemaster2020{
    max-width: 400px;
}
@media only screen and (max-width: 600px){
#id_container_climatemaster2020{
    max-width: 90%;
}
}

</style>