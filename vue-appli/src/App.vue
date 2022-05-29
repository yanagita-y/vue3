<template>
  <div id="app">

  <body>
        <h1>ToDoリスト</h1>
        <form>
          <input type="radio" id="all" name="drone" @change="formSwitch('ALL')" checked>
          <label for="all">すべて</label>
          <input type="radio" id="working" name="drone" @change="formSwitch('作業中')">
          <label for="working">作業中</label>
          <input type="radio" id="completion" name="drone" @change="formSwitch('完了')">
          <label for="completion">完了</label>
        </form>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>コメント</th>
              <th>状態</th>
            </tr>
          </thead>
          <template v-for="todo in Tasks">
            <tr :key="todo.index">
              <td>{{todo.id}}</td>
              <td>{{todo.comment}}</td>
              <td><button type="submit" @click="onButtonClickChange(todo.id)">{{todo.situation}}</button></td>
              <td><button type="submit" @click="onButtonClickDelete(todo.id)">削除</button></td>
            </tr>
          </template>
        </table>
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
        taskPlus: "",
        taskSelect: "ALL"
      }
    },
    computed: {
      Tasks: {
        get() {
          if(this.taskSelect == "ALL"){
            return this.$store.getters.Tasks.filter((task) => {
              return task.situation != "削除"
            });
          }else {
            return this.$store.getters.Tasks.filter((task) => {
              return task.situation == this.taskSelect
            });
          }
        }
      }
    },
    methods: {
      formSwitch: function(select) {
        this.taskSelect = select;
      },
      onButtonClick(taskPlus) {
        if(taskPlus){
          const newTasks = this.$store.getters.Tasks;
          const newId = newTasks.length;
          newTasks.push({id: newId, comment: taskPlus, situation: '作業中'});
          this.$store.dispatch('getTasks', newTasks);
          this.taskPlus = '';
        }
      },
      onButtonClickChange: function(value){
        const newTasks = this.$store.getters.Tasks;
        if(newTasks[value].situation == '作業中'){
          newTasks[value].situation = '完了';
        }else {
          newTasks[value].situation = '作業中';
        }
      this.$store.dispatch('getTasks', newTasks);
      },
      onButtonClickDelete: function(value){
        const newTasks = this.$store.getters.Tasks;
        newTasks[value].situation = '削除';
      this.$store.dispatch('getTasks', newTasks);
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
