<template>
    <div>
        <slideshowOfCompaniesOfClimadviceName :climadvice_name="'climateFriendlyHeating'" />
    </div>
</template>
<script>
import slideshowOfCompaniesOfClimadviceName from '~/components/Company/slideshowOfCompaniesOfClimadviceName';
export default {
    components:{
        slideshowOfCompaniesOfClimadviceName
    }
}
</script>