<template>
  <div class="container">
    <v-text-field v-model="cycle" label="Enter cycle name" required></v-text-field>

    <v-menu v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y>
      <template v-slot:activator="{on, attrs}">
        <v-text-field
          v-model="startDate"
          label="Select cycle start date"
          prepend-icon="mdi-calendar"
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="startDate" @input="menu1 = false"></v-date-picker>
    </v-menu>
    <v-menu v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y>
      <template v-slot:activator="{on, attrs}">
        <v-text-field
          v-model="endDate"
          label="Select cycle end date"
          prepend-icon="mdi-calendar"
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="endDate" @input="menu2 = false"></v-date-picker>
    </v-menu>

    <v-text-field v-model="duration" label="Enter cycle duration" required></v-text-field>

    <v-btn primary @click="submitCycle" :loading="isLoading" :disabled="isLoading">Submit</v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
      cycle: '',
      duration: null,
      startDate: null,
      endDate: null,
      isLoading: false,
      menu1: false,
      menu2: false,
    }),
    methods: {
      submitCycle() {
        if (this.cycle && this.startDate && this.endDate && this.duration) {
          this.isLoading = true;
          Meteor.call('createCycle', this.cycle, this.startDate, this.endDate, this.duration, (err, res) => {
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
    },
  };
</script>
