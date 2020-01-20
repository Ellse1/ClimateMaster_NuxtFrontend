<template>
    <div>
        <slideshowOfCompaniesOfClimadviceName :climadvice_name="'buyElectricCar'" />
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