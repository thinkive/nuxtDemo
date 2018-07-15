
<!-- ./pages/index.vue -->
<template>
  <div>
    <section class="hero is-medium is-primary is-bold">
        <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
      <section class="container">
        <table>
          <tbody>
          <tr>
            <td colspan=4>vuex状态树使用</td>
          </tr>
          <tr>
            <td>页内数据</td>
            <td>index.js</td>
            <td>plus.js</td>
            <td>minus.js</td>
          </tr>
          <tr class="mutation-fun">
            <td @click="count ++">{{ count }}</td>
            <td @click="$store.commit('increment')">{{ $store.state.num }}</td>
            <td @click="$store.commit('plus/plusMutations')">{{ $store.state.plus.plusNum }}</td>
            <td @click="$store.commit('minus/minusMutations')">{{ $store.state.minus.minusNum }}</td>
          </tr>
          </tbody>
        </table>
        <button @click="$store.commit('plus/plusIndex')"> indexjs num ++</button>
      </section>
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Welcome to the JavaScript SSR Blog. {{project}}
          </h1>
          <h2 class="subtitle">
            Hope you find something you like.
          </h2>
        </div>
      </div>
    </section>

    <posts />
  </div>
</template>

<script>
  import Posts from '~/components/Posts.vue'
  export default {
    name: 'index',
    scrollToTop: true,
    transition: 'fade',
    components: {
      Posts
    },
    data: function () {
      return {
        count: 0
      }
    },
    head: {
      title: 'Home'
    },
    async asyncData (context) {
      console.log('~~~~~~~~asyncData~~~~~~~~~~~~~')
      const ip = await context.app.$axios.$get('http://icanhazip.com')
      console.log(ip)
      return { project: 'nuxt' }
    },
    async fetch ({app}) {
      console.log('~~~~~~~~~~~fetch~~~~~~~~~~~~~~~~')
      const ip = await app.$axios.$get('http://icanhazip.com')
      console.log(ip)
    },
    computed: {
      signle () {
        return true
      }
    },
    methods: {
      async fetchSomething() {
        console.log('~~~~~~fetchSomething~~~~~~~~~~~~~~~')
        const ip = await this.$axios.$get('/test')
        console.log(ip)
      }
    },
    mounted () {
      console.log('~~~~~~~~~~~~mounted~~~~~~~~~~~~~~')
      this.fetchSomething()
    }
  }
</script>
