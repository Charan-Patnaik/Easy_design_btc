import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BuyerPage from './BuyerPage'; // Import Buyer page component
import DesignerPage from './DesignerPage'; // Import Designer page component
import Login from './Login'; // Import Login component
import AssignedJobs from './AssignedJobs'; // Import AssignedJobs component

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/buyer" element={<BuyerPage />} />
                    <Route path="/designer" element={<DesignerPage />} />
                    <Route path="/" element={<Login />} />
                    <Route path='/assignedjob' element={<AssignedJobs />} /> // Add this route for '/assignedjob
                    {/* Other routes here */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
