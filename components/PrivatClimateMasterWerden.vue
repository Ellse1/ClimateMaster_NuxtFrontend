<template>
     <div class="container mt-5 pt-5 border-top mb-5">
        <h1 class="mb-3" id="id_privatClimateMasterWerden">Privat</h1>

        <div class="row">
            
            
            <div class="col-md-4" v-for="handlungsvorschlag in handlungsvorschlaege" v-bind:key="handlungsvorschlag.id">
                <div class="card mb-3">
                    <div class="card-body">
                        <h5>{{handlungsvorschlag.titel}}</h5>
                        <p class="card-text">
                            {{handlungsvorschlag.kurzbeschreibung}}
                        </p>          
                        <div class="text-center">
                            <img :src="'http://localhost:8000/images/vorschlaegeIcons/' + handlungsvorschlag.iconName" class="mx-center" alt="not found"  width="100px"/>                        
                        </div>
                    </div>
                </div>
            </div>

        </div>

      </div>
</template>

<script>
export default {
   props:['handlungsvorschlaege'],
   
   data(){
       return {
           image_src: '',
       }
   }
}
</script>




<style scoped>
.card{
    cursor: pointer;
}
.card:hover{
    box-shadow: 0 0 10px gray;
}
</style>