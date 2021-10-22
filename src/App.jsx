import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { AuthProvider } from './context/authContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Project from './pages/Project';
import './styles/global.css';

function App() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <div className="container my-5">
                        <Switch>
                            <PublicRoute path="/login" exact component={Login} />
                            <PrivateRoute path="/project/:id" exact component={Project} />
                            <PrivateRoute path="/" exact component={Home} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}

export default App;
