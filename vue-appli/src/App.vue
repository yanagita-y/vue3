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
//filter用にどのtodoを選ぶかの条件分岐として変数taskSelectを作った、こんなの作らずにやれとツッコミ受けるかも？
        taskSelect: "ALL"
      }
    },
//viewsフォルダの適当なフォルダから持ってきた（配列Tasksをstoreから引っ張ってくるための）computed、一覧表示する前の配列加工もここで行う
    computed: {
      Tasks: {
        get() {
//taskSelectがALLの時は、filterを用いて、オブジェクト名situationが「削除」の場合以外を戻り値として配列に入れてTasksとして出力
          if(this.taskSelect == "ALL"){
            return this.$store.getters.Tasks.filter((task) => {
              return task.situation != "削除"
            });
          }else {
//taskSelectがALLじゃない（つまり「作業中」か「完了」の）時はオブジェクト名situationの要素とtaskSelectが一致するもののみ配列に入れてTasksとして出力
            return this.$store.getters.Tasks.filter((task) => {
              return task.situation == this.taskSelect
            });
          }
        }
      }
    },
    methods: {
//ラジオボタンを変更してformSwitchを動かした時、引数をtaskSelectに入れる（これってcomputedに入れた方がいいのかな？まあいっか
//というかこの引数をcomputed内で直接引数にできるならこの処理もtaskSelectの宣言もいらないのかも？）
      formSwitch: function(select) {
        this.taskSelect = select;
      },
      onButtonClick(taskPlus) {
        if(taskPlus){
//stateに直接入力をするなというので入力前、加工前の配列をいったんnewTasksに入れる
//newTasksを加工した後に入力はdispatchで行う
//・・・dispatch？ひょっとするとdispatch使えばnewTasks何ぞ使わなくても入力できたかも？疲れたのでもういいや、、、（をい）
          const newTasks = this.$store.getters.Tasks;
          const newId = newTasks.length;
          newTasks.push({id: newId, comment: taskPlus, situation: '作業中'});
          this.$store.dispatch('getTasks', newTasks);
          this.taskPlus = '';
        }
      },
//viewsフォルダの適当なフォルダから持ってきたmethodsの2つ
//こちらもonButtonClick同様にnewTasksを作ってstateへの直接入力を避けてます
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
