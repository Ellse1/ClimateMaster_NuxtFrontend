<template>
    <div>
        <!-- Infomessage CompanyPictures -->
        <div class="text-center pt-4">
            <h3 v-if="companySlideshowimages.length >= 1" >Wir und unsere Arbeit</h3>
        </div>

        <p v-if="companySlideshowimages.length >= 3 && addForm == true">Bild immer an Position 1 Löschen</p>
        <div class="row">
            <!-- Add image -->
            <div class="col-md-3 mb-2" v-if="addForm == true">
                <div class="card card-body">
                    <label for="id_inputfile_slideshowimage">
                        <font-awesome-icon id="id_icon_camera" icon="camera" style="font-size: 60px;"/> 
                    </label>
                    <input type="file" v-on:change="imageInputChanged" ref="slideshowimage" id="id_inputfile_slideshowimage" style="display:none">
                    <input class="form-control text-center" v-model="caption" maxlength="15" placeholder="Stichwort zum Bild"/>
                    <button class="btn btn-default border mt-1" v-on:click="saveSlideshowImage">Speichern</button>
                </div>
            </div>

            <!-- If more than 2 pictures inside -->
            <div class="col-md-9 mx-auto" v-if="companySlideshowimages.length >= 3">
                <div class="row mx-auto my-auto">
                    <div id="id_div_carousel_companyPictures" class="carousel slide w-100" data-ride="carousel">
                        <div class="carousel-inner w-100" role="listbox">
                            
                            <div v-for="(slideshowimage, index) in companySlideshowimages" class="carousel-item" v-bind:key="slideshowimage.id" v-bind:id="slideshowimage.id" >
                                <div class="col-md-4">
                                    <div class="card" style="height:200px;">
                                        <img class="card-img" :src="`https://www.climate-master.com:8000/images/companyImages/slideshowimages/${slideshowimage.image_name}`">
                                        <div class="card-img-overlay text-center">
                                            <div class="rounded" style="background-color:rgba(247, 247, 247, 0.3)">
                                                <h5 class="card-title" style="margin-top:140px;">{{slideshowimage.caption}}</h5>
                                            </div>
                                        </div>
                                    </div>
                                     <!-- Button to delete slideshowimage -->
                                    <button v-if="addForm == true" :id="`id_button_delete_${slideshowimage.id}`" class="btn btn-default border" v-on:click="deleteSlideshowimage(slideshowimage.id, index);">Löschen</button>
                                </div>
                            </div>

                        </div>
                        <a class="carousel-control-prev w-auto" href="#id_div_carousel_companyPictures" role="button" data-slide="prev">
                            <span class="carousel-control-prev-icon bg-dark border border-dark rounded-circle" aria-hidden="true"></span>
                            <span class="sr-only">Previous</span>
                        </a>
                        <a class="carousel-control-next w-auto" href="#id_div_carousel_companyPictures" role="button" data-slide="next">
                            <span class="carousel-control-next-icon bg-dark border border-dark rounded-circle" aria-hidden="true"></span>
                            <span class="sr-only">Next</span>
                        </a>

                    </div>

                </div>
            </div>
            <div class="col-md-9 mx-auto row" v-else>
                <div v-for="(slideshowimage, index) in companySlideshowimages" v-bind:key="slideshowimage.id" class="col-md-4 mx-auto">
                    <div class="card" style="height:200px;overflow:hidden;">
                        <img class="card-img" :src="`https://www.climate-master.com:8000/images/companyImages/slideshowimages/${slideshowimage.image_name}`">
                        <div class="card-img-overlay text-center">
                            <div class="rounded" style="background-color:rgba(247, 247, 247, 0.3)">
                                <h5 class="card-title" style="margin-top:140px;">{{slideshowimage.caption}}</h5>
                            </div>
                        </div>
                    </div>
                    <!-- Button to delete slideshowimage -->
                    <button v-if="addForm == true" class="btn btn-default border" v-on:click="deleteSlideshowimage(slideshowimage.id, index);">Löschen</button>
                </div>
            </div>

            <notification v-if="error" :message="error" class="text-danger mt-1 mx-auto" />
            <notification v-if="success && addForm" :message="success" class="text-success mt-1 mx-auto" />


        </div>



    </div>
</template>
<script>
import notification from "~/components/MainComponents/Notification";
export default {
    props: ['company_id', 'addForm'],
    components:{
        notification
    },
    data(){
        return{
            error: null,
            success: null,
            caption: null,
            companySlideshowimages: []
        }
    },
    async mounted(){    
        // Get the slideshowimages from database
        try {
            const{data} = await this.$axios.get('companyslideshowimage/getSlideshowimageByCompanyID', {
            params: {
                company_id: this.company_id
            }});

            if(data.state == "error"){
                this.error = data.message;
                this.success = null
            }
            else if(data.state == "success"){
                this.success = null; //Dont need to show "all came out of Database"  
                this.error = null;
                this.companySlideshowimages = data.data;
            }
            else{
                this.error = "Error. Wir konnten keine slideshowimages laden.";
            }

        } catch (e) {
            this.error = "Error. Wir konnten leider keine slideshowimages laden. Versuchen sie es später noch einmal.";
        }



    },
    updated(){
        var firstItem = true;
        $('.carousel .carousel-item').each(function(){  
            
            var minPerSlide = 3;

            //Set firt item to active
            if(firstItem){
                $(this).addClass("active");
                firstItem = false;
                // Add delete button
            }


            var next = $(this).next();
            if (!next.length) {
            next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));
            
            for (var i=0;i<minPerSlide;i++) {
                next=next.next();
                if (!next.length) {
                    next = $(this).siblings(':first');
                }
                
                next.children(':first-child').clone().appendTo($(this));
            }
        
        });
    },
    methods:{
        async saveSlideshowImage(){            
            let slideshowimage = this.$refs.slideshowimage.files[0];
            $("#id_icon_camera").removeClass("text-success");

            let formData = new FormData;
            formData.append('company_id', this.company_id);
            formData.append('caption', this.caption);
            formData.append('slideshowimage', slideshowimage);

            try {
                const{data} = await this.$axios.post('companyslideshowimage/store', 
                formData, {
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
                    this.companySlideshowimages.push(data.data);
                    this.caption = null;
                }
                else{
                    this.error = "Das Bild konnte nicht gespeichert werden. Das tut uns leid!"
                }

            } catch (e) {
                this.error = "Error, Bild konnte nicht gespeichert werden: " + e.response.data.message;
            }
        },
        imageInputChanged(){
            $("#id_icon_camera").addClass("text-success");
        },
        async deleteSlideshowimage(slideshowimageID, index){
            alert('id: ' + slideshowimageID);
            alert('index' + index);
            try {
                const{data} = await this.$axios.post("companyslideshowimage/destroy",{
                    id: slideshowimageID
                });
                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                else if(data.state == "success"){
                    this.error = null;
                    this.success = data.message;
                    this.companySlideshowimages.splice(index, 1)
                }
                else{
                    this.error = "Das Slideshowimage konnte leider nicht gelöscht werden. Versuchen Sie es später noch einmal.";
                }
            } catch (e) {
                this.error = e.response.data.message;
            }
        }
    }
}
</script>
<style scoped>

#id_icon_camera:hover{
    cursor: pointer;
}

@media (max-width: 768px) {
    .carousel-inner .carousel-item > div {
        display: none;
    }
    .carousel-inner .carousel-item > div:first-child {
        display: block;
    }
}

.carousel-inner .carousel-item.active,
.carousel-inner .carousel-item-next,
.carousel-inner .carousel-item-prev {
    display: flex;
}

/* display 3 */
@media (min-width: 768px) {
    
    .carousel-inner .carousel-item-right.active,
    .carousel-inner .carousel-item-next {
      transform: translateX(33.333%);
    }
    
    .carousel-inner .carousel-item-left.active, 
    .carousel-inner .carousel-item-prev {
      transform: translateX(-33.333%);
    }
}

.carousel-inner .carousel-item-right,
.carousel-inner .carousel-item-left{ 
  transform: translateX(0);
}
</style>