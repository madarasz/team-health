import { defineStore } from 'pinia'
import { OperativeModel } from '@/model/operative-model'

export const useOperativeStore = defineStore('operativeStore', {
  state: () => ({
    team1Name: '',
    team2Name: '',
    operatives: [] as OperativeModel[]
  }),

  actions: {
    async loadTeamsData() {
      try {
        const response = await fetch('/teams.json')
        const data = await response.json()

        // Assuming the data structure follows the format you mentioned
        this.team1Name = data.team_1
        this.operatives = data.operatives.map(
          (operative: OperativeModel, index: number) =>
            new OperativeModel(
              index + 1, // Auto-generated ID for simplicity
              1,
              operative.name,
              operative.maxWounds,
              operative.maxWounds,
              operative.description,
              operative.leader,
              true // Set as active by default
            )
        )

        // You can also handle team2 if the JSON structure contains a second team
        // this.team2Name = data.team_2;
        // this.team2Operatives = data.operatives_team2.map(...);
      } catch (error) {
        console.error('Error loading team data:', error)
      }
    },

    adjustWounds(id: number, newAmount: number) {
      console.log(id, newAmount)
      const operative = this.operatives.find((op) => op.id === id)
      if (operative) {
        console.log('found', operative)
        operative.currentWounds = newAmount
      }
    },

    switchActive(id: number) {
      const operative = this.operatives.find((op) => op.id === id)
      if (operative) {
        operative.active = !operative.active
      }
    }
  }
})
