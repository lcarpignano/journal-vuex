/* eslint-disable */
<template>
  <div
    class="entry-container pointer p-2"
    @click="$router.push({ name: 'daybook-entry', params: { id: entry.id } })"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-5">{{ month }}</span>
      <span class="mx-2 fw-light">{{ yearDay }}</span>
    </div>
    <div class="entry-description">
      {{ reduceText }}
    </div>
  </div>
</template>

<script>

const months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  computed: {
    reduceText() {
      return this.entry.text.length > 140
        ? this.entry.text.substring(0, 140) + '...'
        : this.entry.text
    },
    day() {
      const date = new Date(this.entry.date)
      return date.getDate()
    },
    month() {
      const date = new Date(this.entry.date)
      return months[date.getMonth()]
    },
    yearDay() {
      const date = new Date(this.entry.date)
      return `${date.getFullYear()}, ${days[date.getDay()]}`
    }
  }
};
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s ease-in all;

  &:hover {
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s ease-in all;
  }
}
.entry-description {
  font-size: 12px;
}
</style>