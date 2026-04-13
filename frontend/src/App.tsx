import { BrowserRouter, Routes, Route } from "react-router-dom"
import Share from "./pages/Share"
import View from "./pages/View"

export default function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Share />} />
          <Route path="/view/:id" element={<View />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}