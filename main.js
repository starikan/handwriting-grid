var app = new Vue({
  el: '#app',
  computed: {
    kanzisGrid: function() {
      return this.kanzis.flatMap(v => v.repeat(this.columns).split(''));
    }
  },
  data: {
    kanzis: ['我', '晚', '電'],
    columns: 7,
  }
})