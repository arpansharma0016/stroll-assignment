<template>
  <div class="container">
    <div class="flex">
      <v-combobox v-model="region" :items="regions" label="Select Region"></v-combobox>
      <v-menu v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y>
        <template v-slot:activator="{on, attrs}">
          <v-text-field
            v-model="date"
            label="Select Date"
            prepend-icon="mdi-calendar"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
      </v-menu>
      <v-btn primary width="100" @click="getQuestions" :loading="isLoading" :disabled="isLoading">Submit</v-btn>
    </div>
    <div class="questions-list-area" v-if="questions && questions.length > 0">
      <p v-for="(question, index) in questions" :key="index"># {{ index + 1 }} - {{ question.title }}</p>
    </div>
    <div v-else>
      <p>No questions found for this region and cycle</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        region: '',
        regions: null,
        date: null,
        menu2: false,
        questions: null,
        isLoading: false,
      };
    },
    mounted() {
      this.getAllRegions();
    },
    methods: {
      getAllRegions() {
        Meteor.call('getAllRegions', (err, res) => {
          if (!err && res) {
            this.regions = res.map(resp => resp.name);
          } else {
            alert('Unable to fetch regions');
          }
        });
      },
      getQuestions() {
        this.isLoading = true;
        Meteor.call('getQuestion', this.region, this.date, (err, res) => {
          if (!err && res) {
            this.questions = res;
          } else if (err) {
            alert('something went wrong');
          }
          this.isLoading = false;
        });
      },
    },
  };
</script>

<style scoped>
  .container {
    padding: 12px;
  }
  .w-100px {
    width: 100px;
  }
  .flex {
    display: flex;
  }
</style>
