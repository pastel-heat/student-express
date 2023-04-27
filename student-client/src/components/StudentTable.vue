<template>
    <div>

        <div class="card student-list m-2 p-2">
            <h4 class="card-title">Student List</h4>

            <div class="edit-toggle form-check" >
                <input id="edit-table" type="checkbox" class="form-check-input" v-model="editTable">
                <label for="edit-table" class="form-check-label">Click to edit</label>
            </div>

            <div id="student-table">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>StarID</th>
                            <th>Present?</th>
                            <th v-show="editTable">Delete</th>
                        </tr>
                    </thead>

                    <!-- make student row component for each student in array -->
                    <tbody>
                        <student-row 
                            v-for="student in students"
                            v-bind:student="student"
                            v-bind:edit="editTable"
                            v-bind:key="student.starID"
                            v-on:presence-changed="presenceChanged"
                            v-on:delete-student="deleteStudent"> 
                        </student-row>
                    </tbody>
                
                </table>
            </div>
        </div>

    </div>
</template>

<script>
    import StudentRow from '@/components/StudentRow.vue'

    export default {
        name: 'StudentTable',
        components: {
            StudentRow
        },
        emits: ['presence-changed'],
        props: {
            students: Array
        },
        data() {
            return {
                editTable: false
            }
        },
        methods: {
            presenceChanged(student, present) {
                // pass presence-changed msg to app.vue
                this.$emit('presence-changed', student, present)
            },
            deleteStudent(student) {
                // pass delete msg to app.vue
                this.$emit('delete-student', student)
            }
        },
        
    }
</script>

<style scoped>

</style>
