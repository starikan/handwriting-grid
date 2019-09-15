var router = new VueRouter({
  mode: 'history',
  routes: []
});

var app = new Vue({
  router,
  el: '#app',
  mounted: function() {
    this.kanjis = _.get(this.$route.query, 'kanjis', '').split('');
    this.columns = _.get(this.$route.query, 'columns', 7);
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