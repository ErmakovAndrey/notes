<template>

  <div class="wrapper">

    <header></header>

    <div class="wrapper-content">

      <section>

        <div class="container">

          <!-- title -->
          <div class="note-header">
            <h1>{{ title }}</h1>
          </div>

          <!-- new note -->
          <NewNote />

          <!-- note list -->
          <Notes />

        </div>

      </section>

    </div>

    <footer></footer>

  </div>

</template>

<script>
import NewNote from './components/NewNote';
import Notes from './components/Notes'
export default {
  components: { NewNote, Notes },
  data() {
    return {
      title: 'Notes App'
    }
  }
}
</script>
