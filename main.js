var router = new VueRouter({
  mode: 'history',
  routes: []
});

var app = new Vue({
  router,
  el: '#app',
  mounted: function() {
    // console.log(this.$route.query.kanji.split(''))
    this.kanjis = _.get(this.$route.query, 'kanjis', '').split('');
    console.log(this)
  },
  computed: {
    kanzisGrid: function() {
      return this.kanjis.flatMap(v => v.repeat(this.columns).split('')) || [];
    }
  },
  data: {
    kanjis: [],
    columns: 7,
  }
})