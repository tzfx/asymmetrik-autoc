<template>
  <div>
    <textarea placeholder="Enter your training passages here." v-model='input'></textarea>
    <br />
    <button :disbled='input === ""' @click='save(input)'>Submit</button>
    <br />
    <span class='animated' :class='{"fadeIn": submitted === true, "fadeOut": submitted === false}'>
      <font-awesome-icon icon='check-circle'></font-awesome-icon> Updated
    </span>
  </div>
</template>

<script>
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle'
  library.add(faCheckCircle)

  export default {
    name: 'TrainingInput',
    data: function() {
      return {
        input: '',
        // Without initializing submitted to 0 and strict checks on the template,
        //  we run the risk of fadeOut getting added on page render. Nice.
        submitted: 0
      }
    },
    methods: {
      /**
       * Sends the input passage to the autocompletion engine trainer, reveals update icon, and clears input.
       * @param input An arbitrary training string.
       */
      save: function(input) {
        this.$autocomplete.train(input);
        this.submitted = true;
        this.input = '';
        setTimeout(() => { this.submitted = false; }, 2000);
      }
    }
  }
</script>

<style scoped>
  span {
    opacity: 0;
    color: green;
  }
  textarea {
    width: 500px;
    height: 300px;
  }
</style>
