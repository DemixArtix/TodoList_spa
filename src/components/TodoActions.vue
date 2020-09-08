<template>
  <div class="todo-actions__popup">
    <template v-if="popup === 'add_todo'">
    <div class="todo-actions__block">
      <button @click="closePopup" class="todo-actions__button close-btn">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
      </button>
      <h4 class="todo-actions__title">Add To - do Item</h4>
        <div class="todo-actions__header">
        <label class="todo-actions__label">
          <span>Name of To-do</span>
          <input v-model="nameOfTodo" class="todo-actions__input todo-name" type="text" placeholder="Name of Todo">
        </label>
        <button ref="createButton" @click="onCreateTodo" class="todo-actions__button create-btn">Create Todo Item</button>
      </div>
      <transition-group name="todo-actions__list" tag="ul" class="todo-actions__list">
              <li class="todo-actions__item" v-for="(task, index) in arrOfTasks" :key="index">
                <span class="todo-actions__index">{{index + 1}}</span>
                <input class="todo-actions__input" type="text" v-model="task.description" placeholder="description of task">
                <button class="todo-actions__button remove-task" @click="onRemoveTask(index)">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" class="svg-inline--fa fa-minus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
                </button>
              </li>
      </transition-group>
      <div class="todo-actions__item-last">
        <button class="todo-actions__button add-task" @click="onAddTask">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
        </button>

      </div>
    </div>
    </template>
    <template v-if="popup === 'change_todo'">
      <div class="todo-actions__block">
        <button @click="closePopup" class="todo-actions__button close-btn">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
        </button>
        <h4 class="todo-actions__title">Change To - do Item</h4>
        <div class="todo-actions__header">
          <label class="todo-actions__label">
            <span>Name of To-do</span>
            <input :value="currentTodo.todoName" id="changeTodoName" class="todo-actions__input todo-name" type="text" placeholder="Name of Todo">
          </label>
          <button ref="changeButton" @click="onChangeTodo" class="todo-actions__button change-btn">Change Todo Item</button>
        </div>
        <transition-group name="todo-actions__list" tag="ul" class="todo-actions__list">
          <li class="todo-actions__item" v-for="(task, index) in currentTodo.tasks" :key="index">
            <span class="todo-actions__index">{{index + 1}}</span>
            <input class="todo-actions__input" type="text" v-model="task.description" placeholder="description of task">
            <button class="todo-actions__button remove-task" @click="onRemoveTask(index)">
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="minus" class="svg-inline--fa fa-minus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
            </button>
          </li>
        </transition-group>
        <div class="todo-actions__item-last">
          <button class="todo-actions__button add-task" @click="onAddTask">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
          </button>

        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: "TodoActions",
    data: () => ({
      nameOfTodo: '',
      arrOfTasks: [
        { description: 'some description1',},
        { description: 'some description2',},
        { description: 'some description3',},
      ]
    }),
    computed: {
      ...mapGetters('todos', ['todoList', 'currentTodo', 'currentTodoName', 'popup'])
    },
    methods: {
      ...mapActions('todos', ['createTodo', 'changeTodo', "showPopup", "setCurrentTodo", 'addTaskForChangeWindow', 'clearObjOfTasks']),
      ...mapActions('notifications', ['pushNotification']),
      onAddTask() {
        if(this.popup === 'add_todo') {
          setTimeout(() => {
            this.arrOfTasks.push({description: ''});
          }, 200);
        }
        if(this.popup === 'change_todo') {
          setTimeout(() => {
            this.addTaskForChangeWindow({
                  taskName: `task${this.currentTodo.tasks.length + 1}`,
                  complete: false,
                  description: '',
            })
          }, 200);
        }
      },
      onRemoveTask(index) {
        if(this.popup === 'add_todo') {
          this.arrOfTasks.splice(index, 1);
        }
        if(this.popup === 'change_todo') {
          this.currentTodo.tasks.splice(index, 1);
        }
      },
      onCreateTodo() {
        if(!this.nameOfTodo) {
            this.pushNotification({
              text: 'A to-do item name is required',
              color: '#ff0000',
            })
        } else {
          const tasks = [];
          this.arrOfTasks.forEach((task) => {
            if(task.description) {
              tasks.push(task);
            }
          });
          const newTodo = {
            nameTodo: this.nameOfTodo,
            tasks,
          };
          console.log(newTodo);
          this.createTodo(newTodo);
          this.$refs.createButton.classList.add('success');
          setTimeout(() => {
            this.showPopup('none');
            this.$refs.createButton.classList.remove('success');
            this.pushNotification({
              text: 'To-do list created',
              color: '#a6b401'
            })
          }, 500);

        }
      },
      onChangeTodo() {
        const changedTodoName = document.getElementById('changeTodoName').value;
        if(!changedTodoName) {
          this.pushNotification({
            text: 'A to-do item name is required',
            color: '#ff0000',
          })
        } else {
          let tasks = [];
          console.log(this.currentTodo.tasks);
          this.currentTodo.tasks.forEach((task) => {
            if(task.description) {
              tasks.push(task);
            }
          });
          const changedTodo = {
            currentTodoName: this.currentTodoName,
            newTodoName: changedTodoName,
            tasks: tasks,
            indexTodo: this.currentTodo.indexTodo,
            id: this.currentTodo.id
          };
          this.changeTodo(changedTodo);
          this.$refs.changeButton.classList.add('success');
          setTimeout(() => {
            this.showPopup('none');
            this.$refs.changeButton.classList.remove('success');
            this.pushNotification({
              text: 'To-do list changed',
              color: '#a6b401'
            })
          }, 500);

        }

      },
      closePopup() {
        this.setCurrentTodo({});
        this.showPopup('none');
      },

    }
  }
</script>

<style scoped lang="scss">
  .todo-actions__list-enter-active, .todo-actions__list-leave-active {
      transition: all 0.5s;
  }
  .todo-actions__list-enter  {
    transform: translateX(30px);
    opacity: 0;
  }
  .todo-actions__list-leave-to {
    transform: translateX(-30px);
    opacity: 0;
    span {
      display: none;
    }
  }
  .todo-actions__list-enter-to, .todo-actions__list-leave {
    opacity: 1;
  }



  @keyframes appearance {
    from {
      margin-bottom: 10px;
      opacity: 0;
    }
    to {
      margin-bottom: 20px;
      opacity: 1;
    }
  }
  .success {
    &:focus {
      transition: 0.2s;
      transform: translate(100px);
      opacity: 0;
    }
  }
  .opacity {
    animation: opacity 4s;
  }
  .appearance {
    animation: appearance 2s;
  }
  .todo-actions__{
    &title {
      position: absolute;
      left: 0;
      top: 20px;
      margin-top: 0;
      background-color: #026AA7;
      color: white;
      border-bottom-right-radius: 80px;
      border-top-right-radius: 80px;
      border-top-left-radius: 5px;
      padding: 15px 50px 10px 20px;
      width: max-content;
      font-size: 18px;
      font-weight: 300;
    }
    &notification {
      opacity: 0;
      position: absolute;
      top: 0;
      right: 0;
      margin: 20px;
      padding: 20px;
      background-color: rgba(red, 0.3);
      border-radius: 10px;
      color: #fff;
    }
    &popup {
      z-index: 5;
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(#000, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s;
      overflow: scroll;
    }
    &block {
      position: relative;
      margin: 30px auto auto;
      padding: 80px 20px 20px;
      width: 600px;
      background-color: white;
      min-height: 150px;
      border-radius: 5px;
      box-shadow: 0 0 100px 40px rgba(#000, 0.5);
    }
    &list {
      padding-left: 0;
    }
    &item {
      transition: all 0.3s;
      display: flex;
      align-items: center;
      &-last {
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
        width: 595px;
      }
    }
    &index {
      margin-right: 10px;
      width: 20px;
    }
    &header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    &label {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 350px;
    }
    &input {
      border-radius: 25px;
      border: 1px solid gray;
      margin-right: auto;
      height: 30px;
      width: 450px;
      padding-left: 10px;
      padding-right: 10px;
      transition: 0.2s;
      &:focus {
        transition: 0.2s;
        outline-style: none;
        background-color: rgba(#026AA7, 0.1);
        box-shadow: 0 0 5px 5px rgba(#026AA7, 0.1);
      }
      &.todo-name {
        width: 200px;
        margin: 10px;
        &:focus {
          outline-style: none;
          width: 198px;
        }
      }
    }
    &button {
      &:focus {
        outline-style: none;
        border-width: 2px;
      }
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      border: 1px solid black;
      border-radius: 50%;
      svg {
        width: 20px;
        height: 20px;
        vertical-align: center;
      }
      &.create-btn {
        font-size: 16px;
        display: inline-block;
        width: auto;
        height: auto;
        border-radius: 25px;
        padding: 9px 20px;
        background-color: #519839;
        border: none;
        color: #FFFFFF;
        &:active {
          transition: 0.5s;
        }

          &:hover {
            background-color: lighten(#519839, 5%);
        }
      }
      &.change-btn {
        font-size: 16px;
        display: inline-block;
        width: auto;
        height: auto;
        border-radius: 25px;
        padding: 9px 20px;
        background-color: #D29034;
        border: none;
        color: #FFFFFF;
        &:active {
          transition: 0.5s;
        }

        &:hover {
          background-color: lighten(#D29034, 5%);
        }
      }
      &.add-task {
        background-color: #519839;
        width: 40px;
        height: 40px;
        border: none;
        transition: 0.5s;
        &:hover {
          background-color: #519839;
          transform: scale(1.05);
        }
        &:active {
          transform: scale3d(-1, 1, 1);
          transition: 0.1s;
        }
        &:focus {
          border-width: 1px;
        }
      }
      &.remove-task {
        background-color: #f32501;
        border: none;
        transition: all 0.2s;
        &:hover {
          background-color: #ff3530;
          transform: rotate(180deg);
        }
        &:active {
          transform: scale3d(-1, 1, 1);
        }
        svg {
          width: 15px;
        }


      }
      &.close-btn {
        color: #ffffff;
        background-color: #ff002c;
        border: none;
        width: 40px;
        height: 40px;
        position: absolute;
        top: -20px;
        right: -20px;
        svg {
          height: 26px;
          width: 26px;
        }
        transition: 0.2s;
        transform: rotate(-90deg);
        &:hover {
          transition: 0.2s;
          background-color: #ff3530;
          box-shadow: 0 0 12px 4px rgba(#ff3530, 0.7);
          transform: rotate(90deg);
        }
      }
    }
  }
  .todo-item {
    border: 1px solid lightgray;
    background-color: #F8F8FF;
    width: 600px;
    margin: auto auto 40px;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 0 10px 10px rgba(#D3D3DA, 0.7);
    transition: 0.3s;
    opacity: 0.5;
    &:hover {
      transition: 0.3s;
      opacity: 1;
      transform: scale(1.01);
      box-shadow: 0 0 10px 4px rgba(#D3D3DA, 0.7);
    }
    h4 {
      text-align: center;
      font-size: 22px;
      margin: 5px;
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

</style>