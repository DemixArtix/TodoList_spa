<template>
  <li>
    <label class="container-checkbox">
      <input class="checkbox" type="checkbox" @click="onChangeComplete" v-model="task.complete" :value="true">
      <span class="checkmark"></span>
    </label>
    <span class="text-task">{{task.description}}</span>
    <button class="change-task" @click="onChangePopup">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" class="svg-inline--fa fa-pencil-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
    </button>
    <button class="delete-task" @click="onDelPopup">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg>    </button>
  </li>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: "Task",
    props: {
      task: {
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
      },
      indexTask: {
        type: Number,
        default: 0,
      },
      todoID: {
        type: String,
        default: '',
      }
    },
    methods: {
      ...mapActions('todos', ["deleteTask", "setCurrentTask", 'showPopup', 'changeComplete']),
      onChangeComplete() {
        this.changeComplete({
          complete: !this.task.complete,
          todoID: this.todoID,
          indexTask: this.indexTask,
        });
      },
      onChangePopup() {
        this.setCurrentTask({
          todoName: this.todoName,
          initialDescription: this.task.description,
          newDescription: this.task.description,
          action: 'change',
          todoID: this.todoID,
          indexTodo: this.indexTodo,
          indexTask: this.indexTask,
        });
        this.showPopup('change');
      },
      onDelPopup() {
        this.setCurrentTask({
          todoName: this.todoName,
          initialDescription: this.task.description,
          action: 'delete',
          todoID: this.todoID,
          indexTodo: this.indexTodo,
          indexTask: this.indexTask,
        });
        this.showPopup('delete');
      },
    }
  }
</script>

<style scoped lang="scss">
  li {
    padding: 10px;
    margin-left: 20px;
    display: flex;
    align-items: center;

  }
  .text-task {
    margin-left: 20px;
  }
  .container-checkbox {
    border-radius: 20px;
    position: relative;
    width: 25px;
    height: 25px;
    cursor: pointer;
    user-select: none;
    input ~ .checkmark {
      transition: all 0.2s;
      border-width: 2px;
    }
    &:hover input ~ .checkmark {
      border-color: #519839;
      border-width: 2px;
      width: 24px;
      height: 24px;
    }
    .checkmark:after {
      left: 10px;
      top: -8px;
      width: 10px;
      height: 24px;
      border: solid #519839;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
      animation: around 0.2s ease-in;
    }
  }
  .checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    &:checked ~ .checkmark {
      &:after {
        opacity: 1;
      }
    }
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    border: 1px solid lightgray;
    background-color: #fff;
    &:after {
      content: "";
      position: absolute;
      opacity: 0;
      transition: all 0.2s;

    }
  }
  .change-task {
    color: #ffffff;
    transition: all 0.2s;
    &:focus {
      outline-style: none;
      border-width: 2px;
    }
    width: 30px;
    height: 30px;
    background-color: #D29034;
    border: none;
    border-radius: 50%;
    margin-left: auto;
    margin-right: 10px;
    justify-self: flex-end;
    &:hover {
      transform: scale(1.1);
      background-color: lighten(#D29034, 10%);
    }
    svg {

      width: 16px;
      vertical-align: center;
      margin-top: 3px;
    }
  }

  .delete-task {
    color: #ffffff;
    &:focus {
      outline-style: none;
      border-width: 2px;
    }
    width: 30px;
    height: 30px;
    background-color: #B04632;
    border: none;
    border-radius: 50%;
    transition: all 0.2s;
    &:hover {
      transform: scale(1.1);
      background-color: lighten(#B04632, 10%);
    }
    svg {
      width: 16px;
      vertical-align: center;
      margin-top: 3px;
      font-size: 8px;
    }
  }

</style>