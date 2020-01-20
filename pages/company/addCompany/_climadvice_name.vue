<template>
    <div>
        <div class="container">
            <div class="bg-light pb-3 mb-4" style="min-height:600px;">
                <div for="id_input_headerImage" class="text-center pt-3 bg-white" style="height:200px;">
                    <p>Firmenbanner und Logo kann nach erstmaligem Speichern hochgeladen werden.</p>
                    <label>
                        <div class="border border-dark p-3" style="border-radius:50%;">
                            <font-awesome-icon icon="user-circle" style="font-size:130px;"/> 
                        </div>
                    </label>
                </div>

                
                <div class="container">
                    <form @submit.prevent="saveCompany">

                        <div class="form-group col-md-8 mx-auto">
                            <input class="mt-5 form-control text-center" v-model="name" placeholder="Firmenname" style="font-size:30px;"/>
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" v-model="description" placeholder="Firmenbeschreibung" rows="5"></textarea>
                        </div>

                        <!-- Infomessage CompanyPictures -->
                        <div class="bg-white text-center pt-5" style="min-height:200px;">
                            <h3>Bilder für die Slideshow können nach erstmaligem Speichern hochgeladen werden.</h3>
                        </div>
                        
                        <!-- Address -->
                        <div class="text-center">
                            <h4>Firmenanschrift</h4>
                        </div>
                        <div class="col-md-6 form-row mx-auto mt-2">
                            
                            <div class="col-10">
                                <input class="form-control" v-model="street" placeholder="Straße"/>
                            </div>
                            <div class="col-2">
                                <input class="form-control" v-model="house_number" placeholder="Nr." />                                
                            </div>
                            
                            <div class="col-4 mt-2">
                                <input type="number" v-model="postcode" class="form-control" placeholder="Plz." />
                            </div>
                            <div class="col-8 mt-2">
                                <input class="form-control" v-model="residence" placeholder="Ort" />
                            </div>
                            <div class="col-12 mt-2">
                                <input type="email" v-model="email" class="form-control text-center" placeholder="Kontakt E-Mail" />
                            </div>
                        </div>

                        <div class="text-center mt-2">
                            <button id="id_button_save" type="submit" class="btn btn-success" >Firma speichern</button>
                        </div>

                        <notification :message="error" v-if="error" class="text-danger mt-2 text-center" />

                    </form>
                </div>


            </div>

        </div>
    </div>
</template>
<script>
import notification from '~/components/MainComponents/Notification';
export default {
    middleware: 'auth',
    components:{
        notification
    },
    data(){
        return {
            error: null,
            success: null,
            id: null,
            name: null,
            description: null,
            street: null,
            house_number: null,
            postcode: null,
            residence: null,
            email:null,
        };
    },
    methods:{
        async saveCompany(){

            $('#id_button_save').addClass("loading-animation");

            let formData = new FormData();
            formData.append('climadvice_name', this.$route.params.climadvice_name);
            formData.append('name', this.name);
            formData.append('description', this.description);
            formData.append('street', this.street);
            formData.append('house_number', this.house_number);
            formData.append('postcode', this.postcode);
            formData.append('residence', this.residence);
            formData.append('email', this.email);

            try {
                const{data} = await this.$axios.post("company/store", 
                formData,{
                    headers:{
                        "Content-Type" : "form-data/multipart"
                    }
                });

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == 'success'){
                    this.error = null;
                    $('#id_button_save').removeClass("loading-animation");

                    this.$router.push({name: 'company-editCompany-id', params: {id: data.data.id}});
                }
                else{
                    this.error = "Die Firma konnte nicht gespeichert werden. Probieren Sie es später noch einmal.";
                }

            } catch (e) {
                this.error = e.response.data.message;
            }

            $('#id_button_save').removeClass("loading-animation");

        }
    }
}
</script>