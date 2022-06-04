<template>
  <div>
    <h3 class="c-users-list__search-container">
      <button
        :disabled="loading"
        v-show="currentPage != 1"
        class="c-users-list__button"
        @click="getPrevious"
      >{{previousText}}</button>
      <button
        :disabled="loading"
        v-show="currentPage !== pages && pages != 0"
        class="c-users-list__button"
        @click="getNext"
      >{{nextText}}</button>
    </h3>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    loading: Boolean,
    employees: Array,
    pages: Number
  },
  data() {
    return {
      currentPage: 1,
      nextText: "Next",
      previousText: "Previous"
    };
  },
  methods: {
    getPrevious() {
      this.currentPage -= 1;
      this.$emit("more", this.currentPage);
    },
    getNext() {
      this.currentPage += 1;
      this.$emit("more", this.currentPage);
    }
  },
  watch: {
    loading: function(newVal, oldVal) {
      if (newVal == true) {
        this.previousText = "Loading...";
        this.nextText = "Loading...";
      } else {
        this.previousText = "Previous";
        this.nextText = "Next";
      }
    }
  }
};
</script>