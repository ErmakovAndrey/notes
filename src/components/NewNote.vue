<template>
    <div class="new-note__wrapper">
      <!-- message -->
      <Message v-if="message.show" :message="message" />
      <!-- note form -->
      <div class="new-note">
          <label>Title</label>
          <input type="text" v-model="note.title">
          <label>Priority</label>
          <div class="note-radio">
              <p v-for="priorityItem in priorities">
                <input v-model="note.priority" name="priority" type="radio" :value="priorityItem.name">
                {{ priorityItem.name }}
              </p>
          </div>
          <label>Description</label>
          <textarea v-model="note.descr"></textarea>
          <button @click="addNote" class="btn btnPrimary">Create note</button>
      </div>
    </div>
</template>

<script>
import Message from '@/components/Message';
export default {
  components: {Message},
    data() {
        return {
            priorities: {},
            note: {
              title: '',
              descr:'',
              priority: '',
              date: null
            },
            message: {
              show: false,
              text: ''
            },
        }
    },
    created() {
      this.priorities = this.$store.getters.getPriorities
      this.note.priority = this.priorities[Object.keys(this.priorities)[0]].name
    },
    methods: {
        addNote() {
          if (this.note.title.trim() === '') {
            this.message.text = 'Title can`t be blank!'
            this.message.show = true
            return false
          }
          this.note.date = new Date().toLocaleString()
          this.$store.dispatch('addNote', {...this.note})
          this.cleanNote()
        },
        cleanNote() {
          this.note.title = ''
          this.note.descr = ''
          this.note.priority = this.priorities[Object.keys(this.priorities)[0]].name
          this.note.date = null
          this.message.show = false
          this.message.text = ''
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