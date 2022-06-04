<template>
  <div>
    <h3 class="c-users-list__search-container">
      <input class="c-users-list__search-input" v-on:input="search" v-model="filterText">
      <button class="c-users-list__button" @click="clear">clear</button>
      <button class="c-users-list__button" @click="sortHighest">Highest</button>
      <button class="c-users-list__button" @click="sortLowest">lowest</button>
    </h3>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    employees: Array
  },
  data() {
    return {
      filterText: "",
      index: null
    };
  },
  computed: {
    filteredData() {
      let filter = new RegExp(this.filterText, "i");
      return this.employees.filter(
        el =>
          el.profile.name.match(filter) ||
          el.profile.about.match(filter) ||
          el.profile.address.match(filter)
      );
    },
    HighestSortedData() {
      this.employees.sort((a, b) =>
        a.performance_index < b.performance_index ? 1 : -1
      );
    },
    lowestSortedData() {
      this.employees.sort((a, b) =>
        a.performance_index > b.performance_index ? 1 : -1
      );
    }
  },
  methods: {
    sortLowest() {
      this.$emit("sort", this.lowestSortedData);
    },
    sortHighest() {
      this.$emit("sort", this.HighestSortedData);
    },
    search() {
      this.$emit("search", this.filteredData, this.filterText);
    },
    clear() {
      this.$emit("clear");
      this.filterText = "";
    }
  }
};
</script>