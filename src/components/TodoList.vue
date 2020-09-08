<template>
  <div class="todo-list">
    <template v-for="(item, indexTodo) in todoList">
      <TodoItem :item="item" :indexTodo="indexTodo"/>
    </template>
  </div>
</template>

<script>
  import TodoItem from "./TodoItem";
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: "ToDoList",
    components: {
      TodoItem
    },
    computed: {
      ...mapGetters('todos', ['todoList']),

    },
    methods: {
    },
    async mounted() {
      const loadTodoList = await this.$store.dispatch('todos/loadListFromDatabase');
    }

  }
</script>

<style scoped lang="scss">
  .todo-list {
    margin: 30px auto auto;
    width: 1200px;
  }
</style>