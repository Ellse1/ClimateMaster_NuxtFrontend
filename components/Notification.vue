<template>
    <div>
        <p class="notification">
            {{message}}
        </p>
    </div>
</template>

<script>
export default {
  name: 'Notification',
  props: ['message']
}
</script>

<style scoped>
.notification{
    animation: fadeIn 10s linear forwards;
    -webkit-animation: fadeIn 10s linear forwards;
}

@-webkit-keyframes fadeIn {
  0% {opacity: 1;}
  50%{opacity: 1;}
 100%{opacity: 0;}
}
@keyframes fadeIn {
  0% {opacity: 1;}
  50%{opacity: 1;}
 100%{opacity: 0;}
}

</style>