<template>
    <v-container>
        <div class="display-1">{{this.title}}</div>
        <v-divider class="my-3"></v-divider>
    </v-container>
</template>

<script>
export default {
    props: {
        title: String
    }
}
</script>

