<template>
    <div>
        <imagecreator :admin="true" class="w-100"/>
    </div>
</template>
<script>
import imagecreator from '~/components/MyClimateMasterActions/Resources/imagecreator';
export default {
    components:{
        imagecreator
    }
}
</script>