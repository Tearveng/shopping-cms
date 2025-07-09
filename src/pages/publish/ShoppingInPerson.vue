<template>
    <a-flex class="container" vertical>
      <a-typography class="responsive-text">Shopping in person</a-typography>

      <a-row :gutter="[24, 24]">
        <a-col :span="6" :xs="12" :sm="6">
          <a-image
            src="https://images.ctfassets.net/tkr0x069m1it/jholk2737LoQv3RyoK2mV/842f8563578599f0d8519446ac04b7c0/12.16_HPrefresh_42.jpg?w=1986"
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
            src="https://images.ctfassets.net/tkr0x069m1it/4SKcMtxT2Nch1WiJz3XY3W/2df0e19525b107a44008a7a099967275/Locations_02__1_.jpg?w=3200"
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
            src="https://images.ctfassets.net/tkr0x069m1it/13455kRdiCNRf1FtXCKjzv/e71683c2bfa45fe4e14028194fa8d02c/Locations_03_update.jpg?w=3200"
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
            src="https://images.ctfassets.net/tkr0x069m1it/Z6oYBReq6nHQx5CC0XHPi/f37975d1b0425f2c96806513da6ee652/DTLA.jpg?w=3200"
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
  @media (max-width: 575px) {
    .container {
      padding: 3rem 1rem
    }
  }
  </style>

  <script setup lang="ts"></script>
