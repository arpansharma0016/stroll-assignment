<template>
  <div class="container">
    <v-text-field v-model="region" label="Enter region" required></v-text-field>

    <v-btn primary @click="createRegion" :loading="isLoading" :disabled="isLoading">Submit</v-btn>
  </div>
</template>

<script>
  export default {
    data: () => ({
      region: null,
      isLoading: false,
    }),
    methods: {
      createRegion() {
        if (this.region) {
          this.isLoading = true;
          Meteor.call('createRegion', this.region, (err, res) => {
            if (!err && res) {
              this.$router.push('/');
            } else {
              alert('Something went wrong');
            }
            this.isLoading = false;
          });
        } else {
          alert('Please enter the region');
        }
      },
    },
  };
</script>
