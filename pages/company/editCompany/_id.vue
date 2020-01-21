<template>
    <div>
        <div class="container">

            <div id="id_div_loading_animation"></div>
            <notification :message="error" v-if="error" class="text-danger mt-2 text-center" />


            <div class="bg-light pb-3 mb-4 text-center" style="min-height:600px;position:relative">

                <div style="position:relative;top:0px;left:0px;width:100%;" class="text-center">
                    <label for="id_input_headerImage" id="id_label_headerImage" class="text-center bg-white" style="height:200px;width:100%">
                        <!-- If image Exists -->
                        <div  v-if="header_image_name" class="h-100" style="overflow:hidden;width:100%height:100%;">
                            <img id="id_img_headerImage" class="img-fluid" :src="`https://www.climate-master.com:8000/images/companyImages/headerImages/${header_image_name}`" />
                        </div>
                        <h2 v-if="header_image_name === null">Banner hochladen</h2>
                    </label>

                    <!-- Logo -->
                    <div style="position:relative;top:-140px;margin:auto;width:200px;">
                        <div style="position:relative;">       
                            <label for="id_input_logoImage" class="text-center" id="id_label_logoImage">
                                <div class="border bg-white border-dark mx-auto" style="border-radius:50%;width:200px;height:200px;overflow:hidden;">
                                    <font-awesome-icon v-if="logo_image_name == null" icon="user-circle" class="mx-auto mt-2" style="font-size:160px;"/> 
                                    <img v-if="logo_image_name" :src="`https://www.climate-master.com:8000/images/companyImages/logoImages/${logo_image_name}`" class="h-100" />
                                    <p id="id_p_uploadHeaderImageAndLogoImage"><small class="text-danger">jpg, png, max:2MB</small></p>  
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <input type="file" id="id_input_headerImage" ref="headerImage" v-on:change="uploadHeaderImage" style="display:none;"/>
                <input type="file" id="id_input_logoImage" ref="logoImage" v-on:change="uploadLogoImage" style="display:none;"/>
                

                <!-- Input for company Data -->
                <div class="container" style="margin-top:-140px;">
                    <form @submit.prevent="updateCompany">

                        <div class="form-group col-md-8 mx-auto">
                            <input class="mt-5 form-control text-center" v-model="name" placeholder="Firmenname" style="font-size:30px;"/>
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" v-model="description" placeholder="Firmenbeschreibung" rows="5"></textarea>
                        </div>


                        <!-- Slideshow -->
                        <imageSlideshow :addForm="true" :company_id="this.$route.params.id" />


                        
                        <!-- Address -->
                        <div class="text-center pt-5">
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
                                <input type="email" v-model="email" class="form-control" placeholder="Kontakt E-Mail" />
                            </div>
                        </div>

                        <div class="text-center mt-2">
                            <button id="id_button_save" type="submit" class="btn btn-success" >Änderungen speichern</button>
                        </div>

                        <!-- Button to go to company page -->
                        <div class="text-center mt-2">
                            <nuxt-link :to="{name: 'company-showCompany-id', params:{ id:this.id}}" class="btn btn-success">Firmenauftritt ansehen</nuxt-link>
                        </div>

                        <notification :message="error" v-if="error" class="text-danger mt-2 text-center" />
                        <notification :message="success" v-if="success" class="text-success mt-2 text-center" />


                    </form>
                </div>


            </div>

        </div>
    </div>
</template>
<script>
import notification from '~/components/MainComponents/Notification';
import imageSlideshow from '~/components/Company/imageSlideshow';
export default {
    middleware: 'auth',
    validate ({ params }) {
        // Must be a number
        return /^\d+$/.test(params.id)
    },
    components:{
        notification,
        imageSlideshow
    },
    data(){
        return{
            error: null,
            success: null,
            logo_image_name: null,
            header_image_name: null,
            id: null,
            climadvice_name: null,
            name: null,
            description: null,
            street: null,
            house_number: null,
            postcode: null,
            residence: null,
            email: null
        };
    },
    async mounted(){
        $('#id_div_loading_animation').addClass("loading-animation");
        try {
            const{data} = await this.$axios.get('company/getCompany',{
                params:{
                    id: this.$route.params.id
                }
            });

            if(data.state == 'error'){
                this.error = data.message;
                this.success = null
            }
            else if(data.state == 'success'){
                this.id = data.data.id;
                this.logo_image_name = data.data.logo_image_name;
                this.header_image_name = data.data.header_image_name;
                this.climadvice_name = data.data.climadvice_name;
                this.name = data.data.name;
                this.description = data.data.description;
                this.street = data.data.street;
                this.house_number = data.data.house_number;
                this.postcode = data.data.postcode;
                this.residence = data.data.residence;
                this.email = data.data.email;
            }


        } catch (e) {
            this.error= "Error" + e.response.data.message;   
        }


        $('#id_div_loading_animation').removeClass("loading-animation");
    },
    methods:{
        async updateCompany(){
            
            $('#id_button_save').addClass("loading-animation");

            let formData = new FormData();
            formData.append('id', this.id)
            formData.append('climadvice_name', this.climadvice_name);
            formData.append('name', this.name);
            formData.append('description', this.description);
            formData.append('street', this.street);
            formData.append('house_number', this.house_number);
            formData.append('postcode', this.postcode);
            formData.append('residence', this.residence);
            formData.append('email', this.email);

            try {
                const{data} = await this.$axios.post("company/update", 
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
                    this.success = data.message;
                }
                else{
                    this.error = "Die Firma konnte nicht geändert werden. Probieren Sie es später noch einmal.";
                }

            } catch (e) {
                this.error = e.response.data.message;
            }

            $('#id_button_save').removeClass("loading-animation");

        },
        async uploadHeaderImage(){

            this.headerImage = this.$refs.headerImage.files[0];
            let formData = new FormData();
            formData.append('header_image', this.headerImage);
            formData.append('id', this.id); //Company ID

            try {
                const{data} = await this.$axios.post('company/storeHeaderImage',
                formData, {
                    headers:{
                        "Content-Type" : "multipart/Form-Data"
                    }
                })

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == "success"){
                    this.success = data.message;
                    this.header_image_name = data.data.header_image_name + "?random="+new Date().getTime();;
                    this.error = null;
                }
                else{
                    this.error = "Tut uns leid. Das HeaderImage konnte leider nicht gespeichert werden. Probieren Sie es später noch einmal."
                }

            } catch (e) {
                this.error = e.response.data.message;
            }

        },
        async uploadLogoImage(){
            this.logoImage = this.$refs.logoImage.files[0];
            let formData = new FormData();
            formData.append('logo_image', this.logoImage);
            formData.append('id', this.id); //Company ID

            try {
                const{data} = await this.$axios.post('company/storeLogoImage',
                formData, {
                    headers:{
                        "Content-Type" : "multipart/Form-Data"
                    }
                })

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == "success"){
                    this.success = data.message;
                    this.logo_image_name = data.data.logo_image_name + "?random="+new Date().getTime();;
                    this.error = null;
                }
                else{
                    this.error = "Tut uns leid. Das LogoImage konnte leider nicht gespeichert werden. Probieren Sie es später noch einmal."
                }

            } catch (e) {
                this.error = e.response.data.message;
            }
        }
    }

}
</script>

<style scoped>
#id_label_headerImage:hover, #id_label_logoImage:hover{
    cursor: pointer;
}

#id_p_uploadHeaderImageAndLogoImage{
    display: none;;
}

#id_label_logoImage:hover #id_p_uploadHeaderImageAndLogoImage{
    display: block;
}



</style>