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
      <textarea class='output centered'
       readonly
        v-model='this.$store.state.output'
        placeholder="Output will appear here. Enter or space will submit from input. Tab will autocomplete with the most likely word."
        ></textarea>
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
      /**
       * Requests the store to dump all it's accrued output.
       */
      clearout: function() {
        this.$store.commit('clearOutput');
      },
      /**
       * Autocompletes the input fragment with the candidate with the highest confidence and retrains the selected candidate.
       *  Maintains capitalization of the fragment.
       *  Can be called from the Candidate component through some event laddering.
       * @param fragment Input fragment to attempt to complete.
       */
      finish: function(fragment) {
        let words = this.$autocomplete.getWords(fragment);
        if (words.length > 0) {
          this.input = this.input.concat(words[0][0].slice(this.input.length));
          this.$refs.input.focus();
        }
      },
      /**
       * Queries the autocomplete engine with the fragment. Clears candidate list if the fragment is empty.
       * @param fragment Input fragment to send.
       */
      guess: function(fragment) {
        if (fragment === '') {
          this.$store.commit('clearCandidates');
        } else {
          this.$store.commit('setCandidates',this.$autocomplete.getWords(fragment));
        }
      },
      /**
       * Send the input word to autocomplete engine for training, and request the store to add it to existing output.
       * @param word Word to add to output.
       */
      update: function(word) {
        if (word !== '' && word.trim().length > 0) {
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
