<template>
  <div id="app">
    <Preloader v-if="preloader"/>
    <div class="header">
      <TodoListActions/>
      <div class="icon">
        <h1 class="main-title">ToDo application</h1>
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
      </div>

    </div>
<!--    <button @click="showList">-->
<!--      check todo-->
<!--    </button>-->
    <Notification/>

    <TodoList/>
    <template v-if="popup === 'change'">
      <ChangeTask/>
    </template>
    <template v-if="popup === 'cancel add' || popup === 'delete' || popup === 'save change' || popup === 'delete todo'">
      <ConfirmationPopup/>
    </template>
    <template v-if="popup === 'add'">
      <AddTask/>
    </template>
    <template v-if="popup === 'add_todo' || popup === 'change_todo'">
      <TodoActions/>
    </template>
  </div>
</template>

<script>
  import Preloader from "./components/Preloader";
  import TodoList from "./components/TodoList";
  import TodoListActions from "./components/TodoListActions";
  import ChangeTask from "./components/ChangeTask";
  import ConfirmationPopup from "./components/ConfirmationPopup";
  import AddTask from "./components/AddTask";
  import TodoActions from "./components/TodoActions";
  import Notification from "./components/Notification";
  import { mapGetters, mapActions } from 'vuex';



export default {
  name: "App",
  components: {
    Preloader,
    TodoList,
    TodoListActions,
    ChangeTask,
    ConfirmationPopup,
    AddTask,
    TodoActions,
    Notification
  },
  data: () => ({
    todoListFromLS: JSON.parse(localStorage.getItem('todoList')),
  }),
  computed: {
    ...mapGetters('todos', ['popup', "todoList", 'preloader']),
  },
  methods: {
    showList() {
      console.log(this.todoList);
    },
    // ...mapActions('todos', ['saveToLocalStorage']),
    changeOverflow() {
      if(this.popup !== 'none') {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
  },
  watch: {
    popup: 'changeOverflow',
  }
};
</script>

<style lang="scss">
  html {
    position: relative;
    background-color: rgba(255, 255, 255, 0.75);
  }
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: auto;
  max-width: 1200px;
}

  @keyframes show {
    from {
      margin-left: 90%;
    }
    to {
      margin-left: 0;
    }
  }
  .icon {
    color: #ffffff;
    position: relative;
    svg {
      top: 20px;
      right: -2px;
      position: absolute;
      width: 40px;
      height: 40px;
      transition: 2s;
    }
  }
  .header {
    z-index: 1;
    margin-right: 94%;
    width: 100%;
    right: 0;
    top: 10px;
    position: fixed;
    display: flex;
    justify-content: space-between;
    background-color: rgba(#519839, 0.9);
    padding: 0 20px;
    transition: 0.5s;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    /*&:before  {*/
    /*  content: '';*/
    /*  position: absolute;*/
    /*  left: 37px;*/
    /*  top: 16px;*/
    /*  border: solid #fff;*/
    /*  border-width: 0 7px 7px 0;*/
    /*  width: 30px;*/
    /*  height: 30px;*/
    /*  transform: rotate(135deg);*/
    /*  transition: 0.7s;*/
    /*}*/
    &:hover {
      /*&:before {*/
      /*  transition: 0.5s;*/
      /*  transform: rotate(315deg);*/
      /*  opacity: 0;*/
      /*}*/
      top: 0;
      padding: 5px;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      margin-right: 0;
      background-color: rgba(#519839, 0.5);
      .icon {
        svg {
          transition: 0.5s;
          opacity: 0;
        }
      }
    }
  }
  .main-title {
    color: white;
    margin-right: 80px;
  }

</style>
