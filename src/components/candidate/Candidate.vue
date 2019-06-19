<template>
  <button :value="word" @click="choose">{{ word }} ({{ confidence }})</button>
</template>

<script>
  export default {
    name: 'Candidate',
    props: ['word', 'confidence'],
    methods: {
      choose: function() {
        this.$store.commit('clearCandidates');
        this.$parent.$emit('complete', this.word);
      }
    }
  }
</script>
