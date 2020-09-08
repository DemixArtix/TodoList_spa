import Vue from "vue";
import mutations from "@/store/mutations";
import firebase from 'firebase/app';

const {
  CHANGE_TASK,
  DELETE_TASK,
  ADD_TASK,
  SET_CURRENT_TASK,
  SET_CURRENT_TODO,
  SHOW_POPUP,
  CREATE_TODO,
  CHANGE_TODO,
  REMOVE_TODO,
  ADD_TASK_FOR_CHANGE_WINDOW,
  CLEAR_OBJ_OF_TASKS,
  SWITCH_PRELOADER,
  SET_TOKEN
} = mutations;


function loadLS() {
  const storage = JSON.parse(localStorage.getItem('todoList'));

}

const todosStore = {
  namespaced: true,
  state: {
    todoList: [],
    //   [
    //   {
    //     todoName: 'TodoName1',
    //     tasks: [
    //        {
    //          complete: false,
    //          description: "some task1",
    //        },
    //        {
    //          complete: true,
    //          description: "some task2",
    //        },
    //        {
    //          complete: false,
    //          description: "some task3",
    //        },
    //      ],
    //   },
    //   {
    //     todoName: 'TodoName2',
    //     tasks: [
    //       {
    //         complete: false,
    //         description: "some task4",
    //       },
    //       {
    //         complete: true,
    //         description: "some task5",
    //       },
    //      {
    //         complete: false,
    //         description: "some task6",
    //       },
    //     ],
    //   },
    // ],
    currentTask: {},
    currentTodo: {},
    popup: 'none',
    preloader: false,
    token: '',
  },
  getters: {
    todoList: ({ todoList }) => todoList,
    currentTask: ({ currentTask }) => currentTask,
    currentTodo: ({ currentTodo }) => currentTodo,
    currentTodoName: ({ currentTodoName }) => currentTodoName,
    popup: ({ popup }) => popup,
    preloader: ({ preloader }) => preloader,
    token: ({token}) => token,
  },
  mutations: {
    [CHANGE_TASK](state, task) {
      state.todoList[task.indexTodo].tasks[task.indexTask].description =
        task.description;
    },
    [DELETE_TASK](state, task) {
      state.todoList[task.indexTodo].tasks.splice(task.indexTask, 1);
    },
    [ADD_TASK](state, task) {
      state.todoList[task.indexTodo].tasks.push({
        taskName: `task${state.todoList[task.indexTodo].tasks.length + 1}`,
        complete: false,
        description: task.description,
      });
    },
    [SHOW_POPUP](state, value) {
        state.popup = value;
    },
    [SET_CURRENT_TASK](state, task) {
      state.currentTask = {
        initialDescription: task.initialDescription,
        todoName: task.todoName,
        newDescription: task.newDescription,
        action: task.action,
        indexTodo: task.indexTodo,
        indexTask: task.indexTask,
        tasksLength: task.tasksLength,
        todoID: task.todoID,
      };
    },
    [SET_CURRENT_TODO](state, todo) {
      state.currentTodo = todo
    },
    [CREATE_TODO](state, todo) {
      const { tasks } = todo;
      state.todoList.unshift({
        todoName: todo.nameTodo,
        tasks: todo.tasks,
        id: todo.id,
      });
    },
    [ADD_TASK_FOR_CHANGE_WINDOW](state, task) {
        state.currentTodo.tasks.push(task);
    },
    [CHANGE_TODO](state, todo) {

        state.todoList[todo.indexTodo].todoName = todo.newTodoName;
        state.todoList[todo.indexTodo].tasks = todo.tasks;
        state.currentTodo = {};
    },
    [REMOVE_TODO](state, indexTodo) {
     state.todoList.splice(indexTodo, 1);
     state.currentTodo = {};
    },
    [CLEAR_OBJ_OF_TASKS](state, obj) {
      state.currentTodo = obj;
    },
    [SWITCH_PRELOADER](state, bool) {
      state.preloader = bool;
    },
    [SET_TOKEN](state, token) {
      state.token = token;
    }
  },
  actions: {
    switchPreloader({commit}, bool) {
      commit(SWITCH_PRELOADER, bool);
    },
    async createTodo({commit, dispatch, getters}, todo) {
      try {
        dispatch('switchPreloader', true);
        const { tasks } = todo;
        const todoName = todo.nameTodo;
        const validTasks = [];
        tasks.forEach((task) => {
          if(task.description) {
            validTasks.push({
              complete: false,
              description: task.description,
            });
          }
        });
        todo.tasks = validTasks;
        todo.id = '';
        getters.token;
        await firebase.database().ref(getters.token + '/todoList/').push({todoName, tasks: validTasks})
          .then(res => {
            todo.id = res.path.pieces_[1];
            dispatch('switchPreloader', false);
          });
        commit(CREATE_TODO, todo);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async changeTodo({ commit, dispatch, getters }, todo) {
      try {
        dispatch('switchPreloader', true);
        const todoName = todo.newTodoName;
        const tasks = todo.tasks;
        await firebase.database().ref(getters.token + '/todoList/'+ todo.id).update({todoName, tasks}).then(() => {
          dispatch('switchPreloader', false);
        });
        commit(CHANGE_TODO, todo)
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async removeTodo({ commit, dispatch, getters }, currentTodo) {
      try {
        dispatch('switchPreloader', true);
        await firebase.database().ref(getters.token + '/todoList/'+ currentTodo.id).remove().then(() => {
          dispatch('switchPreloader', false);
        });
        commit(REMOVE_TODO, currentTodo.indexTodo)
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async changeComplete({ commit, dispatch, getters }, params) {
      try {
        dispatch('switchPreloader', true);
        await firebase.database().ref(getters.token + '/todoList/'+ params.todoID + '/tasks/' + params.indexTask)
          .update({complete: params.complete})
          .then(() => {
            dispatch('switchPreloader', false);
          });
      } catch (e) {
        console.error(e);
        throw e;
      }

    },
    async changeTask({ commit, dispatch, getters }, task) {
      try {
        dispatch('switchPreloader', true);
        await firebase.database().ref(getters.token + '/todoList/'+ task.todoID + '/tasks/' + task.indexTask)
          .update({description: task.description})
          .then(() => {
            dispatch('switchPreloader', false);
          });
        commit(CHANGE_TASK, task);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async deleteTask({ commit, dispatch , getters }, task) {
      try {
        dispatch('switchPreloader', true);
        const newTasksList = getters.todoList[task.indexTodo].tasks;
        newTasksList.splice(task.indexTask, 1);
        await firebase.database().ref(getters.token + '/todoList/'+ task.todoID)
          .update({tasks: newTasksList})
          .then(() => {
            dispatch('switchPreloader', false);
          });
        // commit(DELETE_TASK, task);
      } catch (e) {
        console.error(e);
        throw(e)
      }
    },
    async addTask({ commit, dispatch, getters }, task) {
      try {
        dispatch('switchPreloader', true);
        await firebase.database().ref(getters.token + '/todoList/' + task.todoID + '/tasks/')
          .child(task.tasksLength)
          .set({
            description: task.description,
            complete: false,
          })
          .then(() => {
            dispatch('switchPreloader', false);
          });
        commit(ADD_TASK, task);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    showPopup({ commit }, value) {
        commit(SHOW_POPUP, value);
      },
    setCurrentTask({ commit }, task) {
      commit(SET_CURRENT_TASK, task);
    },
    setCurrentTodo({commit}, todo) {
      commit(SET_CURRENT_TODO, todo);
    },
    addTaskForChangeWindow({commit}, task) {
      commit(ADD_TASK_FOR_CHANGE_WINDOW , task);
    },
    clearObjOfTasks({commit}, obj) {
      commit(CLEAR_OBJ_OF_TASKS, obj);
    },
    async loadListFromDatabase({state, dispatch, commit}) {
      try {
        dispatch('switchPreloader', true);
        let token = localStorage.getItem('token');
        if(!token) {
          const newUser = await firebase.database().ref('/').push({todoList: 1}).then((res) => {
            token = res.path.pieces_[0];
            console.log(res);
            localStorage.setItem('token', token);
            return token;
          });
        }
        commit(SET_TOKEN, token);
        const response = (await firebase.database().ref(token + '/todoList/').once('value').then((res) => {
          dispatch('switchPreloader', false);
          return res;
        })).val() || [];

        const todoList = [];
        Object.keys(response).forEach( key => {
          todoList.push({
            todoName: response[key].todoName,
            tasks: response[key].tasks,
            id: key,
          })
          }
        );
        todoList.reverse();
        state.todoList = todoList;
        return todoList;
      } catch(e) {
        throw (e);
      }
    }
  },
};

export default todosStore;
