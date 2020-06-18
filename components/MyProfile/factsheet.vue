<template>
    <div>
        <div class="container bg-light pt-2">

            <!-- Show link to make profile public  -->
            <div v-if="public_user_profile != null && profile_picture_name != null" class="mb-3 text-center">
                <div v-if="public_user_profile.public == false">
                    <nuxt-link  style="width:90%;" to="/account/myProfile?page=publish">
                        Profil sichtbar machen
                        <font-awesome-icon icon="check-circle" style="font-size:20px;" />
                    </nuxt-link>            
                </div>
            </div>
            
            <!-- For profile picture -->
            <div class="text-center ">
                <h4>Profilbild</h4>
                <label for="id_profilePicture">
                    <div class="border border-dark pl-3 pr-3 pt-3" style="border-radius:50px;" id="id_div_uploadProfilePicture">
                        <!-- icon if no profile_picture -->
                        <font-awesome-icon v-if="profile_picture_name == null" icon="user-circle" id="id_icon_profile_picture" style="font-size: 200px;"/> 
                        <div id="id_div_loading" class="bg-success rounded mt-2 mb-2" style="width:50%;margin:auto;"></div>
                        <!-- image if profile picture available -->
                        <div  id="id_div_profilePicture" style="width:200px;height:200px;border-radius:50%;overflow:hidden;display:none;" class="border bg-dark">
                            <img id="id_img_profilePicture" v-on:load="profilePicture_onload">
                        </div>
                        
                        <small id="id_message_typeAndSize_profilePicture" class="text-danger">
                            jpg, png, max:6MB<br>
                        </small>
                        <small>
                            Bild hochladen
                        </small>
                    </div>

                </label>
                <input type="file" class="mt-2" ref="image" id="id_profilePicture" name="profilePicture" v-on:change="handleImageUpload" style="display:none;" accept="image/*"/>
                
         


                <!-- Notification for profile picture -->
                <notification :message="error_profile_picture" v-if="error_profile_picture" class="text-danger mt-3" />
                <notification :message="success_profile_picture" v-if="success_profile_picture" class="text-success mt-3" />

                <!-- Message if no profile picture is there -->
                <div class="text-danger" v-if="profile_picture_name == null && profile_picture_base64_for_public_profile == null">
                    Für das Anzeigen deines Profiles, brauchst du ein Profilbild
                </div>    
            </div>

        
  


            <div class="row">
                <!-- General information -->
                <div class="col-md-6 mt-4">
                    <h4 class="text-center">Meine Kontodaten</h4>
                    <div class="row">
                        <div class="col-6">
                            <input class="form-control text-center" v-model="firstname" disabled/>
                        </div>
                        <div class="col-6">
                            <input class="form-control text-center" v-model="lastname" disabled/>
                        </div>
                        <div class="col-12 mt-3">
                            <input class="form-control text-center" v-model="username" disabled/>
                        </div>
                        <div class="col-12 text-center mt-3">
                            <input class="form-control text-center" v-model="email" disabled/>
                        </div>
                    </div>
                </div>
                <!-- Privat Data (Street...) -->
                <div class="col-md-6 mt-4">
                    <h4 class="text-center">Mein zu Hause</h4>
                    <div class="row">
                        <div class="col-9">
                            <input class="form-control text-center" v-model="street" placeholder="Staße"/>
                        </div>
                        <div class="col-3">
                            <input class="form-control text-center" v-model="house_number" placeholder="Nr."/>
                        </div>
                        <div class="col-4 text-center mt-3">
                            <input type="number" class="form-control text-center" v-model="postcode" placeholder="Plz."/>
                        </div>
                        <div class="col-8 text-center mt-3">
                            <input class="form-control text-center" v-model="residence" placeholder="Wohnort" />
                        </div>
                        
                    </div>
                </div>

                <!-- Social Media Information -->
                <div class="col-md-6 text-center mt-3 mx-auto">
                    <h4>Social Media</h4>
                    <div class="row">
                        <!-- Instagram name -->
                        <div class="col-9 text-center mt-3">
                            <input class="form-control text-center" v-model="instagram_name" placeholder="Instagram Name" />
                        </div>
                        <div class="col-3 btn-group dropleft mt-3" >
                            <button class="btn btn-default border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">?</button>
                            <div class="dropdown-menu p-2">
                                <p> 
                                    Wenn du auf deinem Instagram Account ein ClimateMaster Bild hochlädst, folgen wir dir mit 
                                    unserem offiziellen Account (climatemasterandfriends). Damit können sich ClimateMaster noch besser vernetzen.
                                </p>
                            </div>
                        </div>
                        <!-- Facebook name -->
                        <div class="col-9 text-center mt-3">
                            <input class="form-control text-center" v-model="facebook_name" placeholder="Facebook Name" />
                        </div>
                        <div class="col-3 btn-group dropleft mt-3" >
                            <button class="btn btn-default border dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">?</button>
                            <div class="dropdown-menu p-2">
                                <p> 
                                    Wir können auf Facebook deinen persönlichen Fortschritt für Klimaschutz präsentieren und dich dann auf den 
                                    entsprechenden Posts direkt markieren.
                                </p>
                            </div>
                        </div>
                        <!-- <div class="col-12 text-center mt-3">
                            <input class="form-control text-center" v-model="whatsapp_number" placeholder="Whatsapp Number" />
                        </div> -->
                    </div>
                </div>
            </div>

            <div class="col-md-12 mt-4 text-center" >
                <button id="id_button_save" class="btn btn-success mb-2 " style="" v-on:click="saveAddressAndSocialMediaInformation">Änderungen speichern</button>

                <notification :message="error" v-if="error" class="text-danger mt-3" />
                <notification :message="success" v-if="success" class="text-success mt-3" />
            </div>
        </div>
    </div>
</template>
<script>
import notification from "~/components/MainComponents/Notification"

export default {
    props: ['public_user_profile'],
    components:{
        notification,
    },
    data(){
        return{
            error_profile_picture: null,
            success_profile_picture:null,
            error:null,
            success: null,
            profile_picture_name: null,
            firstname: null,
            lastname: null,
            username: null,
            email: null,
            street: null,
            house_number: null,
            postcode: null,
            residence: null,
            instagram_name: null,
            facebook_name: null,
            whatsapp_number: null,
            profile_picture_base64_for_public_profile: null,
        };
    },
    async mounted(){

        //Get the updated UserData of loggedIn User
        $("#id_div_loading").addClass("loading-animation");
        try {
            const{data} = await this.$axios.get("/user");

            if(data.state == 'error'){
                this.error = data.message;
                this.success = null;
            }
            if(data.state == 'success'){
                this.firstname = data.data.firstname;
                this.lastname = data.data.lastname;
                this.username = data.data.username;
                this.email = data.data.email,
                this.profile_picture_name = data.data.profile_picture_name;
                this.street = data.data.street;
                this.house_number = data.data.house_number;
                this.postcode = data.data.postcode;
                this.residence = data.data.residence;
                this.instagram_name = data.data.instagram_name;
            }

        } catch (error) {
            this.error = "Error: Konnte den aktullen User nicht bekommen" + error.response.data.message;
        }

        //Get profile Picture if available   
        try {
            const{data} = await this.$axios.post("user/getProfilePicture_ByCurrentUser");
            
            if(data.state == 'error'){
                this.error_profile_picture = data.message;
                this.success = null;
            }
            else if(data.state == 'success'){
                var rawResponse = data.image_base64;
                this.profile_picture_base64_for_public_profile = rawResponse;
                //Give picture to element
                $("#id_img_profilePicture").attr('src', 'data:image/jfif;base64,'+rawResponse);

                //Show right element
                $("#id_div_profilePicture").show();
                $("#id_img_profilePicture").show();
                $("#id_icon_profile_picture").hide();
            }

            else{
                this.error = "Das profilbild konnte nicht geholt werden."
            }
        } catch (e) {
            this.error = "Error. Konnte das Profilbild nicht laden. " + e.response.data.message;
        }
        
        $("#id_div_loading").removeClass("loading-animation");
    },
    methods:{

        async handleImageUpload(){

            $("#id_div_loading").addClass("loading-animation");

            this.profilePicture = this.$refs.image.files[0];

            //check client site, if size is to big
            var filesize = ((this.profilePicture.size/1024)/1024).toFixed(4); // MB

            if(filesize <= 8 ){

                let formData = new FormData();
                formData.append('profilePicture', this.profilePicture);

                try {
                    const{data} = await this.$axios.post('user/addProfilePicture_ByCurrentUser', 
                    formData, {
                        headers:{
                            'Content-Type' : 'multipart/form-data'
                        }
                    })
                    if(data.state == "error"){
                        this.error_profile_picture = data.message;
                        this.success_profile_picture = null;
                    }
                    else if(data.state == "success"){
                        this.error_profile_picture = null;
                        this.success_profile_picture = data.message;

                        var rawResponse = data.image_base64;
                        this.profile_picture_base64_for_public_profile = rawResponse;
                        //Give picture to element
                        $("#id_img_profilePicture").attr('src', 'data:image/jfif;base64,'+rawResponse);
                        $("#id_img_profilePicture_display_none").attr('src', 'data:image/jfif;base64,'+rawResponse);

                        
                        //Show right element
                        $("#id_div_profilePicture").show();
                        $("#id_img_profilePicture").show();
                        $("#id_icon_profile_picture").hide();

                    }
                    else{
                        this.success_profile_picture = null;
                        this.error_profile_picture = "Das Bild konnte nicht gespeichert werden."
                    }
                    
                } catch (e) {
                    this.success_profile_picture = null;
                    this.error_profile_picture = "Das Bild konnte nicht gespeichert werden. Vermutlich stimmt die Größe oder das Format nicht. Versuche es mit einem anderen Bild.";
                }
            }
            //If filesize to big:
            else{
                this.error_profile_picture = "Das Bild ist zu groß (" + filesize + " MB)  und kann deshalb nicht hochgeladen werden. Maximal 8 MB sind erlaubt."
            }

            $("#id_div_loading").removeClass("loading-animation");

        },

        async saveAddressAndSocialMediaInformation(){
            $("#id_button_save").addClass("loading-animation");

            let formData = new FormData();
            if(this.street != null){
                formData.append('street', this.street);
            }
            if(this.house_number != null){
                formData.append('house_number', this.house_number);               
            }
            if(this.postcode != null){
                formData.append('postcode', this.postcode);
            }
            if(this.residence != null){
                formData.append('residence', this.residence);            
            }
            if(this.instagram_name != null){
                formData.append('instagram_name', this.instagram_name);            
            }
            if(this.facebook_name != null){
                formData.append('facebook_name', this.facebook_name);            
            }            
            if(this.whatsapp_number != null){
                formData.append('whatsapp_number', this.whatsapp_number);            
            }

            try {
                const{data} = await this.$axios.post("user/saveAddressAndSocialMediaInformation_ByCurrentUser",
                formData,{
                    headers:{
                        "Content-Type" : "multipart/form-data"
                }
                });

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == 'success'){
                    this.success = data.message;
                    this.error = null;
                }
                else{
                    this.error = "Konnte nicht gespeichert werden, versuchen Sie es später noch einmal."
                }

            } catch (e) {
                this.error = e.response.data.message;
            }
            
            $("#id_button_save").removeClass("loading-animation");
        },

        async saveSocialMediaInformation(){

        },

        profilePicture_onload(){
            
            // Set the picture exactly to the middle
            $("#id_img_profilePicture").height('auto');
            $("#id_img_profilePicture").width('auto');
            $("#id_img_profilePicture").css('margin-left', 0);
            $("#id_img_profilePicture").css('margin-top', 0);

            var img = document.querySelector("#id_img_profilePicture");
            var image_width = img.clientWidth;
            var image_height =  img.clientHeight;

            //width > height
            //center image -> height:100%;
            if(image_width > image_height){
                var cropDownFactor = 200/image_height;
                $("#id_img_profilePicture").height('100%');
                // $("#id_img_profilePicture").width(image_width);

                var tooMuch = image_width-image_height;
                var marginLeft = ((tooMuch / 2)*(-1))*cropDownFactor;
                $("#id_img_profilePicture").css('margin-left', marginLeft);
            }
            //height > width
            //center image -> widht: 100%
            else if(image_height > image_width){
                var cropDownFactor = 200/image_width;
                $("#id_img_profilePicture").width('100%');
                // $("#id_img_profilePicture").css('height', 'auto');
                var tooMuch = image_height-image_width;
                var marginTop = ((tooMuch / 2)*(-1))*cropDownFactor;
                $("#id_img_profilePicture").css('margin-top', marginTop);
            }
            //height and width equals
            else{
                $("#id_img_profilePicture").width('100%');
            }

        }
    }
}
</script>
    
<style  scoped>
#id_div_uploadProfilePicture:hover{
    box-shadow: 0 0 10px gray;
    cursor: pointer;
}
#id_message_typeAndSize_profilePicture{
    display: none;
}
#id_div_uploadProfilePicture:hover #id_message_typeAndSize_profilePicture {
    display: block;
}
</style>