<template>
  <div class='container centered'>
    <div class='input'>
      <CandidateList @complete='finish($event)' />
      <input ref='input' placeholder="Start typing a word to activate autocomplete" type='text'
        v-model='input'
        @keyup='guess(input)'
        @keyup.space='update(input)'
        @keyup.enter='update(input + "\n")'
        @keydown.tab.prevent
        @keyup.tab='finish(input)'
      />
    </div>
    <div class='output centered'>
      <textarea class='output centered' readonly v-model='this.$store.state.output' placeholder="Output will appear here."></textarea>
      <br />
      <button @click='clearout'>Clear</button>
    </div>
  </div>
</template>

<script>
  import CandidateList from '@/components/candidate/CandidateList.vue'

  export default {
    name: 'KeyboardInput',
    components: {
      CandidateList
    },
    data: function() {
      return {
        input: ''
      }
    },
    methods: {
      clearout: function() {
        this.$store.commit('clearOutput');
      },
      // Autocomplete inside of the input box.
      finish: function(fragment) {
        let words = this.$autocomplete.getWords(fragment);
        if (words.length > 0) {
          this.input = words[0][0];
          this.$refs.input.focus();
        }
      },
      // Populate candidates with autocomplete guesses.
      guess: function(fragment) {
        if (fragment === "") {
          this.$store.commit('clearCandidates');
        } else {
          this.$store.commit('setCandidates',this.$autocomplete.getWords(fragment));
        }
      },
      // Update the output box.
      update: function(word) {
        if (word.match(/[a-zA-Z]+/).length > 0) {
          this.$autocomplete.train(word);
          this.$store.commit('updateOutput', word);
          this.$store.commit('clearCandidates');
        }
        this.input = '';
      }
    }
  }
</script>

<style scoped>
  .centered {
    margin: auto auto;
  }
  .container {
    width: 500px;
  }
  input {
    width: 300px;
  }
  .output {
    width: 500px;
    height: 300px;
    margin-top: 5px;
  }
</style>
