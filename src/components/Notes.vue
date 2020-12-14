<template>

  <div class="new-note__wrapper">

    <div class="note-header">

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

    <!-- notes -->

    <div class="notes">
      <div
          v-for="note in notesFilter"
          :key="note.id"
          @click="close(note.id)"
          :class="[{full: !grid}, note.priority]"
          class="note"
      >
        <div class="note-header" :class="{full: !grid}">
          <p @dblclick="note.onEdit = true; editValue = note.title" :class="{'hide-title': note.onEdit}">{{ note.title }}</p>
          <div class="note-input" :class="{'note-input_show-input': note.onEdit}">
            <input
                type="text"
                @keyup.enter="editTitle(note.id)"
                @blur="close(note.id)"
                v-model="editValue"
                @click.stop=""
            />
          </div>
          <p class="close" @click="removeNote(note.id)">x</p>
        </div>
        <div class="note-body">
          <p>{{ note.descr }}</p>
          <span>{{ note.date }}</span>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import Search from '@/components/Search.vue';
export default {
  components: {Search},
  data () {
    return {
      search: '',
      grid: true,
      note: {
        title: '',
        descr: '',
      },
      notes: [],
      priorities: {},
      editValue: ''
    }
  },
  created() {
    this.notes = this.$store.getters.getNotes
    this.priorities = this.$store.getters.getPriorities
  },
  computed: {
    notesFilter() {
      let array = this.notes,
          search = this.search;
      array = array.sort((a, b) => {
        return this.priorities[a.priority].value - this.priorities[b.priority].value
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
    removeNote(id) {
      this.$store.dispatch('removeNote', id)
    },
    editTitle(id) {
      let titleValue = this.editValue
      this.$store.dispatch('editTitle', {id, titleValue})
      this.close(id)
    },
    close(id) {
      const note = this.notes.find((item) => item.id == id)
      note.onEdit = false;
    }
  }
}
</script>

<style lang="scss">
    .notes{
        display: flex;
        align-items: center;
        justify-content:  space-between;
        flex-wrap: wrap;
        padding: 2.5em 0;
    }
    .note{
        width: 48%;
        padding: 1em 1.2em;
        margin-bottom: 1.5em;
        background-color: #fff;
        transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
        box-shadow: 0 1.8em 1.8em rgba(0, 0, 0, 0.2);
        &:hover{
            box-shadow: 0 1.8em 1.8em rgba(0, 0, 0, 0.4);
            transform: translate(0, -0.25em);
            transition-delay: 0s !important;
        }
        &.full{
            width: 100%;
            text-align: center;
        }
        &.high{
            background-color: rgba(255, 238, 0, 0.5);
        }
        &.extra{
            background-color: rgba(255, 0, 0, 0.5);
            span{
                color:#313131;
            }
        }
    }
    .note-header{
        display: flex;
        align-items: center;
        justify-content:  space-between;

        p{
            color: rgb(53, 0, 139);
            font-size: 1.3em;
            &.hide-title{
                display: none;
            }
        }
        .note-input{
            display: none;
            &_show-input{
                display: block;
            }
            input{
                padding: 4px 26px;
                margin-bottom: 0;
            }
        }
        .close{
            cursor: pointer;
            color: rgb(196, 0, 0)
        }
        svg{
            margin-right: 0.75em;
            color:#999;
            cursor: pointer;
            &.active{
                color: #402caf;
            }
            &:last-child{
                margin-right: 0;
            }
        }
        h1{
            font-size: 2em;
        }
        &.full{
            justify-content: center;
            p{
                margin-right: 0.9em;
                &.last-child{
                    margin-right: 0;
                }
            }
        }
    }
    .note-body{
        p{
            margin: 1.2em 0;
        }
        span{
            font-size: 0.8em;
            color:#999;
        }
    }
</style>