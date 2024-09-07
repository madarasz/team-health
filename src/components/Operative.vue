<template>
  <div class="operative" @mouseenter="hover = true" @mouseleave="hover = false">
    <div
      class="health-bar"
      :style="{ width: healthPercentage + '%', backgroundColor: healthColor }"
    ></div>
    <div class="info">
      <div v-if="icon" class="material-symbols-outlined">{{ icon }}</div>
      <div class="name">
        <span v-if="leader" class="material-symbols-outlined star" />
        {{ name }}
      </div>
      <div v-if="active" class="health">{{ currentWounds }}/{{ maxWounds }}</div>
    </div>
    <div v-if="hover" class="controls">
      <button @click="switchActive()">S</button>
      <button v-if="active" @click="adjustHealth(-1)">-</button>
      <button v-if="active" @click="adjustHealth(1)">+</button>
    </div>
  </div>
</template>

<script>
import { useOperativeStore } from '@/stores/operative-store' // Import the Pinia store

export default {
  name: 'OperativeEntry',
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    maxWounds: {
      type: Number,
      default: 15
    },
    currentWounds: {
      type: Number,
      default: 15
    },
    active: {
      type: Boolean,
      default: true
    },
    leader: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hover: false
    }
  },
  computed: {
    healthPercentage() {
      if (!this.active) {
        return 0
      }
      //return (this.currentWounds / this.maxWounds) * 100
      const operativeStore = useOperativeStore()
      return (this.currentWounds / operativeStore.greatestWounds) * 100
    },
    healthColor() {
      if (this.currentWounds === this.maxWounds) {
        return 'green'
      } else if (this.currentWounds < this.maxWounds / 2) {
        return 'red'
      } else {
        return 'coral'
      }
    },
    icon() {
      if (!this.active) {
        return 'block'
      } else if (this.currentWounds == 0) {
        return 'skull'
      } else if (this.currentWounds < this.maxWounds / 2) {
        return 'local_hospital'
      } else {
        return ''
      }
    }
  },
  methods: {
    adjustHealth(amount) {
      const newHealth = this.currentWounds + amount
      if (newHealth >= 0 && newHealth <= this.maxWounds) {
        // Access the Pinia store
        const operativeStore = useOperativeStore()

        // Use the store's adjustWounds action, passing in the team number and the operative's ID
        operativeStore.adjustWounds(this.id, newHealth)
      }
    },
    switchActive() {
      const operativeStore = useOperativeStore()
      operativeStore.switchActive(this.id)
    }
  }
}
</script>

<style scoped>
.operative {
  color: white; /* The text color */
  text-shadow:
    -1px -1px 0 black,
    /* Top-left */ 1px -1px 0 black,
    /* Top-right */ -1px 1px 0 black,
    /* Bottom-left */ 1px 1px 0 black; /* Bottom-right */
  position: relative;
  width: 300px;
  height: 30px;
  border: 1px solid #aaa;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #555;
  overflow: hidden;
}

.health-bar {
  position: absolute;
  height: 100%;
  z-index: 1;
}

.info {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
}

.status-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
}

.name {
  width: 200px;
  font-weight: bold;
  margin-right: 10px; /* Adds spacing between name and health */
}

.health {
  font-size: 14px;
}

.controls {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: flex; /* Use Flexbox to arrange buttons horizontally */
  gap: 5px; /* Add spacing between buttons */
}

.controls button {
  background-color: grey;
  border: none;
  font-size: 16px;
  cursor: pointer;
  width: 25px; /* Set width */
  height: 25px; /* Set height */
  border-radius: 50%; /* Make the button circular */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls button:hover {
  background-color: darkgrey; /* Slightly darker on hover */
}
</style>
