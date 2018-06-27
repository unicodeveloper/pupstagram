import React from "react";
import { AppRegistry, View } from "react-native-web";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Feed from "./views/Feed";
import Detail from "./views/Detail";
import Likes from "./views/Likes";
import { defaults, resolvers } from "./resolvers";

const client = new ApolloClient({
  uri: "https://dog-graphql-api.glitch.me/graphql",
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
