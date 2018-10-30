<!-- ./pages/post/_id/index.vue -->
<template>
  <div class="main-content">
    <div class="container">
      <h2 class="title is-2">{{ post.title }}</h2>
      <div v-html="post.content"></div>
      <br>
      <h4 class="title is-5 is-marginless">by <strong>{{ post.author }}</strong> at <strong>{{ post.published }}</strong></h4>
    </div>
  </div>
</template>

<script>
// import posts saved JSON data
import posts from '~/data/posts.json'
export default {
  validate ({ params }) {
    return /^\d+$/.test(params.id)
  },
  async fetch ({app}) {
    console.log('~~~~~~~post _id~~~~fetch~~~~~~~~~~~~~~~~')
  },
  asyncData ({ params }, callback) {
    console.log('~~~~~~~post _id~~~~~asyncData~~~')
    let post = posts.find(post => post.id === parseInt(params.id))
    if (post) {
      callback(null, { post })
    } else {
      let result = { statusCode: 404, message: 'Post not found' }
      callback(result)
    }
  },
  head () {
    return {
      title: this.post.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.post.summary
        }
      ]
    }
  }
}
</script>
