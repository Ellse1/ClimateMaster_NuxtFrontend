<template>
    <div>
        <p>
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