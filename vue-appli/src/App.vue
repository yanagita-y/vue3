<template>
  <div id="app">

  <body>
        <h1>ToDoリスト</h1>
        <form>
          <input type="radio" id="all" name="drone" @click="formSwitch('/')" checked>
          <label for="all">すべて</label>
          <input type="radio" id="working" name="drone" @click="formSwitch('/nowTask')">
          <label for="working">作業中</label>
          <input type="radio" id="completion" name="drone" @click="formSwitch('/doneTask')">
          <label for="completion">完了</label>
        </form>
        <br>
        <router-view/>
        <h3>新規タスクの追加</h3>
        <input type="text" v-model="taskPlus">
        <button type="submit" @click="onButtonClick(taskPlus);">追加</button>
    </body>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        taskPlus: ""
      }
    },
    methods: {
      formSwitch: function (page) {
        this.$router.push(page);
      },
      onButtonClick(taskPlus) {
        if(taskPlus){
          const newId = this.$store.state.Tasks.length;
          this.$store.state.Tasks.push({id: newId, comment: taskPlus, situation: '作業中'});
          this.taskPlus = '';
        }
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

table {
    margin-left: auto;
    margin-right: auto;
}
</style>
