<template>
  <div class="add__popup">
    <div class="add__block">
      <h3 class="add__title">add new task</h3>
      <textarea rows="5" class="add__text" placeholder="Please, enter description of task">{{currentTask.description}}</textarea>
      <div class="add__buttons">
        <button @click="acceptAdd" class="add__button green">Accept</button>
        <button @click="cancelAdd" class="add__button red">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: "AddTask",
    methods: {
      ...mapActions('todos',
        ['addTask',
          "setCurrentTask",
          'showPopup',
        ]),
      acceptAdd() {
        const addedDescription = document.querySelector('.add__text').value;
        if(addedDescription) {
          this.addTask({
            indexTodo: this.currentTask.indexTodo,
            todoID: this.currentTask.todoID,
            description: addedDescription,
            tasksLength: this.currentTask.tasksLength,
          });
        }
        this.showPopup('none');
      },
      cancelAdd() {
        const addedDescription = document.querySelector('.add__text').value;
        if(addedDescription) {
          this.setCurrentTask({
            action: 'cancel add',
            description: addedDescription,
            indexTodo: this.currentTask.indexTodo,
            todoID: this.currentTask.todoID,
          });
          this.showPopup('cancel add');
        } else {
          this.showPopup('none');
        }
      }
    },
    computed: {
      ...mapGetters('todos', ['todoList', "currentTask"]),
    },
  }
</script>

<style scoped lang="scss">

  .add__{
    &title {
      font-size: 22px;
      margin: 5px;
      text-transform: capitalize;
    }
    &popup {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(black, 0.7);
      z-index: 3;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &block {
      border-radius: 10px;
      width: 500px;
      height: 200px;
      background-color: white;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &text {
      border-radius: 3px;
      font-size: 18px;
      resize: none;
    }
    &button {
      font-size: 18px;
      padding: 8px 50px;
      border: none;
      border-radius: 5px;
      color: white;
      &.green {
        background-color: #519839;
        &:hover {
          transform: scale(1.03);
          background-color: lighten(#519839, 10%);
          transition: 0.3s;
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
      &s {
        display: flex;
        justify-content: space-between;
      }

    }
  }

</style>