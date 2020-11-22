<template>

  <div class="wrapper">

    <header></header>

    <div class="wrapper-content">

      <section>

        <div class="container">

          <!-- message -->
          <Message v-if="message.show" :message="message" />

          <!-- new note -->
          <NewNote :note="note" @addNote="addNote"/>
          
          <!-- title -->
          <div class="note-header">
            <h1>{{ title }}</h1>

            <!-- search -->
            <Search 
              :value="search" 
              placeholder="Find note" 
              @search="search = $event"
            />

            <!-- icons control -->
            <div class="icons">
              <svg :class="{active: grid}" @click="grid=true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <svg :class="{active: !grid}" @click="grid=false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
            </div>
          </div>
          
          <!-- note list -->
          <Notes :notes="notesFilter" :grid="grid"  @removeNote="removeNote" @editTitle="editTitle"/>

        </div>

      </section>

    </div>

    <footer></footer>

  </div>

</template>

<script>
import Message from './components/Message';
import NewNote from './components/NewNote';
import Notes from './components/Notes'
import Search from './components/Search.vue';
export default {
  components: { Message, NewNote, Notes, Search},
  data () {
    return {
      title: 'Notes App', 
      search: '',
      message: {
         show: false,
         text: ''
      },
      grid: true,
      note: {
          title: '',
          descr: '',
      },
      notes: [
          {   
              id: 1,
              title: 'First Note',
              descr: 'Decription First note',
              date: new Date().toLocaleString(),
              priority: 0,
              onEdit: false,
          },
          {
              id: 2,
              title: 'Second Note',
              descr: 'Decription Second note',
              date: new Date().toLocaleString(),
              priority: 0,
              onEdit: false,
          },
          {
              id: 3,
              title: 'Third Note',
              descr: 'Decription Third note',
              date: new Date().toLocaleString(),
              priority: 1,
              onEdit: false,
          },
          {
              id: 34,
              title: 'Fourth Note',
              descr: 'Decription Fourth note',
              date: new Date().toLocaleString(),
              priority: 2,
              onEdit: false,
          }
      ]
    }
  },
  computed: {
    notesFilter() {
      let array = this.notes,
      search = this.search;
      array = array.sort((a, b) => {
        return b.priority - a.priority
      });
      if (!search) return array;
      search = search.trim().toLowerCase();
      array = array.filter(item => {
        if (item.title.toLowerCase().indexOf(search) !== -1) return item
      });
      return array;
    }
  },
  methods: {
      addNote() {
          let {title, descr, priority} = this.note;
          if (title === '') {
              this.message.text = 'Title can`t be blank!'
              this.message.show = true 
              return false
          }
          let nextId = Math.max.apply(null, this.notes.map(item => item.id));
          this.notes.push({
              id: ++nextId,
              title,
              descr,
              priority,
              onEdit: false,
              date: new Date().toLocaleString()
          });
          this.note.title = '';
          this.note.descr = '';
          this.message.text = ''; 
          this.message.show = false
      },
      removeNote(id) {
          this.notes.splice(this.notes.map(item => item.id).indexOf(id), 1);
      },
      editTitle(id, titleVelue) {
          let note = this.notes.find(item => item.id == id);
          note.title = titleVelue;
      } 
  }
}
</script>
