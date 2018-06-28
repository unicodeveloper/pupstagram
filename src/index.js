import React from "react";
import { AppRegistry, View } from "react-native-web";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";

import Feed from "./views/Feed";
import Detail from "./views/Detail";
import Likes from "./views/Likes";
import { defaults, resolvers } from "./resolvers";

const link = createPersistedQueryLink().concat(createHttpLink({ uri: "http://localhost:4000/graphql" }));

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
  clientState: {
    defaults,
    resolvers
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <View>
        <Switch>
          <Route path="/" exact component={Feed} />
          <Route path="/likes" exact component={Likes} />
          <Route path="/:breed/:id" component={Detail} />
        </Switch>
      </View>
    </Router>
  </ApolloProvider>
);

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", { rootTag: document.getElementById("root") });
