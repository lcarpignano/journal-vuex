/* eslint-disable */
<template>
  <div
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'daybook-entry', params: { id: 10 } })"
  >
    <div class="entry-title d-flex">
      <span class="text-success fs-5 fw-bold">3rd</span>
      <span class="mx-1 fs-5">August</span>
      <span class="mx-2 fw-light">2022</span>
    </div>
    <div class="entry-description">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque repellat
      vitae ipsum, iure sunt veniam sequi corporis minima enim quam magnam.
      Voluptas totam neque provident minima voluptatem veritatis voluptates
      corrupti?
    </div>
  </div>
</template>

<script>
export default {};
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