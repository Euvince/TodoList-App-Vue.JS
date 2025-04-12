
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

    <div v-if="isLoading">
        <strong>Chargement des tâches...</strong>
    </div>
    <div v-else>
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
                    v-bind:key="todo.id"
                >
                    <div style="display: flex;">
                        <!--v-model="todo.is_completed"-->
                        <Checkbox
                            v-bind:isDone="todo.is_completed"
                            v-bind:id="todo.id"
                            v-bind:for="todo.id"
                            v-bind:label="todo.title"
                            @check="toggleTodo(todo)"
                            @uncheck="toggleTodo(todo)"
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

        <div v-if="error" class="error">{{ error }}</div>
    </div>

</template>


<script setup>

    import { computed, onMounted, onUnmounted, ref } from 'vue'
    import { supabase } from '../supabase'
    import Checkbox from '../utils-components/Checkbox.vue'

    const todos = ref([])

    const newTodoTitle = ref('')

    const hideCompletedTodos = ref(false)

    const isLoading = ref(true)

    const error = ref(null)

    const subscription = ref(null)

    onMounted (() => {
        fetchTodos()
        subscription.value = supabase
            .channel('todos-changes')
            .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'todos'
            }, fetchTodos)
            .subscribe()
    })

    const fetchTodos = async () => {
        try {
            isLoading.value = true
            error.value = null
            const { data, error: fetchError } = await supabase
                .from('todos')
                .select('*')
                .order('created_at', { ascending: false })
            if (fetchError) throw fetchError
            todos.value = data
            console.log(data)
        }
        catch(e) {
            error.value = "Erreur lors du chargement des tâches : " + e.message
            console.error(e)
        }
        finally {
            isLoading.value = false
        }
    }

    const addTodo = async () => {
        if (!newTodoTitle.value.trim()) return

        try {
            error.value = null
            const { data, error: insertError } = await supabase
                .from('todos')
                .insert([
                    { title: newTodoTitle.value.trim(), is_completed: false }
                ])
                .select()
            if (insertError) throw insertError
            newTodoTitle.value = ''
            todos.value = [data[0], ...todos.value]
        }
        catch(e) {
            error.value = "Erreur lors de l'ajout de la tâche : " + e.message
            console.error(e)
        }
    }

    const toggleTodo = async (todo) => {
        try {
            error.value = null
            const newStatus = !todo.is_completed
            const { error: updateError } = await supabase
                .from('todos')
                .update({ is_completed: newStatus })
                .eq('id', todo.id)
            if (updateError) throw updateError
            todo.is_completed = newStatus
        }
        catch(e) {
            error.value = `Erreur lors de la mise à jour de la tâche :${todo.title}` + e.message
            console.error(e)
        }
    }

    const deleteTodo = async (todo) => {
        try {
            error.value = null
            const { data, error: deleteError } = await supabase
                .from('todos')
                .delete()
                .eq('id', todo.id)
            if (deleteError) throw deleteError
            todos.value = todos.value.filter((t) => t.title !== todo.title)
        }
        catch(e) {
            error.value = `Erreur lors de la suppression de la tâche :${todo.title}` + e.message
            console.error(e)
        }
    }

    const sortTodos = () => {
        todos.value = todos.value.sort((t1, t2) => t1.title > t2.title ? 1 : -1)
    }

    const sortedTodos = computed(() => {
        const sortedTodos = todos.value.sort((t1, t2) => t1.is_completed > t2.is_completed ? true : false)
        if (hideCompletedTodos.value === true) {
            return sortedTodos.filter((todo) => !todo.is_completed)
        }
        return sortedTodos
    })

    const remainingTodos = computed(() => {
        return todos.value.filter((todo) => !todo.is_completed).length
    })

    onUnmounted (() => {
        if (subscription.value) {
            subscription.value.unsubscribe()
        }
    })

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

    .error {
        color: #f44336;
    }

</style>