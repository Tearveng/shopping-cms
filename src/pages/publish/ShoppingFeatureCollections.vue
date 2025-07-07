<template>
  <a-flex class="container" vertical>
    <a-typography class="responsive-text">Feature Collections</a-typography>

    <a-row :gutter="[24, 48]">
      <a-col :span="6" :xs="24" :sm="8">
        <a-image
          src="https://images.ctfassets.net/tkr0x069m1it/6EoCBjmCKGP0txrgHVhcVi/73e7a284199ed84fc5d24df67bfb5a0e/Image5.jpg?w=2562"
          :width="'100%'"
          :height="'auto'"
          :preview="false"
        />
        <a-flex style="padding: 16px 24px 0 0" vertical>
          <a-typography class="responsive-title"
            >Over 50% off Retail</a-typography
          >
          <a-typography
            style="
              line-height: 1.7em;
              padding-top: 0.5rem;
              font-size: 1rem;
              font-weight: 200;
            "
            >Consider it yours.</a-typography
          >
          <a-typography
            style="
              line-height: 1.7em;
              padding-top: 0.5rem;
              font-size: 1rem;
              font-weight: 200;
            "
            >Shop Dreaming Deals</a-typography
          >

        </a-flex>
      </a-col>
      <a-col :span="6" :xs="24" :sm="8">
        <a-image
          src="https://images.ctfassets.net/tkr0x069m1it/75ZYDtw80UORIcoheXHY3p/14bbda34885ef1591837f30dc298a497/Image6.jpg?w=2562"
          :width="'100%'"
          :height="'auto'"
          :preview="false"
        />
        <a-flex style="padding: 16px 24px 0 0" vertical>
          <a-typography class="responsive-title"
            >Bags Under $1,000</a-typography
          >
          <a-typography
            style="
              line-height: 1.7em;
              padding-top: 0.5rem;
              font-size: 1rem;
              font-weight: 200;
            "
            >Hunt your next Holy Grail.</a-typography
          >
          <a-typography
            style="
              line-height: 1.7em;
              padding-top: 0.5rem;
              font-size: 1rem;
              font-weight: 200;
            "
            >Shop Haute Finds</a-typography
          >

        </a-flex>
      </a-col>
      <a-col :span="6" :xs="24" :sm="8">
        <a-image
          src="https://images.ctfassets.net/tkr0x069m1it/2V6nKrpOSF8HyyiRMOHddF/9b533e9aa2fc3206c4ed31d7ac88cec7/Image7.jpg?w=2562"
          :width="'100%'"
          :height="'auto'"
          :preview="false"
        />
        <a-flex style="padding: 16px 24px 0 0" vertical>
          <a-typography class="responsive-title"
            >Editor's Picks</a-typography
          >
          <a-typography
            style="
              line-height: 1.7em;
              padding-top: 0.5rem;
              font-size: 1rem;
              font-weight: 200;
            "
            >Give the closet what it wants.</a-typography
          >
          <a-typography
            style="
              line-height: 1.7em;
              padding-top: 0.5rem;
              font-size: 1rem;
              font-weight: 200;
            "
            >Shop Most Wanted</a-typography
          >

        </a-flex>
      </a-col>
    </a-row>
  </a-flex>
</template>

<style scoped>
.responsive-title {
  font-size: clamp(1.12rem, 2vw, 1.35rem);
  line-height: 1.4em;
  font-weight: 400;
}
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
