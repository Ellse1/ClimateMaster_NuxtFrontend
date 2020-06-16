<template>
    <div>
        <!-- Show PageLogs -->
        <h4>Seitenaufrufe</h4>
    
        <div class="row text-center">
            <div class="col-md-6">
                <b>Index</b>
                <p>Gesamt: {{countPageLogsIndex}}</p>
                <p>Monat: {{countPageLogsIndex_month}}</p>
                <p>Gestern: {{countPageLogsIndex_today}}</p>
            </div>
            <div class="col-md-6">
                <b>Climadvices</b>
                <p>Gesamt: {{countPageLogsClimadvices}}</p>
                <p>Monat: {{countPageLogsClimadvices_month}}</p>
                <p>Gestern: {{countPageLogsClimadvices_today}}</p>
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
            countPageLogsIndex_month: 0,       
            countPageLogsIndex_today: 0,
            countPageLogsClimadvices: 0,
            countPageLogsClimadvices_month: 0,
            countPageLogsClimadvices_today: 0
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
                const today = new Date();
                if(today.getDate() != 1){
                    today.setDate(today.getDate() -1);
                }


                //go throuch every pageLog and check for dates
                this.pageLogs.forEach(pageLog => {
                    //get the data to check if this is of
                    var year = parseInt(pageLog.created_at.split('.')[0]);
                    var month = parseInt(pageLog.created_at.split('.')[1])-1;
                    var day = parseInt(pageLog.created_at.split('.')[2]);
                    var pageLogDate = new Date(year, month, day);

                    // alert(pageLogDate);
                    // alert("year: " + pageLogDate.getFullYear() + "   Month: " + pageLogDate.getMonth() + "     Day: " + pageLogDate.getDate())

                   if(pageLog.page == '/'){
                        this.countPageLogsIndex += 1;  
                        if(pageLogDate.getFullYear() == today.getFullYear() && pageLogDate.getMonth() == today.getMonth()){
                            this.countPageLogsIndex_month += 1;
                            // alert('date() page Log : ' + pageLogDate.getDate() + '   date() today:  ' + today.getDate());
                            if(pageLogDate.getDate() == today.getDate()){
                                this.countPageLogsIndex_today += 1;
                            }
                        }
                    }
                    else if(pageLog.page == '/climadvices'){
                        this.countPageLogsClimadvices += 1;
                        if(pageLogDate.getFullYear() == today.getFullYear() && pageLogDate.getMonth() == today.getMonth()){
                            this.countPageLogsClimadvices_month += 1;
                            if(pageLogDate.getDate() == today.getDate()){
                                this.countPageLogsClimadvices_today += 1;
                            }
                        }
                    }
                    

                });

            }

        } catch (e) {
            
        }
    }
}
</script>