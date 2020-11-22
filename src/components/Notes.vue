<template>
    <div class="notes">
        <div 
            v-for="(note) in notes" 
            :key="note.id" 
            :class="{full: !grid, extra: note.priority ==2, high: note.priority ==1}" 
            class="note"
            @click="note.onEdit = false"
        >
            <div class="note-header" :class="{full: !grid}">
                <p @dblclick="note.onEdit = true; editValue = note.title" :class="{'hide-title': note.onEdit}">{{ note.title }}</p>
                <div class="note-input" :class="{'note-input_show-input': note.onEdit}">
                    <input 
                        type="text"  
                        @keyup.enter="editTitle(note.id)" 
                        @blur="note.onEdit = false"
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
</template>

<script>
export default {
    props: {
        notes: {
            type: Array,
            required: true
        },
        grid: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return { editValue: ''}
    },
    methods: {
        removeNote(id) {
            this.$emit('removeNote', id)
        },
        editTitle(id) {
            this.notes.find(item => item.id == id).onEdit = false;
            this.$emit('editTitle', id, this.editValue);
            this.editValue = '';
        },
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