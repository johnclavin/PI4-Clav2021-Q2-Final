const app = Sammy('#container', function () {
  this.use('Handlebars', 'hbs');
  // Home
  this.get('#/home', home);
  user = '';
  context.redirect('#/home');
});

(() => {
  app.run('#/home');
})();
