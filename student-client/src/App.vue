<template>
  <!-- build app out of components, and bind component props to data from app.vue -->
  <NewStudentForm v-on:student-added="newStudentAdded"></NewStudentForm>

  <StudentTable v-bind:students="students" 
  v-on:presence-changed='presenceChanged'
  v-on:delete-student="deleteStudent"
  ></StudentTable>

  <StudentMessage v-bind:student="mostRecentStudent"></StudentMessage>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
  name: 'App',
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable
  },
  data() {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  mounted() {
    // make req to API and load all studdents
    this.updateStudents()
  },
  methods: {
    updateStudents() {
      this.$student_api.getAllStudents().then( students => {
        this.students = students
      })
      .catch( () => alert('unable to fetch students'))
    },
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then( () => {
        this.updateStudents()
     })
     .catch( err => {
      let msg = err.response.data.join('\n')
      alert('error adding student\n' + msg)
     })
    },
    presenceChanged(student, present) {
      student.present = present
      this.$student_api.updateStudent(student).then( () => {
        this.mostRecentStudent = student
        this.updateStudents()
      })
      .catch( () => alert('unable to update student'))
    },
    deleteStudent(student) {
      this.$student_api.deleteStudent(student.id).then( () => {
        this.updateStudents()
        this.mostRecentStudent = {}
      })
      .catch( () => alert('unable to delete student'))
    }
  }
}
</script>

<style>

@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"; 

img {
  height: 30px;
}
</style>
