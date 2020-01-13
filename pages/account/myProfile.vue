<template>
    <div class="container bg-light pt-4" style="min-height:400px;">
        <h2 class="text-center">Mein ClimateMaster Profil</h2>
        <div class="row">

            <div class="col-md-6 mt-4">
                <h4 class="text-center">Meine Persönlichen Daten</h4>
                <div class="row">
                    <div class="col-6">
                        <input class="form-control text-center" v-model="user.firstname" disabled/>
                    </div>
                    <div class="col-6">
                        <input class="form-control text-center" v-model="user.lastname" disabled/>
                    </div>
                    <div class="col-12 mt-3">
                        <input class="form-control text-center" v-model="user.username" disabled/>
                    </div>
                    <div class="col-12 text-center mt-3">
                        <input class="form-control text-center" v-model="user.email" disabled/>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mt-4">
                <h4 class="text-center">Mein zu Hause</h4>
                <div class="row">
                    <div class="col-9">
                        <input class="form-control text-center" v-bind="user.street" placeholder="Staße"/>
                    </div>
                    <div class="col-3">
                        <input class="form-control text-center" v-model="user.house_number" placeholder="Nr."/>
                    </div>
                    <div class="col-4 text-center mt-3">
                        <input class="form-control text-center" v-model="user.postcode" placeholder="Plz."/>
                    </div>
                    <div class="col-8 text-center mt-3">
                        <input class="form-control text-center" v-model="user.residence" placeholder="Wohnort" />
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-12 mt-4 text-center" >
            <button class="btn btn-success mb-4 " style="width:90%">Änderungen speichern</button>
        </div>

    </div>
</template>
<script>
export default {
    middleware: 'auth',
    data(){
        return{
             username: ''
        };
    }
}
</script>