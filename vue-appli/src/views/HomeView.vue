<template>
  <table id="task">
    <template v-for="Task in Tasks">
      <tr v-if="Task.id == 'ID'" :key="Task.index">
        <td><b>{{Task.id}}</b></td>
        <td><b>{{Task.comment}}</b></td>
        <td><b>{{Task.situation}}</b></td>
      </tr>
      <tr v-if="Task.situation == '作業中'" :key="Task.index">
        <td>{{Task.id}}</td>
        <td>{{Task.comment}}</td>
        <td><button type="submit" @click="onButtonClickChange(Task.id)">{{Task.situation}}</button></td>
        <td><button type="submit" @click="onButtonClickDelete(Task.id)">削除</button></td>
      </tr>
      <tr v-if="Task.situation == '完了'" :key="Task.index">
        <td>{{Task.id}}</td>
        <td>{{Task.comment}}</td>
        <td><button type="submit" @click="onButtonClickChange(Task.id)">{{Task.situation}}</button></td>
        <td><button type="submit" @click="onButtonClickDelete(Task.id)">削除</button></td>
      </tr>
    </template>
  </table>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  computed : {
    Tasks:{
      get(){
        return this.$store.getters.Tasks;
      }
    }
  },
    methods: {
      onButtonClickChange: function(value){
        if(this.$store.getters.Tasks[value].situation == '作業中'){
          this.$store.state.Tasks[value].situation = '完了';
        }else {
          this.$store.state.Tasks[value].situation = '作業中';
        }
      },
      onButtonClickDelete: function(value){
        this.$store.state.Tasks[value].situation = '削除';
      }
    }
  }
</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#step{
  background: #1e90ff;
  color: #fff;
  font-size: 2px;
  margin: 0;
  max-width: 40px;
  padding: 2px;
  text-align: center;
}

#inst {
  font-size: 12px;
  color: #696969;
  text-align: center;
  padding-bottom: 10px;
}

.header {
  background: #afeeee;
  margin: 0%;
  padding: 0%;
  line-height: 10px;
  border-bottom: solid 1px #48d1cc;
}

.body {
  font-size: 9px;
  margin: 10px;
  padding-bottom: 10px;
  line-height: 30px;
  text-align: left;
}

.body input {
  vertical-align:middle;
}

.genre {
  color: #1e90ff;
}

select {
  padding: 5px 10px 5px 0px;
  font-size: 9px;
  border: 1px solid #dcdcdc;
}

.form{
  max-width: 80%;
  margin-top: 80px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #48d1cc;
  border-bottom: 0.5px solid #000;
}

.button-group{
  text-align: center;
}

.button {
  background-color: #40e0d0;
  color: #fff;
  border: solid 1px #48d1cc;
  margin-top: 1rem;
  padding: 5px 10px;
  border-radius: 0.5rem 0.5rem;
  text-decoration: none;
  display:inline-block;
  margin: 10px;
}
</style>