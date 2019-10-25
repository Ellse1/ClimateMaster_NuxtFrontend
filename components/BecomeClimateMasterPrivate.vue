<template>
     <div class="container mt-5 pt-5 border-top mb-5">
        <h1 class="mb-3" id="id_becomeClimateMasterPrivate">Privat</h1>

        <div class="row">
            
            
            <div class="col-md-4" v-for="climadvice in climadvices" v-bind:key="climadvice.id">
                <div class="card mb-3">
                    <div class="card-body">
                        <h5>{{climadvice.title}}</h5>
                        <p class="card-text">
                            {{climadvice.shortDescription}}
                        </p>          
                        <div class="text-center">
                            <img :src="'http://localhost:8000/images/climadviceIcons/' + climadvice.iconName" class="mx-center" alt="not found"  width="100px"/>                        
                        </div>
                    </div>
                </div>
            </div>

        </div>

      </div>
</template>

<script>
export default {
   props:['climadvices'],
   
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