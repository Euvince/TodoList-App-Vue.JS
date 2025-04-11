
<template>

    <div>
        <input
            type="checkbox"
            v-bind:id="id"
            v-model="model"
            @change="onChange"
        >
        <label
            v-bind:class="{ isDone : isDone }"
            v-bind:for="id"
        >
           <strong> {{ label }}</strong>
        </label>
    </div>

</template>


<script setup>


    const props = defineProps({
        label : String,
        id : String | Number,
        for :  String | Number,
        isDone : Boolean
    })

    const model = defineModel()

    const emits = defineEmits([
        'check',
        'uncheck'
    ])

    const onChange = (event) => {
        if (event.currentTarget.checked) {
            emits('check')
        }
        else {
            emits('uncheck')
        }
    }

</script>


<style>

    .isDone {
        opacity: 0.7;
        text-decoration: line-through;
    }

</style>