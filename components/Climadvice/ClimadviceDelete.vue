<template>
    <div>
        <div id="id_climadviceDelete_background">
            <div class="card bg-light" style="margin-top:100px;">
                <div class="card-body">
                                      
                    <h4>Climadvice wirklich Löschen?</h4>
                    <p>Willst du den Climadvice mit dem namen <strong>{{climadviceForDelete.name}}</strong> und dem Titel <strong>{{climadviceForDelete.title}}</strong> wirklich löschen?</p>
                    <p>Das entsprechende Bild wird automatisch auch gelöscht.</p>
                    <div class="row">
                        <button type="button" v-on:click="deleteClimadvice" class="btn btn-default border col m-2">löschen</button>
                        <button type="button" v-on:click="hideFormDelete" class="btn btn-primary border col m-2">schließen</button>
                    </div>
                </div>

                <notification v-if="error" :message="error" class="text-danger mt-4 text-center"/>
                <notification v-if="success" :message="success" class="text-success mt-4 text-center"/>

            </div>
        </div>
    </div>
</template>
<script>
import notification from '~/components/MainComponents/Notification';
export default {
    props: ['climadviceForDelete'],
    components:{
        notification
    },
    data(){
        return {
            error : null,
            success : null
        }
    },
    methods:{
        hideFormDelete(){
            this.error = null;
            this.success = null;
            $('#id_climadviceDelete').css('display', 'none');
        },
        async deleteClimadvice(){
            let formData = new FormData();
            formData.append('id', this.climadviceForDelete.id)
            try {
                const {data} = await this.$axios.post('admin/destroyClimadvice_ByClimadviceID',
                formData,
                {
                    headers:{
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if(data.state == "error"){
                    this.error = data.message;
                    this.success = null;
                }
                if(data.state == "success"){
                    this.error = null;
                    this.success = data.message;
                    this.$emit('climadviceDeleted', this.climadviceForDelete);
                }
            } catch (e) {
                alert(e);
                this.error = e.response.data.message;
            }
        }
    }
}
</script>
<style scoped>
.card{
    box-shadow: 0 0 300px gray;
    max-width: 400px;
    margin:auto;
}
.card:hover{
    box-shadow: 0 0 300px gray;
}
#id_climadviceDelete_background{
    position:fixed;
    left:0px;
    margin:auto;
    top:0px;
    width:100%;
    height:100%;
    background-color:transparent;
}
</style>