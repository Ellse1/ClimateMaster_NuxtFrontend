<template>
    <div class="fixed-top h-100 w-100" style="background-color:rgba(247, 247, 247, 0.3);">
        <div class="container">
            <div class="col-md-8 text-center bg-light mx-auto border border-dark rounded" style="margin-top:100px;">
                <h2>Herzlichen Glückwunsch</h2>
                <h5>Wieder einen Schritt zur umweltfreundlichen Klimaneutralität geschafft!</h5>
                <div style="position:relative;height:100px;">
                    <div class="thumbs_up" style="position:absolute;margin-left:40%;">
                        <font-awesome-icon icon="thumbs-up" class="mt-1 mb-2 text-success"/>                         
                    </div>
                </div>
                <br>
                <p>Vielen Dank für deinen Anstrengungen für mehr Klimaschutz!</p>
                <button class="btn btn-success mt-5 mb-3 px-5" v-on:click="hideCongratulation">weiter</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        hideCongratulation(){
            this.$emit("hideCongratulation_reduceShortTermCompleted")
        }
    }
}
</script>
<style scoped>

.thumbs_up{
    font-size:80px;
    animation: scaleUpAndDown 2s ease-in-out infinite, spin 2s ease-in-out infinite
}

@keyframes scaleUpAndDown {
    0% {font-size:80px;}
    50% {font-size:120px;}
}
@keyframes spin { 
    40% { 
        transform: rotate(20deg);
    } 
}

</style>