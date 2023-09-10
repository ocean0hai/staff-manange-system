<script setup lang="ts"></script>

<template>
  <div>
    <n-config-provider class="h-full">
      <!-- <naive-provider>
        <router-view />
      </naive-provider> -->
      <n-message-provider>
        <router-view />
      </n-message-provider>
    </n-config-provider>
  </div>
</template>

<style scoped></style>
