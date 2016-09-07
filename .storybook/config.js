import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
