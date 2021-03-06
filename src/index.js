import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bulma/css/bulma.css";
import "animate.css/animate.min.css";
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import "bulma-calendar/dist/js/bulma-calendar.min";
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
