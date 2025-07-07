<template>
  <a-flex class="container" vertical>
    <a-typography class="responsive-text">Shop Top Designers</a-typography>

    <a-row :gutter="[24, 24]">
      <a-col :span="6" :xs="12" :sm="6">
        <a-image
          src="https://images.ctfassets.net/tkr0x069m1it/419VIwoE2ZzleCRGEdpm1q/fcae02c62680b408566320b6168f4fab/Image1.jpg?w=3200"
          :width="'100%'"
          :height="'auto'"
          :preview="false"
        />
        <a-typography
          style="line-height: 1.7em; padding-top: 0.5rem; font-size: 1rem;  font-weight: 200;"
          >Chanel</a-typography
        >
      </a-col>
      <a-col :span="6" :xs="12" :sm="6">
        <a-image
          src="https://images.ctfassets.net/tkr0x069m1it/2CC23GoBtZra4GrqOLB2xe/c501e3991169c0af70b341e4dad58198/Image2.jpg?w=3200"
          :width="'100%'"
          :height="'auto'"
          :preview="false"
        />
        <a-typography
          style="line-height: 1.7em; padding-top: 0.5rem; font-size: 1rem;  font-weight: 200;"
          >Louis Vuitton</a-typography
        >
      </a-col>
      <a-col :span="6" :xs="12" :sm="6">
        <a-image
          src="https://images.ctfassets.net/tkr0x069m1it/419VIwoE2ZzleCRGEdpm1q/fcae02c62680b408566320b6168f4fab/Image1.jpg?w=3200"
          :width="'100%'"
          :height="'auto'"
          :preview="false"
        />
        <a-typography
          style="line-height: 1.7em; padding-top: 0.5rem; font-size: 1rem;  font-weight: 200;"
          >Cartier</a-typography
        >
      </a-col>
      <a-col :span="6" :xs="12" :sm="6">
        <a-image
          src="https://images.ctfassets.net/tkr0x069m1it/2CC23GoBtZra4GrqOLB2xe/c501e3991169c0af70b341e4dad58198/Image2.jpg?w=3200"
          :width="'100%'"
          :height="'auto'"
          :preview="false"
        />
        <a-typography
          style="line-height: 1.7em; padding-top: 0.5rem; font-size: 1rem; font-weight: 200;"
          >Hermes</a-typography
        >
      </a-col>
    </a-row>
  </a-flex>
</template>

<style scoped>
/* In your global CSS or scoped <style> */
.responsive-text {
  font-size: clamp(
    1.35rem,
    2vw,
    1.6rem
  ); /* Min: 1rem, Preferred: 2vw, Max: 1.5rem */
  font-weight: 500;
  padding-bottom: 2rem;
}
.container {
  max-width: 1280px;
  padding: 3rem 2rem;
  align-items: center;
}
</style>

<script setup lang="ts"></script>
