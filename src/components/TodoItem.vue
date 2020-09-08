<template>
  <div class="todo-item">
    <div class="todo-header">
      <h4 class="todo-title">{{ item.todoName }}</h4>
      <div class="todo-actions__buttons">
        <button @click="onChangeTodo" class="todo-actions__button yellow">Change Item</button>
        <button @click="onRemoveTodo" class="todo-actions__button red">Remove Item</button>
      </div>
    </div>
    <ul class="item">
      <template v-for="(task, indexTask) in item.tasks">
        <Task :task="task" :todoName="item.todoName" :todoID="item.id" :indexTodo="indexTodo" :indexTask="indexTask"/>
      </template>
      <li class="">
        <button class="add-task" @click="onAddPopup">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  import Task from "./Task";
  import AddTask from "./AddTask";
  import { mapActions } from 'vuex';

  export default {
    name: "TodoItem",
    components: {
      Task,
      AddTask
    },
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
      todoName: {
        type: String,
        default: '',
      },
      indexTodo: {
        type: Number,
        default: 0,
      }
    },
    methods: {
      ...mapActions('todos', ['showPopup', 'setCurrentTask', "setCurrentTodo", 'removeTodo']),
      onChangeTodo() {
        this.setCurrentTodo({
          id: this.item.id,
          todoName: this.item.todoName,
          tasks: this.item.tasks,
          indexTodo: this.indexTodo,
        });
        this.showPopup('change_todo');
      },
      onRemoveTodo() {
        this.setCurrentTodo({
          indexTodo: this.indexTodo,
          todoName: this.item.todoName,
          id: this.item.id,
        });
        this.showPopup('delete todo');
      },
      onAddPopup() {
        let tasksLength = 0;
        if(this.item.tasks) {
          tasksLength = this.item.tasks.length
        }
        this.setCurrentTask({
          todoName: this.todoName,
          indexTodo: this.indexTodo,
          tasksLength: tasksLength,
          todoID: this.item.id,
          taskName: '',
          description: '',
          action: 'add',
        });
        this.showPopup('add');
      },
    }
  }
</script>

<style scoped lang="scss">


  .todo-item {
    background-color: rgba(212, 188, 205, 0.05);
    width: 600px;
    margin: auto auto 40px;
    border-radius: 5px;
    padding: 0 20px 20px 0;
    transition: 0.3s;
    transform: scaleZ(1.5);
    box-shadow: 0 0 10px 8px rgb(237, 231, 229);
    &:hover {
      transition: 0.3s;
      opacity: 1;
      transform: scale(1.01);
      box-shadow: 0 0 10px 4px rgb(237, 231, 229);
    }
    .todo-title {
      background-color: #026AA7;
      color: #ffffff;
      font-size: 22px;
      font-weight: 300;
      margin: 0;
      border-top-left-radius: 5px;
      border-bottom-right-radius: 50px;
      left: 0;
      top: 0;
      max-width: 280px;
      padding: 10px 50px 15px 20px;
    }
    ul {
    margin: auto;
    list-style: none;
    padding-left: 0;
    }
  }
  li {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }
  .add-task {
    color: #ffffff;
    &:focus {
      outline-style: none;
      border-width: 2px;
    }
    width: 30px;
    height: 30px;
    background-color: #519839;
    border: none;
    border-radius: 50%;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.1);
      background-color: lighten(#519839, 10%);

    }
    svg {
      vertical-align: center;
      margin-top: 3px;
    }
  }
  .todo-header {

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .todo-actions__button {
    border-radius: 20px;
    border: none;
    margin-left: 20px;
    padding: 5px 10px;
    font-weight: 300;
    color: #ffffff;
    &.s {
      display: flex;

    }
    &.yellow {
      background-color: #D29034;

      &:hover {
        transform: scale(1.03);
        transition: 0.3s;
        background-color: lighten(#D29034, 5%);
      }
    }

    &.red {

      background-color: #B04632;

      &:hover {
        transform: scale(1.03);
        background-color: lighten(#B04632, 5%);
        transition: 0.3s;
      }
    }
  }
</style>