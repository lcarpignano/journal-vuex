<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-ligth">{{ yearDay }}</span>
      </div>
      <div>
        <input
          v-show="false"
          accept="image/jpg, image/png"
          type="file"
          @change="onSelectedImg"
          ref="imgSelector"
        />
        <button
          v-if="entry.id"
          @click="onDeleteEntry"
          class="btn btn-danger mx-2"
        >
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary" @click="onSelectImg">
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea
        placeholder="What have happened today?"
        v-model="entry.text"
      ></textarea>
    </div>
    <img
      v-if="localImg"
      :src="localImg"
      alt="entry-picture"
      class="img-thumbnail"
    />
    <img
      v-if="entry.picture && !localImg"
      :src="entry.picture"
      alt="entry-picture"
      class="img-thumbnail"
    />
  </template>
  <Fab icon="fa-save" @update-entry="saveEntry" />
</template>

<script>
import getDayMonthYear from "../helpers/getDayMonthYear.js";
import uploadImg from "../helpers/uploadImg";

import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";

export default {
  props: {
    // this id is pass from the router
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },
  data() {
    return {
      entry: null,
      localImg: null,
      file: null,
    };
  },
  methods: {
    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),
    loadEntry() {
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntriesById(this.id);
        if (!entry) return this.$router.push({ name: "daybook-no-entry" });
      }

      this.entry = entry;
    },
    async saveEntry() {
      // Setting SweetAlert2
      new Swal({
        title: "Wait please...",
        allowOutsideClick: false,
      });
      Swal.showLoading();

      const picture = await uploadImg(this.file);
      this.entry.picture = picture;

      if (this.entry.id) {
        // Update existing entry
        await this.updateEntry(this.entry);
      } else {
        // Create new entry
        // call action
        const id = await this.createEntry(this.entry);
        // redirect to new created id entry\
        this.$router.push({
          name: "daybook-entry",
          params: { id },
        });

        this.file = null;
      }
      Swal.fire("Saved", "Entry saved successfully", "success");
    },
    async onDeleteEntry() {
      //set Swal
      const { isConfirmed } = await Swal.fire({
        title: "Are you sure?",
        text: "Once remove, cant be undone",
        showDenyButton: true,
        confirmButtonText: "Yes! Im sure.",
      });

      if (isConfirmed) {
        new Swal({
          title: "Wait please...",
          allowOutsideClick: false,
        });
        Swal.showLoading();

        // call action
        await this.deleteEntry(this.entry.id);

        // redirect to no entry\
        this.$router.push({
          name: "daybook-no-entry",
        });

        Swal.fire("Removed", "", "success");
      }
    },
    onSelectedImg(event) {
      const file = event.target.files[0];
      if (!file) {
        this.localImg = null;
        this.file = null;
        return;
      }

      this.file = file;

      const fr = new FileReader();
      fr.onload = () => (this.localImg = fr.result);
      fr.readAsDataURL(file);
    },
    onSelectImg() {
      this.$refs.imgSelector.click();
    },
  },
  computed: {
    ...mapGetters("journal", ["getEntriesById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },
  created() {
    // console.log(this.$route.params.id);
    this.loadEntry();
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>