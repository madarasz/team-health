<template>
  <main>
    <div class="teams-container">
      <div class="team">
        <h2>{{ store.team1Name }}</h2>
        <div v-for="operative in sortedOperatives" :key="operative.id">
          <!-- Using OperativeEntry component -->
          <OperativeEntry
            v-if="operative.team == 1"
            :id="operative.id"
            :name="operative.name"
            :description="operative.description"
            :maxWounds="operative.maxWounds"
            :currentWounds="operative.currentWounds"
            :leader="operative.leader"
            :active="operative.active"
          />
        </div>
      </div>
      <div class="team">
        <h2>{{ store.team2Name }}</h2>
        <div v-for="operative in sortedOperatives" :key="operative.id">
          <!-- Using OperativeEntry component -->
          <OperativeEntry
            v-if="operative.team == 2"
            :id="operative.id"
            :name="operative.name"
            :description="operative.description"
            :maxWounds="operative.maxWounds"
            :currentWounds="operative.currentWounds"
            :leader="operative.leader"
            :active="operative.active"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.teams-container {
  display: flex;
  justify-content: space-between;
}

.team {
  width: 48%; /* Adjust width for two equal columns */
}
</style>

<script setup>
import { onMounted, computed } from 'vue'
import { useOperativeStore } from '@/stores/operative-store'
import OperativeEntry from './components/Operative.vue'

// Initialize the Pinia store
const store = useOperativeStore()

const sortedOperatives = computed(() => {
  return store.operatives.slice().sort((a, b) => {
    const aActive = a.active !== false // Treat undefined as true
    const bActive = b.active !== false // Treat undefined as true
    return bActive - aActive // Active (true or undefined) comes before inactive (false)
  })
})

// Load team data when the component is mounted
onMounted(() => {
  store.loadTeamsData()
})
</script>
