<template>
    <div>
        <!-- To create a nice image to present progress -->

        <h4>Imagecreator</h4>
        <div style="" class="row" v-if="picture_single_for_imagecreator != null">
            <!-- Picture for Image Creator -->
            <div class="col-md-8 mb-2 border border-dark rounded h-100" style="padding:0px;">
                <!-- Message if no picture -->
                <div id="id_div_message_no_picture_for_imagecreator" v-if="picture_single_for_imagecreator == null">
                    <p class="mt-3">Lade ein Bild hoch und gestalte dieses, um andere Menschen von Umweltschutz und Klimaschutz zu überzeugen.</p>
                </div>
                <!-- Picture -->
                <img class="img-fluid rounded" v-if="picture_single_for_imagecreator != null" :src="'data:image/jfif;base64,'+picture_single_for_imagecreator.picture_base64">
                <!-- LOGO -->
                <div style="position:absolute;top:0px;left:10px;width:80px;">
                    <img class="img-fluid" src="~/static/pictures/generalPictures/LogoTransparent.png" style="position:absolute;top:0px;left:0px;"/>
                </div>
                <!-- ClimateMaster Text -->
                <!-- <div class="text-center w-100 ui-draggable-handle" style="position:absolute;bottom:30px;"> -->
                
                <div style="position:absolute;bottom:10px;background-color:rgba(247, 247, 247, 0.3)" class="w-100 mx-auto">
                    <h2><span class="text-success">Climate</span>Master 2020</h2>
                </div>
                <!-- </div> -->
            </div>
            <!-- Area to edit picture -->
            <div class="col-md-4">
                <button class="btn btn-default border-dark" v-on:click="downloadPicture">Dieses Bild herunterladen</button>
                
                <div class="mt-4">
                    <h6>Dieses Bild veröffentlichen</h6>
                    <toggle-button :sync="true" v-model="picture_single_for_imagecreator.sharing_permitted" @change="sharingPermittetChanged()"/><br>
                    <div v-if="picture_single_for_imagecreator.sharing_permitted == false">
                        Aktuell: nicht veröffentlichen!
                    </div>
                    <p v-if="picture_single_for_imagecreator.sharing_permitted == false">
                        Lieber {{user.firstname}},<br>Es ist wirklich super, dass du dich so konsequent für nachhaltigen Klimaschutz einsetzt
                        und mit deiner Investition in Vermeidung von Treibhausgasen einen großen Beitrag zum Klimaschutz leistest. Falls du einverstanden bist, würden wir
                        dich gerne als Paradebeispiel auf unseren Social-Media Plattformen präsentieren. Konkret würden wir dieses Bild gerne mit Vornamen und Wohnort auf Facebook (ClimateMaster), Instagram
                        (climatemasterandfriends) und in unserer Whatsapp Story veröffentlichen. Nur wenn du einverstanden bist!
                    </p>
                    <p v-if="picture_single_for_imagecreator.sharing_permitted == true" class="text-success">
                        Dankeschön!!!
                    </p>
                </div>

            </div>
        </div>

        <label id="id_label_upload_picture" for="id_picture_for_imagecreator" class="btn btn-default border rounded">
            Neues Bild hochladen<br>
            <small class="text-danger">png, jpg, Max:2MB</small>
        </label>
        <input type="file" class="mt-2" ref="image" id="id_picture_for_imagecreator" v-on:change="handleImageUpload" style="display:none;"/>

        <notification v-if="error" :message="error" class="text-danger mt-2" />
        <notification v-if="success" :message="success" class="text-success mt-2" />

        <h5>Hochgeladene Bilder</h5>
        <!-- All pictures -->
        <div class="row">
            <div v-for="(picture, index) in pictures_for_imagecreator" style="max-height:200px;overflow:hidden;" class="col-md-4 mt-4 mb-4" v-bind:key="picture.id">
                <div class="mx-auto border rounded h-100 card" style="width:100%" v-on:click="showPictureToCreate(index)">
                    <img class="img-fluid" style="position:relative;" v-bind:id="picture.id" :src="'data:image/jfif;base64,'+picture.picture_base64">
                    <!-- to delete a picture -->
                    <div class="text-danger" style="position:absolute;right:0px;top:0px;font-size:30px;transform:rotate(45deg);" v-on:click="deletePicture(index)">
                        +
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import notification from '~/components/MainComponents/Notification';

export default {
    components:{
        notification
    },
    data(){
        return{
            error: null,
            success: null,
            pictures_for_imagecreator: {},
            picture_single_for_imagecreator: null,
            sharing_permitted: true
        }
    },
    async mounted(){
        //Get picture_for_imagecreator if available   
        try {
            const{data} = await this.$axios.post("picture_for_imagecreator/getPicturesOfCurrentUser");
            
            if(data.state == 'error'){
                this.error = data.message;
                this.success = null;
            }
            if(data.state != 'error'){

                //dont show message "no image"
                $("#id_div_message_no_picture_for_imagecreator").hide();

                this.pictures_for_imagecreator = data.data;
                //Show first picture in big div
                //set 0 = false, 1 = true
                this.pictures_for_imagecreator[0].sharing_permitted = !!+this.pictures_for_imagecreator[0].sharing_permitted
                this.picture_single_for_imagecreator = this.pictures_for_imagecreator[0];
            }
        } catch (e) {
            this.error = "Error. Konnte das Picture_for_imagecreator nicht laden. " + e.response.data.message;
        }

    },
    methods:{
        async handleImageUpload(){
            $("#id_label_upload_picture").addClass("loading-animation-green");

            var picture_for_imagecreator = this.$refs.image.files[0];

            let formData = new FormData();
            formData.append('picture_for_imagecreator', picture_for_imagecreator);

            try {
                const{data} = await this.$axios.post('picture_for_imagecreator/store', 
                formData, {
                    headers:{
                        'Content-Type' : 'multipart/form-data'
                    }
                })

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else{
                    this.error = null;
                    this.success = data.message;
                    //Give picture to pictures list
                    this.pictures_for_imagecreator.push(data.data);
                    //set 0 = false and 1 = true
                    data.data.sharing_permitted = !!+data.data.sharing_permitted
                    this.picture_single_for_imagecreator = data.data;

                    this.error = null;
                    this.success = data.message;

                    //dont show message "no image"
                    $("#id_div_message_no_picture_for_imagecreator").hide();
                }

            } catch (e) {
                this.succes = null;
                this.error = "Tut uns leid, das Picture konnte leider nicht gespeichert werden: " + e.response.data.message;
            }

            $("#id_label_upload_picture").removeClass("loading-animation-green");
        },
        showPictureToCreate(index){
            //set 1 = true and 0 = false
            this.pictures_for_imagecreator[index].sharing_permitted = !!+this.pictures_for_imagecreator[index].sharing_permitted
            this.picture_single_for_imagecreator = this.pictures_for_imagecreator[index];

            //dont show message "no image"
            $("#id_div_message_no_picture_for_imagecreator").hide();          
        },
        async deletePicture(index){
            var id = this.pictures_for_imagecreator[index].id;

            try {
                const{data} = await this.$axios.post('picture_for_imagecreator/destroy',{
                    id: id
                })

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == "success"){
                    this.error = null;
                    this.success = data.message;
                    this.pictures_for_imagecreator.splice(index, 1);
                    this.picture_single_for_imagecreator = null;
                }
                else{
                    this.success = null;
                    this.error = "Tut uns leid, das Bild konnte leider nicht gelöscht werden. "
                }
            } catch (e) {
                this.success = null;
                this.error = "Tut uns leid, das Bild konnte leider nicht gelöscht werden. " + e.response.data.message;
            }
        },
        async downloadPicture(){
            var id = this.picture_single_for_imagecreator.id;
            try {
                const{data} = await this.$axios.post("picture_for_imagecreator/download", {
                    id : this.picture_single_for_imagecreator.id
                });

                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == "success"){
                    
                    this.error = null;
                    this.success = data.message;

                    // atob to base64_decode the data-URI
                    var image_data = atob(data.picture_base64);
                    // Use typed arrays to convert the binary data to a Blob
                    var arraybuffer = new ArrayBuffer(image_data.length);
                    var view = new Uint8Array(arraybuffer);
                    for (var i=0; i<image_data.length; i++) {
                        view[i] = image_data.charCodeAt(i) & 0xff;
                    }
                    try {
                        // This is the recommended method:
                        var blob = new Blob([arraybuffer], {type: 'application/octet-stream'});
                    } catch (e) {
                        // The BlobBuilder API has been deprecated in favour of Blob, but older
                        // browsers don't know about the Blob constructor
                        // IE10 also supports BlobBuilder, but since the `Blob` constructor
                        //  also works, there's no need to add `MSBlobBuilder`.
                        var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder);
                        bb.append(arraybuffer);
                        var blob = bb.getBlob('application/octet-stream'); // <-- Here's the Blob
                    }
                    // Use the URL object to create a temporary URL
                    var url = (window.webkitURL || window.URL).createObjectURL(blob);
                    //download image
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    a.href = url;
                    a.download = "ClimateMaster picture.jpg";
                    a.click();
                    window.URL.revokeObjectURL(url);

                }
            } catch (error) {
                
            }
        },
        async sharingPermittetChanged(){
            try {
                const{data} = await this.$axios.post("picture_for_imagecreator/updateSharingPermitted",{
                    id: this.picture_single_for_imagecreator.id,
                    sharing_permitted: this.picture_single_for_imagecreator.sharing_permitted
                });

                if(data.state == 'error'){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == "success"){
                    this.success = data.message;
                    this.error = null;
                }
                else{
                    this.error = "Die Berechtigung konnte leider nicht gespeichert werden. Versuchen Sie es später noch einmal."
                }
                
            } catch (e) {
                this.error = "Die Berechtigung konnte leider nicht gespeichert werden. Versuchen Sie es später noch einmal." + e.response.data.message;
            }
        }

    }
}
</script>
