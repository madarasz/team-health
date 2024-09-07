<template>
  <main>
    <h1>{{ store.team1Name }}</h1>
    <div v-for="operative in store.operatives" :key="operative.id">
      <!-- Using OperativeEntry component -->
      <OperativeEntry
        :id="operative.id"
        :name="operative.name"
        :description="operative.description"
        :maxWounds="operative.maxWounds"
        :currentWounds="operative.currentWounds"
        :leader="operative.leader"
        :active="operative.active"
      />
    </div>
  </main>
</template>

<style scoped></style>

<script setup>
import { onMounted } from 'vue'
import { useOperativeStore } from '@/stores/operative-store'
import OperativeEntry from './components/Operative.vue'

// Initialize the Pinia store
const store = useOperativeStore()

// Load team data when the component is mounted
onMounted(() => {
  store.loadTeamsData()
})
</script>
