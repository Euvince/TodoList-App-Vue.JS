
<template>

    <form
        action=""
        class=""
        style="margin-top: 15px;"
        @submit.prevent
    >
        <fieldset role="group">
            <input
                type="text"
                placeholder="Titre du film..."
                v-model="newTodoTitle"
            >
            <button
                @click="addTodo"
                v-bind:disabled="newTodoTitle === ''"
            >
                Ajouter
            </button>
        </fieldset>
    </form>

    <button
        style="margin-top: 10px;"
        class="secondary"
        @click="sortTodos"
    >
        Réorganiser
    </button>

    <ul style="margin-top: 20px;">
        <div
            v-if="todos.length === 0"
        >
            <div
                style="margin-bottom: 20px; margin-left: -12px;"
            >
                <strong>Vous n'avez aucune tâche à faire</strong>
            </div>
        </div>
        <div
            v-else
        >
            <div
                style="margin-bottom: 20px; margin-left: -12px;"
            >
                <strong>Liste des tâches à faire :</strong>
            </div>
            <li
                v-for="todo in sortedTodos"
                v-bind:key="todo.createdDate"
            >
                <!--<div>
                    <input
                        type="checkbox"
                        v-bind:id="todo.createdDate"
                        v-model="todo.completed"
                    >
                    <label
                        v-bind:class="{ isDone : todo.completed }"
                        v-bind:for="todo.createdDate"
                    >
                        <strong>{{ todo.title }}</strong>
                    </label>
                    <button
                        style="margin-left: 10px;"
                        class="btn-small btn-small-red"
                        @click="deleteTodo(todo)"
                    >
                        Supprimer
                    </button>
                </div>-->
                <div style="display: flex;">
                    <Checkbox
                        v-bind:isDone="todo.completed"
                        v-bind:id="todo.createdDate"
                        v-bind:for="todo.createdDate"
                        v-bind:label="todo.title"
                        v-model="todo.completed"
                    />
                    <button
                        style="margin-left: 10px;"
                        class="btn-small btn-small-red"
                        @click="deleteTodo(todo)"
                    >
                        Supprimer
                    </button>
                </div>
            </li>
        </div>
    </ul>

    <div
        v-if="todos.length > 0"
    >
        <input
            type="checkbox"
            id="hideCompletedTodos"
            v-model="hideCompletedTodos"
        >
        <label for="hideCompletedTodos">
            Masquer les tâches complétées
        </label>
    </div>

    <div
        style="margin-top: 15px;"
        v-if="remainingTodos > 0"
    >
        Il vous reste {{ remainingTodos }} tâche{{ remainingTodos > 1 ? 's' : '' }} à faire
    </div>

    <!--<div style="margin-top: 20px;">
        <Checkbox
            v-bind:label="'Bonjour les gens'"
            v-bind:id="10000000000"
            v-bind:for="10000000000"

            @check="log('Coché !')"
            @uncheck="log('Décoché !')"
        />
    </div>-->

</template>


<script setup>

    import { computed, ref } from 'vue'
    import Checkbox from './utils-components/Checkbox.vue'

    const todos = ref([
        {
            'title' : "Première tâche de test",
            'completed' : false,
            'createdDate' : 1,
        },
        {
            'title' : "Seconde tâche de test",
            'completed' : true,
            'createdDate' : 2,
        },
        {
            'title' : "Troisième tâche de test",
            'completed' : false,
            'createdDate' : 3,
        },
    ])

    const newTodoTitle = ref('')

    const hideCompletedTodos = ref(false)

    const addTodo = () => {
        if (newTodoTitle.value !== '') {
            todos.value = [{
            title : newTodoTitle.value,
            completed : false,
            createdDate : Date.now()
            }, ...todos.value]
            newTodoTitle.value = ''
        }
    }

    const deleteTodo = (todo) => {
        todos.value = todos.value.filter((t) => t.title !== todo.title)
    }

    const sortTodos = () => {
        todos.value = todos.value.sort((t1, t2) => t1.title > t2.title ? 1 : -1)
    }

    const sortedTodos = computed(() => {
        const sortedTodos = todos.value.sort((t1, t2) => t1.completed > t2.completed ? true : false)
        if (hideCompletedTodos.value === true) {
            return sortedTodos.filter((todo) => !todo.completed)
        }
        return sortedTodos
    })

    const remainingTodos = computed(() => {
        return todos.value.filter((todo) => !todo.completed).length
    })

    const log = (value) => {
        console.log(value)
    }

</script>


<style>

    .btn-small {
        padding: 0.20rem 0.25rem;
        font-size: 0.875rem;
    }

    .btn-small-red {
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        background-color: #ff4d4d;
        color: white;
        border: none;
        border-radius: 0.25rem;
    }

    .btn-small-red:hover {
        background-color: #ff1a1a;
    }

    button:disabled {
        cursor: not-allowed;
    }

    .isDone {
        opacity: 0.7;
        text-decoration: line-through;
    }

</style>