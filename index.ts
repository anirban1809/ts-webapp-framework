import { CreateEndpoint } from "./endpoints/create.endpoint";
import { GetAllEndpoint } from "./endpoints/getall.endpoint";
import { Application } from "./lib";

const app = new Application();

app.bootstrap(3000);
app.registerEndpoints([GetAllEndpoint, CreateEndpoint]);
