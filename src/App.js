/* @flow */

import * as React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {BingoRegular} from './variants/bingo-regular';
import {MathVariant} from './variants/math-variant';

class App extends React.Component<{}> {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <MathVariant />
                    </Route>
                    <Route path="/wihi">
                        <BingoRegular />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
