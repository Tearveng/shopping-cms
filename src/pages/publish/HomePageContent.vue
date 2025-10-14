<template>
    <!-- shopping banner -->
    <a-flex vertical gap="55" style="width: 100%">
      <Motion
        :initial="{ opacity: 0, x: -100 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.8, delay: 0.4 }"
      >
        <ShoppingBanner />
      </Motion>
    </a-flex>

    <!-- shopping top designers -->
    <a-flex vertical gap="55" style="width: 100%; align-items: center">
      <Motion
        :initial="{ opacity: 0, x: -100 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.8, delay: 0.6 }"
      >
        <ShoppingTopDesigners />
      </Motion>
    </a-flex>

    <!-- feature collections -->
    <a-flex vertical gap="55" style="width: 100%; align-items: center">
      <Motion
        :initial="{ opacity: 0, x: -100 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.8, delay: 0.8 }"
      >
        <ShoppingFeatureCollections />
      </Motion>
    </a-flex>

    <!-- shopping more top designers -->
    <a-flex vertical gap="55" style="width: 100%; align-items: center">
      <Motion
        :initial="{ opacity: 0, x: -100 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.8, delay: 1 }"
      >
        <ShoppingMoreTopDesigners />
      </Motion>
    </a-flex>

    <!-- shopping editor picks -->
    <a-flex vertical gap="55" style="width: 100%; align-items: center">
      <Motion
        :initial="{ opacity: 0, x: -100 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.8, delay: 1.2 }"
      >
        <ShoppingEditorPicks />
      </Motion>
    </a-flex>

    <!-- shopping live announce -->
    <a-flex vertical gap="55" style="width: 100%; align-items: center">
      <Motion
        :initial="{ opacity: 0, x: -100 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.8, delay: 1.4 }"
      >
        <ShoppingLiveAnnounce />
      </Motion>
    </a-flex>

    <!-- shopping in person -->
    <a-flex vertical gap="55" style="width: 100%; align-items: center">
      <Motion
        :initial="{ opacity: 0, x: -100 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ duration: 0.8, delay: 1.6 }"
      >
        <ShoppingInPerson />
      </Motion>
    </a-flex>
</template>

<script setup>
import ShoppingBanner from './ShoppingBanner.vue';
import ShoppingEditorPicks from './ShoppingEditorPicks.vue';
import ShoppingFeatureCollections from './ShoppingFeatureCollections.vue';
import ShoppingLiveAnnounce from './ShoppingLiveAnnounce.vue';
import ShoppingMoreTopDesigners from './ShoppingMoreTopDesigners.vue';
import ShoppingTopDesigners from './ShoppingTopDesigners.vue';
import ShoppingInPerson from './ShoppingInPerson.vue';
</script>
