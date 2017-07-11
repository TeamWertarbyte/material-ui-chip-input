import { configure } from '@kadira/storybook';

function loadStories() {
  require('../stories');
}

const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

configure(loadStories, module);
