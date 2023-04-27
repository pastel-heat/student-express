<template>


    <div v-if="student.name">
        <div class="alert alert-success" v-if="student.present">
            Welcome {{ student.name }}!
        </div>
        <div class="alert alert-primary" v-else>
            Goodbye {{ student.name }}, thank you for coming!
        </div>
    </div>


</template>

<script>
    export default {
    name: 'StudentMessage',
    props: {
        student: Object
    }
    }
</script>

<style scoped>

</style>
