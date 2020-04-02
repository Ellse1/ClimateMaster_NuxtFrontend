<template>
    <div>
        <!-- Show PageLogs -->
        <h4>Seitenaufrufe</h4>

        <div class="row text-center">
            <div class="col-md-6">
                <b>Index</b>
                <p>Gesamt: {{countPageLogsIndex}}</p>
            </div>
            <div class="col-md-6">
                <b>Climadvices</b>
                <p>Gesamt: {{countPageLogsClimadvices}}</p>

            </div>
        </div>

        <notification :message="error" v-if="error" class="text-danger mt-2" />
        <notification :message="success" v-if="success" class="text-success mt-2" />
    </div>
</template>
<script>
import notification from '~/components/MainComponents/Notification';
export default {
    components:{
        notification,
    },
    data(){
        return {
            error: null,
            success: null,
            pageLogs: null,
            countPageLogsIndex: 0,
            countPageLogsClimadvices: 0
        };
    },
    async mounted(){
        try {
            const{data} = await this.$axios.post('admin/getAllPageLogs');

            if(data.state == "error"){
                this.success = null;
                this.error = data.message;
            }
            if(data.state == 'success'){
                this.pageLogs = data.data;
                this.pageLogs.forEach(pageLog => {
                    if(pageLog.page == '/'){
                        this.countPageLogsIndex += 1;
                    }
                    else if(pageLog.page == '/climadvices'){
                        this.countPageLogsClimadvices += 1;
                    }
                });
            }

        } catch (e) {
            
        }
    }
}
</script>