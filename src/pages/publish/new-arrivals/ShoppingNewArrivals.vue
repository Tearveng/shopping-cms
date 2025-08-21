<template>
  <div class="arrivals-container">
    <a-flex class="title-category">
      <a-typography-text class="title-text">New Arrivals</a-typography-text>
    </a-flex>

    <a-flex style="width: 100%">
      <a-flex class="filter-category" vertical>
        <!-- filter header -->
        <a-flex
          style="
            justify-content: space-between;
            align-items: center;
            width: 100%;
          "
        >
          <a-typography-text
            style="font-size: 1.1rem; line-height: 1.7em; font-weight: 500"
            >Filter</a-typography-text
          >
          <a-typography-text
            style="font-size: 0.9rem; line-height: 1.7em; font-weight: 200"
            >4,524 items</a-typography-text
          >
        </a-flex>
        <ShoppingFilterDesigners />
      </a-flex>

      <!-- sort by header -->
      <a-flex class="items-category" vertical>
        <a-flex style="align-items: center; justify-content: flex-end">
          <a-typography-text
            style="font-size: 15px; font-weight: 200; padding-right: 8px"
            >Sort by</a-typography-text
          >
          <a-select ref="select" value="jack" style="width: 200px">
            <a-select-option value="jack">Newest</a-select-option>
            <a-select-option value="lucy">Oldest</a-select-option>
            <a-select-option value="lucy">Best Value</a-select-option>
            <a-select-option value="lucy">Most Popular</a-select-option>
            <a-select-option value="a">Recently Marked Down</a-select-option>
          </a-select>
        </a-flex>
        <br />
        <ShoppingAllItems />
      </a-flex>
    </a-flex>
  </div>
</template>

<script lang="ts" setup>
import ShoppingFilterDesigners from "./filters/ShoppingFilterDesigners.vue";
import ShoppingAllItems from "./items/ShoppingAllItems.vue";
</script>

<style scoped>
.filter-category {
  min-width: 250px;
  padding-right: 16px;
  gap: 10px;
}

.items-category {
  flex-grow: 1;
  justify-content: flex-start;
}

.arrivals-container {
  width: 100%;
  max-width: 1510px;
  padding: 0 2rem;
}

.title-text {
  font-size: 1.75rem;
  font-weight: 600;
  line-height: 1.4em;
}

.title-category {
  justify-content: center;
  padding: 32px 24px;
}

@media (max-width: 768px) {
  .filter-category {
    display: none;
  }
}

@media (max-width: 575px) {
  .title-category {
    justify-content: start;
    padding: 16px 0px 32px 0px;
  }
  .title-text {
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.4em;
  }
}
</style>
