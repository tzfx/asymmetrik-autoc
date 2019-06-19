<template>
  <div @complete='this.$parent.$emit("complete", $event)' class='container' v-if='candidates.length > 0'>
    <Candidate v-for='candidate in candidates'
     :word='candidate[0]'
     :key='candidate[0]'
     :confidence='candidate[1]'>
    </Candidate>
  </div>
</template>

<script>
  import Candidate from './Candidate.vue'

  export default {
    components: {
      Candidate
    },
    computed: {
      candidates() {
        return this.$store.state.candidates;
      }
    }
  }
</script>

<style scoped>
  .container {
    margin: auto auto;
    width: 500px;
  }
</style>
