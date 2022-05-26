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