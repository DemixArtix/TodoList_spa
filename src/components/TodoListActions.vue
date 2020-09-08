<template>
    <div class="todo-actions__block">
      <button @click="onAddTodo" class="todo-actions__button green">Add Todo Item</button>
    </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "TodoListActions",
    methods: {
      ...mapActions('todos', ['showPopup']),
      onAddTodo() {
        this.showPopup('add_todo')
      },
    }
  }
</script>

<style scoped lang="scss">
  .todo-actions__{
    &block {
      padding: 20px 0;
      max-width: 800px;
      margin-right: 0;
      display: flex;
      justify-content: space-between;
      transition: all 0.3s;
      &:hover {
        opacity: 1;
      }
    }
    &button {
      color: #ffffff;
      padding: 10px 20px 10px 40px;
      font-size: 16px;
      border: none;
      border-top-right-radius: 25px;
      border-bottom-right-radius: 25px;
      &.green {
        background-color: #519839;
        transition:all 0.3s;
        &:hover {
          opacity: 1;
          background-color: lighten(#519839, 10%);
          transform: scale(1.05);
          /*box-shadow: 0 0 12px 6px rgba(#519839, 0.9);*/
        }
      }
    }
  }
</style>