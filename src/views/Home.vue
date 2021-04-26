<template>
  <div class="home container">
    <h1>やることリスト</h1>
    <ul class="todo-list">
      <li v-for="(todo, index) in todos" :key="todo">
        <input class="check" type="checkbox" v-model="todo.isDone">
        <span :class="{done: todo.isDone}" class="todo-item">{{ todo.title }}</span>
        <span @click="deleteItem(index)" class="command">[x]</span>  
      </li>
      <li v-show="!todos.length">Nothing to do</li>
    </ul>
    <form @submit.prevent="addItem">
      <input type="text" v-model="newItem" class="item">
      <input type="submit" value="Add" class="add">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: "",
      todos: []
    }
  },
  watch: {
    todos: {
      handler() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
      },
      deep: true
    }
  },
  mounted() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || [];
  },
  methods: {
    addItem() {
      var item = {
        title: this.newItem,
        isDone: false
      }
      this.todos.push(item);
      this.newItem = "";
    },
    deleteItem(index) {
      if(confirm('消してもいいの？')) {
        this.todos.splice(index, 1);
      }
    }
  }
}
</script>

<style scoped>
.container {
  width: 300px;
  height: 100vh;
  margin: auto;
  background-color: linear-gradient(#cd9, #cfc, #cff);
  font-size: 16px;
}
h1 {
  font-size: 20px;
  border-bottom: 1px solid #ddd;
  padding: 14px 0;
}
span {
  margin-left: 10px;
}
.todo-list {
  list-style: none;
}
.todo-list li {
  line-height: 1.5;
}
input[type="text"] {
  padding: 2px;
}
.check {
  font-size: 14px;
}
.todo-item {
  font-size: 18px;
}
.command {
  font-size: 16px;
  cursor: pointer;
  color: #08c;
}
.todo-list li > span.done {
  text-decoration: line-through;
  color: rgb(117, 117, 117);
}
.item {
  padding: 3px;
  font-size: 16px;
}
.add {
  margin-left: 10px;
  background: #fff;
  width: 35px;
  height: 25px;
}
</style>