var router = new VueRouter({
  mode: 'history',
  routes: [],
});

var app = new Vue({
  router,
  el: '#app',
  mounted: function() {
    const initValues = {
      kanjis: '@',
      columns: 7,
      cellSize: 2.5,
      fontSize: 2.5,
    };

    this.kanjis = _.get(this.$route.query, 'kanjis', initValues.kanjis);
    this.columns = _.get(this.$route.query, 'columns', initValues.columns);
    this.cellSize = _.get(this.$route.query, 'cellSize', initValues.cellSize);
    this.fontSize = _.get(this.$route.query, 'fontSize', initValues.fontSize);
    console.log(this);
  },
  computed: {
    kanzisGrid: function() {
      return this.kanjis.split('').flatMap(v => v.repeat(this.columns).split('')) || [];
    },
  },
  watch: {
    cellSize: function(curr, prev) {
      const cellSize = parseFloat(curr);
      document.documentElement.style.setProperty('--cell-size', `${cellSize}cm`);
    },
    fontSize: function(curr, prev) {
      const fontSize = parseFloat(curr);
      document.documentElement.style.setProperty('--font-size', `${fontSize}cm`);
    },
  },
  data: {
    kanjis: null,
    columns: null,
    cellSize: null,
    fontSize: null,
  },
});
