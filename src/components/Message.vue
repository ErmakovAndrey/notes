<template>
    <div class="message">
        <p>{{ message.text }}</p>
    </div>
</template>

<script>
export default {
    props: {
        message:{
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
    .message{
        text-align: center;
    }
    p {
        color: #b80000;
        font-weight: 700;
    }
</style>