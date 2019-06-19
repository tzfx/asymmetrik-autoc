<template>
  <div id="app">
    <img style="transform: rotate(180deg)" alt="Vue logo" src="./assets/logo.png">
    <div>
      <h1>Autocomplete</h1>
      <div>
        <input hidden type='radio' id='training' value='training' v-model='mode'>
        <label :class='{"selected": mode === "training"}' for='training'>Training</label>
        <input hidden type='radio' id='keyboard' value='keyboard' v-model='mode'>
        <label :class='{"selected": mode === "keyboard"}' for='keyboard'>Keyboard</label>
      </div>
      <br />
      <TrainingInput v-if='mode === "training"'></TrainingInput>
      <KeyboardInput v-if='mode === "keyboard"'></KeyboardInput>
    </div>
  </div>
</template>

<script>
  import KeyboardInput from './components/input/KeyboardInput.vue'
  import TrainingInput from './components/input/TrainingInput.vue'

  export default {
    name: 'Autocomplete-App',
    components: {
      KeyboardInput,
      TrainingInput
    },
    data: function() {
      return {
          mode: 'training'
        };
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  label {
    background: #eee;
    padding: 10px;
  }
  .selected {
    background: #2c3e50;
    color: white;
  }
</style>
