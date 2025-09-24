<template lang="pug">
q-layout
  q-page-container
    q-page
      .absolute-center
        q-btn.hello hello
</template>

<script setup>
  import { ref } from 'vue'

  const splitterModel = ref(false)
  const tab = ref("")
</script>