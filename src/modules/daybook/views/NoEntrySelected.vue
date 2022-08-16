<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center"> Nothing has been selected...</h1>
  </div>
  <Fab @update-entry="createNewEntry"/>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue')),
    },
    methods: {
      createNewEntry() {
        this.$router.push({ name: 'daybook-entry', params: {id: 'new'}})
      }
    }
}
</script>

<style lang="scss" scoped>
div {
    height: 100%;
}
</style>