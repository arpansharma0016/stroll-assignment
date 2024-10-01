<template>
  <div class="container">
    <v-text-field v-model="question" label="Enter question" required></v-text-field>

    <v-select v-model="region" :items="regions" label="Select Region" required></v-select>
    <v-select v-model="cycle" :items="cycles" label="Select Cycle" required></v-select>

    <v-btn primary @click="submitQuestion" :loading="isLoading" :disabled="isLoading">Submit</v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
      question: '',
      region: null,
      cycle: null,
      regions: null,
      cycles: null,
      rawRegions: null,
      rawCycles: null,
      isLoading: false,
    }),
    mounted() {
      this.getAllRegions();
      this.getAllCycles();
    },
    methods: {
      submitQuestion() {
        if (this.question && this.region && this.cycle) {
          this.isLoading = true;
          Meteor.call('createQuestion', this.question, this.region, this.cycle, (err, res) => {
            if (!err && res) {
              this.$router.push('/');
            } else {
              alert('Something went wrong!');
            }
            this.isLoading = false;
          });
        } else {
          alert('Please enter all the details');
        }
      },
      getAllRegions() {
        Meteor.call('getAllRegions', (err, res) => {
          if (!err && res) {
            this.rawRegions = res;
            this.regions = res.map(resp => resp.name);
          } else {
            alert('Unable to fetch regions');
          }
        });
      },
      getAllCycles() {
        Meteor.call('getAllCycles', (err, res) => {
          if (!err && res) {
            this.rawCycles = res;
            this.cycles = res.map(resp => resp.name);
          } else {
            alert('Unable to fetch cycles');
          }
        });
      },
    },
  };
</script>
