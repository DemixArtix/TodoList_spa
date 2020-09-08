<template>
  <div class="confirmation__popup">
    <template v-if="popup === 'delete todo'">
      <div class="confirmation__block">
        <h3 class="confirmation__text" >Confirm delete action for to-do <strong>"{{currentTodo.todoName}}"</strong></h3>
        <div class="confirmation__buttons">
          <button @click="onDeleteTodo(true)" class="confirmation__button green">Yes</button>
          <button @click="onDeleteTodo(false)" class="confirmation__button red">No</button>
        </div>
      </div>
    </template>
    <template v-else>
    <div class="confirmation__block">
      <h3 class="confirmation__text" >Confirm {{currentTask.action}} action for task <strong>"{{currentTask.newDescription || currentTask.initialDescription }}"</strong></h3>
      <template v-if="currentTask.action === 'delete'">
        <div class="confirmation__buttons">
          <button @click="onDeleteTask(true)" class="confirmation__button green">Yes</button>
          <button @click="onDeleteTask(false)" class="confirmation__button red">No</button>
        </div>
      </template>
      <template v-if="currentTask.action === 'cancel add'">
        <div class="confirmation__buttons">
          <button @click="onCancelAddTask(true)" class="confirmation__button green">Yes</button>
          <button @click="onCancelAddTask(false)" class="confirmation__button red">No</button>
        </div>
      </template>
      <template v-if="currentTask.action === 'change'">
        <div class="confirmation__buttons">
          <button @click="onAcceptChangeTask(true)" class="confirmation__button green">Yes</button>
          <button @click="onAcceptChangeTask(false)" class="confirmation__button red">No</button>
        </div>
      </template>
    </div>
    </template>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: "ConfirmationPopup",
    props: {
      textForPopup: {
        type: String,
        default: '',
      }
    },
    methods: {
      ...mapActions('todos',
        [ "deleteTask",
          'showPopup',
          'setCurrentTask',
          'changeTask',
          'removeTodo'
        ]),
      onDeleteTodo(bool) {
        if(bool) {
          this.removeTodo(this.currentTodo);
        }
        this.showPopup('none');
      },
      onDeleteTask(bool) {
        if(bool) {
          this.deleteTask(this.currentTask);
        }
        this.showPopup('none');
      },
      onCancelAddTask(bool) {
        if(bool) {
          this.showPopup('none');
        } else {
          this.showPopup('add');
          this.setCurrentTask({
            action: 'add',
            todoName: this.currentTask.todoName,
            description: this.currentTask.description,
            indexTodo: this.currentTask.indexTodo,
          });
        }
      },
      onAcceptChangeTask(bool) {
        if(bool) {
            this.changeTask({
              todoName: this.currentTask.todoName,
              description: this.currentTask.newDescription,
              indexTodo: this.currentTask.indexTodo,
              indexTask: this.currentTask.indexTask,
              todoID: this.currentTask.todoID,
            });
          this.showPopup('none');
        } else {
          this.showPopup('change');
          this.setCurrentTask({
            action: 'change',
            todoName: this.currentTask.todoName,
            newDescription: this.currentTask.newDescription,
            todoID: this.currentTask.todoID,
            indexTodo: this.currentTask.indexTodo,
            indexTask: this.currentTask.indexTask,
          });
        }
      }
    },
    computed: {
      ...mapGetters('todos', ['currentTask', 'popup', "currentTodo"])
    }
  }
</script>

<style scoped lang="scss">
  .confirmation__{
    &popup {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(#000, 0.7);
      z-index: 4;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &block {
        width: 500px;
        height: 200px;
        background-color: white;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 20px;
    }
    &text {
      font-weight: 300;
      strong {
        font-weight: 700;
      }
    }
    &button {
      font-size: 18px;
      padding: 8px 50px;
      border: none;
      border-radius: 20px;
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