<template>
    
        <tr v-bind:class=" { present: student.present, absent: !student.present } ">
            <td>{{ student.name }}</td>
            <td>{{ student.starID }}</td>
            <td>                    
                <input type="checkbox" v-bind:checked="student.present" v-on:change="presenceChanged(student, $event.target.checked)"> 
            </td>
            <td v-show="edit"> <img v-on:click="deleteStudent" src="@/assets/delete.png" alt=""> </td>
        </tr>

</template>

<script>
export default {
    name: 'StudentRow',
    props: {
        student: Object,
        edit: Boolean
    },
    methods: {
        presenceChanged(student, present) {
            // emit msg to parent
            this.$emit('presence-changed', student, present)
        },
        deleteStudent() {
            // show confirmation dialogue when deleting student
            if (confirm(`Delete ${this.student.name}?`)) {    
                // send delete-student msg to parent when delete button is clicked
                this.$emit('delete-student', this.student)
            }
                
        }
    }
}
</script>

<style scoped>
.present {
color: gray;
font-style: italic;
}

.absent {
    color: black;
    font-weight: bold;
}
</style>