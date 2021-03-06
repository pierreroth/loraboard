export class ErrorView extends Backbone.View {

  constructor(msg) {
    super();
    this.setElement('#main');
    this.errorMsg = msg;
  }

  render() {
    const html = `
      <div class="row">
        <div class="center-block">
        </div>
      </div>
      <div class="row">
        <h3>Page not found :(</h3>
        <h5>${this.errorMsg}</h5>
        <a href="/">Back home</a>
      </div>`;
    this.$el.html(html);
    return this;
  }
}
