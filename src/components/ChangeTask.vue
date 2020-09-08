<template>
  <div class="change__popup">
    <div class="change__block">
      <h4 class="change__title">{{currentTask.action}} task</h4>
        <textarea rows="5" class="change__text">{{currentTask.newDescription}}</textarea>
        <div class="change__buttons">
          <button @click="acceptChanges" class="change__button green">Accept</button>
          <button @click="cancelChanges" class="change__button red">Cancel</button>
        </div>
    </div>
  </div>
</template>

<script>
 import { mapActions, mapGetters } from 'vuex';

  export default {
    name: "ChangeTask",
    computed: {
      ...mapGetters('todos', ["currentTask"]),
    },
    methods: {
      ...mapActions('todos', ['changeTask', "showPopup", "setCurrentTask",]),
      acceptChanges() {
        const newDescription = document.querySelector('.change__text').value;

        if(newDescription && newDescription !== this.currentTask.initialDescription) {
          this.setCurrentTask({
            todoName: this.currentTask.todoName,
            indexTodo: this.currentTask.indexTodo,
            indexTask: this.currentTask.indexTask,
            todoID: this.currentTask.todoID,
            newDescription: newDescription,
            action: 'change',
          });
          this.showPopup('save change');
        } else {
          this.showPopup('none');
        }
      },
      cancelChanges() {
        this.showPopup('none');
      }
    },
  }
</script>

<style scoped lang="scss">

  .change__{
    &popup {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(black, 0.7);
      z-index: 3;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &block {
      width: 500px;
      height: 200px;
      background-color: white;
      border-radius: 10px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &title {
      font-size: 22px;
      margin: 5px;
      text-transform: capitalize;
    }
    &text {
      border-radius: 5px;
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