<template>
  <button :value="word" @click="choose">{{ word }} ({{ confidence }})</button>
</template>

<script>
  /**
   * Simple clickable buttons displaying our word candidates and their confidence.
   */
  export default {
    name: 'Candidate',
    props: ['word', 'confidence'],
    methods: {
      /**
       * Allows the user to autocomplete into the input box by clicking the candidate's button.
       *  As the input box is not in the store, it's emitted up the scope to be handled by the KeyboardInput component.
       */
      choose: function() {
        this.$store.commit('clearCandidates');
        this.$parent.$emit('complete', this.word);
      }
    }
  }
</script>
