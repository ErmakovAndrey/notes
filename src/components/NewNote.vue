<template>
    <div class="new-note">
        <label for="">Title</label>
        <input type="text" v-model="note.title">
        <label for="">Priority</label>
        <div class="note-radio">
            <p><input v-model="priority" name="priority" type="radio" value="Standart">Standart</p>
            <p><input v-model="priority" name="priority" type="radio" value="High">High</p>
            <p><input v-model="priority" name="priority" type="radio" value="Extra">Extra</p>
        </div>
        <label for="">Description</label>
        <textarea v-model="note.descr"></textarea>
        <button @click="addNote" class="btn btnPrimary">Create note</button>
    </div>
</template>

<script>
export default {
    props: {
        note:{
            type: Object,
            required: true
        }
    },
    data() {
        return {
            priority: 'Standart'
        }
    },
    methods: {
        addNote (){
            switch(this.priority) {
                case 'Standart':
                    this.note.priority = 0;
                    break;
                case 'High':
                    this.note.priority = 1;
                    break;
                case 'Extra':
                    this.note.priority = 2;
                    break;
                default :
                    this.note.priority = 0;
            }

            this.priority = 'Standart'
            this.$emit('addNote', this.note)
        }
    }
}
</script>

<style lang="scss">
.new-note{
    text-align: center;
    padding: 2em 0;
}
.note-radio{
    display: flex;
    justify-content: center;
    padding:0 0 2em;
    p{
        padding: 0 3em;
    }
    input{
        margin-bottom: 0;
    }
}
</style>